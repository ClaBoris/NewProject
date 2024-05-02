require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const morgan = require("morgan");

const app = express();


app.use(cors());
app.use(express.json());

//GET ALL PRODUCTS
app.get("/api/v1/products", async (req, res) => {

    try {
        const results = await db.query("select * from products ");
        
        res.status(200).json({
            status: "success", results: results.rows.length,
            data: {
                product: results.rows,
            },
        });

    } catch (err) {
        console.log(err);
    }
});

//Get a Product
app.get("/api/v1/products/:id", async (req, res) => {
    console.log(req.params.id);

    try {
        const results = await db.query("select * from products where id = $1", [req.params.id]);


        res.status(200).json({
            status: "success",
            data: {
                product: results.rows[0],
            }
        });
    } catch (err) {
        console.log(err);
    }

});

//Create a Product
app.post("/api/v1/products", async (req, res) => {
    console.log(req.body);
    
    try {
        const results = await db.query("INSERT INTO products (name, price) values ($1, $2) returning *", [req.body.name, req.body.price]);
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                product: results.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }

});


//Update 
app.put("/api/v1/products/:id", async (req, res) => {
    try {
        const results = await db.query("UPDATE products SET name = $1, price = $2 where id = $3 returning *", [req.body.name, req.body.price, req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                product: results.rows[0],
            }
        });
    } catch (err) {
        console.log(err);
    }

});

//Delete Product

app.delete("/api/v1/products/:id", async (req, res) => {

    try {
        const results = await db.query("DELETE FROM products where id = $1", [req.params.id]);
        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.log(err);
    }

});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});