export default `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Cloudflare TLD Domain List</title>

  <meta name="description" content="List of TLDs supported by Cloudflare Registrar">
  <meta name="keywords" content="domain name, TLD, brand name, register, registry, Cloudflare">

  <meta property="og:type" content="website">
  <meta property="og:title" content="Web Scraper">
  <meta property="og:description" content="List of TLDs supported by Cloudflare Registrar">
  <meta property="og:url" content="https://www.truthdomains.net/cloudflare-registrar/">

  <meta name="twitter:site" content="@mountainash">
  <meta name="twitter:creator" content="@mountainash">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Web Scraper">
  <meta name="twitter:description" content="List of TLDs supported by Cloudflare Registrar">
  <meta name="twitter:url" content="https://www.truthdomains.net/cloudflare-registrar/">

  <script src="https://cdn.jsdelivr.net/gh/NiklasKnaack/jquery-svg3dtagcloud-plugin@master/js/jquery.svg3dtagcloud.js"></script>

  <style>
  body {
    height: 100dvh;
    margin: 0;
    background: #000;
    color: #FFF;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", sans-serif;
    text-align: center;
  }

  main {
    display: flex;
    flex-direction: column;

    height: 100vh;
  }

  h1,
  p {
    margin: 1em;
  }
  a {
    color: #fba056;
  }
  </style>
  </head>
  <body>

    <main>

      <h1>Cloudflare Domain Name Registrar</h1>

      <p>Cloudflare Registrar offers domain registration services for top-level domains (TLDs). Shown are TLDs  currently supported - a total of <strong id="domain-count">0</strong>!</p>

      <div id="domain-cloud"></div>

      <p><a href="https://developers.cloudflare.com/registrar/get-started/register-domain/">Learn more about <strong>Cloudflare Registrar</strong></a> | <a href="https://www.truthdomains.net/?ref=cfglobe">Learn more about <strong>TRUTH DOMAINS</strong></a></p>

      <p><a href="https://github.com/mountainash/cloudflare-domains">Fork me on Github</a></p>

    </main>

  <script>
  const settings = {
    entries: [{
      label: 'Loading...',
      url: 'https://www.cloudflare.com/tld-policies/'
    }],
    width: window.innerWidth,
    height: window.innerWidth,
    radius: '65%',
    radiusMin: 75,
    bgDraw: false,
    opacityOver: 1.0,
    opacityOut: 0.15,
    opacitySpeed: 3,
    fov: 600,
    speed: .2,
    fontFamily: 'Menlo, "SF Mono", "Andale Mono", "Roboto Mono", Monaco, monospace',
    fontSize: window.innerWidth < 500 ? '.5rem' : '1.1rem',
    fontColor: "#fba056",
    fontStretch: "expanded", // wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
  };

  var cloud = new SVG3DTagCloud(document.getElementById('domain-cloud'), settings);

  fetch('./api/')
    .then(response => response.json())
    .then(data => {
      if (!data.domains) {
        return [{
          label: 'Unable to load domain data',
          url: 'https://www.cloudflare.com/tld-policies/'
        }]
      }

      return data.domains.map(item => { return {label: '.'+item} })
    })
    .then(entries => {
      cloud.setEntries(entries);

      document.getElementById('domain-count').innerHTML = entries.length
    })
  </script>
</body>
</html>`
