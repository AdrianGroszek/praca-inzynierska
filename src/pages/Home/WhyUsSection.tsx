import styles from './WhyUsSection.module.css';
import Button from '../../components/UI/Button';
import { FaUsers, FaComments, FaShieldHalved } from 'react-icons/fa6';
import { useAuth } from '../../context/AuthContext';

export default function WhyUsSection() {
	const { user } = useAuth();
	return (
		<section className={styles.wrapper}>
			<h3>
				Why <span>ActivityHub?</span>
			</h3>
			<ul className={styles.listItemContaine}>
				<li className={styles.listItem}>
					<div className={styles.iconContainer}>
						<FaUsers className={styles.icon} />
					</div>
					<div>
						<p className={styles.textBold}>User-Friendly</p>
						<p className={styles.textNormal}>
							Intuitive design makes it easy to navigate and find what you’re
							looking for.
						</p>
					</div>
				</li>
				<li className={styles.listItem}>
					<div className={styles.iconContainer}>
						<FaComments className={styles.icon} />
					</div>
					<div>
						<p className={styles.textBold}>Community-Focused</p>
						<p className={styles.textNormal}>
							Emphasizes connection and camaraderie among users.
						</p>
					</div>
				</li>
				<li className={styles.listItem}>
					<div className={styles.iconContainer}>
						<FaShieldHalved className={styles.icon} />
					</div>
					<div>
						<p className={styles.textBold}>Secure</p>
						<p className={styles.textNormal}>
							Your privacy and security are our top priorities.
						</p>
					</div>
				</li>
			</ul>
			<Button to={user ? '/app/courts' : '/login'} variant='primary'>
				{user ? 'Get Started' : 'Login to Start'}
			</Button>
		</section>
	);
}
