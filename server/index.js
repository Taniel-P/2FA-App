const express = require('express');
const app = express();
const port = 3000;
const {submitNewUser, loginUser} = require('./controllers/loginControllers.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('client/dist'));


app.post('/submitNewUser', submitNewUser);
app.post('/logIn', loginUser);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
