import React from 'react';
import Style from './instructions.module.scss';

export default function Instructions(props) {
	return (
		<div className={Style.Instructions}>
			<main>
				<h1>Instructions</h1>
				<ul>
					<li>
						<div></div>
						<p>Each round has 7 questions</p>
					</li>
					<li>
						<div></div>
						<p>The score tracker will display who's turn it is</p>
					</li>
					<li>
						<div></div>
						<p>If the question is answered incorrectly, it will be passed to the opposing player</p>
					</li>
					<li>
						<div></div>
						<p>Each round will be awarded a winner</p>
					</li>
					<li>
						<div></div>
						<p>The player who wins the most rounds wins the game</p>
					</li>
				</ul>
				<div className={Style.Button} onClick={props.unmount}>
					X
				</div>
			</main>
		</div>
	);
}
