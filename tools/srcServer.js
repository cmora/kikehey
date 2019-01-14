import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import bodyParser from 'body-parser';
import mailer from '../tools/mailer';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});



app.post('/contact', (req, res) => {
  const {
    email = '',
    name = '', 
    message = '', 
    subject = ''
  } = req.body;

  mailer({ email, name, message, subject }).then(() => {
    console.log(`Sent the message "${message}" from <${name}> ${email}.`);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      msg: 'success',
      user: {
        name,
        email
      }
    }));
  }).catch((error) => {
    console.log(`Failed to send the message "${message}" from <${name}> ${email} with the error ${error && error.message}`);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      msg: 'error'
    }));
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
