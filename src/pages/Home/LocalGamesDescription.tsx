import styles from './LocalGamesDescription.module.css';

import imgCardOne from '../../assets/3-cards-component-1.jpg';
import imgCardTwo from '../../assets/3-cards-component-2.jpg';
import imgCardThree from '../../assets/3-cards-component-3.jpg';

export default function LocalGamesDescription() {
	return (
		<section className={styles.descriptionSection}>
			<div className={styles.biggerContainer}>
				<h3>Discover Local Games</h3>
				<p>
					Whether you re into basketball, soccer, tennis, or any other sport,
					PlayConnect helps you find local games and events happening near you.
					Our easy-to-use interface lets you browse through a variety of sports
					activities and join the ones that suit your schedule and interests.
				</p>
			</div>
			<div className={styles.smallerContainer}>
				<div className={styles.threeImgContainer}>
					<img className={styles.imageOne} src={imgCardOne} alt='' />
					<img className={styles.imageTwo} src={imgCardTwo} alt='' />
					<img className={styles.imageThree} src={imgCardThree} alt='' />
				</div>
			</div>
		</section>
	);
}
