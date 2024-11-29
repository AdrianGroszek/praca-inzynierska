import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { usersService } from '../services/users';
import type { Profile, UserContextType } from '../data/user';

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
	const { user } = useAuth();
	const [profile, setProfile] = useState<Profile | null>(null);
	const [loading, setLoading] = useState(true);

	const refreshProfile = async () => {
		if (!user) return;
		try {
			const userProfile = await usersService.getProfile(user.id);
			setProfile(userProfile);
		} catch (error) {
			console.error('Error refreshing profile:', error);
		}
	};

	useEffect(() => {
		async function loadProfile() {
			try {
				if (user) {
					const userProfile = await usersService.getProfile(user.id);
					setProfile(userProfile);
				} else {
					setProfile(null);
				}
			} catch (error) {
				console.error('Error loading profile:', error);
			} finally {
				setLoading(false);
			}
		}

		loadProfile();
	}, [user]);

	async function updateProfile(updates: Partial<Profile>) {
		if (!user) throw new Error('No user logged in');

		const updatedProfile = await usersService.updateProfile(user.id, updates);
		setProfile(updatedProfile);
	}

	async function joinEvent(eventId: string) {
		if (!user) throw new Error('No user logged in');

		await usersService.joinEvent(user.id, eventId);
		if (profile) {
			setProfile({
				...profile,
				joined_events: [...(profile.joined_events || []), eventId],
			});
		}
	}

	async function leaveEvent(eventId: string) {
		if (!user) throw new Error('No user logged in');

		await usersService.leaveEvent(user.id, eventId);
		if (profile) {
			setProfile({
				...profile,
				joined_events: (profile.joined_events || []).filter(
					(id) => id !== eventId
				),
			});
		}
	}

	async function addCreatedEvent(eventId: string) {
		if (!user) throw new Error('No user logged in');

		await usersService.addCreatedEvent(user.id, eventId);
		if (profile) {
			setProfile({
				...profile,
				created_events: [...(profile.created_events || []), eventId],
				joined_events: [...(profile.joined_events || []), eventId],
			});
		}
	}

	return (
		<UserContext.Provider
			value={{
				profile,
				loading,
				updateProfile,
				joinEvent,
				leaveEvent,
				addCreatedEvent,
				refreshProfile,
			}}>
			{children}
		</UserContext.Provider>
	);
}

export function useUser() {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
}
