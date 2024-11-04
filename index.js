const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

app.use(cors());
app.use(express.json());

//app.use(express.static('static'));

let db;

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
})();

//Function to fetch all the products from the database
async function fetchAllProducts() {
  let query = 'SELECT * FROM products';
  let response = await db.all(query, []);

  return { products: response };
}

//Endpoint 1: Fetch All Products
app.get('/products', async (req, res) => {
  let results = await fetchAllProducts();

  res.status(200).json(results);
});

//Function which returns products for a given brand from the database
async function fetchProductsByBrand(brand) {
  let query = 'SELECT * FROM products WHERE brand = ?';
  let response = await db.all(query, [brand]);

  return { products: response };
}

//Endpoint 2: Retrieve Products by Brand
app.get('/products/brand/:brand', async (req, res) => {
  let brand = req.params.brand;
  let result = await fetchProductsByBrand(brand);

  res.status(200).json(result);
});

//Function which returns products for a given category from the database
async function fetchProductsByCategory(category) {
  let query = 'SELECT * FROM products WHERE category = ?';
  let response = await db.all(query, [category]);

  return { products: response };
}

//Endpoint 3: Retrieve Products by Category
app.get('/products/category/:category', async (req, res) => {
  let category = req.params.category;
  let result = await fetchProductsByCategory(category);

  res.status(200).json(result);
});

//Function which returns products for a given stock details
async function fetchProductsByStock(stock) {
  let query = 'SELECT * FROM products WHERE stock = ?';
  let response = await db.all(query, [stock]);

  return { products: response };
}

//Endpoint 4: Retrieve Products by stocks
app.get('/products/stock/:stock', async (req, res) => {
  let stock = req.params.stock;
  let result = await fetchProductsByStock(stock);

  res.status(200).json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
