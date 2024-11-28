import styles from './AppPage.module.css';

import Wrapper from '../components/UI/Wrapper';
import FilterComponent from '../components/appFutures/filter/FilterComponent';

import Map from '../components/UI/Map';

import CourtsComponent from '../components/appFutures/courts/CourtsComponent';
import { Outlet, useLocation } from 'react-router-dom';
import { useCourts } from '../context/courts-context';
import { useEvents } from '../context/events-context';
import { useEffect, useState } from 'react';
import CreateEvent from './CreateEvent';

export default function AppPage() {
	const { selectedCourt } = useCourts();
	const { selectedEvent } = useEvents();
	const [isSelected, setIsSelected] = useState(false);
	const [isUrlPathNameCreate, setIsUrlPathNameCreate] = useState(false);
	const location = useLocation();

	useEffect(() => {
		if (location.pathname.split('/')[2] === 'create') {
			setIsUrlPathNameCreate(true);
		} else {
			setIsUrlPathNameCreate(false);
		}
	}, [location]);

	useEffect(() => {
		if (selectedCourt || selectedEvent) {
			setIsSelected(true);
		} else {
			setIsSelected(false);
		}
	}, [isSelected, selectedCourt, selectedEvent]);

	return (
		<Wrapper>
			{isUrlPathNameCreate ? (
				<CreateEvent />
			) : (
				<div className={styles.sectionsWrapper}>
					<>
						<section className={styles.appFilterSectionLeft}>
							<FilterComponent />
							<CourtsComponent />
						</section>
						{location.pathname.split('/')[2] === 'courts' && (
							<section className={styles.appDetailsSectionRight}>
								<div
									className={
										selectedCourt
											? styles.mapWrapperHalf
											: styles.mapWrapperFull
									}>
									<Map />
									<Outlet />
								</div>
							</section>
						)}
						{location.pathname.split('/')[2] === 'events' && (
							<section className={styles.appDetailsSectionRight}>
								<div
									className={
										selectedEvent
											? styles.mapWrapperHalf
											: styles.mapWrapperFull
									}>
									<Map />
									<Outlet />
								</div>
							</section>
						)}
					</>
				</div>
			)}
		</Wrapper>
	);
}
