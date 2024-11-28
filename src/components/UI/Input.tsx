import { type ComponentPropsWithoutRef } from 'react';
import styles from './Input.module.css';

type InputProps = {
	id?: string;
	label?: string;
} & ComponentPropsWithoutRef<'input'>;

export default function Input({ label, id, ...props }: InputProps) {
	return (
		<div>
			<label htmlFor={id} className={styles.inputContainer}>
				<span>{label}</span>
				<input id={id} {...props} />
			</label>
		</div>
	);
}
