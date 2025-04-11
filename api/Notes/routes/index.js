var express = require('express');
var db = require('../db/init');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'Welcome to the Notes API' });
});

router.post('/note', function(req, res, next) {
  const { title, content, tags } = req.body;
  const stmt = db.prepare('INSERT INTO notes (title, content, tags) VALUES (?, ?, ?)');
  stmt.run(title, content, tags, function(err) {
    if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Failed to insert data' });
    }
    
    // Use this.lastID to get the ID of the inserted row
    res.status(201).json({ id: this.lastID });
});

stmt.finalize();
  
});

router.get('/notes', function(req, res, next) {
  const { tags } = req.query; // Get the tags from query parameters
  let query = 'SELECT * FROM notes';
  let params = [];

  if (tags) {
    query += ' WHERE tags = ?';
    params.push(tags);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Failed to retrieve data' });
    }

    res.json(rows);
  });
});


router.get('/note/:id', function(req, res, next) {
  const { id } = req.params;
  let query = 'SELECT * FROM notes where id = ?';
  let params = [id];

  db.all(query, params, (err, rows) => {
    if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Failed to retrieve data' });
    }

    res.json(rows);
  });
});


router.put('/note/:id', function(req, res, next) {
  const { id } = req.params;
  const { title, content, tags } = req.body;
  const stmt = db.prepare('UPDATE notes SET title = ?, content = ?, tags = ? WHERE id = ?');
  const info = stmt.run(title, content, tags, id);
  
  if (info.changes === 0) {
    return res.status(404).json({ message: 'Note not found' });
  }
  
  res.json({ message: 'Note updated successfully' });
});


router.post('/note/:id/delete', function(req, res, next) {
  const { id } = req.params;
  const stmt = db.prepare('DELETE FROM notes WHERE id = ?');
  const info = stmt.run(id);
  
  if (info.changes === 0) {
    return res.status(404).json({ message: 'Note not found' });
  }
  
  res.json({ message: 'Note deleted successfully' });
});




module.exports = router;
