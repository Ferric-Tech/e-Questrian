const functions = require('firebase-functions');
import * as admin from 'firebase-admin';
admin.initializeApp();
const auth = admin.auth();

const cors = require('cors')({ origin: true });
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com', // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
    ciphers: 'SSLv3',
  },
  auth: {
    user: 'e-questrianonline@outlook.com',
    pass: 'AlphaBeta@1',
  },
});

// https://us-central1-e-questrian.cloudfunctions.net/sendReceipt
exports.sendReceipt = functions.https.onRequest((req: any, res: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res
        .status(400)
        .send('Bad request, this endpoint only accepts POST requests');
    }

    const idToken: string = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
      return res
        .status(401)
        .send('You are not authorized to perform this action');
    }
    try {
      const decodedIdToken: admin.auth.DecodedIdToken =
        await auth.verifyIdToken(idToken);
      if (decodedIdToken && decodedIdToken.uid) {
        const user = admin.auth().getUser(decodedIdToken.uid);
        if (await user) {
          const mailOptions = {
            from: 'e-Questrian Notifications <e-questrianonline@outlook.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: req.email,
            subject: 'Payment receipt',
            html: req.emailBody,
          };
          return transporter.sendMail(mailOptions, (erro: any, info: any) => {
            if (erro) {
              return res.send(JSON.stringify(erro));
            }
            return res.send(JSON.stringify('Sended'));
          });
        } else {
          return res
            .status(401)
            .send('You are not authorized to perform this action');
        }
      }
    } catch (error) {}
  });
});
