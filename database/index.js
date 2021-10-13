const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const hp = require('./config.js');
const saltRounds = 10;

const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'loginDb'
  }
);

const addUser = (userInfoObj) => {
  return bcrypt.hash(userInfoObj.password, saltRounds)
    .then((hash) => {
      console.log('HASHER=', hash)
      return connection.promise().query(`INSERT INTO users (userName, userEmail, userPassword) VALUES ('${userInfoObj.name}', '${userInfoObj.email}', '${hash}') ON DUPLICATE KEY UPDATE userEmail = '${userInfoObj.email}';`)
        .then((data) => {
          console.log('DB DATA=', data)
          return data[0];
        })
    })
    .catch((err) => {
      console.log('ERR', err)
      return 'Email already exists';
    })
};

const logInUser = (userInfoObj) => {
  return connection.promise().query(`SELECT * FROM users WHERE userEmail = '${userInfoObj.email}'`)
  .then((data) => {
    let pw = data[0][0].userPassword
    return bcrypt.compare(userInfoObj.password, pw)
    .then((res) => {
      return res;
    })
  })
  .catch((err) => {
    console.log('logInUser DB Err', err)
    return 'Incorrect PW';
  })
};

module.exports.addUser = addUser;
module.exports.logInUser = logInUser;