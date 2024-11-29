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
		console.log('Starting joinEvent with:', { eventId, userId });

		// Pobierz aktualny stan eventu
		const { data: event, error: fetchError } = await supabase
			.from('events')
			.select('participants')
			.eq('id', eventId)
			.single();

		console.log('Current event state:', event);
		console.log('Fetch error:', fetchError);

		if (fetchError) throw fetchError;
		if (!event) throw new Error('Event not found');

		// Przygotuj nową tablicę uczestników
		const updatedParticipants = Array.isArray(event.participants)
			? [...event.participants, userId]
			: [userId];

		console.log('Updated participants array:', updatedParticipants);

		// Wykonaj aktualizację
		const { data: updateResult, error: updateError } = await supabase
			.from('events')
			.update({ participants: updatedParticipants })
			.eq('id', eventId)
			.select();

		console.log('Update result:', updateResult);
		console.log('Update error:', updateError);

		if (updateError) throw updateError;

		// Sprawdź stan po aktualizacji
		const { data: checkEvent } = await supabase
			.from('events')
			.select('participants')
			.eq('id', eventId)
			.single();

		console.log('Event state after update:', checkEvent);

		return { success: true };
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
		// Najpierw pobierz event, aby sprawdzić uczestników
		const { data: event, error: fetchError } = await supabase
			.from('events')
			.select('participants, created_by')
			.eq('id', eventId)
			.single();

		if (fetchError) throw fetchError;
		if (!event) throw new Error('Event not found');

		// Sprawdź czy w evencie są inni uczestnicy oprócz twórcy
		const otherParticipants = event.participants.filter(
			(participantId: string) => participantId !== event.created_by
		);

		if (otherParticipants.length > 0) {
			throw new Error('Cannot delete event with other participants');
		}

		// Jeśli nie ma innych uczestników, usuń event
		const { error: deleteError } = await supabase
			.from('events')
			.delete()
			.eq('id', eventId);

		if (deleteError) throw deleteError;
	},
};
