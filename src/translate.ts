import crawl from './crawler';

const AVAILABLE_LANGUAGES = ['en', 'tr', 'de', 'fr', 'es'] as const;
const WEBPAGE_BASE = 'https://tureng.com';

type Language = (typeof AVAILABLE_LANGUAGES)[number];
export interface Translation {
	category: string;
	q: string;
	translated: string;
	key: number;
}

const languageTranslationsMap: Record<Language, Language[]> = {
	en: ['tr', 'de', 'fr', 'es'],
	tr: ['en'],
	de: ['en'],
	fr: ['en'],
	es: ['en'],
};

const languageNames: Record<Language, Partial<Record<Language, string>>> = {
	tr: {
		en: 'turkce-ingilizce',
	},
	en: {
		tr: 'turkish-english',
		de: 'german-english',
		fr: 'french-english',
		es: 'spanish-english',
	},
	de: {
		en: 'deutsch-englisch',
	},
	fr: {
		en: 'francais-anglais',
	},
	es: {
		en: 'espanol-ingles',
	},
};

// This function checks if the source language can be translated to the target language
function canTranslate(sourceLang: Language, targetLang: Language): boolean {
	return languageTranslationsMap[sourceLang].includes(targetLang);
}

// This function checks if the language is valid
function isValidLanguage(lang: string): lang is Language {
	return AVAILABLE_LANGUAGES.includes(lang as Language);
}

// This function builds the translation URL
function buildTranslateUrl(sourceLang: Language, targetLang: Language, word: string): string {
	return `${WEBPAGE_BASE}/${sourceLang}/${languageNames[sourceLang][targetLang]}/${word}`;
}

// This function translates the word
async function translate(sourceLang: Language, targetLang: Language, word: string): Promise<Translation[]> {
	const url = buildTranslateUrl(sourceLang, targetLang, word);

	return crawl(url);
}

const translator = {
	canTranslate,
	isValidLanguage,
	translate,
};

export default translator;
