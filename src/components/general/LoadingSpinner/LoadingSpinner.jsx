import { React } from 'react';
import styles from './loadingSpinner.module.css';

function LoadingSpinner() {
	return (
		<div>
			<p className={styles.loading}>Loading</p>
			<div className={styles.skChase}>
				<div className={styles.skChaseDot}></div>
				<div className={styles.skChaseDot}></div>
				<div className={styles.skChaseDot}></div>
				<div className={styles.skChaseDot}></div>
				<div className={styles.skChaseDot}></div>
				<div className={styles.skChaseDot}></div>
			</div>
		</div>
	);
}

export default LoadingSpinner;
