const { editStockGet } = require("../controllers/indexController");
const pool = require("./pool");

async function getAllStock() {
    const {rows} = await pool.query("SELECT * FROM stock");
    console.log(rows);
    return rows;
}

async function getAllCategories() {
    const {rows} = await pool.query("SELECT * FROM categories");
    console.log(rows);
    return rows;
}

async function addNewStock(productTitle, productDesc, productPrice, productQuantity, productBrand, productCategory) {
    const {rows} = await pool.query(
        `INSERT INTO stock (title, description, price, quantity, brand, category) VALUES 
        ($1, $2, $3, $4, $5, $6)`,
        [productTitle, productDesc, productPrice, productQuantity, productBrand, productCategory]
    );
    console.log(rows);
    return rows;
}

async function getSelectedStock(category, param) {
    const {rows} = await pool.query(
        `SELECT * FROM stock WHERE $1 = $2`,
        [category, param]
    );
    console.log(rows);
    return rows;
}

async function editSelectedStock(productId, productTitle, productDesc, productPrice, productQuantity, productBrand, productCategory) {
    await pool.query(
        `UPDATE stock
        SET title = $1, description = $2, price = $3, quantity = $4, brand = #5, category = $6 FROM stock WHERE $1 = $2
        WHERE id = $7`,
        [productTitle, productDesc, productPrice, productQuantity, productBrand, productCategory, productId]
    );
}

module.exports = {
    getAllStock,
    getAllCategories,
    addNewStock,
    getSelectedStock,
    editSelectedStock
}