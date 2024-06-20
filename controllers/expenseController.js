app.get("/expenses", (req, res) => {
    const sql = "SELECT * FROM expenses where condo = \'" + req.query.id + "\'"
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    })
})

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