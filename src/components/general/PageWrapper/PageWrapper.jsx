import React from 'react';
import Style from './pageWrapper.module.scss';

export default function PageWrapper() {
	return (
		<div className={Style.Wrapper}>
			<div className={Style.Top}></div>
			<div className={Style.Right}></div>
			<div className={Style.Left}></div>
			<div className={Style.Bottom}></div>
			{/* <div className={Style.TriangleLeftContainer}>
				<div className={Style.TriangleLeft}></div>
			</div>
			<div className={Style.TriangleRightContainer}>
				<div className={Style.TriangleRight}></div>
			</div> */}
			{/* <div className={Style.BottomLeft}></div>
			<div className={Style.BottomRight}></div> */}
		</div>
	);
}
