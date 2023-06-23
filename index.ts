import Scraper from './scraper';
import { generateJSONResponse, generateErrorJSONResponse } from './json-response';

import { config } from './config';
import html from './html';
import contentTypes from './content-types';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request: Request) {
  const url = new URL(request.url)

  const scrapeUrl: string = config.CF_DOMAINLISTING_URL;
  const scrapeSelector = config.CF_DOMAINLISTING_SELECTOR

  const searchParams = url.searchParams;
  const pretty = !!searchParams.get('pretty');

  if (!scrapeUrl || !scrapeSelector) {
    return generateErrorJSONResponse('Missing required parameters in config', pretty)
  }

  if (!url.pathname.endsWith('/api/')) {
    return new Response(html, {
      headers: { 'content-type': contentTypes.html }
    })
  }

  return handleAPIRequest({ scrapeUrl, scrapeSelector, pretty });
}

async function handleAPIRequest({ scrapeUrl, scrapeSelector, pretty }: { scrapeUrl: string, scrapeSelector: string, pretty: boolean; }) {
  let scraper, result

  try {
    scraper = await new Scraper().fetch(scrapeUrl)
  } catch (error) {
    return generateErrorJSONResponse(error, pretty)
  }

  try {
    result = await scraper.querySelector(scrapeSelector).getText()
  } catch (error) {
    return generateErrorJSONResponse(error, pretty)
  }

  return generateJSONResponse(result, pretty)
}
