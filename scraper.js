const cleanText = s => s.trim().replace(/^\./g, '').replace(/\s\s+/g, ' ') // Clean: some TLD begin with a dot, remove extra spaces

export default class Scraper {
  constructor() {
    this.rewriter = new HTMLRewriter()
    return this
  }

  async fetch(url) {
    this.url = url
    this.response = await fetch(url)

    const server = this.response.headers.get('server')

    const isThisWorkerErrorNotErrorWithinScrapedSite = (
      [530, 503, 502, 403, 400].includes(this.response.status) &&
      (server === 'cloudflare' || !server /* Workers preview editor */)
    )

    if (isThisWorkerErrorNotErrorWithinScrapedSite) {
      throw new Error(`Status ${ this.response.status } requesting ${ url }`)
    }

    return this
  }

  querySelector(selector) {
    this.selector = selector
    return this
  }

  async getText() {
    const matches = {}
    const selectors = new Set(this.selector.split(',').map(s => s.trim()))
    const key = selectors.size > 1 ? selector : 'domains'

    selectors.forEach((selector) => {
      matches[key] = []

      let nextText = ''

      this.rewriter.on(selector, {
        element(element) {
          matches[key].push(true)
          nextText = ''
        },

        text(text) {
          nextText += text.text

          if (text.lastInTextNode) {
            matches[key].push(nextText)
            nextText = ''
          }
        }
      })
    })

    const transformed = this.rewriter.transform(this.response)

    await transformed.arrayBuffer()

    selectors.forEach((selector) => {
      const nodeCompleteTexts = []

      let nextText = ''

      matches[key].forEach(text => {
        if (text === true) {
          if (nextText.trim() !== '') {
            nodeCompleteTexts.push(cleanText(nextText))
            nextText = ''
          }
        } else {
          nextText += text
        }
      })

      const lastText = cleanText(nextText)
      if (lastText !== '') nodeCompleteTexts.push(lastText)
      matches[key] = nodeCompleteTexts
    })

    return matches
  }
}
