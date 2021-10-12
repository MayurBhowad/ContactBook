const express = require('express');

const app = express();
const PORT = process.env.PORT || 4001;

app.use('/', express.static(__dirname + '/frontend/dist/Blog'))

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/frontend/dist/Blog/index.html")
})

app.listen(PORT, () => console.log(`api is running on port: ${PORT}`));