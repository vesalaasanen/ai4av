const state = {
  specs: [],
  query: "",
};

const summary = document.querySelector("#summary");
const results = document.querySelector("#results");
const search = document.querySelector("#search");

function asText(value) {
  if (Array.isArray(value)) return value.join(", ");
  return value || "Not stated";
}

function render() {
  const query = state.query.trim().toLowerCase();
  const specs = query
    ? state.specs.filter((spec) => spec.searchText.includes(query))
    : state.specs;

  summary.className = "summary";
  summary.textContent = `${specs.length} of ${state.specs.length} specs`;

  results.innerHTML = specs.map((spec) => `
    <article class="spec">
      <h2><a href="../${spec.path}">${spec.title}</a></h2>
      <div class="meta">
        <span>${spec.manufacturer}</span>
        <span>${spec.modelFamily}</span>
        <span>${asText(spec.protocols)}</span>
        <span>${spec.actionCount} actions</span>
      </div>
      <div class="details">
        <section>
          <h3>Provenance</h3>
          <ul>${spec.sourceUrls.length ? spec.sourceUrls.map((url) => `<li><a href="${url}">${url}</a></li>`).join("") : "<li>No public source URL in export</li>"}</ul>
        </section>
        <section>
          <h3>Known Gaps</h3>
          <p>${asText(spec.knownGaps)}</p>
        </section>
        <section>
          <h3>Verification</h3>
          <p>${spec.verification.summary}</p>
        </section>
      </div>
    </article>
  `).join("");
}

search.addEventListener("input", () => {
  state.query = search.value;
  render();
});

fetch("./catalog-index.json")
  .then((response) => response.json())
  .then((data) => {
    state.specs = data.specs.map((spec) => ({
      ...spec,
      searchText: [
        spec.specId,
        spec.deviceId,
        spec.title,
        spec.manufacturer,
        spec.modelFamily,
        ...(spec.aliases || []),
        ...(spec.protocols || []),
      ].join(" ").toLowerCase(),
    }));
    render();
  })
  .catch((error) => {
    summary.className = "summary";
    summary.textContent = `Unable to load catalog-index.json: ${error.message}`;
  });
