# Makefile
install:
	npm install

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run
	npm link --force

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8