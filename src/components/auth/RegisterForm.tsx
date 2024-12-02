import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import styles from './Auth.module.css';

export const RegisterForm = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		age: '',
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
			// Rejestracja użytkownika
			const { error: signUpError, data } = await supabase.auth.signUp({
				email: formData.email,
				password: formData.password,
			});

			if (signUpError) throw signUpError;

			// Aktualizacja profilu
			if (data.user) {
				const { error: profileError } = await supabase
					.from('profiles')
					.update({
						first_name: formData.firstName,
						last_name: formData.lastName,
						age: parseInt(formData.age),
						photo:
							'https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png',
					})
					.eq('id', data.user.id);

				if (profileError) throw profileError;
			}

			const { error: signInError } = await supabase.auth.signInWithPassword({
				email: formData.email,
				password: formData.password,
			});

			if (signInError) throw signInError;

			// Przekierowanie do aplikacji
			navigate('/app/courts');

			// navigate('/login');
		} catch (error) {
			setError((error as Error).message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.box}>
				<h2 className={styles.title}>Zarejestruj nowe konto</h2>
				<form className={styles.form} onSubmit={handleSubmit}>
					{error && <div className={styles.error}>{error}</div>}

					<div className={styles.inputGroup}>
						<input
							name='firstName'
							type='text'
							required
							value={formData.firstName}
							onChange={handleChange}
							className={styles.input}
							placeholder='Imię'
						/>
					</div>

					<div className={styles.inputGroup}>
						<input
							name='lastName'
							type='text'
							required
							value={formData.lastName}
							onChange={handleChange}
							className={styles.input}
							placeholder='Nazwisko'
						/>
					</div>

					<div className={styles.inputGroup}>
						<input
							name='age'
							type='number'
							required
							value={formData.age}
							onChange={handleChange}
							className={styles.input}
							placeholder='Wiek'
						/>
					</div>

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
						{loading ? 'Rejestracja...' : 'Zarejestruj się'}
					</button>
				</form>

				<button onClick={() => navigate('/login')} className={styles.link}>
					Masz już konto? Zaloguj się
				</button>
			</div>
		</div>
	);
};
