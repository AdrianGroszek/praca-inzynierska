import { createContext, type ReactNode, useContext, useReducer } from 'react';
import { type EventType, events as initialEvents } from '../data/events';

type StateType = {
	events: EventType[];
	filteredEvents: EventType[];
	searchedEvents: EventType[];
	eventFilterCategory: string;
	selectedEvent: EventType | null;
	searchTerm: string;
};

const initialState: StateType = {
	events: initialEvents,
	filteredEvents: initialEvents,
	searchedEvents: initialEvents,
	eventFilterCategory: 'All',
	selectedEvent: null,
	searchTerm: '',
};

type EventsContextType = StateType & {
	selectEvent: (event: EventType) => void;
	filterEvents: (eventCategory: string) => void;
	resetSelectedEvent: () => void;
	createEvent: (newEvent: EventType) => void;
	joinTheEvent: (userId: string, eventId: string) => void;
	searchEventByLocation: (locationSlug: string) => void;
	leaveTheEvent: (userId: string, eventId: string) => void;
	deleteEvent: (eventId: string) => void;
};

const EventsContext = createContext<EventsContextType | null>(null);

export function useEvents() {
	const context = useContext(EventsContext);
	if (!context) {
		throw new Error('useEvents must be used with a EventsProvider');
	}
	return context;
}

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
	| DeleteEventAction;

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
		default:
			return state;
	}
}

export default function EventsContextProvider({
	children,
}: EventsContextProviderProps) {
	const [eventsState, dispatch] = useReducer(eventsReducer, initialState);

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
		createEvent(newEvent) {
			dispatch({ type: 'CREATE_EVENT', newEvent });
		},
		joinTheEvent(userId, eventId) {
			dispatch({
				type: 'JOIN_THE_EVENT',
				payload: { userId, eventId },
			});
		},
		searchEventByLocation(locationSlug) {
			dispatch({ type: 'SEARCH_EVENT_BY_LOCATION', locationSlug });
		},
		leaveTheEvent(userId, eventId) {
			dispatch({ type: 'LEAVE_THE_EVENT', payload: { userId, eventId } });
		},
		deleteEvent(eventId) {
			dispatch({ type: 'DELETE_EVENT', eventId });
		},
	};

	return (
		<EventsContext.Provider value={ctx}>{children}</EventsContext.Provider>
	);
}
