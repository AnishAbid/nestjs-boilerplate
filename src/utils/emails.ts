import {HttpException, NotFoundException } from '@nestjs/common';
import { createCipheriv, createDecipheriv,
    scrypt, pbkdf2Sync } from 'crypto';
import { promisify } from 'util';
import { Transporter, createTransport } from 'nodemailer'
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { Logger } from '@nestjs/common';
import {Crypto_keys} from '../constants'
const iv = Crypto_keys.IV
const secret = Crypto_keys.SECRET
const salt = Crypto_keys.SALT
class Email{
    private transporter: Transporter<SMTPTransport.SentMessageInfo>;
    constructor() {
        this.transporter = createTransport({
          service: "gmail",
          logger: true,
          debug: true,
          auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS,
          },
        });
      }
      public async AuthEmails(mailOptions: any, switchCase: number): Promise<void> {
        let mailBody = {
        }
        try{
          switch (switchCase) {
            case 1:
              mailBody = {
                from: process.env.MAILER_USER,
                to: mailOptions.email,
                subject: 'OTP Verification Code',
                text: `Your OTP code is ${mailOptions.otp}.`,
              }
              break
            case 2:
              mailBody = {
                from: process.env.MAILER_USER,
                to: mailOptions.email,
                subject: mailOptions.message,
                text: `You have successfully reset your password`,
            }
              break
            case 3:
              mailBody = {
                from: process.env.MAILER_USER,
                to: mailOptions.email,
                subject: 'Forgot Password OTP Code',
                text: `Your OTP code is ${mailOptions.otp}.`,
              }
              break
            case 4:
              mailBody = {
                from: process.env.MAILER_USER,
                to: mailOptions.email,
                subject: 'Reset Password OTP Code',
                text: `Your OTP code is ${mailOptions.otp}.`,
              }
              break
            case 5:
              mailBody = {
                from: process.env.MAILER_USER,
                to: mailOptions.email,
                subject: 'Account Successfully Created',
                text: 'Your account has been successfully created'
              }
              break
            default:
              mailBody=mailOptions
          }
          await this.transporter.sendMail(mailBody);
        }catch (e) {
          Logger.log(e)
        }
      }
    
      
  
}
export default new Email()