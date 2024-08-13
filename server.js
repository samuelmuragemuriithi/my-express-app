const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Task management
let tasks = [];
let nextId = 1;

// GET /tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// GET /tasks/:id
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (task) res.json(task);
    else res.status(404).send('Task not found');
});

// POST /tasks
app.post('/tasks', (req, res) => {
    const task = {
        id: nextId++,
        title: req.body.title,
        description: req.body.description,
        status: 'pending'
    };
    tasks.push(task);
    res.status(201).json(task);
});

// PUT /tasks/:id
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (task) {
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.status = req.body.status || task.status;
        res.json(task);
    } else res.status(404).send('Task not found');
});

// DELETE /tasks/:id
app.delete('/tasks/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index !== -1) {
        tasks.splice(index, 1);
        res.status(204).send();
    } else res.status(404).send('Task not found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
