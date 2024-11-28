// TEMPORARY STYLES from courtItem
import styles from '../courts/CourtItem.module.css';

import { Link, useLocation, useParams } from 'react-router-dom';
import { useEvents } from '../../../context/events-context';
import { type EventType } from '../../../data/events';
import { FaLocationDot, FaUsers } from 'react-icons/fa6';
import { useCourts } from '../../../context/courts-context';
import { formatEventTime } from '../../../helpers';
import TagSpan from '../../UI/TagSpan';
import { useEffect, useState } from 'react';
import { useUserLogin } from '../../../context/user-login-context';
import EventDescription from './EventDescription';

type EventItemProp = {
	event: EventType;
};

export default function EventItem({ event }: EventItemProp) {
	const { selectEvent, selectedEvent } = useEvents();
	const { courts } = useCourts();
	const { eventId } = useParams();
	const { user } = useUserLogin();
	const location = useLocation();

	const [isUserJoined, setIsUserJoined] = useState(false);

	useEffect(() => {
		if (event.participants.includes(user!.id)) {
			setIsUserJoined(true);
		} else {
			setIsUserJoined(false);
		}
	}, [event]);

	const selectedStyle: string =
		selectedEvent && eventId === event.id ? styles.activeCourtItem : '';

	const eventCourt = courts.find((court) => court.id === event.courtId);

	function handleClick() {
		selectEvent(event);
	}

	const chooseRoute: string =
		location.pathname.includes('courts') || location.pathname.includes('user')
			? `/app/events/${event.id}`
			: event.id;

	return (
		<li>
			<Link
				to={chooseRoute}
				className={`${styles.courtItem} ${selectedStyle}`}
				onClick={handleClick}>
				<img
					src={eventCourt?.photos[0]}
					alt={eventCourt?.name}
					className={styles.courtImg}
				/>
				<div className={styles.descriptionContainer}>
					<div className={styles.topContainer}>
						<p>{event.title}</p>
						<p className={styles.timeText}>
							{formatEventTime(event.eventTime)}
						</p>
					</div>
					<div className={styles.bottomContainer}>
						<ul className={styles.courtDetailsList}>
							<li>
								<p>
									<FaUsers className={styles.detailsIcon} />
								</p>
								<span>
									Prayers {event.participants.length}/{event.playerCount}
								</span>
							</li>
							<li>
								<p>
									<FaLocationDot className={styles.detailsIcon} />
								</p>
								<span>{event.location}</span>
							</li>
						</ul>
						<div className={styles.tagspansContainer}>
							{isUserJoined && (
								<TagSpan textColor='#03d8c3' bgColor='rgba(3, 216, 195, 0.1)'>
									JOINED
								</TagSpan>
							)}
							{event.isFree ? (
								<TagSpan textColor='#cdf7f3' bgColor='rgba(205, 247, 243, 0.1)'>
									FREE
								</TagSpan>
							) : (
								<TagSpan textColor='#ffd972' bgColor='rgba(255, 217, 114, 0.1)'>
									PAID
								</TagSpan>
							)}
						</div>
					</div>
				</div>
			</Link>
			{event.id === selectedEvent?.id && (
				<div className={styles.showMobileEventDescription}>
					<EventDescription />
				</div>
			)}
		</li>
	);
}
