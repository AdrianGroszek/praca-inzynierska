import styles from './ReviewSection.module.css';

import ReviewSlider from './ReviewSlider';

export default function ReviewSection() {
	return (
		<section className={styles.reviewsSection}>
			<h3>
				Over <span>500k+</span> people trust us
			</h3>
			<ReviewSlider />
		</section>
	);
}
