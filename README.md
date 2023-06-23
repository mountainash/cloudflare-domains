# Cloudflare Domains

> List of TLDs supported by Cloudflare Registrar

This script is powered by [Cloudflare Workers](https://workers.cloudflare.com/), heavily utilizing [HTMLRewriter](https://developers.cloudflare.com/workers/reference/apis/html-rewriter/) for parsing [their own HTML list of domains](https://www.cloudflare.com/tld-policies/).

## 🕸️ API

`GET` requests can be made against <https://www.truthdomains.net/cloudflare-registrar/api/>

### API Query Args `pretty` (optional)

<https://www.truthdomains.net/cloudflare-registrar/api/?pretty=true>

  - When `false` or not included, JSON is minified
  - When `true`, JSON is formatted using `JSON.stringify(json, null, 2)`

## 💻 Development

To develop locally follow these steps:

1. Installing the Workers CLI:

```sh
bun install
```

2. Run the preview/watcher inside the repo:

```sh
bunx wrangler dev
```

This will open up the Workers dev experience, so you can test and debug the code. The main source can be found in `index.ts`.

## 🚀 Deploying

Web Scraper is deployed automatically when changes are pushed to master using a [GitHub Action](https://github.com/features/actions) and the [Workers CLI](https://github.com/cloudflare/wrangler).

Or manually using:

```sh
bunx wrangler dev deploy
```

## Resources

- [Workers Docs](https://developers.cloudflare.com/workers/)
  - [HTMLRewriter](https://developers.cloudflare.com/workers/reference/apis/html-rewriter/)
- [SVG 3D Tag Cloud jQuery plugin](https://github.com/NiklasKnaack/jquery-svg3dtagcloud-plugin) (using without using jQuery)

## Credits

 - Web Scraper was created by [Adam Schwartz](https://adamschwartz.co)
