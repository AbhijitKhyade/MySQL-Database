const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

//dotenv config
dotenv.config();

//database
const pool = require('./db');


const app = express();

app.use(express.json());
app.use(cors());

//routes
app.get('/', async (req, res) => {
    try {
        const [rows, fields] = await pool.query("SHOW TABLES");
        // console.log(rows, fields);
        const tableNames = rows.map(row => row[`Tables_in_${process.env.MYSQL_DATABASE}`]);
        // const tableNames = rows.map(row => Object.values(row)[0]);
        const tableList = tableNames.join('<br>'); // Join table names with commas
        res.send(`<h1>Tables in the database:</h1><h4>${tableList}</h4> \n`);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
