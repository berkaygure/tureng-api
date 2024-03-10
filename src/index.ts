import translator from './translate';

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// only allow GET requests
		if (request.method !== 'GET') {
			return new Response('Method not allowed', { status: 405 });
		}

		const params = new URL(request.url).searchParams;

		const sourceLang = params.get('sl') || 'tr';
		const targetLang = params.get('tl') || 'en';
		const word = params.get('q');

		// Check if the languages are valid
		if (!(translator.isValidLanguage(sourceLang) && translator.isValidLanguage(targetLang))) {
			return new Response('Invalid language', { status: 400 });
		}

		// Check if the translation is supported
		if (!translator.canTranslate(sourceLang, targetLang)) {
			return new Response('Translation not supported', { status: 400 });
		}

		// Check if the word is provided
		if (!word) {
			return new Response('Q param is required', { status: 400 });
		}

		const translations = await translator.translate(sourceLang, targetLang, word);
		return new Response(JSON.stringify(translations), {
			headers: { 'content-type': 'application/json' },
		});
	},
};
