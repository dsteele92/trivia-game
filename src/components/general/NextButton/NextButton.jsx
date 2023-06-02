import { React, useState, useEffect } from 'react';
import Style from './nextButton.module.scss';
import { GiSlicingArrow } from 'react-icons/gi';

export default function NextButton(props) {
	useEffect(() => {
		const handleKeyPress = (event) => {
			if (event.key === 'Enter') {
				if (props.active) {
					props.onClick();
				}
			}
		};

		document.addEventListener('keydown', handleKeyPress);

		// Clean up the event listener
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, [props]);

	return (
		<button className={props.active ? Style.ButtonActive : Style.Button} onClick={props.onClick}>
			<div className={Style.Border}></div>
			<div className={Style.Arrow}>
				<GiSlicingArrow />
			</div>
			<div className={props.page === 3 ? Style.Start : Style.StartHide}></div>
			{!props.loading ? (
				<p>{props.page < 3 ? 'Next' : 'Start'}</p>
			) : (
				<div className={Style.Ellipsis}>
					<span className={Style.One}>.</span>
					<span className={Style.Two}>.</span>
					<span className={Style.Three}>.</span>
				</div>
			)}
		</button>
	);
}
