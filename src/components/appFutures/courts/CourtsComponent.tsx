import { useLocation } from 'react-router-dom';
import { useCourts } from '../../../context/courts-context';
import styles from './CourtsComponent.module.css';

import CourtsList from './CourtsList';
import EventsList from '../events/EventsList';
import { useEvents } from '../../../context/events-context';

export default function CourtsComponent() {
	const { searchedCourts, filterCategory } = useCourts();
	const { searchedEvents, eventFilterCategory } = useEvents();
	const location = useLocation();

	const sumOfCourts: number = searchedCourts.length;
	const sumOfEvents: number = searchedEvents.length;

	if (location.pathname.includes('courts')) {
		return (
			<section className={styles.courtsContainer}>
				<p>
					{filterCategory} Courts, {sumOfCourts}
				</p>
				<div className={styles.courtsListWrapper}>
					<CourtsList />
				</div>
			</section>
		);
	}

	if (location.pathname.includes('events')) {
		return (
			<section className={styles.courtsContainer}>
				<p>
					{eventFilterCategory} Events, {sumOfEvents}
				</p>
				<div className={styles.courtsListWrapper}>
					<EventsList />
				</div>
			</section>
		);
	}
}
