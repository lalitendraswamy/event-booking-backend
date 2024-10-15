import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { AppService } from '../app/app.service';




@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly appService:AppService) {
    
    this.transporter = nodemailer.createTransport({
      host: this.appService.getSmtp_host(),
      port: +this.appService.getSmtp_port(),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.appService.getSmtp_user(),
        pass: this.appService.getSmtp_pass(),
      },
    });
  } 

  async sendInvitationEmail(recipientEmail: string, invitationLink: string) {
    const mailOptions = {
      from: '"BLP Events" <lalitendra.swamy@g7cr.com>', // sender address
      to: recipientEmail, // recipient's email
      subject: 'Welcome to Our Event Booking App! - BLP events', // Subject line
      text: `Hello, you're invited to join our Website. Please click the link to get started: ${invitationLink}`, // plain text body
      html: `<p>Hello,</p><p>You're invited to join our website. Please click the link below to get started:</p><a href="${invitationLink}">Get Started</a>`, // HTML body
    };

    try {
      // Send email
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      // return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send invitation email');
    }
  }
}
