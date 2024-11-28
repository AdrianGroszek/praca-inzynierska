import styles from './WhyUsSection.module.css';
import { users } from '../../data/users';

import Button from '../../components/UI/Button';

import { FaUsers } from 'react-icons/fa6';
import { FaComments } from 'react-icons/fa6';
import { FaShieldHalved } from 'react-icons/fa6';
import { useUserLogin } from '../../context/user-login-context';

export default function WhyUsSection() {
	const { login } = useUserLogin();
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
			<Button
				to='/app/courts'
				onClick={() => login(users[0])}
				variant='primary'>
				Get Started
			</Button>
		</section>
	);
}
