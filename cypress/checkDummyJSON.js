const fs = require('fs');
const axios = require('axios');

const endpoints = [
  '/products',
  '/products/categories',
  '/users',
  '/carts',
  '/todos'
];

const baseUrl = 'https://dummyjson.com';

(async () => {
  let hasChanges = false;

  for (const endpoint of endpoints) {
    const url = `${baseUrl}${endpoint}`;
    const response = await axios.get(url);
    const newData = JSON.stringify(response.data);

    const fileName = `dummyjson${endpoint.replace(/\//g, '_')}.json`;
    const oldData = fs.existsSync(fileName) ? fs.readFileSync(fileName, 'utf-8') : '';

    if (newData !== oldData) {
      console.log(`Changes detected at ${endpoint}`);
      fs.writeFileSync(fileName, newData);
      hasChanges = true;
    }
  }

  if (hasChanges) {
    console.log('Changes detected in dummyjson.com. Running Cypress tests...');
    process.exit(0); // Run Cypress
  } else {
    console.log('No changes detected.');
    process.exit(1); // Skip Cypress
  }
})();
