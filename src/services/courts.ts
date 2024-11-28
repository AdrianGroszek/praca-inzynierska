import { supabase } from '../lib/supabase';
import { CourtType } from '../data/courts';

export const courtsService = {
	async getAllCourts() {
		const { data, error } = await supabase
			.from('courts')
			.select('*')
			.order('name');

		if (error) throw error;
		return data as CourtType[];
	},

	async getCourtById(id: string) {
		const { data, error } = await supabase
			.from('courts')
			.select('*')
			.eq('id', id)
			.single();

		if (error) throw error;
		if (!data) throw new Error('Court not found');
		return data as CourtType;
	},

	async createCourt(court: Omit<CourtType, 'id'>) {
		const { data, error } = await supabase
			.from('courts')
			.insert([court])
			.select()
			.single();

		if (error) throw error;
		return data as CourtType;
	},

	async updateCourt(id: string, court: Partial<CourtType>) {
		const { data, error } = await supabase
			.from('courts')
			.update(court)
			.eq('id', id)
			.select()
			.single();

		if (error) throw error;
		return data as CourtType;
	},

	async deleteCourt(id: string) {
		const { error } = await supabase.from('courts').delete().eq('id', id);

		if (error) throw error;
	},
};
