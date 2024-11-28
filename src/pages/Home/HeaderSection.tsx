import { FaAnglesDown } from 'react-icons/fa6';
import ImageSliderHeader from '../../components/ImageSliderHeader';
import Button from '../../components/UI/Button';
import styles from './HeaderSection.module.css';
import { useUserLogin } from '../../context/user-login-context';
import { users } from '../../data/users';

export default function HeaderSection() {
	const { login } = useUserLogin();
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
					<Button
						to='/app/courts'
						onClick={() => login(users[0])}
						variant='primary'>
						Get Started
					</Button>
				</div>
			</div>
			<div className={styles.mouseContainer}>
				<FaAnglesDown className={styles.mouseIcon} />
			</div>
		</section>
	);
}
