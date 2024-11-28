export type Profile = {
	id: string;
	first_name: string;
	last_name: string;
	age: number | null;
	photo: string | null;
	created_events?: string[];
	joined_events?: string[];
	// email: string;
	// password: string;
};

export type UserContextType = {
	profile: Profile | null;
	loading: boolean;
	updateProfile: (updates: Partial<Profile>) => Promise<void>;
	joinEvent: (eventId: string) => Promise<void>;
	leaveEvent: (eventId: string) => Promise<void>;
	addCreatedEvent: (eventId: string) => Promise<void>;
};
