/* eslint-disable class-methods-use-this */
import mailgun from 'mailgun';

import UtilModel from '../models/emailUtils';


const utilModel = new UtilModel();

export default class EmailServices {
  async getEmail(user) {
    const results = await utilModel.getEmail(user.accountNumber);

    if (results.success) {
      console.log(results.success);
      const email = results.success.rows[0].email;
      return email;
    }
  }

  sendEmail(email, address) {
    const DOMAIN = 'sandbox8dac155de6164b6eb14493238ff4f47c.mailgun.org';
    const mg = mailgun({ apiKey: process.env.MAIL_API_KEY, domain: DOMAIN });
    const data = {
      from: 'Banka <postmaster@sandbox8dac155de6164b6eb14493238ff4f47c.mailgun.org>',
      to: `${address}`,
      subject: 'Banka Notification',
      text: email,
    };
    mg.messages().send(data, (error, body) => {
      console.log(body);
    });
  }
}
