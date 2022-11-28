import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Style from './game.module.scss';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Instructions } from 'components';

export default function Game(props) {
	const [team1Score, setTeam1Score] = useState(0);
	const [team2Score, setTeam2Score] = useState(0);
	const [team1Total, setTeam1Total] = useState(0);
	const [team2Total, setTeam2Total] = useState(0);
	const [roundScores, setRoundScores] = useState([]);
	const [currentRound, setCurrentRound] = useState(0);
	const [currentTeam, setCurrentTeam] = useState(0);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [currentAnswers, setCurrentAnswers] = useState([]);
	const [answerIndex, setAnswerIndex] = useState(0);
	const [flipped, setFlipped] = useState([false, false, false, false]);
	const [currentRoundResults, setCurrentRoundResults] = useState([0, 0, 0, 0, 0, 0, 0]);
	const [roundEnd, setRoundEnd] = useState(true);
	const [nextActive, setNextActive] = useState(false);
	const [showInstructions, setShowInstructions] = useState(false);
	const [showNotes, setShowNotes] = useState([false, false, false, false, false, false, false]);

	useEffect(() => {
		const answers = [...props.questions[currentRound][currentQuestion].incorrect_answers];
		const correctAnswer = props.questions[currentRound][currentQuestion].correct_answer;
		const index = Math.floor(Math.random() * 4);

		answers.splice(index, 0, correctAnswer);
		// console.log(answers);
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
				setCurrentRoundResults(
					currentRoundResults.map((result, index) => {
						if (index !== currentQuestion) {
							return result;
						} else {
							return 1;
						}
					})
				);
			}
			if (currentTeam === 2) {
				setTeam2Score(team2Score + 1);
				setCurrentRoundResults(
					currentRoundResults.map((result, index) => {
						if (index !== currentQuestion) {
							return result;
						} else {
							return 2;
						}
					})
				);
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
				if ((currentRound + 1) % 2 === 0) {
					if ((currentQuestion + 2) % 2 === 0) {
						setCurrentTeam(1);
					} else {
						setCurrentTeam(2);
					}
				} else {
					if ((currentQuestion + 2) % 2 === 0) {
						setCurrentTeam(2);
					} else {
						setCurrentTeam(1);
					}
				}
				setCurrentQuestion(currentQuestion + 1);
			} else {
				setRoundEnd(true);
				if (team1Score > team2Score) {
					setTeam1Total(team1Total + 1);
				} else {
					setTeam2Total(team2Total + 1);
				}
				setCurrentTeam(0);
				let roundScore = [];
				roundScore.push(team1Score);
				roundScore.push(team2Score);
				const update = [...roundScores, roundScore];
				setRoundScores(update);
				// console.log(update);
			}
		}
	};

	const nextRound = () => {
		if ((currentRound + 2) % 2 === 0) {
			setCurrentTeam(2);
		} else {
			setCurrentTeam(1);
		}
		setCurrentRound(currentRound + 1);
		setCurrentQuestion(0);
		setTeam1Score(0);
		setTeam2Score(0);
		setCurrentRoundResults([0, 0, 0, 0, 0, 0, 0]);
		setRoundEnd(false);
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
		'&deg;': '°',
	};

	const replace = (str) => {
		return entities[str];
	};

	return (
		<div className={Style.Game}>
			{showInstructions && <Instructions unmount={() => setShowInstructions(false)} />}
			<section className={Style.Points}>
				{currentRoundResults.map((result, index) => (
					<div
						key={index}
						className={
							result === 1
								? Style[`Point${props.character1}`]
								: result === 2
								? Style[`Point${props.character2}`]
								: Style.Point
						}>
						{result === 0 && <p>{index + 1}</p>}
					</div>
				))}
			</section>
			<section className={Style.Tracker}>
				<div className={`${Style.Team} ${Style.One}`}>
					<div className={currentTeam === 2 ? Style.TeamInfoFade : Style.TeamInfo}>
						<h1 className={currentTeam === 1 ? Style.NameActive : Style.Name}>{props.team1Name}</h1>
						<div className={Style[`Character${props.character1}`]}></div>
					</div>
				</div>
				<div className={Style.Center}>
					<div className={Style.Round}>
						<h3>{`Round ${currentRound + 1}`}</h3>
						<h4 className={Style.CurrentCategory}>
							{props.categoriesList[Object.keys(props.categoryIds)[currentRound]]}
						</h4>
					</div>
					<div className={Style.Score} onClick={() => console.log(props.notes)}>
						<p>
							<span className={team1Score >= 4 ? Style.Win : ''}>{team1Score}</span>-
							<span className={team2Score >= 4 ? Style.Win : ''}>{team2Score}</span>
						</p>
					</div>
				</div>
				<div className={`${Style.Team} ${Style.Two}`}>
					<div className={currentTeam === 1 ? Style.TeamInfoFade : Style.TeamInfo}>
						<h1 className={currentTeam === 2 ? Style.NameActive : Style.Name}>{props.team2Name}</h1>
						<div className={Style[`Character${props.character2}`]}></div>
					</div>
				</div>
			</section>
			<main className={Style.Play}>
				{roundEnd ? (
					<div className={Style.Display}>
						<div className={Style.Transition}>
							<div className={Style.Header}>
								{currentRound + 1 < props.rounds ? (
									<h2>Best of {props.rounds}</h2>
								) : (
									<h2 className={Style.Winner}>
										{team1Total > team2Total ? props.team1Name : props.team2Name} Wins!
									</h2>
								)}
								<h1>
									<span className={`${Style[`Name${props.character1}`]} ${Style.Left}`}>
										{props.team1Name}
									</span>
									<div className={Style.TotalScore}>
										{team1Total}-{team2Total}
									</div>
									<span className={`${Style[`Name${props.character2}`]} ${Style.Right}`}>
										{props.team2Name}
									</span>
								</h1>
							</div>
							<div className={Style.Rounds}>
								{Object.entries(props.categoryIds).map((entry, index) => (
									<div
										key={index}
										className={roundScores.length > index ? Style.RoundComplete : Style.Round}>
										{roundScores.length > index && (
											<div className={Style.Score}>
												<div
													className={
														roundScores[index][0] > roundScores[index][1]
															? Style[`TeamLeft${props.character1}`]
															: Style.TeamLeft
													}>
													<h4>{roundScores[index][0]}</h4>
												</div>
												<div
													className={
														roundScores[index][0] < roundScores[index][1]
															? Style[`TeamRight${props.character2}`]
															: Style.TeamRight
													}>
													<h4>{roundScores[index][1]}</h4>
												</div>
											</div>
										)}
										<div
											className={
												roundScores.length <= index
													? Style.Info
													: roundScores[index][0] > roundScores[index][1]
													? Style[`Info${props.character1}`]
													: Style[`Info${props.character2}`]
											}>
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
											{props.notes[index + 1] && (
												<div
													className={Style.Note}
													onClick={() =>
														setShowNotes(
															showNotes.map((note, i) => {
																if (i === index) {
																	return true;
																} else {
																	return note;
																}
															})
														)
													}>
													!
												</div>
											)}
											{props.notes[index + 1] && (
												<div className={showNotes[index] ? Style.ShowNote : Style.ShowNoteHide}>
													{props.notes[index + 1] === 1 ? (
														<p>
															There are not enough questions remaining for this
															difficulty.
															<br />
															Questions will be of any difficulty.
														</p>
													) : (
														<p>
															There are not enough questions remaining for this category.
															<br />
															Questions will be from random categories.
														</p>
													)}
													<div
														className={Style.Close}
														onClick={() =>
															setShowNotes(
																showNotes.map((note, i) => {
																	if (i === index) {
																		return false;
																	} else {
																		return note;
																	}
																})
															)
														}>
														X
													</div>
												</div>
											)}
										</div>
									</div>
								))}
							</div>
							{currentRound === 0 && currentQuestion === 0 ? (
								<button
									onClick={() => {
										setRoundEnd(false);
										setCurrentTeam(1);
									}}>
									Begin Round 1
								</button>
							) : currentRound + 1 < props.rounds ? (
								<button onClick={nextRound}>{`Begin Round ${currentRound + 2}`}</button>
							) : (
								<button onClick={props.playAgain}>Play Again</button>
							)}
							<div className={Style.Instructions} onClick={() => setShowInstructions(true)}>
								?
							</div>
						</div>
					</div>
				) : (
					<div className={Style.Display}>
						{currentTeam > 0 && (
							<div className={Style.TurnIndicator}>
								<div
									className={
										currentTeam === 1
											? Style[`TurnLeft${props.character1}`]
											: `${Style[`TurnLeft${props.character1}`]} ${Style.Hide}`
									}></div>
								<div
									className={
										currentTeam === 2
											? Style[`TurnRight${props.character2}`]
											: `${Style[`TurnRight${props.character2}`]} ${Style.Hide}`
									}></div>
							</div>
						)}
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
									<div className={answerIndex === index ? Style.BackCorrect : Style.BackIncorrect}>
										{answerIndex === index ? (
											<div>
												<div className={Style.Text}>
													{answer.replace(/&#?\w+;/g, (str) => replace(str))}
												</div>
												<div className={Style.Background}>
													<FaCheck />
												</div>
											</div>
										) : (
											<div>
												<div className={Style.Text}>
													{answer.replace(/&#?\w+;/g, (str) => replace(str))}
												</div>
												<div className={Style.Background}>
													<FaTimes />
												</div>
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
