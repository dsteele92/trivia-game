import React, { useState } from 'react';
import Style from './categorySelect.module.scss';

import { GiSmashArrows } from 'react-icons/gi';
import { HiOutlineArrowSmUp, HiOutlineArrowSmDown } from 'react-icons/hi';

export default function CategorySelect(props) {
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
	const [categoriesSelected, setCategoriesSelected] = useState(0);
	const [rounds, setRounds] = useState(props.rounds);

	const selectCategory = (catId) => {
		if (categories[catId].selected) {
			// unselect category and lower total count of selected categories
			const totalCat = categoriesSelected - 1;
			const catRemoved = { ...categories };
			catRemoved[catId].selected = false;
			props.selectCategory(catId, totalCat);
			setCategoriesSelected(totalCat);
			setCategories(catRemoved);
		} else if (!categories[catId].selected) {
			if (categoriesSelected < rounds) {
				// select category and increase total amount of selected categories
				const totalCat = categoriesSelected + 1;
				const catAdded = { ...categories };
				catAdded[catId].selected = true;
				props.selectCategory(catId, totalCat);
				setCategoriesSelected(totalCat);
				setCategories(catAdded);
			} else {
				console.log(`max ${rounds} categories`);
			}
		}
	};

	const selectDifficulty = (catId, direction) => {
		const updated = { ...categories };
		let difficulty = categories[catId].difficulty;
		if (direction === 'up') {
			if (difficulty < 3) {
				difficulty++;
			} else {
				difficulty = 0;
			}
		} else {
			if (difficulty > 0) {
				difficulty--;
			} else {
				difficulty = 3;
			}
		}
		updated[catId].difficulty = difficulty;
		props.selectDifficulty(catId, difficulty);
		setCategories(updated);
	};

	const selectRounds = (amount) => {
		if (rounds !== amount) {
			setRounds(amount);
			props.selectRounds(amount, categoriesSelected);
		}
	};

	return (
		<div className={Style.CategorySelect}>
			<h2>Select Number of Rounds:</h2>
			<div className={Style.SelectRounds}>
				<div className={rounds === 3 ? Style.RoundsSelected : Style.Rounds} onClick={() => selectRounds(3)}>
					3
				</div>
				<div className={rounds === 5 ? Style.RoundsSelected : Style.Rounds} onClick={() => selectRounds(5)}>
					5
				</div>
				<div className={rounds === 7 ? Style.RoundsSelected : Style.Rounds} onClick={() => selectRounds(7)}>
					7
				</div>
			</div>
			<h2>Select Categories - Pick {rounds}:</h2>
			<div className={Style.CategoryList}>
				{props.categoriesList.map((char, index) => (
					<div key={index} className={categories[index].selected ? Style.Selected : Style.Unselected}>
						<p>{char}</p>
						<div className={Style.ClickableArea} onClick={() => selectCategory(index)}></div>
						{categories[index].selected ? (
							<div className={Style.Difficulty}>
								<div className={Style.Arrows}>
									<div className={Style.Arrow} onClick={() => selectDifficulty(index, 'up')}>
										<HiOutlineArrowSmUp />
									</div>
									<div className={Style.Arrow} onClick={() => selectDifficulty(index, 'down')}>
										<HiOutlineArrowSmDown />
									</div>
								</div>
								<div
									className={Style[`Slider${categories[index].difficulty}`]}
									onClick={() => selectDifficulty(index, 'up')}>
									<div className={Style.Option}>Any</div>
									<div className={Style.Option}>Hard</div>
									<div className={Style.Option}>Medium</div>
									<div className={Style.Option}>Easy</div>
								</div>
							</div>
						) : (
							''
						)}
					</div>
				))}
			</div>
		</div>
	);
}
