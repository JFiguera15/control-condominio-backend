

app.get("/income", (req, res) => {
    const sql = "SELECT * FROM income where condo = \'" + req.query.id + "\'"
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    })
})

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