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
  if (err) console.error('Greška pri spajanju:', err);
  else console.log('Povezano s MySQL bazom!');
});

app.get('/automobili', (req, res) => {
  db.query('SELECT * FROM automobili', (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
});

// GET /automobili - svi automobili s lokacijom
app.get('/automobili', (req, res) => {
    const sql = `
        SELECT a.*, l.grad AS lokacija
        FROM automobili a
        LEFT JOIN lokacije l ON a.lokacija_id = l.id
    `;

    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);

        results.forEach(r => {
            r.dostupno = r.dostupno === 1 ? 'Da' : 'Ne';
        });

    res.json(results);
  });
});

// GET /lokacije - lista svih lokacija
app.get('/lokacije', (req, res) => {
    const sql = 'SELECT * FROM lokacije';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// GET /pretraga - filtriranje po tipu, lokaciji
app.get('/pretraga', (req, res) => {
    const { marka, tip, mjenjac, gorivo, lokacija, dostupno} = req.query;
    let query = 'SELECT a.*, l.grad AS lokacija FROM automobili a JOIN lokacije l ON a.lokacija_id = l.id WHERE 1=1';
    const params = [];

    // Marke
    if (marka) {
        const markaArray = marka.split(',');
        query += ` AND marka IN (${markaArray.map(() => '?').join(',')})`;
        params.push(...markaArray);
    }

    // Tipovi
    if (tip) {
        const tipArray = tip.split(',');
        query += ` AND tip IN (${tipArray.map(() => '?').join(',')})`;
        params.push(...tipArray);
    }

    // Lokacija
    if (lokacija) {
        query += ` AND l.grad = ?`;
        params.push(lokacija);
    }

    // Dostupnost
    if(dostupno) { 
        query += ' AND dostupno = ?';
        params.push(dostupno);
    }

    //Mjenjač
    if(mjenjac) {
        query += ` AND mjenjac = ?`;
        params.push(mjenjac);
    }

    //Gorivo
    if(gorivo) {
        const gorArray = gorivo.split(',');
        query+= ` AND gorivo IN (${gorArray.map(() => '?').join(',')})`;
        params.push(...gorArray);
    }


    db.query(query, params, (err, results) => {
        if (err) return res.status(500).send(err);

        results.forEach(r => {
            r.dostupno = r.dostupno === 1;
        });

        res.json(results);
    });
});

app.get('/api/rezervacije/moje', (req, res) => {
  const userIdHeader = req.headers['x-user-id'];  // case-insensitive

  if (!userIdHeader) {
    return res.status(401).json({ error: 'Missing X-User-ID header' });
  }

  const userId = parseInt(userIdHeader);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID format' });
  }

  db.query(
    'SELECT rez.id, ' +
    'aut.naziv, ' +
    'rez.datum_od, ' +
    'rez.datum_do, ' +
    'rez.ukupna_cijena, ' +
    'rez.status ' +
    'FROM rezervacije rez left join automobili aut on rez.automobil_id = aut.id ' +
    'WHERE korisnik_id = ?',
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    }
  );
});

app.patch('/api/rezervacije/:id/otkazi', (req, res) => {
  const rezervacijaId = parseInt(req.params.id);
  const userIdHeader = req.headers['x-user-id'];

  if (!userIdHeader || isNaN(parseInt(userIdHeader))) {
    return res.status(400).json({ error: 'nepostojeći ili nepoznati ID korisnika' });
  }

  const userId = parseInt(userIdHeader);

  
  db.query(
    'UPDATE rezervacije SET status = "Otkazano" WHERE id = ? AND korisnik_id = ?',
    [rezervacijaId, userId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Greška u bazi' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Rezervacija nije pronađena ili nije "Potvrđeno"' });
      }

      res.json({ success: true, message: 'Rezervacija otkazana' });
    }
  );
});

app.listen(3000, () => console.log('Server radi na portu 3000'));