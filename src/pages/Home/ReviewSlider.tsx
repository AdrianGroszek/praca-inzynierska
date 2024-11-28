import { useState } from 'react';
import ReviewItem from './ReviewItem';
import styles from './ReviewSlider.module.css';

import { FaAngleLeft } from 'react-icons/fa6';
import { FaAngleRight } from 'react-icons/fa6';

import reviewImgOne from '../../assets/review-img-1.jpg';
import reviewImgTwo from '../../assets/review-img-2.jpg';
import reviewImgThree from '../../assets/review-img-3.jpeg';
import reviewImgFour from '../../assets/review-img-4.webp';
import reviewImgFive from '../../assets/review-img-5.webp';

export type ReviewItem = {
	starsNum: number;
	username: string;
	userSport: string;
	description: string;
	image: string;
};

const reviewData: ReviewItem[] = [
	{
		starsNum: 5,
		username: 'Josh Morland',
		userSport: 'football',
		description:
			'ActivityHub has completely transformed how I stay active and social. Creating events is a breeze, and the interactive map feature makes finding the best spots so easy. I ve met so many great people through this app. Highly recommend it!',
		image: reviewImgOne,
	},
	{
		starsNum: 5,
		username: 'Emily Johnson',
		userSport: 'basketball',
		description:
			'ActivityHub has revolutionized my fitness journey. The workout plans are tailored to my needs, and the community support keeps me motivated. I love tracking my progress and sharing milestones with friends. This app is a game-changer for anyone serious about their health!',
		image: reviewImgTwo,
	},
	{
		starsNum: 4,
		username: 'Michael Smith',
		userSport: 'tenis',
		description:
			'ActivityHub is a must-have for any culinary enthusiast. The recipe recommendations are spot-on, and the ability to create and share custom meal plans is fantastic. I ve discovered so many new dishes and met fellow food lovers. Highly recommend for foodies!',
		image: reviewImgThree,
	},
	{
		starsNum: 5,
		username: 'Sarah Williams',
		userSport: 'football',
		description:
			'ActivityHub has rekindled my love for reading. The personalized book suggestions are always on point, and the virtual book clubs are a great way to discuss and share thoughts with fellow readers. I ve discovered so many new authors and genres. Highly recommend for book lovers!',
		image: reviewImgFour,
	},
	{
		starsNum: 4,
		username: 'David Brown',
		userSport: 'volleyball',
		description:
			'ActivityHub has completely transformed how I stay active and social. Creating events is a breeze, and the interactive map feature makes finding the best spots so easy. I ve met so many great people through this app. Highly recommend it!',
		image: reviewImgFive,
	},
];

export default function ReviewSlider() {
	const [listItemPosition, setListItemPositon] = useState<number>(0);

	function handleNext() {
		if (listItemPosition === 400) {
			setListItemPositon(0);
		} else {
			setListItemPositon((curItem) => curItem + 100);
		}
	}

	function handlePrev() {
		if (listItemPosition === 0) {
			setListItemPositon(400);
		} else {
			setListItemPositon((curItem) => curItem - 100);
		}
	}

	return (
		<div className={styles.slider}>
			<ul className={styles.slide}>
				{reviewData.map((item, index) => (
					<li
						key={index}
						className={styles.slideItem}
						style={{ right: `${listItemPosition}%` }}>
						<ReviewItem item={item} key={index} />
					</li>
				))}
			</ul>
			<div className={styles.btnContainer}>
				<button className={styles.btn} onClick={handlePrev}>
					<FaAngleLeft />
				</button>
				<button className={styles.btn} onClick={handleNext}>
					<FaAngleRight />
				</button>
			</div>
		</div>
	);
}
