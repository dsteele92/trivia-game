import { generateUrls } from '../utilities';

test('generatesUrls', () => {
	const testObject = { 0: 'medium', 1: 'medium', 9: 'hard', 11: 'medium', 18: 'easy' };
	const token = 'c32751925ac0001209fc48302bfb88d127289735835f3e13f5f2b1b2d1003471';
	expect(generateUrls(testObject, token)).toStrictEqual([
		'https://opentdb.com/api.php?amount=7&category=9&difficulty=medium&type=multiple&token=c32751925ac0001209fc48302bfb88d127289735835f3e13f5f2b1b2d1003471',
		'https://opentdb.com/api.php?amount=7&category=10&difficulty=medium&type=multiple&token=c32751925ac0001209fc48302bfb88d127289735835f3e13f5f2b1b2d1003471',
		'https://opentdb.com/api.php?amount=7&category=18&difficulty=hard&type=multiple&token=c32751925ac0001209fc48302bfb88d127289735835f3e13f5f2b1b2d1003471',
		'https://opentdb.com/api.php?amount=7&category=20&difficulty=medium&type=multiple&token=c32751925ac0001209fc48302bfb88d127289735835f3e13f5f2b1b2d1003471',
		'https://opentdb.com/api.php?amount=7&category=27&difficulty=easy&type=multiple&token=c32751925ac0001209fc48302bfb88d127289735835f3e13f5f2b1b2d1003471',
	]);
});
