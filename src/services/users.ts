import { supabase } from '../lib/supabase';
import { type Profile } from '../data/user';

export const usersService = {
	async getProfile(userId: string) {
		const { data, error } = await supabase
			.from('profiles')
			.select('*')
			.eq('id', userId)
			.single();

		if (error) throw error;
		return data as Profile;
	},

	async updateProfile(userId: string, updates: Partial<Profile>) {
		const { data, error } = await supabase
			.from('profiles')
			.update(updates)
			.eq('id', userId)
			.select()
			.single();

		if (error) throw error;
		return data as Profile;
	},

	async joinEvent(userId: string, eventId: string) {
		const { data: profile } = await supabase
			.from('profiles')
			.select('joined_events')
			.eq('id', userId)
			.single();

		if (!profile) throw new Error('Profile not found');

		const { error } = await supabase
			.from('profiles')
			.update({
				joined_events: [...(profile.joined_events || []), eventId],
			})
			.eq('id', userId);

		if (error) throw error;
	},

	async leaveEvent(userId: string, eventId: string) {
		const { data: profile } = await supabase
			.from('profiles')
			.select('joined_events')
			.eq('id', userId)
			.single();

		if (!profile) throw new Error('Profile not found');

		const { error } = await supabase
			.from('profiles')
			.update({
				joined_events: profile.joined_events.filter(
					(id: string) => id !== eventId
				),
			})
			.eq('id', userId);

		if (error) throw error;
	},

	async addCreatedEvent(userId: string, eventId: string) {
		const { data: profile } = await supabase
			.from('profiles')
			.select('created_events')
			.eq('id', userId)
			.single();

		if (!profile) throw new Error('Profile not found');

		const { error } = await supabase
			.from('profiles')
			.update({
				created_events: [...(profile.created_events || []), eventId],
			})
			.eq('id', userId);

		if (error) throw error;
	},

	async getPlayersByIds(playerIds: string[]) {
		const { data, error } = await supabase
			.from('profiles')
			.select('*')
			.in('id', playerIds);

		if (error) throw error;
		return data as Profile[];
	},

	async getPlayerById(playerId: string) {
		const { data, error } = await supabase
			.from('profiles')
			.select('*')
			.eq('id', playerId)
			.single();

		if (error) throw error;
		return data as Profile;
	},

	async updateUserEvents(
		userId: string,
		eventId: string,
		type: 'join' | 'leave' | 'create'
	) {
		const { data: profile } = await supabase
			.from('profiles')
			.select('created_events, joined_events')
			.eq('id', userId)
			.single();

		if (!profile) throw new Error('Profile not found');

		const created_events: string[] = profile.created_events || [];
		const joined_events: string[] = profile.joined_events || [];

		let updatedCreatedEvents = [...created_events];
		let updatedJoinedEvents = [...joined_events];

		switch (type) {
			case 'create':
				updatedCreatedEvents = [...created_events, eventId];
				break;
			case 'join':
				updatedJoinedEvents = [...joined_events, eventId];
				break;
			case 'leave':
				updatedJoinedEvents = joined_events.filter(
					(id: string) => id !== eventId
				);
				updatedCreatedEvents = created_events.filter(
					(id: string) => id !== eventId
				);
				break;
		}

		const { error } = await supabase
			.from('profiles')
			.update({
				created_events: updatedCreatedEvents,
				joined_events: updatedJoinedEvents,
			})
			.eq('id', userId);

		if (error) throw error;
	},
};
