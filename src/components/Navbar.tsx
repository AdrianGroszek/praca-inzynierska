import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import Button from './UI/Button';
import { useUserLogin } from '../context/user-login-context';
import UserProfileNav from './UserProfileNav';
import { FaAnglesLeft } from 'react-icons/fa6';
import { useEffect, useState } from 'react';

export default function Navbar() {
	const { user, login, logout } = useUserLogin();
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
	const location = useLocation();

	useEffect(() => {
		setIsMobileNavOpen(false);
	}, [location]);

	return (
		<>
			<div className={isMobileNavOpen ? styles.opacityDiv : ''}></div>
			<nav className={styles.navbar}>
				<Link to='/' onClick={logout} className={styles.logo}>
					ActivityHub
				</Link>
				<div className={styles.linksContainer}>
					{!user ? (
						<>
							{' '}
							<ul className={styles.linksList}>
								<li>
									<NavLink
										to='/'
										className={({ isActive }) =>
											isActive ? `${styles.active}` : ''
										}>
										Home
									</NavLink>
								</li>
								<li>
									<NavLink
										to='/news'
										className={({ isActive }) =>
											isActive ? `${styles.active}` : ''
										}>
										News
									</NavLink>
								</li>
								<li>
									<NavLink
										to='/help'
										className={({ isActive }) =>
											isActive ? `${styles.active}` : ''
										}>
										Help
									</NavLink>
								</li>
							</ul>
							<div className={styles.btnContainer}>
								<Button variant='secondary' to='/register'>
									Sing Up
								</Button>
								<Button to='/login' variant='primary'>
									Login
								</Button>
							</div>
						</>
					) : (
						<UserProfileNav />
					)}
				</div>
				<button
					className={styles.mobileNavOpenBtn}
					onClick={() => setIsMobileNavOpen((prev) => !prev)}>
					<FaAnglesLeft
						className={styles.mobileNavOpenBtnIcon}
						style={isMobileNavOpen ? { rotate: '180deg' } : {}}
					/>
				</button>
				<div
					className={styles.mobileNavigation}
					style={isMobileNavOpen ? { right: '0' } : {}}>
					<ul className={styles.mobileLinksList}>
						<li>
							<NavLink
								to='/'
								className={({ isActive }) =>
									isActive ? `${styles.mobileActive}` : ''
								}>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/news'
								className={({ isActive }) =>
									isActive ? `${styles.mobileActive}` : ''
								}>
								News
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/help'
								className={({ isActive }) =>
									isActive ? `${styles.mobileActive}` : ''
								}>
								Help
							</NavLink>
						</li>
					</ul>
					<div className={styles.mobileBtnContainer}>
						{!user ? (
							<>
								<Button variant='secondary' to='/register'>
									Sing Up
								</Button>
								<Button
									style={{ textAlign: 'center' }}
									to='/login'
									variant='primary'>
									Login
								</Button>
							</>
						) : (
							<>
								<Button variant='secondary' to='/app/courts'>
									Courts
								</Button>
								<Button variant='secondary' to='/app/events'>
									Events
								</Button>
								<UserProfileNav />
							</>
						)}
					</div>
				</div>
			</nav>
		</>
	);
}
