import { React, useState } from 'react';
import Style from './backButton.module.scss';
import { GiSlicingArrow } from 'react-icons/gi';

export default function BackButton(props) {
	return (
		<button className={props.active ? Style.ButtonActive : Style.Button} onClick={props.onClick}>
			<div className={Style.Border}></div>
			<div className={Style.Arrow}>
				<GiSlicingArrow />
			</div>
			<p>Back</p>
		</button>
	);
}
