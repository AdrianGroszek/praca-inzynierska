import { FaLocationDot, FaUsers } from 'react-icons/fa6';
import styles from './EventDescription.module.css';
import CourtTagInfo from '../courts/CourtTagInfo';
import { useEvents } from '../../../context/events-context';
import { formatEventTime } from '../../../helpers';

import { FaCalendarDays } from 'react-icons/fa6';
import { FaLocationArrow } from 'react-icons/fa6';
import { FaUserCheck } from 'react-icons/fa6';
import { FaPersonRunning } from 'react-icons/fa6';
import { FaChartLine } from 'react-icons/fa6';
import PlayersList from './PlayersList';
import { useUserLogin } from '../../../context/user-login-context';
import { EventType } from '../../../data/events';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function EventDescription() {
	const { events, joinTheEvent, leaveTheEvent, deleteEvent } = useEvents();
	const { user, updateJoinedEvents, updateLeaveEvent, updateDeleteEvent } =
		useUserLogin();
	const { eventId } = useParams();

	const selectedEvent: EventType | undefined = events.find(
		(event) => event.id === eventId
	);

	if (!selectedEvent) return;

	function handleJoinTheEvent() {
		if (!selectedEvent || !user) return;
		if (selectedEvent.participants.length === selectedEvent.playerCount) {
			toast.error('This event is full, please select another event.');
			return;
		}
		if (selectedEvent.participants.includes(user.id)) {
			toast.error('You already joined to this event.');
			return;
		}
		if (selectedEvent.minAge > user.age || selectedEvent.maxAge < user.age) {
			toast.error('Your age does not fit into the range.');
			return;
		}
		toast.success(`You've joined. Have fun! :)`);
		updateJoinedEvents(selectedEvent.id);
		joinTheEvent(user.id, selectedEvent.id);
	}

	function handleLeaveTheEvent() {
		if (!selectedEvent || !user) return;
		toast.success('You left the event');
		updateLeaveEvent(selectedEvent.id);
		if (user.createdEvents.includes(selectedEvent.id)) {
			toast.success('Successfully deleted event');
			deleteEvent(selectedEvent.id);
			updateDeleteEvent(selectedEvent.id);
		}
		leaveTheEvent(user.id, selectedEvent.id);
	}

	return (
		<section className={styles.sectionContainer}>
			<div className={styles.topContentContainer}>
				<div className={styles.imgContainer}>
					<img src={selectedEvent.photo} alt='Photo of particular court' />
				</div>
				<div className={styles.topContentDescription}>
					<div className={styles.courtNameContainer}>
						<h3>{selectedEvent.title}</h3>
					</div>
					<div>
						<ul className={styles.courtDetailsList}>
							<li>
								<FaUsers className={styles.detailsIcon} />
								<span>
									Prayers {selectedEvent.participants.length}/
									{selectedEvent.playerCount}
								</span>
							</li>
							<li>
								<FaLocationDot className={styles.detailsIcon} />
								<span>{selectedEvent.location}</span>
							</li>
						</ul>
					</div>
					<CourtTagInfo event={selectedEvent} />
					<p className={styles.courtDescription}>{selectedEvent.description}</p>
				</div>
			</div>
			<div className={styles.bottomContentContainer}>
				<div className={styles.bottomContentContainerPlayers}>
					<p className={styles.playersCount}>
						Players: {selectedEvent.participants.length} /{' '}
						{selectedEvent.playerCount}
					</p>
					<PlayersList
						playersId={selectedEvent.participants}
						selectedEvent={selectedEvent}
					/>
				</div>
				<div className={styles.bottomContentContainerEventInfo}>
					<div>
						<p>
							<span>
								<FaCalendarDays />
							</span>
							{formatEventTime(selectedEvent.eventTime)}
						</p>
						<p>
							<span>
								<FaLocationArrow />
							</span>
							{selectedEvent.location}
						</p>
						<p>
							<span>
								<FaUserCheck />
							</span>
							Age: {selectedEvent.minAge} - {selectedEvent.maxAge}
						</p>
						<p>
							<span>
								<FaPersonRunning />
							</span>
							{selectedEvent.eventType}
						</p>
						<p>
							<span>
								<FaChartLine />
							</span>
							{selectedEvent.level}
						</p>
					</div>

					{selectedEvent!.participants.includes(user!.id) ? (
						<button className={styles.leaveBtn} onClick={handleLeaveTheEvent}>
							{user?.createdEvents.includes(selectedEvent.id)
								? 'Leave and Delete'
								: 'Leave'}
						</button>
					) : (
						<button className={styles.joinBtn} onClick={handleJoinTheEvent}>
							Join
						</button>
					)}
				</div>
			</div>
		</section>
	);
}
