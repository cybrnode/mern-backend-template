rm -rf node_modules/
npm i
kill $(lsof -t -i:3001)
npm run start