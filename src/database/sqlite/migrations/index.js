const sqliteConnection = require('../../sqlite');
const createCategories = require('./createCategories');
const createDishes = require('./createDishes');
const createUsers = require('./createUsers');

async function migrationsRun() {
    const schemas = [
        createUsers,
        createDishes,
        createCategories
    ].join('');

    sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error));
}

module.exports = migrationsRun;  