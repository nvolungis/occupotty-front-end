# Production build
bundle-prod:
	# IMPORTANT --bail will ensure that the process exits with an error code
	# causing any other command consuming this to fail if there is an error bundling.
	rm -rf ./build/prod_build
	node ./node_modules/webpack/bin/webpack --config webpack.config.prod.js -p --progress --bail

run:
	node ./node_modules/webpack-dev-server/bin/webpack-dev-server --config webpack.config.dev.js --hot --progress --inline

dep:
	make bundle-prod && aws s3 sync build/prod_build/ s3://occupotty.info && aws s3 cp build/prod_build/index.html s3://occupotty.info --cache-control "max-age=0"

install-githooks:
	rm -f .git/hooks/pre-push
	ln -s ../../scripts/pre-push ./.git/hooks/pre-push
	chmod +x .git/hooks/pre-push

lint:
	./node_modules/.bin/eslint ./app

deploy-ssl:
	sudo AWS_ACCESS_KEY_ID="AKIAIPED2EPLMIGLFYKA" \
	AWS_SECRET_ACCESS_KEY="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" \
	letsencrypt --agree-tos -a letsencrypt-s3front:auth \
	--letsencrypt-s3front:auth-s3-bucket www.typewrite.us \
	-i letsencrypt-s3front:installer \
	--letsencrypt-s3front:installer-cf-distribution-id  E25F9F246CP3R7 \
	-d www.typewrite.us
	--verbose

