import { React, useState } from 'react';
import Style from './nextButton.module.scss';

export default function NextButton(props) {
	return (
		<button className={props.active ? Style.ButtonActive : Style.Button} onClick={props.onClick}>
			<div className={Style.Border}></div>
			<div className={props.page === 3 ? Style.Start : Style.StartHide}></div>
			<p>{props.page < 3 ? 'Next' : 'Start'}</p>
		</button>
	);
}
