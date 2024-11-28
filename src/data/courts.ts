import BasketballCourt1 from '../assets/basketball-court-1.jpg';
import BasketballCourt2 from '../assets/basketball-court-2.jpg';
import BasketballCourt3 from '../assets/basketball-court-3.jpg';
import BasketballCourt4 from '../assets/basketball-court-4.jpg';
import BasketballCourt5 from '../assets/basketball-court-5.jpg';
import BasketballCourt6 from '../assets/basketball-court-6.jpg';
import BasketballCourt7 from '../assets/basketball-court-7.jpg';
import BasketballCourt8 from '../assets/basketball-court-8.jpg';
import BasketballCourt9 from '../assets/basketball-court-9.jpg';

import FootballPitch1 from '../assets/football-pitch-1.jpg';
import FootballPitch2 from '../assets/football-pitch-2.jpg';
import FootballPitch3 from '../assets/football-pitch-3.jpg';
import FootballPitch4 from '../assets/football-pitch-4.jpg';
import FootballPitch5 from '../assets/football-pitch-5.jpg';
import FootballPitch6 from '../assets/football-pitch-6.jpg';
import FootballPitch7 from '../assets/football-pitch-7.jpg';
import FootballPitch8 from '../assets/football-pitch-8.jpg';

import VolleyballCourt1 from '../assets/volleyball-court-1.jpg';
import VolleyballCourt2 from '../assets/volleyball-court-2.jpg';
import VolleyballCourt3 from '../assets/volleyball-court-3.jpg';
import VolleyballCourt4 from '../assets/volleyball-court-4.jpg';
import VolleyballCourt5 from '../assets/volleyball-court-5.jpg';

import TennisCourt1 from '../assets/tennis-court-1.jpg';
import TennisCourt2 from '../assets/tennis-court-2.jpg';
import TennisCourt3 from '../assets/tennis-court-3.jpg';
import TennisCourt4 from '../assets/tennis-court-4.jpg';

export type CourtType = {
	id: string;
	name: string;
	capacity: number;
	location: string;
	isFree: boolean;
	photos: string[];
	category: string;
	courtDescription: string;
	coordinates: [number, number];
};

export const courts: CourtType[] = [
	// Basketball Courts
	{
		id: 'BB1',
		name: 'Baltic Basket Arena',
		capacity: 10,
		location: 'Gdańsk, Antoniego Abrahama 3',
		isFree: true,
		photos: [BasketballCourt1],
		category: 'Basketball',
		courtDescription:
			'Outdoor basketball court located near the park, providing a scenic environment for games. The court is well-maintained with modern hoops and a smooth surface, making it ideal for both casual and competitive play.',
		coordinates: [54.35, 18.6],
	},
	{
		id: 'FF5',
		name: 'Seaside Soccer Grounds',
		capacity: 22,
		location: 'Gdynia, Afrodyty 14',
		isFree: true,
		photos: [FootballPitch5],
		category: 'Football',
		courtDescription:
			'Community football field surrounded by greenery, providing a peaceful environment for players. The field is regularly maintained and features good quality grass and goals.',
		coordinates: [54.5, 18.5],
	},
	{
		id: 'BB2',
		name: 'Neptunes Court',
		capacity: 10,
		location: 'Gdynia, Agrestowa 34',
		isFree: true,
		photos: [BasketballCourt2],
		category: 'Basketball',
		courtDescription:
			'Modern basketball court with night lighting, allowing for games to be played after dark. The court features high-quality flooring and is located in a vibrant area, attracting many local basketball enthusiasts.',
		coordinates: [54.6, 18.1],
	},
	// s
	{
		id: 'VB2',
		name: 'Amber Spike Court',
		capacity: 12,
		location: 'Gdynia, Al. Zwycięstwa 4',
		isFree: false,
		photos: [VolleyballCourt2],
		category: 'Volleyball',
		courtDescription:
			'Modern indoor volleyball court in a sports hall, featuring professional-grade flooring and nets. Ideal for both casual games and competitive matches, with ample seating for spectators.',
		coordinates: [54.5, 18.44],
	},
	{
		id: 'BB3',
		name: 'Solidarity Hoops',
		capacity: 10,
		location: 'Sopot, Boczna 1',
		isFree: false,
		photos: [BasketballCourt3],
		category: 'Basketball',
		courtDescription:
			'Indoor basketball court in the sports center, equipped with state-of-the-art facilities. Perfect for training sessions and competitive matches. The court offers a comfortable environment with seating for spectators.',
		coordinates: [54.435, 18.53],
	},
	{
		id: 'BB4',
		name: 'Sea Breeze Court',
		capacity: 10,
		location: 'Gdańsk, Astronomów 15',
		isFree: false,
		photos: [BasketballCourt4],
		category: 'Basketball',
		courtDescription:
			'Newly renovated outdoor basketball court featuring high-quality materials and a vibrant design. The court is ideal for community events and local tournaments, offering a great atmosphere for players and fans alike.',
		coordinates: [54.3518, 18.6466],
	},
	{
		id: 'BB5',
		name: 'Amber Slam',
		capacity: 10,
		location: 'Gdynia, Borowikowa 6',
		isFree: true,
		photos: [BasketballCourt5],
		category: 'Basketball',
		courtDescription:
			'Basketball court in a quiet neighborhood, providing a peaceful environment for practice and games. The court is surrounded by trees and offers a great place for both serious players and families.',
		coordinates: [54.75, 18.3],
	},
	{
		id: 'BB6',
		name: 'Coastal Hoop Haven',
		capacity: 10,
		location: 'Sopot, Helska 13',
		isFree: true,
		photos: [BasketballCourt6],
		category: 'Basketball',
		courtDescription:
			'Spacious outdoor basketball court located near the beach, combining sport with leisure. The court is popular among tourists and locals, providing a fun and energetic atmosphere for basketball enthusiasts.',
		coordinates: [54.65, 18.0],
	},
	{
		id: 'FF1',
		name: 'Baltic Goal Park',
		capacity: 22,
		location: 'Gdańsk, Jana Dantyszka 12',
		isFree: true,
		photos: [FootballPitch1],
		category: 'Football',
		courtDescription:
			'Expansive football field located in a popular sports park. The field features high-quality grass and modern goals, making it suitable for both amateur and professional matches.',
		coordinates: [54.3958, 18.5704],
	},
	{
		id: 'FF2',
		name: 'Freedom Field',
		capacity: 12,
		location: 'Gdynia, Dulina Aleksandra 12',
		isFree: false,
		photos: [FootballPitch2],
		category: 'Football',
		courtDescription:
			'Well-equipped football field with artificial turf, providing an excellent playing surface all year round. The field is often used for local league games and training sessions.',
		coordinates: [54.7, 18.3],
	},
	{
		id: 'FF3',
		name: 'Coastal Kick Arena',
		capacity: 12,
		location: 'Sopot, Kujawska 2',
		isFree: true,
		photos: [FootballPitch3],
		category: 'Football',
		courtDescription:
			'Picturesque football field near the coast, offering stunning views and a refreshing atmosphere. The field is well-maintained and provides a great venue for friendly matches and tournaments.',
		coordinates: [54.42, 18.5],
	},
	{
		id: 'BB7',
		name: 'Tri-City Dunk Zone',
		capacity: 10,
		location: 'Gdańsk, Handlowa 22',
		isFree: false,
		photos: [BasketballCourt7],
		category: 'Basketball',
		courtDescription:
			'Large indoor basketball court in a modern sports complex. The court is equipped with professional-grade flooring and hoops, making it ideal for high-level competitions and training sessions.',
		coordinates: [54.3601, 18.63],
	},
	{
		id: 'BB8',
		name: 'Pierfront Court',
		capacity: 6,
		location: 'Gdynia, Fińska 15',
		isFree: false,
		photos: [BasketballCourt8],
		category: 'Basketball',
		courtDescription:
			'Well-maintained outdoor basketball court located in a central area of the city. The court features a smooth playing surface and is a popular spot for both organized games and casual play.',
		coordinates: [54.55, 18.35],
	},
	{
		id: 'BB9',
		name: 'Maritime Basketball Grounds',
		capacity: 10,
		location: 'Sopot, Lipowa 3',
		isFree: true,
		photos: [BasketballCourt9],
		category: 'Basketball',
		courtDescription:
			'Cozy indoor basketball court located in a community center. Ideal for local teams and recreational players, the court provides a friendly environment with adequate seating for spectators.',
		coordinates: [54.8, 18.2],
	},

	{
		id: 'FF4',
		name: 'Neptunes Pitch',
		capacity: 22,
		location: 'Gdańsk, Jana Pawła II 5',
		isFree: false,
		photos: [FootballPitch4],
		category: 'Football',
		courtDescription:
			'Large football field in a state-of-the-art sports complex. The field is equipped with modern amenities and seating for spectators, making it perfect for large events and competitive matches.',
		coordinates: [54.4, 18.6],
	},
	{
		id: 'FF6',
		name: 'Amber Field',
		capacity: 22,
		location: 'Sopot, Marii Skłodowskiej Curie 3',
		isFree: true,
		photos: [FootballPitch6],
		category: 'Football',
		courtDescription:
			'Compact football field located in a residential area, offering a convenient place for local teams to practice and play. The field has good lighting, allowing for evening games.',
		coordinates: [54.45, 18.5],
	},
	{
		id: 'VB3',
		name: 'Coastal Volley Zone',
		capacity: 12,
		location: 'Sopot, Tenisowa 12',
		isFree: true,
		photos: [VolleyballCourt3],
		category: 'Volleyball',
		courtDescription:
			'Well-maintained outdoor volleyball court in a park setting. The court provides a relaxing atmosphere for players and is popular for both friendly matches and local tournaments.',
		coordinates: [54.6, 17.8],
	},
	{
		id: 'VB4',
		name: 'Neptunes Net',
		capacity: 12,
		location: 'Gdańsk, Kapitańska 32',
		isFree: true,
		photos: [VolleyballCourt4],
		category: 'Volleyball',
		courtDescription:
			'Spacious indoor volleyball court in a modern facility. The court is equipped with high-quality nets and flooring, making it suitable for competitive play. The venue also offers locker rooms and seating for fans.',
		coordinates: [54.2, 18.7],
	},
	{
		id: 'FF7',
		name: 'Gdynia Goal Grounds',
		capacity: 22,
		location: 'Gdańsk, Liliowa 9',
		isFree: false,
		photos: [FootballPitch7],
		category: 'Football',
		courtDescription:
			'Modern football field with excellent facilities, including locker rooms and a viewing gallery. The field is used for both local and regional tournaments, providing a professional playing environment.',
		coordinates: [54.37, 18.56],
	},
	{
		id: 'FF8',
		name: 'Tri-City Football Park',
		capacity: 12,
		location: 'Gdynia, Kaczewska 5',
		isFree: true,
		photos: [FootballPitch8],
		category: 'Football',
		courtDescription:
			'Spacious football field with natural grass, located in a sports complex. The field is well-kept and features high-quality goals and markings, suitable for competitive matches and training.',
		coordinates: [54.55, 18.53],
	},

	{
		id: 'TC3',
		name: 'Neptunes Tennis Grounds',
		capacity: 4,
		location: 'Sopot, Zbigniewa Herberta 2',
		isFree: true,
		photos: [TennisCourt3],
		category: 'Tennis',
		courtDescription:
			'Beautiful outdoor tennis court with a grass surface, located near the beach. The court is popular among tourists and locals, offering a great place for relaxing games with a view.',
		coordinates: [54.45, 18.3],
	},
	{
		id: 'TC4',
		name: 'Seaside Swing Courts',
		capacity: 2,
		location: 'Gdańsk, Magellana 18',
		isFree: false,
		photos: [TennisCourt4],
		category: 'Tennis',
		courtDescription:
			'Well-equipped indoor tennis court with a synthetic surface, located in a modern sports facility. The court provides excellent playing conditions and is available for both private lessons and competitive matches.',
		coordinates: [54.2, 18.4],
	},
	{
		id: 'VB1',
		name: 'Baltic Volley Beach',
		capacity: 12,
		location: 'Gdańsk, Mieszczańska 9',
		isFree: true,
		photos: [VolleyballCourt1],
		category: 'Volleyball',
		courtDescription:
			'Outdoor volleyball court with high-quality sand, located near the beach. The court offers a great place for beach volleyball enthusiasts and is equipped with sturdy nets and boundary lines.',
		coordinates: [54.25, 18.3],
	},
	{
		id: 'VB5',
		name: 'Seaside Serve Arena',
		capacity: 12,
		location: 'Gdynia, Łosiowa 2',
		isFree: false,
		photos: [VolleyballCourt5],
		category: 'Volleyball',
		courtDescription:
			'Outdoor volleyball court located in a bustling area, attracting many local players. The court features high-quality sand and sturdy nets, providing a great venue for beach volleyball games.',
		coordinates: [54.45, 18.4],
	},
	{
		id: 'TC1',
		name: 'Baltic Tennis Club',
		capacity: 2,
		location: 'Gdańsk, Motławska 41',
		isFree: true,
		photos: [TennisCourt1],
		category: 'Tennis',
		courtDescription:
			'Outdoor tennis court with well-maintained clay surface. The court is located in a scenic area, offering a perfect environment for both casual play and serious matches.',
		coordinates: [54.45, 18.3],
	},
	{
		id: 'TC2',
		name: 'Amber Ace Courts',
		capacity: 2,
		location: 'Gdynia, Krzysztofa Klenczona 1',
		isFree: false,
		photos: [TennisCourt2],
		category: 'Tennis',
		courtDescription:
			'Indoor tennis court in a sports complex, featuring a hard surface and professional-grade nets. Ideal for all-weather play, the court offers a comfortable environment for players.',
		coordinates: [54.5196, 18.5312],
	},
];
