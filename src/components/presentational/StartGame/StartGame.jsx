import React, { useState } from 'react';
import Style from './startGame.module.scss';

export default function SelectGame(props) {
	const categories = [];
	props.categoryIds.forEach((catId) => {
		const index = catId - 9;
		const cat = props.categoriesList[index];
		categories.push(cat);
	});

	return (
		<div className={Style.StartGame}>
			<section className={Style.Matchup}>
				<div className={Style.Team}>
					<h1>{props.team1Name}</h1>
					<div className={Style[`Character${props.character1}`]}></div>
				</div>
				<div className={Style.Vs}>VS</div>
				<div className={Style.Team}>
					<h1>{props.team2Name}</h1>
					<div className={Style[`Character${props.character2}`]}></div>
				</div>
			</section>
			<section className={Style.Game}>
				{categories.map((cat, index) => (
					<div key={index} className={Style.Round}>
						<div className={Style.Number}>
							<h4>Round</h4>
							<div>{index + 1}</div>
						</div>
						<div className={Style.Category}>
							<p>{cat}</p>
						</div>
					</div>
				))}
			</section>
		</div>
	);
}
