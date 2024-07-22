const express = require('express')
const mysql = require('mysql');

const app = express();
app.use(express.json());

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mysql_node.js',
    port: '3306'
})

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL database = ', err)
        return;
    }
    console.log('MySQL successfully connected!');
})
// CREATE item
app.post("/createitem", async (req, res) => {
    const { QRID,Iname,total } = req.body;

    try {
        connection.query(
            "INSERT INTO item(QRID,Itemname,total) VALUES(?, ?, ?)",
            [QRID,Iname,total],
            (err, results, fields) => {
                if (err) {
                    console.log("Error while inserting a item into the database", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "New Item successfully created!"});
            }
        )
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})
// CREATE users
app.post("/createusers", async (req, res) => {
    const { UID,fname} = req.body;

    try {
        connection.query(
            "INSERT INTO users(UID,fullname) VALUES(?, ?)",
            [UID,fname],
            (err, results, fields) => {
                if (err) {
                    console.log("Error while inserting users into the database", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "New users successfully created!"});
            }
        )
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})
// READ ALL ITEM
app.get("/item", async (req, res) => {
    try {
        connection.query("SELECT * FROM item", (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})
// READ ALL ITEM
app.get("/users", async (req, res) => {
    try {
        connection.query("SELECT * FROM users", (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})
// READ single item from db
app.get("/item/:QRID", async (req, res) => {
        const QRID = req.params.QRID;

    try {
        connection.query("SELECT * FROM item WHERE QRID = ?",[QRID], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})
// READ single users from db
app.get("/users/:UID", async (req, res) => {
    const UID = req.params.UID;

try {
    connection.query("SELECT * FROM users WHERE UID = ?",[UID], (err, results, fields) => {
        if (err) {
            console.log(err);
            return res.status(400).send();
        }
        res.status(200).json(results)
    })
} catch(err) {
    console.log(err);
    return res.status(500).send();
}
})
// UPDATE data
app.patch("/update/:QRID", async (req, res) => {
        const QRID =req.params.QRID;
        const Newtotal = req.body.Newtotal;

    try {
        connection.query("UPDATE item SET total = ? WHERE QRID = ?", [Newtotal,QRID],(err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json({ message: "Item updated successfully!"});
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})
app.listen(3000, () => console.log('Server is running on port 3000'));