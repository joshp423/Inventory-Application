const pool = require("./pool");

async function getAllStock() {
    const {rows} = await pool.query("SELECT * FROM stock");
    console.log(rows);
    return rows;
}

module.exports = {
    getAllStock,
}