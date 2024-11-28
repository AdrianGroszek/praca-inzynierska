import FootballPitch2 from '../assets/football-pitch-2.jpg';
import FootballPitch3 from '../assets/football-pitch-3.jpg';
import FootballPitch7 from '../assets/football-pitch-7.jpg';
import FootballPitch6 from '../assets/football-pitch-6.jpg';
import VolleyballCourt1 from '../assets/volleyball-court-1.jpg';
import BasketballCourt8 from '../assets/basketball-court-8.jpg';
import BasketballCourt2 from '../assets/basketball-court-2.jpg';
import BasketballCourt9 from '../assets/basketball-court-9.jpg';
import BasketballCourt4 from '../assets/basketball-court-4.jpg';
import VolleyballCourt5 from '../assets/volleyball-court-5.jpg';
import TennisCourt1 from '../assets/tennis-court-1.jpg';
import TennisCourt4 from '../assets/tennis-court-4.jpg';

export type EventType = {
	id: string;
	createdBy: string;
	category: string;
	participants: string[];
	title: string;
	description: string;
	minAge: number;
	maxAge: number;
	location: string;
	coordinates: [number, number];
	courtId: string;
	photo: string;
	playerCount: number;
	isFree: boolean;
	eventTime: string;
	eventType: 'friendly' | 'tournament' | 'training';
	level: 'beginner' | 'intermediate' | 'advanced';
};

export const events: EventType[] = [
	{
		id: '1',
		createdBy: '1',
		category: 'Basketball',
		participants: ['1', '2', '3'],
		title: 'Basketball Tournament',
		description: 'Join us for an exciting basketball tournament!',
		minAge: 18,
		maxAge: 30,
		location: 'Gdynia, Agrestowa 34',
		coordinates: [54.6, 18.1],
		courtId: 'BB2',
		photo: BasketballCourt2,
		playerCount: 20,
		isFree: true,
		eventTime: '2024-08-15T18:00:00Z',
		eventType: 'tournament',
		level: 'intermediate',
	},
	{
		id: '2',
		createdBy: '2',
		category: 'Football',
		participants: ['2', '3', '4', '14'],
		title: 'Friendly Football Match',
		description: 'Come and play a friendly football match!',
		minAge: 16,
		maxAge: 25,
		location: 'Sopot, Kujawska 2',
		coordinates: [54.42, 18.5],
		courtId: 'FF3',
		photo: FootballPitch3,
		playerCount: 22,
		isFree: true,
		eventTime: '2024-08-20T16:00:00Z',
		eventType: 'friendly',
		level: 'beginner',
	},
	{
		id: '3',
		createdBy: '3',
		category: 'Volleyball',
		participants: ['3', '4', '5'],
		title: 'Volleyball Training',
		description: 'Join our volleyball training session!',
		minAge: 18,
		maxAge: 30,
		location: 'Gdańsk, Mieszczańska 9',
		coordinates: [54.25, 18.3],
		courtId: 'VB1',
		photo: VolleyballCourt1,
		playerCount: 12,
		isFree: true,
		eventTime: '2024-08-25T09:00:00Z',
		eventType: 'training',
		level: 'intermediate',
	},
	{
		id: '4',
		createdBy: '4',
		category: 'Basketball',
		participants: ['4', '5', '6'],
		title: 'Basketball Championship',
		description: 'Participate in our basketball championship!',
		minAge: 20,
		maxAge: 35,
		location: 'Gdynia, Fińska 15',
		coordinates: [54.55, 18.35],
		courtId: 'BB8',
		photo: BasketballCourt8,
		playerCount: 15,
		isFree: false,
		eventTime: '2024-09-05T18:00:00Z',
		eventType: 'tournament',
		level: 'advanced',
	},
	{
		id: '5',
		createdBy: '5',
		category: 'Football',
		participants: ['5', '6', '7', '16'],
		title: 'Football Training',
		description: 'Join our football training session!',
		minAge: 15,
		maxAge: 25,
		location: 'Gdańsk, Liliowa 9',
		coordinates: [54.37, 18.56],
		courtId: 'FF7',
		photo: FootballPitch7,
		playerCount: 20,
		isFree: false,
		eventTime: '2024-09-10T10:00:00Z',
		eventType: 'training',
		level: 'beginner',
	},
	{
		id: '14',
		createdBy: '11',
		category: 'Basketball',
		participants: ['14', '1', '2', '12', '20', '18'],
		title: 'Casual Basketball Game',
		description: 'Join us for a casual basketball game!',
		minAge: 16,
		maxAge: 30,
		location: 'Gdańsk, Astronomów 15',
		coordinates: [54.3518, 18.6466],
		courtId: 'BB4',
		photo: BasketballCourt4,
		playerCount: 6,
		isFree: false,
		eventTime: '2024-10-05T17:00:00Z',
		eventType: 'friendly',
		level: 'beginner',
	},
	{
		id: '6',
		createdBy: '6',
		category: 'Basketball',
		participants: ['6', '7', '8', '16'],
		title: 'Basketball League',
		description: 'Join our competitive basketball league!',
		minAge: 18,
		maxAge: 35,
		location: 'Sopot, Lipowa 3',
		coordinates: [54.8, 18.2],
		courtId: 'BB9',
		photo: BasketballCourt9,
		playerCount: 16,
		isFree: true,
		eventTime: '2024-09-15T19:00:00Z',
		eventType: 'tournament',
		level: 'advanced',
	},
	{
		id: '7',
		createdBy: '7',
		category: 'Volleyball',
		participants: ['7', '8', '9', '14', '19'],
		title: 'Beach Volleyball Game',
		description: 'Enjoy a game of beach volleyball by the seaside!',
		minAge: 18,
		maxAge: 30,
		location: 'Gdynia, Łosiowa 2',
		coordinates: [54.45, 18.4],
		courtId: 'VB5',
		photo: VolleyballCourt5,
		playerCount: 12,
		isFree: false,
		eventTime: '2024-09-20T16:00:00Z',
		eventType: 'friendly',
		level: 'intermediate',
	},
	{
		id: '8',
		createdBy: '8',
		category: 'Tennis',
		participants: ['8', '9', '10', '15', '20'],
		title: 'Tennis Tournament',
		description: 'Participate in our tennis tournament!',
		minAge: 16,
		maxAge: 30,
		location: 'Gdańsk, Motławska 41',
		coordinates: [54.45, 18.3],
		courtId: 'TC1',
		photo: TennisCourt1,
		playerCount: 8,
		isFree: true,
		eventTime: '2024-09-25T11:00:00Z',
		eventType: 'tournament',
		level: 'beginner',
	},
	{
		id: '9',
		createdBy: '9',
		category: 'Football',
		participants: ['9', '10', '1', '17', '18'],
		title: 'Local Football Match',
		description: 'Join us for a local football match!',
		minAge: 18,
		maxAge: 28,
		location: 'Gdynia, Dulina Aleksandra 12',
		coordinates: [54.7, 18.3],
		courtId: 'FF2',
		photo: FootballPitch2,
		playerCount: 22,
		isFree: false,
		eventTime: '2024-10-01T14:00:00Z',
		eventType: 'friendly',
		level: 'intermediate',
	},
	{
		id: '10',
		createdBy: '10',
		category: 'Basketball',
		participants: ['10', '1', '2', '18', '20'],
		title: 'Casual Basketball Game',
		description: 'Join us for a casual basketball game!',
		minAge: 16,
		maxAge: 30,
		location: 'Gdańsk, Astronomów 15',
		coordinates: [54.3518, 18.6466],
		courtId: 'BB4',
		photo: BasketballCourt4,
		playerCount: 10,
		isFree: false,
		eventTime: '2024-10-05T17:00:00Z',
		eventType: 'friendly',
		level: 'beginner',
	},
	{
		id: '11',
		createdBy: '11',
		category: 'Volleyball',
		participants: ['11', '2', '3'],
		title: 'Volleyball Tournament',
		description: 'Compete in our exciting volleyball tournament!',
		minAge: 18,
		maxAge: 35,
		location: 'Gdynia, Łosiowa 2',
		coordinates: [54.45, 18.4],
		courtId: 'VB5',
		photo: VolleyballCourt5,
		playerCount: 14,
		isFree: false,
		eventTime: '2024-10-10T18:00:00Z',
		eventType: 'tournament',
		level: 'advanced',
	},
	{
		id: '12',
		createdBy: '12',
		category: 'Tennis',
		participants: ['12', '4', '5'],
		title: 'Tennis Practice Session',
		description: 'Join our tennis practice session for improvement!',
		minAge: 16,
		maxAge: 25,
		location: 'Gdańsk, Magellana 18',
		coordinates: [54.2, 18.7],
		courtId: 'TC4',
		photo: TennisCourt4,
		playerCount: 4,
		isFree: false,
		eventTime: '2024-10-15T08:00:00Z',
		eventType: 'training',
		level: 'beginner',
	},
	{
		id: '13',
		createdBy: '13',
		category: 'Football',
		participants: ['13', '6', '7'],
		title: 'Football League Match',
		description: 'Compete in our football league match!',
		minAge: 18,
		maxAge: 35,
		location: 'Sopot, Marii Skłodowskiej Curie 3',
		coordinates: [54.45, 18.5],
		courtId: 'FF6',
		photo: FootballPitch6,
		playerCount: 22,
		isFree: true,
		eventTime: '2024-10-20T15:00:00Z',
		eventType: 'training',
		level: 'advanced',
	},
];