import { supabase } from '../lib/supabase';
import { EventType } from '../data/events';

export const eventsService = {
	async getAllEvents() {
		const { data, error } = await supabase
			.from('events')
			.select('*')
			.order('created_at', { ascending: false });

		if (error) throw error;
		return data as EventType[];
	},

	async getEventById(id: string) {
		const { data, error } = await supabase
			.from('events')
			.select('*')
			.eq('id', id)
			.single();

		if (error) throw error;
		if (!data) throw new Error('Event not found');
		return data as EventType;
	},

	async createEvent(event: Omit<EventType, 'id' | 'created_at'>) {
		const { data, error } = await supabase
			.from('events')
			.insert([event])
			.select()
			.single();

		if (error) throw error;
		return data as EventType;
	},

	async joinEvent(eventId: string, userId: string) {
		const { data: event } = await supabase // Popraw pobranie eventu
			.from('events')
			.select('participants')
			.eq('id', eventId)
			.single();

		if (!event) throw new Error('Event not found');

		const { error } = await supabase
			.from('events')
			.update({
				participants: [...event.participants, userId],
			})
			.eq('id', eventId);

		if (error) throw error;
	},

	async leaveEvent(eventId: string, userId: string) {
		const event = await this.getEventById(eventId);

		const { error } = await supabase
			.from('events')
			.update({
				participants: event.participants.filter((id) => id !== userId),
			})
			.eq('id', eventId);

		if (error) throw error;
	},

	async deleteEvent(eventId: string) {
		const { error } = await supabase.from('events').delete().eq('id', eventId);

		if (error) throw error;
	},
};
