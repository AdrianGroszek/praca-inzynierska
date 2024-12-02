import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

import styles from './Map.module.css';

import basketballIcon from '../../assets/basketball-map-icon.png';
import footballIcon from '../../assets/football-ball-map-icon.png';
import tennisBallIcon from '../../assets/tennisball-map-icon.png';
import voleyballIcon from '../../assets/volleyball-map-icon.png';

import { Link, useLocation } from 'react-router-dom';
import { useCourts } from '../../context/courts-context';
import { useEffect, useState } from 'react';
import { useEvents } from '../../context/events-context';

const mapApiKey = import.meta.env.VITE_MAP_API_KEY;

type lIconType = {
	iconUrl: string;
	iconSize: [number, number];
	iconAnchor: [number, number];
	popupAnchor: [number, number];
	shadowSize: [number, number];
};

const customIconBasketball: L.Icon<lIconType> = new L.Icon({
	iconUrl: basketballIcon,
	iconSize: [29, 29],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

const customIconFootball: L.Icon<lIconType> = new L.Icon({
	iconUrl: footballIcon,
	iconSize: [29, 29],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

const customIconVolleyball: L.Icon<lIconType> = new L.Icon({
	iconUrl: voleyballIcon,
	iconSize: [29, 29],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

const customIconTennis: L.Icon<lIconType> = new L.Icon({
	iconUrl: tennisBallIcon,
	iconSize: [29, 29],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

const selectSportIcon = (
	courtCategory: string
): L.Icon<lIconType> | undefined => {
	if (courtCategory === 'Basketball') {
		return customIconBasketball;
	}
	if (courtCategory === 'Football') {
		return customIconFootball;
	}
	if (courtCategory === 'Volleyball') {
		return customIconVolleyball;
	}
	if (courtCategory === 'Tennis') {
		return customIconTennis;
	}
};

export default function Map() {
	const { filteredCourts, selectCourt, selectedCourt, filterCategory } =
		useCourts();
	const { filteredEvents, selectEvent, selectedEvent, eventFilterCategory } =
		useEvents();
	const location = useLocation();
	const [mapCenter, setMapCenter] = useState<[number, number]>([54.5, 18.6]);
	const [mapZoom, setMapZoom] = useState<number>(10);

	const urlPathSlug: string = location.pathname.split('/')[2];

	useEffect(() => {
		setMapZoom(12);
		if (location.pathname.includes('courts') && selectedCourt) {
			setMapCenter(selectedCourt.coordinates);
		}
		if (location.pathname.includes('events') && selectedEvent) {
			setMapCenter(selectedEvent.coordinates);
		}
	}, [selectedCourt, selectedEvent, location]);

	useEffect(() => {
		setMapZoom(10);
		setMapCenter([54.5, 18.6]);
	}, [filterCategory, eventFilterCategory, urlPathSlug]);

	// Map for courts route
	if (location.pathname.includes('courts')) {
		return (
			<MapContainer
				center={mapCenter}
				zoom={mapZoom}
				key={`${mapCenter[0]}-${mapCenter[1]}`}
				style={{ height: '100%', width: '100%' }}>
				<TileLayer
					url={`https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${mapApiKey}`}
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>

				{filteredCourts.map((court) => (
					<Marker
						key={court.id}
						position={court.coordinates}
						icon={selectSportIcon(court.category)}>
						<Popup position={court.coordinates}>
							<div className={styles.customPopupWrapper}>
								<img
									src={court.photos[0]}
									alt={court.name}
									className={styles.popupImg}
								/>
								<div className={styles.textWrapper}>
									<h2>{court.name}</h2>
									<p>{court.location}</p>
									<p>Sport: {court.category}</p>
									<p>Players: {court.capacity}</p>
									<p className={court.is_free ? styles.free : styles.paid}>
										{court.is_free ? 'Free to use' : 'Paid'}
									</p>
									<Link
										to={court.id}
										onClick={() => selectCourt(court)}
										className={styles.courtDetailsLink}>
										Court Details
									</Link>
								</div>
							</div>
						</Popup>
					</Marker>
				))}
			</MapContainer>
		);
	}

	// Map for Events route
	if (location.pathname.includes('events')) {
		return (
			<MapContainer
				center={mapCenter}
				zoom={mapZoom}
				key={`${mapCenter[0]}-${mapCenter[1]}`}
				style={{ height: '100%', width: '100%' }}>
				<TileLayer
					url={`https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=${mapApiKey}`}
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>
				{filteredEvents.map((event) => (
					<Marker
						key={event.id}
						position={event.coordinates}
						icon={selectSportIcon(event.category)}>
						<Popup position={event.coordinates}>
							<div className={styles.customPopupWrapper}>
								<img
									src={event.photo}
									alt='{event.name}'
									className={styles.popupImg}
								/>
								<div className={styles.textWrapper}>
									<h2>{event.title}</h2>
									<p>{event.location}</p>
									<p>Sport: {event.category}</p>
									<p>
										Players: {event.participants.length} / {event.player_count}
									</p>
									<p className={event.is_free ? styles.free : styles.paid}>
										{event.is_free ? 'Free to use' : 'Paid'}
									</p>
									<Link
										to={event.id}
										onClick={() => selectEvent(event)}
										className={styles.courtDetailsLink}>
										Event Detail
									</Link>
								</div>
							</div>
						</Popup>
					</Marker>
				))}
			</MapContainer>
		);
	}
}
