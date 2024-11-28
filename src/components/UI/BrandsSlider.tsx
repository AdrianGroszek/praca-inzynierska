import styles from './BrandsSlider.module.css';

import { FaBurst } from 'react-icons/fa6';
import { FaBroom } from 'react-icons/fa6';
import { FaVirusCovidSlash } from 'react-icons/fa6';
import { FaStumbleuponCircle } from 'react-icons/fa6';
import { FaHornbill } from 'react-icons/fa6';
import { FaIcicles } from 'react-icons/fa6';
import { FaMeteor } from 'react-icons/fa6';
import { FaPhoenixSquadron } from 'react-icons/fa6';
import { FaRocket } from 'react-icons/fa6';
import { FaServicestack } from 'react-icons/fa6';

type BrandList = {
	brandName: string;
	icon: JSX.Element;
};

export default function BrandsSlider() {
	const brandList: BrandList[] = [
		{
			brandName: 'StrikerPro',
			icon: <FaBurst className={styles.iconSize} />,
		},
		{
			brandName: 'VeloCorsa',
			icon: <FaBroom className={styles.iconSize} />,
		},
		{
			brandName: 'Dynamo',
			icon: <FaVirusCovidSlash className={styles.iconSize} />,
		},
		{
			brandName: 'LuchadorFit',
			icon: <FaStumbleuponCircle className={styles.iconSize} />,
		},
		{
			brandName: 'ActiveZeph',
			icon: <FaHornbill className={styles.iconSize} />,
		},
		{
			brandName: 'SportStärke',
			icon: <FaIcicles className={styles.iconSize} />,
		},
		{
			brandName: 'Athlétique',
			icon: <FaMeteor className={styles.iconSize} />,
		},
		{
			brandName: 'CitiusVince',
			icon: <FaPhoenixSquadron className={styles.iconSize} />,
		},
		{
			brandName: 'Endurance',
			icon: <FaRocket className={styles.iconSize} />,
		},
		{
			brandName: 'ForzaFit',
			icon: <FaServicestack className={styles.iconSize} />,
		},
	];
	return (
		<div className={styles.slider}>
			<ul className={styles.list}>
				{brandList.map((item, index) => (
					<li
						key={item.brandName}
						className={styles.item}
						style={{ animationDelay: `calc((7s / 10) * ${index})` }}>
						{item.icon}
						<p>{item.brandName}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
