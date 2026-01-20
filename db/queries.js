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

async function addNewStock(productTitle, productPrice, productQuantity, productBrand, productCategory) {
    const {rows} = await pool.query(
        `INSERT INTO stock (title, price, quantity, brand, category) VALUES 
        ($1, $2, $3, $4, $5)`,
        [productTitle, productPrice, productQuantity, productBrand, productCategory]
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

module.exports = {
    getAllStock,
    getAllCategories,
    addNewStock,
    getSelectedStock
}