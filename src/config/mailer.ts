/**
 * Mail sender configuration
 */
import { MailtrapTransport } from 'mailtrap';
import nodemailer from 'nodemailer';

const mailer = nodemailer.createTransport(
  MailtrapTransport({
    token: process.env.MAILER_TOKEN || '',
  }),
);

export default mailer;
