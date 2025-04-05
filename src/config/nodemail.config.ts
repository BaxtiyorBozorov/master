// ehzk eomd bmfo fbma
import * as nodemailer from 'nodemailer';

import { ENV } from './env';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,
  },
});
export default transporter;
