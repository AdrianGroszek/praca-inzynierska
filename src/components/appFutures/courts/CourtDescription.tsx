import { FaLocationDot, FaUsers } from 'react-icons/fa6';
import styles from './CourtDescription.module.css';
import { Link, useParams } from 'react-router-dom';
import { useCourts } from '../../../context/courts-context';
import { type CourtType } from '../../../data/courts';
import CourtTagInfo from './CourtTagInfo';
import EventItem from '../events/EventItem';
import { type EventType } from '../../../data/events';
import { useEvents } from '../../../context/events-context';

export default function CourtDescription() {
	const { courtId } = useParams();
	const { courts } = useCourts();
	const { events } = useEvents();

	const selectedCourt: CourtType | undefined = courts.find(
		(court) => court.id === courtId
	);

	if (!selectedCourt) return;

	const eventsInSelectedCourt: EventType[] = events.filter(
		(event) => event.court_id === selectedCourt?.id
	);

	return (
		<section className={styles.sectionContainer}>
			<div className={styles.topContentContainer}>
				<div className={styles.imgContainer}>
					<img src={selectedCourt.photos[0]} alt={selectedCourt?.name} />
				</div>
				<div className={styles.topContentDescription}>
					<div className={styles.courtNameContainer}>
						<h3>{selectedCourt.name}</h3>
					</div>
					<div>
						<ul className={styles.courtDetailsList}>
							<li>
								<FaUsers className={styles.detailsIcon} />
								<span>Prayers {selectedCourt.capacity}</span>
							</li>
							<li>
								<FaLocationDot className={styles.detailsIcon} />
								<span>{selectedCourt.location}</span>
							</li>
						</ul>
					</div>
					<CourtTagInfo court={selectedCourt} />
					<p className={styles.courtDescription}>
						{selectedCourt.court_description}
					</p>
				</div>
			</div>
			<div className={styles.bottomContentContainer}>
				<p className={styles.activeEvents}>
					Active events: {eventsInSelectedCourt.length}
				</p>
				{eventsInSelectedCourt.length === 0 ? (
					<div className={styles.noEventsContainer}>
						<p>No one has created an event on this pitch.</p>
						<p>Be the first to do it.</p>
						<Link to='/app/create'>Create Event</Link>
					</div>
				) : (
					<ul className={styles.test}>
						{eventsInSelectedCourt.map((event) => (
							<EventItem event={event} key={event.id} />
						))}
					</ul>
				)}
			</div>
		</section>
	);
}
