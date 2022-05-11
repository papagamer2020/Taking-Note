const express = require('express');

const PORT = process.env.PORT || 3001;
// Instantiate the server
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// parse incoming JSON data
app.use(express.json());
app.use(require("./routes/apiRoutes"));
app.use(require("./routes/htmlRoutes"));

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});