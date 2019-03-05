
import nodemailer from 'nodemailer';
const user = 'c.mora@cristhianmora.com';
const refreshToken = '1/wYYfm8d3JOToFnfpKdwyncL1J9JfYjz4q8GgLJZqtTI';
const accessToken = 'ya29.Glt2BjfcpgosfC79bxoCFOin_b1kN1_xJiBg_kcWZGWiUOpTZ151NGUWm9UhKQR1eCrPGVab2pk5jRc4CvdyeMl290QMjsEaIoGP-h2oO5fpulngsNBPp0uUaLu2';
const clientId = '358406048434-7a7tv8emnsvoq2oofr48c2e9p701ghvv.apps.googleusercontent.com';
const clientSecret = 'MACpMOV8mGhNnlpxD2k2SIGb';

const options = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user,
    clientId,
    clientSecret,
    refreshToken,
    accessToken
  }
};

const transporter = nodemailer.createTransport(options);

const send = ({ email, name, subject, message }) => {
  const from = name && email ? `${name} <${email}>` : `${name || email}`;
  const content = {
    from,
    to: 'wallace1610@gmail.com',
    subject: `New message from ${from} at Kikehey.com`,
    text: message,
    html: `<b>Subject:</b> ${subject} <br /><br /> <b>Message:</b><p>${message}</p>`,
    replyTo: from
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(content, (error, info) =>
      error ? reject(error) : resolve(info)
    );
  });
};

export default send;