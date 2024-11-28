import { useEffect, useState } from 'react';
import Wrapper from '../components/UI/Wrapper';
import { useEvents } from '../context/events-context';
import { useUserLogin } from '../context/user-login-context';
import styles from './UserPage.module.css';
import { EventType } from '../data/events';
import EventItem from '../components/appFutures/events/EventItem';
import { Link, useNavigate } from 'react-router-dom';
import { FaAnglesLeft } from 'react-icons/fa6';
import Button from '../components/UI/Button';
import { FaTrashCan } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import { FaDoorOpen } from 'react-icons/fa6';

export default function UserPage() {
	const { user, updateLeaveEvent, updateDeleteEvent } = useUserLogin();
	const { events, leaveTheEvent, deleteEvent, resetSelectedEvent } =
		useEvents();
	const navigate = useNavigate();

	const [userJoinedEvents, setUserJoinedEvents] = useState<EventType[]>([]);
	const [userCreatedEvents, setUserCreatedEvents] = useState<EventType[]>([]);

	function getUserJoinedEvents() {
		const createdEvents: string[] = user!.createdEvents;
		const joinedEvents: string[] = user!.joinedEvents.filter(
			(el) => !createdEvents.includes(el)
		);
		const createdEventsObj: EventType[] = events.filter((event) =>
			createdEvents.includes(event.id)
		);

		const joinedEventsObj: EventType[] = events.filter((event) =>
			joinedEvents.includes(event.id)
		);

		setUserCreatedEvents(createdEventsObj);
		setUserJoinedEvents(joinedEventsObj);
	}

	function handleLeaveTheEvent(userId: string, eventId: string): void {
		toast.success('You left the event');
		updateLeaveEvent(eventId);
		leaveTheEvent(userId, eventId);
	}

	function handleDeleteTheEvent(userId: string, eventId: string): void {
		toast.success('Successfully deleted event');
		deleteEvent(eventId);
		updateDeleteEvent(eventId);
		leaveTheEvent(userId, eventId);
	}

	useEffect(() => {
		getUserJoinedEvents();
	}, [user?.createdEvents, user?.joinedEvents]);

	return (
		<Wrapper>
			<div className={styles.userProfileWrapper}>
				<Link to='#' onClick={() => navigate(-1)} className={styles.linkBack}>
					<FaAnglesLeft />
					Back
				</Link>
				<h3>Hi, {user?.firstName}</h3>
				<div className={styles.userInfoContainer}>
					<img
						src={user?.photo}
						alt='User profile photo'
						className={styles.userProfilePhoto}
					/>
					<div>
						<p>
							<span className={styles.textGray}>Name:</span> {user?.firstName}{' '}
							{user?.lastName}
						</p>
						<p>
							<span className={styles.textGray}>Age:</span> {user?.age}
						</p>
						<p>
							<span className={styles.textGray}>Email:</span> {user?.email}
						</p>
					</div>
				</div>
				<h3>Your upcoming events</h3>
				{userJoinedEvents.length === 0 && userCreatedEvents.length === 0 ? (
					<div className={styles.noEventsInfo}>
						<p>You don't have any active events yet</p>
						<Button
							to='/app/events'
							variant='primary'
							onClick={resetSelectedEvent}>
							Go to Events List
						</Button>
					</div>
				) : (
					<>
						<div className={styles.eventsContainer}>
							<p className={styles.eventsHeadingText}>Your created events</p>
							<ul className={styles.eventsList}>
								{userCreatedEvents.map((event) => (
									<div className={styles.eventItemContainer} key={event.id}>
										<EventItem event={event} />
										<button
											onClick={() => handleDeleteTheEvent(user!.id, event.id)}>
											<FaTrashCan className={styles.trashIcon} />
										</button>
									</div>
								))}
							</ul>
						</div>
						<div className={styles.eventsContainer}>
							<p className={styles.eventsHeadingText}>Your joined events</p>
							<ul className={styles.eventsList}>
								{userJoinedEvents.map((event) => (
									<div className={styles.eventItemContainer} key={event.id}>
										<EventItem event={event} />
										<button
											onClick={() => handleLeaveTheEvent(user!.id, event.id)}>
											<FaDoorOpen className={styles.trashIcon} />
										</button>
									</div>
								))}
							</ul>
						</div>
					</>
				)}
			</div>
		</Wrapper>
	);
}
