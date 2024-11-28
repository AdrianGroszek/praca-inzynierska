import { ReactNode } from 'react';

import styles from './Wrapper.module.css';

type WrapperProps = {
	children: ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
	return <main className={styles.wrapper}>{children}</main>;
}
