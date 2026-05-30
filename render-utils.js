export function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function glossaryLinks(terms) {
  const links = terms
    .map((term) => `<button class="glossary-link" type="button" data-glossary-term="${escapeHtml(term)}">${escapeHtml(term)}</button>`)
    .join("");

  return `
    <div class="drawer-glossary-links" aria-label="Related glossary terms">
      <span>Related words</span>
      <div>${links}</div>
    </div>
  `;
}
