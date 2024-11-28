import { ComponentPropsWithoutRef } from 'react';
import styles from './CircleButton.module.css';
import { useCourts } from '../../context/courts-context';
import { useEvents } from '../../context/events-context';

type CircleButtonProps = {
	sizeWithPx: string;
	category: string;
	routePath: string;
} & ComponentPropsWithoutRef<'button'>;

export default function CircleButton({
	sizeWithPx,
	category,
	routePath,
	...props
}: CircleButtonProps) {
	const { filterCategory } = useCourts();
	const { eventFilterCategory } = useEvents();

	// Check if we are on courts route or events route
	const activeStyles = () => {
		if (routePath.includes('courts')) {
			return filterCategory === category ? styles.active : '';
		}
		if (routePath.includes('events')) {
			return eventFilterCategory === category ? styles.active : '';
		}
	};

	return (
		<button
			className={`${styles.circleBtn} ${activeStyles()}`}
			style={{ height: `${sizeWithPx}`, width: `${sizeWithPx}` }}
			{...props}></button>
	);
}
