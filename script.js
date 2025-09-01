const morningBrewURL = "https://docs.google.com/spreadsheets/d/11NFLmbmuMRyXSX9QXNYJ4COHAo7fK4rZZ-0W1Dt51C8/gviz/tq?tqx=out:json&gid=0";
const satireURL = "https://docs.google.com/spreadsheets/d/11NFLmbmuMRyXSX9QXNYJ4COHAo7fK4rZZ-0W1Dt51C8/gviz/tq?tqx=out:json&gid=209687342";

function parseSheetJSON(rawText) {
  const json = JSON.parse(rawText.substr(47).slice(0, -2));
  return json.table.rows.map(r => r.c.map(c => (c ? c.v : "")));
}

function loadMorningBrew() {
  fetch(morningBrewURL)
    .then(res => res.text())
    .then(txt => {
      const rows = parseSheetJSON(txt);
      const container = document.getElementById("morningbrew-container");
      rows.slice(1).forEach(r => {
        const [title, platform, embedURL] = r;
        if (!embedURL) return;
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <iframe src="${embedURL}" allowfullscreen></iframe>
          <h3>${title}</h3>
        `;
        container.appendChild(card);
      });
    });
}

function loadSatire() {
  fetch(satireURL)
    .then(res => res.text())
    .then(txt => {
      const rows = parseSheetJSON(txt);
      const container = document.getElementById("satire-container");
      rows.slice(1).forEach(r => {
        const [siteTitle, pageTitle, joke, link] = r;
        if (!siteTitle && !pageTitle && !joke) return;
        const card = document.createElement("div");
        card.className = `card ${siteTitle.toLowerCase().replace(/[^a-z]/g, '')}`;
        card.innerHTML = `
          <h4 class="site-title">${siteTitle}</h4>
          ${pageTitle ? `<h3 class="page-title">${link ? `<a href="${link}" target="_blank">${pageTitle}</a>` : pageTitle}</h3>` : ""}
          ${joke ? `<p class="joke">${joke}</p>` : ""}
        `;
        container.appendChild(card);
      });
    });
}