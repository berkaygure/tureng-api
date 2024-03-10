# Tureng Translate API

[https://tureng-api.bgure.workers.dev?sl=tr&tl=en&q=merhaba](https://tureng-api.bgure.workers.dev?sl=tr&tl=en&q=merhaba)

## Description

This is a simple API for translating words between supported languages.

### Supported Translations

- Turkish to English
- German to English
- French to English
- Spanish to English
- English to Turkish
- English to German
- English to French
- English to Spanish

## Usage

```
curl -X GET "https://tureng-api.bgure.workers.dev?sl=tr&tl=en&q=merhaba" -H "accept: application/json"
```

### Query Params

```json
{
	"sl": "tr", // source language
	"tl": "en", // target language
	"q": "merhaba" // word to translate
}
```

### Response

```typescript
{
	category: string;
	q: string;
	translated: string;
	key: string;
}
```
