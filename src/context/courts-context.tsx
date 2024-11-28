import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useReducer,
} from 'react';
import { courtsService } from '../services/courts';
import { type CourtType } from '../data/courts';

type StateType = {
	courts: CourtType[];
	filteredCourts: CourtType[];
	searchedCourts: CourtType[];
	filterCategory: string;
	selectedCourt: CourtType | null;
};

const initialState: StateType = {
	courts: [],
	filteredCourts: [],
	searchedCourts: [],
	filterCategory: 'All',
	selectedCourt: null,
};

type CourtsContextType = StateType & {
	selectCourt: (court: CourtType) => void;
	filterCourts: (courtCategory: string) => void;
	resetSelectedCourt: () => void;
	searchCourtByLocation: (locationSlug: string) => void;
};

const CourtsContext = createContext<CourtsContextType | null>(null);

export function useCourts() {
	const context = useContext(CourtsContext);
	if (!context) {
		throw new Error('useCourts must be used with a CourtsProvider');
	}
	return context;
}

type CourtsContextProviderProps = {
	children: ReactNode;
};

type SelectCourtAction = {
	type: 'SELECT_COURT';
	court: CourtType;
};

type FilterCourtsCategoryAction = {
	type: 'FILTER_COURTS_CATEGORY';
	courtCategory: string;
};

type ResetSelectedCourtAction = {
	type: 'RESET_SELECTED_COURT';
};

type SearchCourtByLocationAction = {
	type: 'SEARCH_COURT_BY_LOCATION';
	locationSlug: string;
};

type SetCourtsAction = {
	type: 'SET_COURTS';
	courts: CourtType[];
};

type Action =
	| SelectCourtAction
	| FilterCourtsCategoryAction
	| ResetSelectedCourtAction
	| SearchCourtByLocationAction
	| SetCourtsAction;

function courtsReducer(state: StateType, action: Action): StateType {
	switch (action.type) {
		case 'SET_COURTS': {
			return {
				...state,
				courts: action.courts,
				filteredCourts: action.courts,
				searchedCourts: action.courts,
			};
		}
		case 'SELECT_COURT': {
			const newCourt = action.court;
			return { ...state, selectedCourt: newCourt };
		}
		case 'FILTER_COURTS_CATEGORY': {
			if (action.courtCategory === 'All') {
				return {
					...state,
					filterCategory: action.courtCategory,
					filteredCourts: state.courts,
					searchedCourts: state.courts,
				};
			}
			return {
				...state,
				filterCategory: action.courtCategory,
				filteredCourts: state.courts.filter((court) => {
					return court.category === action.courtCategory;
				}),
				searchedCourts: state.courts.filter((court) => {
					return court.category === action.courtCategory;
				}),
			};
		}
		case 'RESET_SELECTED_COURT': {
			return {
				...state,
				selectedCourt: null,
				filterCategory: 'All',
				filteredCourts: state.courts,
				searchedCourts: state.courts,
			};
		}
		case 'SEARCH_COURT_BY_LOCATION': {
			return {
				...state,
				searchedCourts: state.filteredCourts.filter((event) =>
					event.location
						.toLowerCase()
						.includes(action.locationSlug.toLowerCase())
				),
			};
		}

		default:
			return state;
	}
}

export default function CourtsContextProvider({
	children,
}: CourtsContextProviderProps) {
	const [courtsState, dispatch] = useReducer(courtsReducer, initialState);

	useEffect(() => {
		async function fetchCourts() {
			try {
				const courts = await courtsService.getAllCourts();
				dispatch({ type: 'SET_COURTS', courts });
			} catch (error) {
				console.error('Failed to fetch courts:', error);
			}
		}
		fetchCourts();
	}, []);

	const ctx: CourtsContextType = {
		courts: courtsState.courts,
		filteredCourts: courtsState.filteredCourts,
		filterCategory: courtsState.filterCategory,
		selectedCourt: courtsState.selectedCourt,
		searchedCourts: courtsState.searchedCourts,
		selectCourt(court) {
			dispatch({ type: 'SELECT_COURT', court });
		},
		filterCourts(courtCategory) {
			dispatch({ type: 'FILTER_COURTS_CATEGORY', courtCategory });
		},
		resetSelectedCourt() {
			dispatch({ type: 'RESET_SELECTED_COURT' });
		},
		searchCourtByLocation(locationSlug) {
			dispatch({ type: 'SEARCH_COURT_BY_LOCATION', locationSlug });
		},
	};

	return (
		<CourtsContext.Provider value={ctx}>{children}</CourtsContext.Provider>
	);
}
