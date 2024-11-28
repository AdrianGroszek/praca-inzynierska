import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import styles from './Auth.module.css';

export const LoginForm = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			const { error } = await supabase.auth.signInWithPassword({
				email: formData.email,
				password: formData.password,
			});

			if (error) throw error;
			navigate('/app/courts'); // Przekieruj po zalogowaniu
		} catch (error) {
			setError((error as Error).message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<h2 className={styles.title}>Zaloguj się do swojego konta</h2>
				<form className={styles.form} onSubmit={handleSubmit}>
					{error && <div className={styles.error}>{error}</div>}

					<div className={styles.inputGroup}>
						<input
							name='email'
							type='email'
							required
							value={formData.email}
							onChange={handleChange}
							className={styles.input}
							placeholder='Adres email'
						/>
					</div>

					<div className={styles.inputGroup}>
						<input
							name='password'
							type='password'
							required
							value={formData.password}
							onChange={handleChange}
							className={styles.input}
							placeholder='Hasło'
						/>
					</div>

					<button type='submit' disabled={loading} className={styles.button}>
						{loading ? 'Logowanie...' : 'Zaloguj się'}
					</button>
				</form>

				<button onClick={() => navigate('/register')} className={styles.link}>
					Nie masz konta? Zarejestruj się
				</button>
			</div>
		</div>
	);
};
