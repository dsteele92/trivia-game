import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Style from './game.module.scss';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { NextButton, BackButton, CharacterSelect, CategorySelect, StartGame } from 'components';

export default function Game(props) {
	const [team1Score, setTeam1Score] = useState(0);
	const [team2Score, setTeam2Score] = useState(0);
	const [roundScores, setRoundScores] = useState([]);
	const [currentRound, setCurrentRound] = useState(0);
	const [currentTeam, setCurrentTeam] = useState(1);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [currentAnswers, setCurrentAnswers] = useState([]);
	const [answerIndex, setAnswerIndex] = useState(0);
	const [flipped, setFlipped] = useState([false, false, false, false]);
	const [currentRoundResults, setCurrentRoundResults] = useState([0, 0, 0, 0, 0, 0, 0]);
	const [roundEnd, setRoundEnd] = useState(true);
	const [nextActive, setNextActive] = useState(false);

	useEffect(() => {
		const answers = [...props.questions[currentRound][currentQuestion].incorrect_answers];
		const correctAnswer = props.questions[currentRound][currentQuestion].correct_answer;
		const index = Math.floor(Math.random() * 4);

		answers.splice(index, 0, correctAnswer);
		console.log(answers);
		setCurrentAnswers(answers);
		setAnswerIndex(index);
	}, [props.questions, currentQuestion, currentRound]);

	const flip = (chosen) => {
		if (nextActive) {
			return;
		}
		const update = flipped.map((bool, index) => (index === chosen ? true : bool));
		setFlipped(update);

		if (chosen === answerIndex) {
			setNextActive(true);

			if (currentTeam === 1) {
				setTeam1Score(team1Score + 1);
			}
			if (currentTeam === 2) {
				setTeam2Score(team2Score + 1);
			}
		} else {
			if (currentTeam === 1) {
				setCurrentTeam(2);
			} else {
				setCurrentTeam(1);
			}
		}
	};

	const nextClick = () => {
		if (!nextActive) {
			return;
		} else {
			setFlipped([false, false, false, false]);
			setNextActive(false);
			if (currentQuestion < 6) {
				setCurrentQuestion(currentQuestion + 1);
			} else {
				setRoundEnd(true);
				setCurrentRound(currentRound + 1);
				setCurrentQuestion(0);
				let roundScore = [];
				roundScore.push(team1Score);
				roundScore.push(team2Score);
				setRoundScores([...roundScores].push(roundScore));
				console.log(roundScores);
				setTeam1Score(0);
				setTeam2Score(0);
			}
		}
	};

	const entities = {
		'&#039;': "'",
		'&quot;': '"',
		'&ldquo;': '"',
		'&rdquo;': '"',
		'&Agrave;': 'À',
		'&Aacute;': 'Á',
		'&Acirc;': 'Â',
		'&Atilde;': 'Ã',
		'&Auml;': 'Ä',
		'&Aring;': 'Å',
		'&agrave;': 'à',
		'&aacute;': 'á',
		'&acirc;': 'â',
		'&atilde;': 'ã',
		'&auml;': 'ä',
		'&aring;': 'å',
		'&AElig;': 'Æ',
		'&aelig;': 'æ',
		'&szlig;': 'ß',
		'&Ccedil;': 'Ç',
		'&ccedil;': 'ç',
		'&Egrave;': 'È',
		'&Eacute;': 'É',
		'&Ecirc;': 'Ê',
		'&Euml;': 'Ë',
		'&egrave;': 'è',
		'&eacute;': 'é',
		'&ecirc;': 'ê',
		'&euml;': 'ë',
		'&#131;': 'ƒ',
		'&Igrave;': 'Ì',
		'&Iacute;': 'Í',
		'&Icirc;': 'Î',
		'&Iuml;': 'Ï',
		'&igrave;': 'ì',
		'&iacute;': 'í',
		'&icirc;': 'î',
		'&iuml;': 'ï',
		'&Ntilde;': 'Ñ',
		'&ntilde;': 'ñ',
		'&Ograve;': 'Ò',
		'&Oacute;': 'Ó',
		'&Ocirc;': 'Ô',
		'&Otilde;': 'Õ',
		'&Ouml;': 'Ö',
		'&ograve;': 'ò',
		'&oacute;': 'ó',
		'&ocirc;': 'ô',
		'&otilde;': 'õ',
		'&ouml;': 'ö',
		'&Oslash;': 'Ø',
		'&oslash;': 'ø',
		'&#140;': 'Œ',
		'&#156;': 'œ',
		'&#138;': 'Š',
		'&#154;': 'š',
		'&Ugrave;': 'Ù',
		'&Uacute;': 'Ú',
		'&Ucirc;': 'Û',
		'&Uuml;': 'Ü',
		'&ugrave;': 'ù',
		'&uacute;': 'ú',
		'&ucirc;': 'û',
		'&uuml;': 'ü',
		'&#181;': 'µ',
		'&Yacute;': 'Ý',
		'&#159;': 'Ÿ',
		'&yacute;': 'ý',
		'&yuml;': 'ÿ',
		'&#176;': '°',
		'&#134;': '†',
		'&#135;': '‡',
		'&lt;': '<',
		'&gt;': '>',
		'&#161;': '¡',
		'&#183;': '·',
		'&#149;': '•',
		'&#153;': '™',
		'&copy;': '©',
		'&reg;': '®',
		'&#167;': '§',
		'&#182;': '¶',
	};

	const replace = (str) => {
		return entities[str];
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
					<div className={currentTeam === 2 ? Style.TeamInfoFade : Style.TeamInfo}>
						<h1 className={currentTeam === 1 ? Style.NameActive : Style.Name}>{props.team1Name}</h1>
						<div className={Style[`Character${props.character1}`]}></div>
					</div>
					<div className={Style.RoundTracker}></div>
				</div>
				<div className={Style.Score}>
					<div className={Style.Round}>
						<h3>{`Round ${currentRound + 1}`}</h3>
						<h4 className={Style.CurrentCategory}>
							{props.categoriesList[Object.keys(props.categoryIds)[currentRound]]}
						</h4>
					</div>
					<div className={Style.Score}>
						{team1Score}-{team2Score}
					</div>
				</div>
				<div className={Style.Team}>
					<div className={Style.RoundTracker}></div>
					<div className={currentTeam === 1 ? Style.TeamInfoFade : Style.TeamInfo}>
						<h1 className={currentTeam === 2 ? Style.NameActive : Style.Name}>{props.team2Name}</h1>
						<div className={Style[`Character${props.character2}`]}></div>
					</div>
					<div className={Style.GameTracker}></div>
				</div>
			</section>
			<main className={Style.Play}>
				{roundEnd ? (
					<div className={Style.Display}>
						{currentRound === 0 ? (
							<div className={Style.Transition}>
								<div>Instructions</div>
								<button onClick={() => setRoundEnd(false)}>Start</button>
							</div>
						) : (
							<div className={Style.Transition}>
								<div>{`Round ${currentRound} results`}</div>
								<button onClick={() => setRoundEnd(false)}>{`Begin Round ${currentRound + 1}`}</button>
							</div>
						)}
					</div>
				) : (
					<div className={Style.Display}>
						<div className={Style.Question}>
							<p className={Style.CurrentTeam}>
								{currentTeam === 1 ? props.team1Name : props.team2Name},
							</p>
							<p>
								{props.questions[currentRound][currentQuestion].question.replace(/&#?\w+;/g, (str) =>
									replace(str)
								)}
							</p>
						</div>
						<div className={Style.Answers}>
							{currentAnswers.map((answer, index) => (
								<div
									className={flipped[index] ? Style.AnswerFlip : Style.Answer}
									onClick={() => flip(index)}
									key={index}>
									<div className={Style.Front}>
										{answer.replace(/&#?\w+;/g, (str) => replace(str))}
									</div>
									<div className={Style.Back}>
										{answerIndex === index ? (
											<div className={Style.Correct}>
												<FaCheck />
											</div>
										) : (
											<div className={Style.Incorrect}>
												<FaTimes />
											</div>
										)}
									</div>
								</div>
							))}
						</div>
						<button className={nextActive ? Style.NextActive : Style.Next} onClick={nextClick}>
							Next
						</button>
					</div>
				)}
			</main>
		</div>
	);
}
