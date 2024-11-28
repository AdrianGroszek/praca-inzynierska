import { useEffect, useState } from 'react';
import Wrapper from '../components/UI/Wrapper';
import { useEvents } from '../context/events-context';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
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
	const { user } = useAuth();
	const { profile } = useUser();
	const { events, leaveTheEvent, deleteEvent, resetSelectedEvent } =
		useEvents();
	const navigate = useNavigate();

	const [userJoinedEvents, setUserJoinedEvents] = useState<EventType[]>([]);
	const [userCreatedEvents, setUserCreatedEvents] = useState<EventType[]>([]);

	useEffect(() => {
		if (!profile) return;

		const createdEvents = profile.created_events || [];
		const joinedEvents = (profile.joined_events || []).filter(
			(el) => !createdEvents.includes(el)
		);

		const createdEventsObj = events.filter((event) =>
			createdEvents.includes(event.id)
		);

		const joinedEventsObj = events.filter((event) =>
			joinedEvents.includes(event.id)
		);

		setUserCreatedEvents(createdEventsObj);
		setUserJoinedEvents(joinedEventsObj);
	}, [profile?.created_events, profile?.joined_events, events]);

	async function handleLeaveTheEvent(eventId: string) {
		if (!user) return;

		try {
			await leaveTheEvent(user.id, eventId);
			toast.success('You left the event');
		} catch (error) {
			console.error('Error leaving event:', error);
			toast.error('Failed to leave the event');
		}
	}

	async function handleDeleteTheEvent(eventId: string) {
		if (!user) return;

		try {
			await deleteEvent(eventId);
			await leaveTheEvent(user.id, eventId);
			toast.success('Successfully deleted event');
		} catch (error) {
			console.error('Error deleting event:', error);
			toast.error('Failed to delete the event');
		}
	}

	if (!user || !profile) return null;

	return (
		<Wrapper>
			<div className={styles.userProfileWrapper}>
				<Link to='#' onClick={() => navigate(-1)} className={styles.linkBack}>
					<FaAnglesLeft />
					Back
				</Link>
				<h3>Hi, {profile.first_name}</h3>
				<div className={styles.userInfoContainer}>
					<img
						src={profile.photo || '/default-avatar.png'}
						alt='User profile photo'
						className={styles.userProfilePhoto}
					/>
					<div>
						<p>
							<span className={styles.textGray}>Name:</span>{' '}
							{profile.first_name} {profile.last_name}
						</p>
						<p>
							<span className={styles.textGray}>Age:</span> {profile.age}
						</p>
						<p>
							<span className={styles.textGray}>Email:</span> {user.email}
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
										<button onClick={() => handleDeleteTheEvent(event.id)}>
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
										<button onClick={() => handleLeaveTheEvent(event.id)}>
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
