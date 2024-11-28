import {
	FaLocationDot,
	FaUsers,
	FaCalendarDays,
	FaLocationArrow,
	FaUserCheck,
	FaPersonRunning,
	FaChartLine,
} from 'react-icons/fa6';
import styles from './EventDescription.module.css';
import CourtTagInfo from '../courts/CourtTagInfo';
import { useEvents } from '../../../context/events-context';
import { formatEventTime } from '../../../helpers';
import PlayersList from './PlayersList';
import { type EventType } from '../../../data/events';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';
import { useUser } from '../../../context/UserContext';

export default function EventDescription() {
	const { events, joinTheEvent, leaveTheEvent, deleteEvent } = useEvents();
	const { user } = useAuth();
	const { profile } = useUser();
	const { eventId } = useParams();

	const selectedEvent: EventType | undefined = events.find(
		(event) => event.id === eventId
	);

	if (!selectedEvent || !user || !profile) return null;

	async function handleJoinTheEvent() {
		if (!selectedEvent || !user || !profile) return;
		try {
			if (selectedEvent.participants.length === selectedEvent.player_count) {
				toast.error('This event is full, please select another event.');
				return;
			}

			if (selectedEvent.participants.includes(user.id)) {
				toast.error('You already joined this event.');
				return;
			}

			if (
				selectedEvent.min_age > (profile.age || 0) ||
				selectedEvent.max_age < (profile.age || 0)
			) {
				toast.error('Your age does not fit into the range.');
				return;
			}

			await joinTheEvent(user.id, selectedEvent.id);
			toast.success(`You've joined. Have fun! :)`);
		} catch (error) {
			console.error('Error joining event:', error);
			toast.error('Failed to join the event');
		}
	}

	async function handleLeaveTheEvent() {
		if (!selectedEvent || !user || !profile) return;
		try {
			// Sprawdź czy użytkownik jest twórcą wydarzenia
			const isCreator = profile.created_events?.includes(selectedEvent.id);

			if (isCreator) {
				await deleteEvent(selectedEvent.id);
				toast.success('Successfully deleted event');
			} else {
				await leaveTheEvent(user.id, selectedEvent.id);
				toast.success('You left the event');
			}
		} catch (error) {
			console.error('Error leaving/deleting event:', error);
			toast.error('Failed to leave/delete the event');
		}
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
									Players {selectedEvent.participants.length}/
									{selectedEvent.player_count}
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
						{selectedEvent.player_count}
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
							{formatEventTime(selectedEvent.event_time)}
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
							Age: {selectedEvent.min_age} - {selectedEvent.max_age}
						</p>
						<p>
							<span>
								<FaPersonRunning />
							</span>
							{selectedEvent.event_type}
						</p>
						<p>
							<span>
								<FaChartLine />
							</span>
							{selectedEvent.level}
						</p>
					</div>

					{selectedEvent.participants.includes(user.id) ? (
						<button className={styles.leaveBtn} onClick={handleLeaveTheEvent}>
							{profile.created_events?.includes(selectedEvent.id)
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
