const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const routes = require('./routes');
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('./build'));

app.get('/session', routes.session.status);
app.post('/session', routes.session.create);
app.delete('/session', routes.session.delete);

app.get('/tasks/:username', routes.tasks.all.read);//
app.post('/tasks/:username', routes.tasks.one.add);//
app.get('/tasks/:username/:taskId', routes.tasks.one.read);//
app.put('/tasks/:username/:taskId', routes.tasks.one.update);
app.delete('/tasks/:username/:taskId', routes.tasks.one.delete);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
});