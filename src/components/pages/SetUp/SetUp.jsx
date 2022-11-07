import { React, useState, useEffect } from 'react';
import Style from './setUp.module.scss';
import { NextButton, BackButton } from 'components';

export default function SetUp() {
	const [page, setPage] = useState(0);
	const [nextActive, setNextActive] = useState(false);
	const [backActive, setBackActive] = useState(false);
	const [team1Name, setTeam1Name] = useState('');
	const [team2Name, setTeam2Name] = useState('');

	useEffect(() => {
		if (page === 0 && team1Name.length > 0 && team2Name.length > 0) {
			setNextActive(true);
		} else {
			setNextActive(false);
		}

		if (page > 0) {
			setBackActive(true);
		} else {
			setBackActive(false);
		}
	}, [page, team1Name, team2Name]);

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
			setPage(page + 1);
			setNextActive(false);
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
			</section>
			<section className={Style.Settings}>
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
					<h1>Team 1 Character</h1>
				</div>
				<div
					className={
						page === 0 ? Style.Character2Above : page === 1 ? Style.Character2 : Style.Character2Below
					}>
					<h1>Team 2 Character</h1>
				</div>
			</section>
			<section></section>
			<BackButton active={backActive} onClick={backClick} />
			<NextButton active={nextActive} onClick={nextClick} />
		</div>
	);
}
