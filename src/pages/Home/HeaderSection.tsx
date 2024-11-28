import { FaAnglesDown } from 'react-icons/fa6';
import ImageSliderHeader from '../../components/ImageSliderHeader';
import Button from '../../components/UI/Button';
import styles from './HeaderSection.module.css';
import { useAuth } from '../../context/AuthContext';

export default function HeaderSection() {
	const { user } = useAuth();
	return (
		<section className={styles.headerSection}>
			<div className={styles.smallerContainer}>
				<ImageSliderHeader />
			</div>
			<div className={styles.biggerContainer}>
				<h2>
					<span>ActivityHub</span> The Ultimate Sports Community!
				</h2>
				<p>
					Are you a sports enthusiast looking for a community to share your
					passion with? PlayConnect is the perfect platform for you! Our web
					application brings together sports lovers from all walks of life,
					allowing you to create and join sports events effortlessly.
				</p>
				<div className={styles.headerBtnContainer}>
					<Button to={user ? '/app/courts' : '/login'} variant='primary'>
						{user ? 'Get Started' : 'Login to Start'}
					</Button>
				</div>
			</div>
			<div className={styles.mouseContainer}>
				<FaAnglesDown className={styles.mouseIcon} />
			</div>
		</section>
	);
}
