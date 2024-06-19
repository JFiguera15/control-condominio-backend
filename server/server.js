const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
const app = express();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "control_condominio"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/users", (req, res) => {
    const sql = "SELECT id, name, user FROM users"
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    })
})

app.get("/income", (req, res) => {
    const sql = "SELECT * FROM income where condo = \'" + req.query.id + "\'"
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    })
})

app.get("/houses", (req, res) => {
    const sql = "SELECT * FROM houses where condo = \'" + req.query.id + "\'"
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    })
})

app.get("/expenses", (req, res) => {
    const sql = "SELECT * FROM expenses where condo = \'" + req.query.id + "\'"
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT user, password FROM users";
    connection.query(sql, req.body.id, (err, data) => {
        if (err) return res.json("Error al logear");
        if (data.length === 0) return res.json("Usuario incorrecto");
        else if (bcrypt.compareSync(req.body.password, data[0].password)) return res.json(data);
        return res.json("Contraseña incorrecta");
    })
});

app.post('/add_user', (req, res) => {
    let data = req.body;
    let salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(data.password, salt);
    const sql = "INSERT INTO users (name, user, password) VALUES (?, ?, ?)";
    connection.query(sql,
        [data.name, data.user, password], function (err, result) {
            if (err) throw err;
            return res.json("Agregado correctamente")
        });
});

app.post('/add_house', (req, res) => {
    let data = req.body;
    const sql = "INSERT INTO houses VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(sql,
        [data.condo, data.number, data.name_owner, data.id_owner,
        data.email_owner, data.phone_owner], function (err, result) {
            if (err) throw err;
            return res.json("Agregado correctamente")
        });
});

app.post('/add_income', (req, res) => {
    let data = req.body;
    const sql = "INSERT INTO income VALUES (?, ?, ?, ?, ?, ?, ?)";
    connection.query(sql,
        [data.condo, data.house_number, data.month, data.year,
        data.total_bs, data.total_usd, data.ref], function (err, result) {
            if (err) throw err;
            return res.json("Agregado correctamente")
        });
});

app.post('/add_expense', (req, res) => {
    let data = req.body;
    const sql = "INSERT INTO expenses VALUES (?, ?, ?, ?, ?)";
    connection.query(sql,
        [data.condo, data.concept, data.date,
        data.total_bs, data.total_usd], function (err, result) {
            if (err) throw err;
            return res.json("Agregado correctamente")
        });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});