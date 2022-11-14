import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Style from './setUp.module.scss';
import { NextButton, BackButton, CharacterSelect, CategorySelect, StartGame } from 'components';

export default function SetUp() {
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
			if (character1 !== 0 && character2 !== 0) {
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
		if (categories[catId].selected) {
			const catRemoved = { ...categories };
			catRemoved[catId].selected = false;
			setCategories(catRemoved);
		} else {
			const catAdded = { ...categories };
			catAdded[catId].selected = true;
			setCategories(catAdded);
		}

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

	const startGame = async () => {
		let requests = [];
		let urls = [];
		let token = '';
		let questions = [];

		if (!localStorage.triviaToken) {
			try {
				const tokenRequest = await axios.get('https://opentdb.com/api_token.php?command=request');
				token = tokenRequest.data.token;
				console.log(token);
				localStorage.setItem('triviaToken', token);
			} catch (e) {
				console.log(e);
			}
		} else {
			token = localStorage.triviaToken;
		}

		Object.entries(categoryIds).forEach((entry) => {
			let difficulty = '';
			if (entry[1] !== 'any') {
				difficulty = `&difficulty=${entry[1]}`;
			}
			const category = `&category=${Number(entry[0]) + 9}`;
			let url = `https://opentdb.com/api.php?amount=7${category}${difficulty}&type=multiple&token=${token}`;
			const request = axios.get(url);
			urls.push(url);
			requests.push(request);
		});

		try {
			const apiCall = await Promise.all(requests);
			console.log(apiCall);

			apiCall.forEach((result) => {
				let questionsData = result.data.results;
				questions.push(questionsData);
			});

			console.log(questions);
		} catch (e) {
			console.log(e);
		}
	};

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
				console.log(ids);
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

	return (
		<div className={Style.SetUp}>
			<section className={Style.ToDo}>
				<div className={page === 0 ? Style.ToDoItemCurrent : Style.ToDoItemComplete}>Set Team Names</div>
				<div
					className={page === 1 ? Style.ToDoItemCurrent : page > 1 ? Style.ToDoItemComplete : Style.ToDoItem}>
					Select Characters
				</div>
				<div
					className={page === 2 ? Style.ToDoItemCurrent : page > 2 ? Style.ToDoItemComplete : Style.ToDoItem}>
					Select Categories
				</div>
				<div className={page === 3 ? Style.ToDoItemCurrent : Style.ToDoItem}>Start Game</div>
				<div className={Style[`AppaFly${page}`]}></div>
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
						page === 0 ? Style.Character1Above : page === 1 ? Style.Character1 : Style.Character1Below
					}>
					<CharacterSelect teamName={team1Name} selectCharacter={selectCharacter1} />
				</div>
				<div
					className={
						page === 0 ? Style.Character2Above : page === 1 ? Style.Character2 : Style.Character2Below
					}>
					<CharacterSelect teamName={team2Name} selectCharacter={selectCharacter2} />
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
			<NextButton active={nextActive} onClick={nextClick} page={page} />
		</div>
	);
}
