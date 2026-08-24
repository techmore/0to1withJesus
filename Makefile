.PHONY: test audit audit-links serve

test:
	npm test

audit:
	npm run audit

audit-links:
	npm run audit:links

serve:
	python3 -m http.server 8000
