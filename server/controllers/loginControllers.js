const db = require('../../database/index.js');

exports.submitNewUser = (req, res) => {
  console.log('BODY', req.body)
  if (req.body.name === null && req.body.email === null && req.body.password === null) {
    res.status(200).send('Go to login page');
  } else {
  db.addUser(req.body)
  .then((data) => {
    console.log(data)
    res.status(200).send('Account Created');
  })
  .catch((err) => {
    console.log('submitNewUser Err', err);
    res.status(400).send('An error has occured');
  })
}
};

exports.loginUser = (req, res) => {
  db.logInUser(req.body)
  .then((data) => {
    if (data) {
      res.status(200).send('Successfully Logged In');
    } else {
      throw err;
    }
  })
  .catch((err) => {
    console.log('logInUser Err', err);
    res.status(400).send('Incorrect PW');
  })
};