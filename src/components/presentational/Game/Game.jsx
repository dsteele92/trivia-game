import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Style from './game.module.scss';
import { NextButton, BackButton, CharacterSelect, CategorySelect, StartGame } from 'components';

export default function Game(props) {
	const [nextActive, setNextActive] = useState(false);
	const [team1Score, setTeam1Score] = useState(0);
	const [team2Score, setTeam2Score] = useState(0);

	useEffect(() => {}, []);

	const nextClick = () => {
		if (!nextActive) {
			return;
		} else {
		}
	};

	return (
		<div className={Style.Game}>
			<section className={Style.Points}>
				<div className={Style.Point}>1</div>
				<div className={Style.Point}>2</div>
				<div className={Style.Point}>3</div>
				<div className={Style.Point}>4</div>
				<div className={Style.Point}>5</div>
				<div className={Style.Point}>6</div>
				<div className={Style.Point}>7</div>
			</section>
			<section className={Style.Tracker}>
				<div className={Style.Team}>
					<div className={Style.GameTracker}></div>
					<div className={Style.TeamInfo}>
						<h1 className={Style.Name}>{props.team1Name}</h1>
						<div className={Style[`Character${props.character1}`]}></div>
					</div>
					<div className={Style.RoundTracker}></div>
				</div>
				<div className={Style.Score}>
					<h4>Current Round</h4>
					<h1>
						{team1Score}-{team2Score}
					</h1>
				</div>
				<div className={Style.Team}>
					<div className={Style.RoundTracker}></div>
					<div className={Style.TeamInfo}>
						<h1 className={Style.Name}>{props.team2Name}</h1>
						<div className={Style[`Character${props.character2}`]}></div>
					</div>
					<div className={Style.GameTracker}></div>
				</div>
			</section>
			<main className={Style.Play}>
				<div className={Style.Question}></div>
			</main>
		</div>
	);
}
