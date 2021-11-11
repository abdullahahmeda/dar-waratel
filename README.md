# Quran School Application (Backend)

## How to run
1. Rename `config.example.json` to `config.json` and edit it with your database conenction.
2. Rename `knexfile.example.js` to `knexfile.js` and edit it with your database conenction.
3. Run `npm install`
4. Run `npx knex migrate:latest` to run all the migrations in `migrations` folder.
5. Run `npm knex seed:run` to run all seed files in `seeds` folder.
6. `npm run dev` ;)