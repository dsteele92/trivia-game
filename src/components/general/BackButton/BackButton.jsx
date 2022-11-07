import { React, useState } from 'react';
import Style from './backButton.module.scss';

export default function BackButton(props) {
	return (
		<button className={props.active ? Style.ButtonActive : Style.Button} onClick={props.onClick}>
			Back
		</button>
	);
}
