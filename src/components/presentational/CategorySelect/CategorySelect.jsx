import React, { useState } from 'react';
import Style from './categorySelect.module.scss';

export default function CategorySelect(props) {
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
	const [categoriesSelected, setCategoriesSelected] = useState(0);
	const [rounds, setRounds] = useState(5);

	const selectCategory = (catId) => {
		if (categories[catId]) {
			// unselect and lower total count of selected categories
			const totalCat = categoriesSelected - 1;
			const catRemoved = { ...categories };
			catRemoved[catId] = false;
			props.selectCategory(catId, totalCat);
			setCategoriesSelected(totalCat);
			setCategories(catRemoved);
		} else if (!categories[catId]) {
			if (categoriesSelected < rounds) {
				// select and increase total amount of selected categories
				const totalCat = categoriesSelected + 1;
				const catAdded = { ...categories };
				catAdded[catId] = true;
				props.selectCategory(catId, totalCat);
				setCategoriesSelected(totalCat);
				setCategories(catAdded);
			} else {
				console.log(`max ${rounds} categories`);
			}
		}
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
					<div
						key={index}
						className={categories[index] ? Style.Selected : Style.Unselected}
						onClick={() => selectCategory(index)}>
						{char}
					</div>
				))}
			</div>
		</div>
	);
}
