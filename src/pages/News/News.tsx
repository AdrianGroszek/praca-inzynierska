import styles from './News.module.css';

import newsImgOne from '../../assets/news-page-1.jpg';
import newsImgTwo from '../../assets/news-page-2.jpg';
import newsImgThree from '../../assets/news-page-3.jpg';
import newsImgFour from '../../assets/news-page-4.jpg';

type NewsContent = {
	subtitle: string;
	text: string;
};

type NewsTypes = {
	image: string;
	newsTitle: string;
	newsContent: NewsContent[];
};

const newsDummyData: NewsTypes[] = [
	{
		image: newsImgOne,
		newsTitle: 'Latest Announcements',
		newsContent: [
			{
				subtitle: 'New Sports Added to ActivityHub!',
				text: 'We re thrilled to announce the addition of several new sports to our platform, including badminton, volleyball, and ultimate frisbee. Now you have even more options to stay active and connect with fellow enthusiasts. Check out the Events page to find or create games in these new categories!',
			},
			{
				subtitle: 'Mobile App Coming Soon',
				text: 'Good news for on-the-go users! Our team is working hard on the ActivityHub mobile app, set to launch next month. With the app, you’ll be able to manage your events, track your progress, and connect with friends anytime, anywhere. Stay tuned for more updates.',
			},
		],
	},
	{
		image: newsImgTwo,
		newsTitle: 'Community Highlights',
		newsContent: [
			{
				subtitle: 'User Spotlight: Jane’s Journey to Fitness',
				text: 'Meet Jane, a dedicated ActivityHub user who has transformed her fitness routine with our platform. From organizing weekly soccer matches to joining local tennis games, Jane shares her inspiring story of how ActivityHub has helped her stay active and meet new friends. Read more about Jane s journey and tips for staying motivated.',
			},
			{
				subtitle: 'Top 5 Most Popular Events of the Month',
				text: 'Curious about what events are trending? Here’s a roundup of the top five most popular events hosted on ActivityHub this month. From intense basketball tournaments to fun-filled community soccer matches, see what’s been bringing people together and get inspired to join or create your own events.',
			},
		],
	},
	{
		image: newsImgThree,
		newsTitle: 'Tips & Guides',
		newsContent: [
			{
				subtitle: 'How to Maximize Your Event Participation',
				text: 'Looking to increase turnout for your events? Check out our latest guide on effective event promotion. Learn strategies for spreading the word, engaging participants, and creating memorable experiences that keep people coming back.',
			},
			{
				subtitle: 'Staying Safe While Playing Sports',
				text: 'Your safety is our priority. Read our comprehensive guide on staying safe while participating in sports activities. From proper warm-ups and hydration tips to COVID-19 guidelines, ensure you and your teammates stay healthy and safe.',
			},
		],
	},
	{
		image: newsImgFour,
		newsTitle: 'Upcoming Events',
		newsContent: [
			{
				subtitle: 'Community Sports Day',
				text: 'Join us for our annual Community Sports Day! A fun-filled day with various sports activities, games, and competitions for all ages. Meet fellow sports enthusiasts, enjoy friendly matches, and win exciting prizes. Mark your calendar and don t miss out!',
			},
			{
				subtitle: 'Summer Soccer League Registration Open',
				text: 'Get ready for the summer soccer league! Registration is now open for teams and individual players. Compete in weekly matches, improve your skills, and enjoy the thrill of the game. Sign up now and be part of the action!',
			},
		],
	},
];

export default function News() {
	return (
		<section>
			<ul className={styles.newsList}>
				{newsDummyData.map((item, index) => (
					<li className={styles.newsItem} key={index}>
						<img src={item.image} alt={item.newsTitle} />
						<div className={styles.textContainer}>
							<h3 className={styles.titleText}>{item.newsTitle}</h3>
							{item.newsContent.map((el, index) => (
								<div className={styles.articleTextContainer} key={index}>
									<p className={styles.subtitleText}>{el.subtitle}</p>
									<p className={styles.articleText}>{el.text}</p>
								</div>
							))}
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}
