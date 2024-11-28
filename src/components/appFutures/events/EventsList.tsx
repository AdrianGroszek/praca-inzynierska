import styles from './EventsList.module.css';

import { useEvents } from '../../../context/events-context';
import EventItem from './EventItem';

export default function EventsList() {
	const { searchedEvents } = useEvents();
	return (
		<ul className={styles.eventsList}>
			{searchedEvents.map((event) => (
				<EventItem key={event.id} event={event} />
			))}
		</ul>
	);
}
