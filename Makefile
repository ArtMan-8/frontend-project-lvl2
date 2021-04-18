install:
		npm install

lint:
		npm lint

test:
		npm test

test-coverage:
		npm test-coverage

publish:
		npm publish --dry-run

gendiff:
		node bin/gendiff.js

gendiff-linux:
		chmod +x bin/gendiff.js
		npm link

gendiff-windows:
		npm link

gendiff-uninstall:
		npm unlink