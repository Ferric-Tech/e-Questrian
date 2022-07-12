const functions = require('firebase-functions');
const sendgrid = require('sendgrid');
const client = sendgrid(
  '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'
);

function parseBody(body: any) {
  const helper = sendgrid.mail;
  const fromEmail = new helper.Email(body.from);
  const toEmail = new helper.Email(body.to);
  const subject = body.subject;
  const content = new helper.Content('text/html', body.content);
  const mail = new helper.Mail(fromEmail, subject, toEmail, content);
  return mail.toJSON();
}

// https://us-central1-e-questrian.cloudfunctions.net/httpEmail
exports.httpEmail = functions.https.onRequest((req: any, res: any) => {
  return Promise.resolve()
    .then(() => {
      if (req.method != 'POST') {
        const error = new Error('Only POST requests are accepted');
        throw error;
      }
      const request = client.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: parseBody(req.body),
      });
      return client.API(request);
    })
    .then((response) => {
      if (response.body) {
        res.send(response.body);
      } else {
        res.end;
      }
    })
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
});
