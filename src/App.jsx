import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Style from './app.module.scss';
import { generateUrls } from './utilities';
import { NextButton, BackButton, CharacterSelect, CategorySelect, StartGame, Game, Instructions } from 'components';

function App() {
	const [page, setPage] = useState(0);
	const [nextActive, setNextActive] = useState(false);
	const [backActive, setBackActive] = useState(false);
	const [team1Name, setTeam1Name] = useState('');
	const [team2Name, setTeam2Name] = useState('');
	const [character1, setCharacter1] = useState(0);
	const [character2, setCharacter2] = useState(0);
	const [rounds, setRounds] = useState(5);
	const [categories, setCategories] = useState({
		0: { selected: false, difficulty: 2 },
		1: { selected: false, difficulty: 2 },
		2: { selected: false, difficulty: 2 },
		3: { selected: false, difficulty: 2 },
		4: { selected: false, difficulty: 2 },
		5: { selected: false, difficulty: 2 },
		6: { selected: false, difficulty: 2 },
		7: { selected: false, difficulty: 2 },
		8: { selected: false, difficulty: 2 },
		9: { selected: false, difficulty: 2 },
		10: { selected: false, difficulty: 2 },
		11: { selected: false, difficulty: 2 },
		12: { selected: false, difficulty: 2 },
		13: { selected: false, difficulty: 2 },
		14: { selected: false, difficulty: 2 },
		15: { selected: false, difficulty: 2 },
		16: { selected: false, difficulty: 2 },
		17: { selected: false, difficulty: 2 },
		18: { selected: false, difficulty: 2 },
		19: { selected: false, difficulty: 2 },
		20: { selected: false, difficulty: 2 },
		21: { selected: false, difficulty: 2 },
		22: { selected: false, difficulty: 2 },
		23: { selected: false, difficulty: 2 },
	});
	const [categoriesMinSet, setCategoriesMinSet] = useState(false);
	const [categoryIds, setCategoryIds] = useState([]);
	const [playGame, setPlayGame] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [notes, setNotes] = useState({});
	const [loading, setLoading] = useState(false);
	const [showInstructions, setShowInstructions] = useState(false);

	const categoriesList = [
		'General Knowledge',
		'Entertainment: Books',
		'Entertainment: Film',
		'Entertainment: Music',
		'Entertainment: Musicals & Theatres',
		'Entertainment: Television',
		'Entertainment: Video Games',
		'Entertainment: Board Games',
		'Science & Nature',
		'Science: Computers',
		'Science: Mathematics',
		'Mythology',
		'Sports',
		'Geography',
		'History',
		'Politics',
		'Art',
		'Celebrities',
		'Animals',
		'Vehicles',
		'Entertainment: Comics',
		'Science: Gadgets',
		'Entertainment: Japanese Anime & Manga',
		'Entertainment: Cartoon & Animations',
	];

	useEffect(() => {
		if (page === 0) {
			if (team1Name.length > 0 && team2Name.length > 0) {
				setNextActive(true);
			} else {
				setNextActive(false);
			}
		}

		if (page === 1) {
			if (character1 !== 0 && character2 !== 0 && character1 !== character2) {
				setNextActive(true);
			} else {
				setNextActive(false);
			}
		}

		if (page === 2) {
			if (categoriesMinSet) {
				setNextActive(true);
			} else {
				setNextActive(false);
			}
		}

		if (page > 0) {
			setBackActive(true);
		} else {
			setBackActive(false);
		}
	}, [page, team1Name, team2Name, character1, character2, categories, categoriesMinSet]);

	const backClick = () => {
		if (!backActive) {
			return;
		} else {
			setPage(page - 1);
		}
	};
	const nextClick = () => {
		if (!nextActive) {
			return;
		} else {
			if (page === 2) {
				const ids = {};
				while (Object.keys(ids).length < rounds) {
					Object.values(categories).forEach((info, index) => {
						let difficulty;
						if (info.difficulty === 0) {
							difficulty = 'any';
						} else if (info.difficulty === 1) {
							difficulty = 'easy';
						} else if (info.difficulty === 2) {
							difficulty = 'medium';
						} else if (info.difficulty === 3) {
							difficulty = 'hard';
						}
						if (info.selected) {
							ids[index] = difficulty;
						}
					});
				}
				setCategoryIds(ids);
				// console.log(ids);
			}
			if (page < 2) {
				setNextActive(false);
			}
			if (page === 3) {
				startGame();
				return;
			}
			setPage(page + 1);
		}
	};

	const selectCharacter1 = (charId) => {
		if (character1 === charId) {
			setCharacter1(0);
		} else {
			setCharacter1(charId);
		}
	};
	const selectCharacter2 = (charId) => {
		if (character2 === charId) {
			setCharacter2(0);
		} else {
			setCharacter2(charId);
		}
	};

	const selectCategory = (catId, totalCat) => {
		const catUpdated = { ...categories };
		catUpdated[catId].selected = !categories[catId].selected;
		setCategories(catUpdated);

		if (totalCat === rounds) {
			setCategoriesMinSet(true);
		} else {
			setCategoriesMinSet(false);
		}
	};

	const selectDifficulty = (catId, difficulty) => {
		const updated = { ...categories };
		updated[catId].difficulty = difficulty;
		setCategories(updated);
	};

	const selectRounds = (amount, totalCat) => {
		setRounds(amount);
		if (totalCat === amount) {
			setCategoriesMinSet(true);
		} else {
			setCategoriesMinSet(false);
		}
	};

	const playAgain = () => {
		setCategories({
			0: { selected: false, difficulty: 2 },
			1: { selected: false, difficulty: 2 },
			2: { selected: false, difficulty: 2 },
			3: { selected: false, difficulty: 2 },
			4: { selected: false, difficulty: 2 },
			5: { selected: false, difficulty: 2 },
			6: { selected: false, difficulty: 2 },
			7: { selected: false, difficulty: 2 },
			8: { selected: false, difficulty: 2 },
			9: { selected: false, difficulty: 2 },
			10: { selected: false, difficulty: 2 },
			11: { selected: false, difficulty: 2 },
			12: { selected: false, difficulty: 2 },
			13: { selected: false, difficulty: 2 },
			14: { selected: false, difficulty: 2 },
			15: { selected: false, difficulty: 2 },
			16: { selected: false, difficulty: 2 },
			17: { selected: false, difficulty: 2 },
			18: { selected: false, difficulty: 2 },
			19: { selected: false, difficulty: 2 },
			20: { selected: false, difficulty: 2 },
			21: { selected: false, difficulty: 2 },
			22: { selected: false, difficulty: 2 },
			23: { selected: false, difficulty: 2 },
		});
		setCategoriesMinSet(false);
		setNextActive(false);
		setBackActive(true);
		setPage(2);
		setPlayGame(false);
	};

	let token = '';

	const startGame = async () => {
		setLoading(true);

		let questions = [];
		if (!sessionStorage.triviaToken) {
			try {
				const tokenRequest = await axios.get('https://opentdb.com/api_token.php?command=request');
				token = tokenRequest.data.token;
				sessionStorage.setItem('triviaToken', token);
			} catch (e) {
				console.log(e);
			}
		} else {
			token = sessionStorage.triviaToken;
		}

		try {
			let apiCall = await Promise.all(generateUrls(categoryIds, token).map(axios.get));
			// console.log(apiCall);

			if (apiCall[0].data.response_code === 3) {
				// Code 3: Token Not Found Session Token does not exist.
				const tokenRequest = await axios.get('https://opentdb.com/api_token.php?command=request');
				token = tokenRequest.data.token;
				sessionStorage.setItem('triviaToken', token);
				const urls = generateUrls(categoryIds, token);
				const apiCall = [];
				for (const url of urls) {
					const result = await axios.get(url);
					apiCall.push(result);
				}
				// apiCall = await Promise.all(generateUrls(categoryIds, token).map(axios.get));

				console.log(apiCall);
			}

			// check response code for each object/category
			for (let index = 0; index < apiCall.length; index++) {
				if (apiCall[index].data.response_code === 0) {
					const questionsData = apiCall[index].data.results;
					questions.push(questionsData);
				} else {
					// Code 1: No Results Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)
					// Code 4: Token Empty Session Token has returned all possible questions for the specified query.
					// if difficulty was specified, change to ANY
					const current = Object.entries(categoryIds)[index];
					if (current[1] !== 'any') {
						// recreate the url and rerun API call for this category and replace the questions data
						// * add note
						const category = `&category=${Number(current[0]) + 9}`;
						let url = `https://opentdb.com/api.php?amount=7${category}&type=multiple&token=${token}`;
						let newCall = await axios.get(url);
						if (newCall.data.response_code === 0) {
							const questionsData = newCall.data.results;
							questions.push(questionsData);
							let updatedNotes = { ...notes };
							updatedNotes[index] = 1;
							setNotes(updatedNotes);
						} else {
							// if response_code is still 1, run request with no specified category or difficulty
							// * add note
							url = `https://opentdb.com/api.php?amount=7&type=multiple&token=${token}`;
							newCall = await axios.get(url);
							const questionsData = newCall.data.results;
							let updatedNotes = { ...notes };
							updatedNotes[index] = 2;
							setNotes(updatedNotes);
							questions.push(questionsData);
						}
					} else {
						// if difficulty was ANY, run request with no specified category or difficulty
						// * add note
						const url = `https://opentdb.com/api.php?amount=7&type=multiple&token=${token}`;
						const newCall = await axios.get(url);
						const questionsData = newCall.data.results;
						let updatedNotes = { ...notes };
						updatedNotes[index] = 2;
						setNotes(updatedNotes);
						questions.push(questionsData);
					}
				}
			}
			// console.log(questions);
			setQuestions(questions);
		} catch (e) {
			console.log(e);
		}

		setLoading(false);
		setPlayGame(true);
	};

	return (
		<div className={Style.App}>
			{!playGame ? (
				<div className={Style.SetUp}>
					{showInstructions && <Instructions unmount={() => setShowInstructions(false)} />}
					<section className={Style.ToDo}>
						<div className={page === 0 ? Style.ToDoItemCurrent : Style.ToDoItemComplete}>Team Names</div>
						<div
							className={
								page === 1 ? Style.ToDoItemCurrent : page > 1 ? Style.ToDoItemComplete : Style.ToDoItem
							}>
							Characters
						</div>
						<div
							className={
								page === 2 ? Style.ToDoItemCurrent : page > 2 ? Style.ToDoItemComplete : Style.ToDoItem
							}>
							Categories
						</div>
						<div className={page === 3 ? Style.ToDoItemCurrent : Style.ToDoItem}>Start Game</div>
						<div className={Style[`AppaFly${page}`]}></div>
						<div className={Style.Instructions} onClick={() => setShowInstructions(true)}>
							?
						</div>
					</section>
					<main className={Style.Settings}>
						<div className={page === 0 ? Style.Name1 : Style.Name1Below}>
							<h1>Team 1</h1>
							<div className={Style.InputDiv}>
								<label htmlFor='team1Name'>Set Name</label>
								<input
									type='text'
									id='team1Name'
									placeholder='Team 1 Name'
									value={team1Name}
									onChange={(e) => setTeam1Name(e.target.value)}
								/>
							</div>
						</div>
						<div className={page === 0 ? Style.Name2 : Style.Name2Below}>
							<h1>Team 2</h1>
							<div className={Style.InputDiv}>
								<label htmlFor='team2Name'>Set Name</label>
								<input
									type='text'
									id='team2Name'
									placeholder='Team 2 Name'
									value={team2Name}
									onChange={(e) => setTeam2Name(e.target.value)}
								/>
							</div>
						</div>
						<div
							className={
								page === 0
									? Style.Character1Above
									: page === 1
									? Style.Character1
									: Style.Character1Below
							}>
							<CharacterSelect
								teamName={team1Name}
								selectCharacter={selectCharacter1}
								character={character1}
							/>
						</div>
						<div
							className={
								page === 0
									? Style.Character2Above
									: page === 1
									? Style.Character2
									: Style.Character2Below
							}>
							<CharacterSelect
								teamName={team2Name}
								selectCharacter={selectCharacter2}
								character={character2}
							/>
						</div>
						<div
							className={
								page < 2 ? Style.CategoriesAbove : page === 2 ? Style.Categories : Style.CategoriesBelow
							}>
							<CategorySelect
								selectCategory={selectCategory}
								selectDifficulty={selectDifficulty}
								selectRounds={selectRounds}
								categoriesList={categoriesList}
								rounds={rounds}
							/>
						</div>
						<div className={page < 3 ? Style.StartGameAbove : Style.StartGame}>
							<StartGame
								team1Name={team1Name}
								team2Name={team2Name}
								character1={character1}
								character2={character2}
								rounds={rounds}
								categoryIds={categoryIds}
								categoriesList={categoriesList}
							/>
						</div>
					</main>
					<BackButton active={backActive} onClick={backClick} />
					<NextButton active={nextActive} onClick={nextClick} page={page} loading={loading} />
				</div>
			) : loading ? (
				<div>Loading</div>
			) : (
				<Game
					team1Name={team1Name}
					team2Name={team2Name}
					character1={character1}
					character2={character2}
					questions={questions}
					rounds={rounds}
					categoriesList={categoriesList}
					categoryIds={categoryIds}
					playAgain={playAgain}
					notes={notes}
				/>
			)}
		</div>
	);
}

export default App;
