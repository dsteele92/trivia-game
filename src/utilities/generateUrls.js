export default function generateUrls(categoryIds, token) {
	let urls = [];
	Object.entries(categoryIds).forEach((entry) => {
		let difficulty = '';
		if (entry[1] !== 'any') {
			difficulty = `&difficulty=${entry[1]}`;
		}
		const category = `&category=${Number(entry[0]) + 9}`;
		let url = `https://opentdb.com/api.php?amount=7${category}${difficulty}&type=multiple&token=${token}`;
		urls.push(url);
	});
	// console.log(urls);
	return urls;
}
