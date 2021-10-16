const Vonage = require('@vonage/server-sdk');
const key = require('../config.js');
const vonage = new Vonage({
  apiKey: key.apiKey,
  apiSecret: key.apiSecret
});
const db = require('../../database/index.js');

exports.submitNewUser = (req, res) => {
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
  if (req.body.name === null && req.body.email === null && req.body.password === null) {
    throw err;
  }
  db.logInUser(req.body)
  .then((data) => {
    if (data) {
      console.log('LOGIN DATA', data)
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

exports.twoFactorCheck = (req, res) => {
  let phoneNumber = '1' + req.body.phone;
  console.log(phoneNumber)
  console.log(typeof phoneNumber)
  vonage.verify.request({
    number: phoneNumber,
    brand: "Vonage"
  }, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log('RESULT', result)
      const verifyRequestId = result.request_id;
      res.status(200).send(verifyRequestId)
    }
  });
};

exports.twoFactorVerify = (req, res) => {
  let verificationNum = req.body.verification;
  let requestId = req.body.verifyRequestId;
  vonage.verify.check({
    request_id: requestId,
    code: verificationNum
  }, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
      if (result.status === '0') {
        res.status(200).send('2FA confirmed');
      } else {
        console.log('PIN ERROR', result)
      }
    }
  });
};