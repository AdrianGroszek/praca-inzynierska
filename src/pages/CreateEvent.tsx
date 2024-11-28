import styles from './CreateEvent.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import Wrapper from '../components/UI/Wrapper';
import Input from '../components/UI/Input';
import { useCourts } from '../context/courts-context';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ChangeEvent, FormEvent, useState } from 'react';
import { type CourtType } from '../data/courts';
import { v4 as uuidv4 } from 'uuid';
import { EventType } from '../data/events';
import { useEvents } from '../context/events-context';
import { Link, useNavigate } from 'react-router-dom';
import { pl } from 'date-fns/locale';
import { FaAnglesLeft } from 'react-icons/fa6';
import TagSpan from '../components/UI/TagSpan';
import { getHours, getMinutes, setHours, setMinutes } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import toast from 'react-hot-toast';

registerLocale('pl', pl);

type SelectEventTypeType = 'friendly' | 'tournament' | 'training';
type SelectLevelType = 'beginner' | 'intermediate' | 'advanced';

export default function CreateEvent() {
	const navigate = useNavigate();
	const { courts } = useCourts();
	const { user } = useAuth();
	const { profile } = useUser();
	const { createEvent, selectEvent } = useEvents();

	const [selectedCourt, setSelectedCourt] = useState<CourtType | undefined>(
		undefined
	);
	const [eventTitle, setEventTitle] = useState('');
	const [eventDescription, setEventDescription] = useState('');
	const [eventType, setEventType] = useState<SelectEventTypeType>('friendly');
	const [playersLevel, setPlayersLevel] = useState<SelectLevelType>('beginner');
	const [minAge, setMinAge] = useState('');
	const [maxAge, setMaxAge] = useState('');
	const [playersNumber, setPlayersNumber] = useState('');
	const [selectedDate, setSelectedDate] = useState<Date | null>(
		setMinutes(
			new Date(),
			getMinutes(new Date()) < 30 && getMinutes(new Date()) > 0 ? 30 : 0
		)
	);

	const minTime: Date =
		selectedDate && selectedDate.toDateString() === new Date().toDateString()
			? setHours(
					setMinutes(new Date(), getMinutes(new Date())),
					getHours(new Date())
			  )
			: setHours(setMinutes(new Date(), 0), 0);

	const maxTime: Date = setHours(setMinutes(new Date(), 59), 23);

	function handleCourtSelect(event: ChangeEvent<HTMLSelectElement>) {
		const tempCourt = courts.find((court) => court.id === event.target.value);
		setSelectedCourt(tempCourt);
	}

	function handleSelectDate(date: Date | null) {
		if (!date) return;
		setSelectedDate(date);
	}

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!user || !profile || !selectedCourt || !selectedDate) return;

		try {
			const newEvent: Omit<EventType, 'created_at'> = {
				id: uuidv4(),
				created_by: user.id,
				category: selectedCourt.category,
				participants: [user.id],
				title: eventTitle,
				description: eventDescription,
				min_age: +minAge,
				max_age: +maxAge,
				location: selectedCourt.location,
				coordinates: selectedCourt.coordinates,
				court_id: selectedCourt.id,
				photo: selectedCourt.photos[0],
				player_count: +playersNumber,
				is_free: selectedCourt.is_free,
				event_time: selectedDate.toISOString(),
				event_type: eventType,
				level: playersLevel,
			};

			await createEvent(newEvent);
			selectEvent(newEvent);
			toast.success('Event created successfully!');
			navigate(`/app/events/${newEvent.id}`);
		} catch (error) {
			console.error('Error creating event:', error);
			toast.error('Failed to create event');
		}
	}

	return (
		<Wrapper>
			<form onSubmit={handleSubmit} className={styles.createForm}>
				<Link to='#' onClick={() => navigate(-1)} className={styles.linkBack}>
					<FaAnglesLeft />
					Back
				</Link>
				<h1>Create New Event</h1>
				{selectedCourt && (
					<div className={styles.topSelectedCourtView}>
						<img src={selectedCourt.photos[0]} alt='' />
						<div>
							{selectedCourt.is_free ? (
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
				)}
				<div>
					<label className={styles.selectLabel}>
						Court:
						<select onChange={handleCourtSelect} required>
							<option value=''>Select a court</option>
							{courts.map((court) => (
								<option key={court.id} value={court.id}>
									{court.name}, {court.location}, ({court.category})
								</option>
							))}
						</select>
					</label>
				</div>
				<Input
					value={eventTitle}
					onChange={(e) => setEventTitle(e.target.value)}
					type='text'
					label='Event title'
					id='event-title'
					required
				/>
				<div>
					<label>
						<span className={styles.selectLabel}>Description:</span>
						<textarea
							className={styles.textArea}
							value={eventDescription}
							onChange={(e) => setEventDescription(e.target.value)}
							maxLength={200}
							required
						/>
					</label>
				</div>
				<div>
					<label className={styles.selectLabel}>
						Type:
						<select
							value={eventType}
							onChange={(e) =>
								setEventType(e.target.value as SelectEventTypeType)
							}
							required>
							<option value='friendly'>Friendly</option>
							<option value='tournament'>Tournament</option>
							<option value='training'>Training</option>
						</select>
					</label>
				</div>
				<div>
					<label className={styles.selectLabel}>
						Level:
						<select
							value={playersLevel}
							onChange={(e) =>
								setPlayersLevel(e.target.value as SelectLevelType)
							}
							required>
							<option value='beginner'>Beginner</option>
							<option value='intermediate'>Intermediate</option>
							<option value='advanced'>Advanced</option>
						</select>
					</label>
				</div>
				<div className={styles.twoInputsContainer}>
					<Input
						value={minAge}
						onChange={(e) => setMinAge(e.target.value)}
						type='number'
						label='Min-age'
						id='min-age'
						min={0}
						required
					/>
					<Input
						value={maxAge}
						onChange={(e) => setMaxAge(e.target.value)}
						type='number'
						label='Max-age'
						id='max-age'
						min={profile?.age ?? 0}
						max={99}
						required
					/>
				</div>
				<Input
					value={playersNumber}
					onChange={(e) => setPlayersNumber(e.target.value)}
					type='number'
					id='players-num'
					min={2}
					label='Number of players'
					required
				/>
				<div className={styles.datePickerContainer}>
					<span className={styles.selectLabel}>Select date</span>

					<DatePicker
						selected={selectedDate}
						onChange={handleSelectDate}
						dateFormat='dd/MM/yyyy; HH:mm'
						showTimeSelect
						timeIntervals={30}
						timeFormat='HH:mm'
						locale='pl'
						required
						minDate={new Date()}
						minTime={minTime}
						maxTime={maxTime}
					/>
				</div>

				<button className={styles.createBtn}>Create Event</button>
			</form>
		</Wrapper>
	);
}
