const express = require("express");
const sqlite3 = require("sqlite3");
const cors = require("cors");

const app = express();
const port = 3500;

app.use(cors());

const db = new sqlite3.Database("dua_main.sqlite", (err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

app.get("/catagorys", (req, res) => {
  db.all("SELECT * FROM category", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get("/sub_catagorys/:cat_id", (req, res) => {
  const { cat_id } = req.params;
  console.log(req.params);
  db.all(`SELECT * FROM sub_category where cat_id = ${cat_id}`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get("/subCateDuas/:subCat_id", (req, res) => {
  const { subCat_id } = req.params;
  console.log(req.params);
  db.all(`SELECT * FROM dua where subcat_id = ${subCat_id}`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get("/CategoryDuas/:cat_id", (req, res) => {
  const { cat_id } = req.params;
  console.log(req.params);
  db.all(`SELECT * FROM dua WHERE cat_id = ${cat_id}`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Closed the database connection.");
    process.exit();
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
