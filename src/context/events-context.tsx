import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useReducer,
} from 'react';
import { type EventType } from '../data/events';
import { supabase } from '../lib/supabase';
import { usersService } from '../services/users';
import { useUser } from './UserContext';
import { eventsService } from '../services/events';
import toast from 'react-hot-toast';

type StateType = {
	events: EventType[];
	filteredEvents: EventType[];
	searchedEvents: EventType[];
	eventFilterCategory: string;
	selectedEvent: EventType | null;
	searchTerm: string;
};

const initialState: StateType = {
	events: [],
	filteredEvents: [],
	searchedEvents: [],
	eventFilterCategory: 'All',
	selectedEvent: null,
	searchTerm: '',
};

type EventsContextType = StateType & {
	selectEvent: (event: EventType) => void;
	filterEvents: (eventCategory: string) => void;
	resetSelectedEvent: () => void;
	createEvent: (newEvent: EventType) => Promise<void>;
	joinTheEvent: (userId: string, eventId: string) => Promise<void>;
	searchEventByLocation: (locationSlug: string) => void;
	leaveTheEvent: (userId: string, eventId: string) => Promise<void>;
	deleteEvent: (eventId: string) => Promise<void>;
};

const EventsContext = createContext<EventsContextType | null>(null);

export function useEvents() {
	const context = useContext(EventsContext);
	if (!context) {
		throw new Error('useEvents must be used with a EventsProvider');
	}
	return context;
}

type SetEventsAction = {
	type: 'SET_EVENTS';
	events: EventType[];
};

type EventsContextProviderProps = {
	children: ReactNode;
};

type SelectEventAction = {
	type: 'SELECT_EVENT';
	event: EventType;
};

type FilterEventsCategoryAction = {
	type: 'FILTER_EVENTS_CATEGORY';
	eventCategory: string;
};

type ResetSelectedEventAction = {
	type: 'RESET_SELECTED_EVENT';
};

type CreateEventAction = {
	type: 'CREATE_EVENT';
	newEvent: EventType;
};

type JoinTheEventAction = {
	type: 'JOIN_THE_EVENT';
	payload: {
		userId: string;
		eventId: string;
	};
};

type SearchEventByLocationAction = {
	type: 'SEARCH_EVENT_BY_LOCATION';
	locationSlug: string;
};

type LeaveTheEventAction = {
	type: 'LEAVE_THE_EVENT';
	payload: {
		userId: string;
		eventId: string;
	};
};

type DeleteEventAction = {
	type: 'DELETE_EVENT';
	eventId: string;
};

type Action =
	| SelectEventAction
	| FilterEventsCategoryAction
	| ResetSelectedEventAction
	| CreateEventAction
	| JoinTheEventAction
	| SearchEventByLocationAction
	| LeaveTheEventAction
	| DeleteEventAction
	| SetEventsAction;

function eventsReducer(state: StateType, action: Action): StateType {
	switch (action.type) {
		case 'SELECT_EVENT': {
			const newEvent = action.event;
			return { ...state, selectedEvent: newEvent };
		}
		case 'FILTER_EVENTS_CATEGORY': {
			if (action.eventCategory === 'All') {
				return {
					...state,
					eventFilterCategory: action.eventCategory,
					filteredEvents: state.events,
					searchedEvents: state.events,
				};
			}
			return {
				...state,
				eventFilterCategory: action.eventCategory,
				filteredEvents: state.events.filter((event) => {
					return event.category === action.eventCategory;
				}),
				searchedEvents: state.events.filter((event) => {
					return event.category === action.eventCategory;
				}),
			};
		}
		case 'RESET_SELECTED_EVENT': {
			return {
				...state,
				selectedEvent: null,
				eventFilterCategory: 'All',
				filteredEvents: state.events,
				searchedEvents: state.events,
				searchTerm: '',
			};
		}
		case 'CREATE_EVENT': {
			return {
				...state,
				events: [action.newEvent, ...state.events],
				filteredEvents: [action.newEvent, ...state.events],
				searchedEvents: [action.newEvent, ...state.events],
			};
		}
		case 'JOIN_THE_EVENT': {
			const { eventId, userId } = action.payload;
			const updatedEvents = state.events.map((event) =>
				event.id === eventId
					? { ...event, participants: [userId, ...event.participants] }
					: event
			);
			const filtered =
				state.eventFilterCategory === 'All'
					? updatedEvents
					: updatedEvents.filter(
							(event) => event.category === state.eventFilterCategory
					  );
			const updatedSelectedEvent =
				state.selectedEvent && state.selectedEvent.id === eventId
					? {
							...state.selectedEvent,
							participants: [...state.selectedEvent.participants, userId],
					  }
					: state.selectedEvent;

			return {
				...state,
				events: updatedEvents,
				filteredEvents: filtered,
				searchedEvents: filtered.filter((event) =>
					event.location.toLowerCase().includes(state.searchTerm)
				),
				selectedEvent: updatedSelectedEvent,
			};
		}
		case 'LEAVE_THE_EVENT': {
			const { eventId, userId } = action.payload;
			const updatedEvents = state.events.map((event) =>
				event.id === eventId
					? {
							...event,
							participants: event.participants.filter((id) => id !== userId),
					  }
					: event
			);
			const filtered =
				state.eventFilterCategory === 'All'
					? updatedEvents
					: updatedEvents.filter(
							(event) => event.category === state.eventFilterCategory
					  );
			const updatedSelectedEvent =
				state.selectedEvent && state.selectedEvent.id === eventId
					? {
							...state.selectedEvent,
							participants: state.selectedEvent.participants.filter(
								(id) => id !== userId
							),
					  }
					: state.selectedEvent;

			return {
				...state,
				events: updatedEvents,
				filteredEvents: filtered,
				searchedEvents: filtered.filter((event) =>
					event.location.toLowerCase().includes(state.searchTerm)
				),
				selectedEvent: updatedSelectedEvent,
			};
		}
		case 'DELETE_EVENT': {
			const updatedEvents = state.events.filter(
				(event) => event.id !== action.eventId
			);

			const filtered =
				state.eventFilterCategory === 'All'
					? updatedEvents
					: updatedEvents.filter(
							(event) => event.category === state.eventFilterCategory
					  );
			const updatedSelectedEvent =
				state.selectedEvent && state.selectedEvent.id === action.eventId
					? null
					: state.selectedEvent;
			return {
				...state,
				events: updatedEvents,
				filteredEvents: filtered,
				searchedEvents: filtered.filter((event) =>
					event.location.toLowerCase().includes(state.searchTerm)
				),
				selectedEvent: updatedSelectedEvent,
			};
		}
		case 'SEARCH_EVENT_BY_LOCATION': {
			return {
				...state,
				searchedEvents: state.filteredEvents.filter((event) =>
					event.location
						.toLowerCase()
						.includes(action.locationSlug.toLowerCase())
				),
				searchTerm: action.locationSlug.toLowerCase(),
			};
		}
		case 'SET_EVENTS': {
			return {
				...state,
				events: action.events,
				filteredEvents: action.events,
				searchedEvents: action.events,
			};
		}
		default:
			return state;
	}
}

export default function EventsContextProvider({
	children,
}: EventsContextProviderProps) {
	const [eventsState, dispatch] = useReducer(eventsReducer, initialState);
	const { refreshProfile } = useUser();

	async function refreshEvents() {
		const { data, error } = await supabase
			.from('events')
			.select('*')
			.order('event_time', { ascending: true });

		if (error) throw error;
		dispatch({ type: 'SET_EVENTS', events: data || [] });
	}

	useEffect(() => {
		async function fetchEvents() {
			try {
				const { data, error } = await supabase
					.from('events')
					.select('*')
					.order('event_time', { ascending: true });

				if (error) throw error;
				dispatch({ type: 'SET_EVENTS', events: data });
			} catch (error) {
				console.error('Failed to fetch events:', error);
			}
		}
		fetchEvents();
	}, []);

	const ctx: EventsContextType = {
		events: eventsState.events,
		filteredEvents: eventsState.filteredEvents,
		eventFilterCategory: eventsState.eventFilterCategory,
		selectedEvent: eventsState.selectedEvent,
		searchedEvents: eventsState.searchedEvents,
		searchTerm: eventsState.searchTerm,

		selectEvent(event) {
			dispatch({ type: 'SELECT_EVENT', event });
		},

		filterEvents(eventCategory) {
			dispatch({ type: 'FILTER_EVENTS_CATEGORY', eventCategory });
		},

		resetSelectedEvent() {
			dispatch({ type: 'RESET_SELECTED_EVENT' });
		},

		async createEvent(newEvent) {
			try {
				const { error } = await supabase.from('events').insert([newEvent]);
				if (error) throw error;

				await usersService.updateUserEvents(
					newEvent.created_by,
					newEvent.id,
					'create'
				);

				await refreshProfile();
				await refreshEvents();
			} catch (error) {
				console.error('Failed to create event:', error);
				throw error;
			}
		},

		async joinTheEvent(userId, eventId) {
			try {
				// Najpierw zaktualizuj event
				await eventsService.joinEvent(eventId, userId);

				// Potem zaktualizuj profil użytkownika
				await usersService.updateUserEvents(userId, eventId, 'join');

				// Odśwież dane
				await refreshProfile();
				await refreshEvents();
			} catch (error) {
				console.error('Failed to join event:', error);
				throw error;
			}
		},

		searchEventByLocation(locationSlug) {
			dispatch({ type: 'SEARCH_EVENT_BY_LOCATION', locationSlug });
		},

		async leaveTheEvent(userId, eventId) {
			try {
				const event = eventsState.events.find((event) => event.id === eventId);
				if (!event) throw new Error('Event not found');

				const updatedEvent = {
					...event,
					participants: event.participants.filter((id) => id !== userId),
				};

				const { error } = await supabase
					.from('events')
					.update({ participants: updatedEvent.participants })
					.eq('id', eventId);

				if (error) throw error;

				await usersService.updateUserEvents(userId, eventId, 'leave');
				await refreshProfile();
				await refreshEvents();
			} catch (error) {
				console.error('Failed to leave event:', error);
				throw error;
			}
		},

		async deleteEvent(eventId) {
			try {
				await eventsService.deleteEvent(eventId);
				await refreshEvents();
				await refreshProfile();
			} catch (error) {
				if (
					error instanceof Error &&
					error.message === 'Cannot delete event with other participants'
				) {
					toast.error(
						'Cannot delete event while other participants are still joined'
					);
				} else {
					console.error('Failed to delete event:', error);
					toast.error('Failed to delete event');
				}
				throw error;
			}
		},
	};

	return (
		<EventsContext.Provider value={ctx}>{children}</EventsContext.Provider>
	);
}
