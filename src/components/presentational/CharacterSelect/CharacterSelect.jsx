import React, { useState } from 'react';
import Style from './characterSelect.module.scss';

export default function CharacterSelect(props) {
	const [character, setCharacter] = useState(props.character);

	const characters = ['aang', 'katara', 'sokka', 'zuko', 'iroh', 'toph', 'azula', 'appa'];

	const selectCharacter = (charId) => {
		props.selectCharacter(charId);
		if (character !== charId) {
			setCharacter(charId);
		} else {
			setCharacter(0);
		}
	};

	return (
		<div className={Style.CharacterSelect}>
			<h3>Select Character - {props.teamName}</h3>
			<div className={Style.CharacterList}>
				{characters.map((char, index) => (
					<div key={index + 1} className={character === index + 1 ? Style.Selected : Style.Unselected}>
						<div
							className={Style[`Character${index + 1}`]}
							onClick={() => selectCharacter(index + 1)}></div>
					</div>
				))}
			</div>
		</div>
	);
}
