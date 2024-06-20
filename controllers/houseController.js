app.get("/houses", (req, res) => {
    const sql = "SELECT * FROM houses where condo = \'" + req.query.id + "\'"
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    })
})

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
