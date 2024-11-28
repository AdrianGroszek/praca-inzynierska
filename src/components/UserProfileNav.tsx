import styles from './UserProfileNav.module.css';
import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { supabase } from '../lib/supabase';

export default function UserProfileNav() {
	// const { user } = useAuth();
	const { profile } = useUser();

	const handleLogout = async () => {
		try {
			await supabase.auth.signOut();
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};

	if (!profile) return null;

	return (
		<div className={styles.userProfileContainer}>
			<Link to='/app/user' className={styles.profileBtn}>
				<img
					src={profile.photo || '/default-avatar.png'} // Dodaj domyślne zdjęcie
					alt='user profile picture'
				/>
				<p>{profile.first_name}</p>
			</Link>

			<Link to='/' onClick={handleLogout} className={styles.logoutBtn}>
				logout
			</Link>
		</div>
	);
}
