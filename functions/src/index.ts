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

// https://us-central1-e-questrian.cloudfunctions.net/auth
exports.auth = functions.https.onRequest((req: any, res: any) => {
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
            from: 'e-Questrian <e-questrianonline@outlook.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: 'ferric.tech@gmail.com',
            subject: "I'M A PICKLE!!!", // email subject
            html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
                    <br />
                    <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
                `, // email content in HTML
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

// https://us-central1-e-questrian.cloudfunctions.net/helloWorld
exports.helloWorld = functions.https.onRequest((req: any, res: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  cors(req, res, () => {
    res.send({ text: 'Hello there' });
  });
});

// https://us-central1-e-questrian.cloudfunctions.net/sendMail
exports.sendMail = functions.https.onRequest((req: any, res: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  cors(req, res, () => {
    // getting dest email by query string
    // const dest = req.query.dest;

    const mailOptions = {
      from: 'e-Questrian <e-questrianonline@outlook.com>', // Something like: Jane Doe <janedoe@gmail.com>
      to: 'ferric.tech@gmail.com',
      subject: "I'M A PICKLE!!!", // email subject
      html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
              <br />
              <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
          `, // email content in HTML
    };

    // returning result
    return transporter.sendMail(mailOptions, (erro: any, info: any) => {
      if (erro) {
        return res.send(JSON.stringify(erro));
      }
      return res.send(JSON.stringify('Sended'));
    });
  });
});
