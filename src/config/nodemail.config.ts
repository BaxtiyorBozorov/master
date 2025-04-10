// ehzk eomd bmfo fbma
import * as nodemailer from 'nodemailer';

import { env } from '../config/env';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
    },
});
export default transporter;
