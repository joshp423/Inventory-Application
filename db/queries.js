const pool = require("./pool");

async function getAllStock() {
    const {rows} = await pool.query("SELECT * FROM stock;");
    console.log(rows);
    return rows;
}

async function getAllCategories() {
    const {rows} = await pool.query("SELECT * FROM categories;");
    console.log(rows);
    return rows;
}

async function addNewStock(productTitle, productDesc, productPrice, productQuantity, productBrand, productCategory) {
    const {rows} = await pool.query(
        `INSERT INTO stock (title, description, price, quantity, brand, category) VALUES 
        ($1, $2, $3, $4, $5, $6);`,
        [productTitle, productDesc, productPrice, productQuantity, productBrand, productCategory]
    );
    console.log(rows);
    return rows;
}

async function getSelectedStockId(id) {
    console.log(id)
    const {rows} = await pool.query(
        `SELECT * FROM stock WHERE id = $1;`,
        [id]
    );
    console.log(rows);
    return rows;
}

async function getSelectedStockCat(cat) {
    console.log(cat)
    const {rows} = await pool.query(
        `SELECT *
        FROM stock
        JOIN categories
        ON categories.category = stock.category
        WHERE categories.category = $1;`,
        [cat]
    );
    console.log(rows);
    return rows;
}

async function editSelectedStock(productId, productTitle, productDesc, productPrice, productQuantity, productBrand, productCategory) {
    console.log(productId, productTitle, productDesc, productPrice, productQuantity, productBrand, productCategory)
    const {rows} = await pool.query(
        `UPDATE stock
        SET title = $1, description = $2, price = $3, quantity = $4, brand = $5, category = $6
        WHERE id = $7
        RETURNING *`,
        [productTitle, productDesc, productPrice, productQuantity, productBrand, productCategory, productId]
    );
    console.log(rows)
    return;
}

async function deleteSelectedStock(id) {
    console.log(id);
    const {rows} = await pool.query(
        `DELETE FROM stock WHERE id = $1;`,
        [id]
    );
    console.log(rows);
    return rows;
}

async function getCatCounts() {
    const {rows} = await pool.query(
        `SELECT category_id, COUNT(*) AS count
        FROM items
        GROUP BY category_id;`
    )
    console.log(rows)
    return rows;
}

async function editCategory(newTitle, categoryid, oldTitle) {
    console.log(newTitle, categoryid, oldTitle)
    await pool.query(
        `UPDATE categories
        SET category = $1
        WHERE id = $2;`,
        [newTitle, categoryid]
    )
    await pool.query(
        `UPDATE stock
        SET category = $1
        WHERE category = $2;`,
        [newTitle, oldTitle]
    )
    return;
}

async function getSelectedCatId(id){
    console.log(id);
    const { rows } = await pool.query(
        `SELECT * FROM categories
        WHERE id = $1;`,
        [id]
    )
    return rows[0];
}

async function deleteSelectedCategory(id) {
    console.log(id);
    const {rows} = await pool.query(
        `DELETE FROM categories WHERE id = $1;`,
        [id]
    );
    console.log(rows);
    return rows;
}

async function addNewCategory(title) {
    const {rows} = await pool.query(
        `INSERT INTO categories (category)
        VALUES ($1);`,
        [title]
    );
    console.log(rows);
    return rows; 
}

module.exports = {
    getAllStock,
    getAllCategories,
    addNewStock,
    getSelectedStockId,
    getSelectedStockCat,
    editSelectedStock,
    deleteSelectedStock,
    getCatCounts,
    editCategory,
    getSelectedCatId,
    deleteSelectedCategory,
    addNewCategory
}