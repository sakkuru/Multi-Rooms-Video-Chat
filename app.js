const express = require('express');
const app = express();
app.set('view engine', 'ejs');

const port = process.env.port || process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log('server is listening on port %s', port);
});

app.get('/:room', (req, res) => {
    const roomName = req.params.room;
    res.render('index', { roomName: roomName });
});

app.get('/public/:file', (req, res) => {
    const fileName = req.params.file;
    res.sendFile(__dirname + '/' + fileName);
});