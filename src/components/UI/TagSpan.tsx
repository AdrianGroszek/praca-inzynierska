import { type ReactNode } from 'react';
import styles from './TagSpan.module.css';

type TagSpanProps = {
	textColor: string;
	bgColor: string;
	children: ReactNode;
};

export default function TagSpan({
	textColor,
	bgColor,
	children,
}: TagSpanProps) {
	return (
		<span
			className={styles.tagSpan}
			style={{
				color: textColor,
				backgroundColor: bgColor,
				borderColor: textColor,
			}}>
			{children}
		</span>
	);
}
