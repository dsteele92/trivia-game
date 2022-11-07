import { React, useState } from 'react';
import Style from './nextButton.module.scss';

export default function NextButton(props) {
	// const [active, setActive] = useState(props.active);

	return (
		<button className={props.active ? Style.ButtonActive : Style.Button} onClick={props.onClick}>
			Next
		</button>
	);
}
