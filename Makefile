install:
		npm install

lint:
		npx eslint .

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