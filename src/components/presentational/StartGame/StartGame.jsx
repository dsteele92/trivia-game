import React, { useState } from 'react';
import Style from './startGame.module.scss';

export default function SelectGame(props) {
	// const categories = [];
	// Object.keys(props.categoryIds).forEach((catId) => {
	// 	const cat = props.categoriesList[catId];
	// 	categories.push(cat);
	// });

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
				{Object.entries(props.categoryIds).map((entry, index) => (
					<div key={index} className={Style.Round}>
						<div className={Style.Number}>
							<h4>Round</h4>
							<div>{index + 1}</div>
						</div>
						<div className={Style.Category}>
							<p>{props.categoriesList[entry[0]]}</p>
						</div>
						<div className={Style.Difficulty}>
							<h4>{entry[1]}</h4>
						</div>
					</div>
				))}
			</section>
			<div className={Style.Instructions}>?</div>
		</div>
	);
}
