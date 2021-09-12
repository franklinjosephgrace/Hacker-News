const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('file-system').fs;
const _ = require('underscore');
const { Pool } = require("pg");
const pgPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: '5432'
});

pgPool.on('connect', client => {
    client
        .query("SELECT 1")
        .catch(err => console.error(err.stack));
});
const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));

// API calls
app.get('/api/hello', (req, res) => {
    res.json({ express: 'Hello From Express' });
});

app.get('/api/course', async(req, res) => {
    const courses = await pgPool.query(`SELECT id, "name", description FROM public.course order by id;`)
    res.json(courses.rows);
});

app.get('/api/course/:id', async(req, res) => {
    const id = req.params.id;
    const courses = await pgPool.query(`SELECT id, "name", description FROM public.course WHERE id = ${id}`)
    res.json(courses.rows[0]);
});

app.post('/api/course', async(req, res) => {
    const body = req.body;
    await pgPool.query(`INSERT INTO public.course("name", description) VALUES('${body.name}', '${body.description}');`)
    res.json(true);
});

app.put('/api/course', async(req, res) => {
    const body = req.body;
    await pgPool.query(`UPDATE public.course SET "name"='${body.name}', description='${body.description}' WHERE id=${body.id};`)
    res.json(true);
});

app.delete('/api/course/:id', async(req, res) => {
    const id = req.params.id;
    await pgPool.query(`DELETE FROM public.course WHERE id=${id};`)
    res.json(true);
});

app.listen(port, () => console.log(`Express app listening at http://localhost:${port}`));