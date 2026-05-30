.PHONY: test serve

test:
	npm test

serve:
	python3 -m http.server 8000
