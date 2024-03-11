import * as cheerio from 'cheerio';
import { Translation } from './translate';

function extractLinks(html: string): Translation[] {
	const $ = cheerio.load(html);

	// searchResultsTable
	const table = $('table#englishResultsTable tbody tr');

	const translations: Translation[] = [];
	let key = 0;
	table.each((_, el) => {
		const category = $(el).find('td').eq(1).text().trim();
		const q = $(el).find('td').eq(2).find('a').text().trim();
		const translated = $(el).find('td').eq(3).find('a').text().trim();
		const path = $(el).find('td').eq(2).find('a').attr('href') || '';

		if (!q) return;
		translations.push({ category, q, translated, key: key++, path });
	});

	return translations;
}

async function crawl(url: string): Promise<Translation[]> {
	// agent
	const response = await fetch(url, {
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
		},
	});
	console.log(response.status);

	const html = await response.text();

	return extractLinks(html);
}

export default crawl;
