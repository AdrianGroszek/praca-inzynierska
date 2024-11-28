import styles from './ReviewSlider.module.css';

import { type ReviewItem as ReviewItemType } from './ReviewSlider';

import { FaStar } from 'react-icons/fa6';

type ReviewItemProps = {
	item: ReviewItemType;
};

export default function ReviewItem({ item }: ReviewItemProps) {
	return (
		<>
			<div>
				<p className={styles.reviewText}>{item.description}</p>
			</div>
			<div className={styles.userInfoContainer}>
				<div className={styles.userInfo}>
					<img src={item.image} alt='' className={styles.userImg} />
					<div className={styles.userInfoDetails}>
						<p className={styles.textBig}>{item.username}</p>
						<p className={styles.textSmall}>{item.userSport} player</p>
					</div>
				</div>
				<div className={styles.starsContainer}>
					{Array.from({ length: item.starsNum }, (_, index) => {
						return <FaStar className={styles.star} key={index} />;
					})}
				</div>
			</div>
		</>
	);
}
