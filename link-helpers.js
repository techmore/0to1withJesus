export function amazonSearch(query) {
  return `https://www.amazon.com/s?k=${encodeURIComponent(query)}`;
}

export function youtubeSearch(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}
