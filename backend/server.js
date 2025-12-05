const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: 'ucka.veleri.hr',
  user: 'ppilat',
  password: '11',
  database: 'ppilat'
});

db.connect(err => {
  if (err) {
    console.error('Greška pri spajanju:', err);
  } else {
    console.log('Povezano s MySQL bazom!');
  }
});

app.get('/auti', (req, res) => {
  db.query('SELECT * FROM auti', (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
});

app.listen(3000, () => console.log('Server radi na portu 3000'));
