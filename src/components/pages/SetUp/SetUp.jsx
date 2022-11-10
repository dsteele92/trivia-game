import { React, useState, useEffect } from 'react';
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
		0: false,
		1: false,
		2: false,
		3: false,
		4: false,
		5: false,
		6: false,
		7: false,
		8: false,
		9: false,
		10: false,
		11: false,
		12: false,
		13: false,
		14: false,
		15: false,
		16: false,
		17: false,
		18: false,
		19: false,
		20: false,
		21: false,
		22: false,
		23: false,
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
		if (categories[catId]) {
			const catRemoved = { ...categories };
			catRemoved[catId] = false;
			setCategories(catRemoved);
		} else {
			const catAdded = { ...categories };
			catAdded[catId] = true;
			setCategories(catAdded);
		}

		if (totalCat === rounds) {
			setCategoriesMinSet(true);
		} else {
			setCategoriesMinSet(false);
		}
	};

	const selectRounds = (amount, totalCat) => {
		setRounds(amount);
		if (totalCat === amount) {
			setCategoriesMinSet(true);
		} else {
			setCategoriesMinSet(false);
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
				const ids = [];
				Object.values(categories).forEach((bool, index) => {
					if (bool) {
						const id = index + 9;
						ids.push(id);
					}
				});
				setCategoryIds(ids);
			}
			if (page < 2) {
				setNextActive(false);
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
