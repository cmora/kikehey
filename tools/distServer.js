import express from 'express';
import path from 'path';
import open from 'open';
import bodyParser from 'body-parser';
import mailer from '../tools/mailer';
import compression from 'compression';

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(compression());
app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join( __dirname, '../dist/index.html'));
});

app.post('/contact', (req, res) => {
  const { email = '', name = '', message = '' } = req.body;

  mailer({ email, name, text: message }).then(() => {
    console.log(`Sent the message "${message}" from <${name}> ${email}.`);
    res.redirect('/#success');
  }).catch((error) => {
    console.log(`Failed to send the message "${message}" from <${name}> ${email} with the error ${error && error.message}`);
    res.redirect('/#error');
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
