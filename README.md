# Brozer API 

A good prototype of how we gonna ask questions to someone to offer him the best product possible.

## Work done

Yet we have few things : 

- Scrapping features (retrieve data with batch from a list of products)
- Matching features (match computers and GPU abilities / CPU performances together)

## Usage 

**CLI**
```
# Scrape datas
node scripts/scrape.js --help

# Match all products, print the first.
node scripts/match.js
```

**API**

1. Start the API
```
yarn start 
# or npm style
npm start
```

2. Access the endpoint
```
http://localhost:7777/ask/scrapThenMatch

# or do it on Materiel.net directly
http://localhost:7777/ask/scrapThenMatch?source=materiel.net
```

3. Enjoy! A JSON will be printed on the browser.

## Credits

- Mathieu Robert (@makanikki) - Diviliper
- Zachary Dahan (@TheSuperFly) - Diviliper