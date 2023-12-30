import dotenv from "dotenv";
import Otp from "../models/otp.js";
import User from "../models/user.js";
import rateLimit from "express-rate-limit";

import { TransporterService } from "../services/transporter.js";
dotenv.config();

// Create a limiter that allows 5 requests per minute per IP
const otpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 requests
  statusCode: 429,
  message: "Too many OTP requests from this IP, please try again later.",
});
export const OtpController = {
  sendOtpByEmail: [
    otpLimiter,
    async (req, res) => {
      try {
        const email = req.body.email;
        const user = await User.findOne({ email: email });
        if (user) {
          return res
            .status(200)
            .json({ success: false, message: "Email already exists" });
        }
        await Otp.deleteMany({ email: email });
        const otp = Math.floor(Math.random() * 90000) + 10000;
        const data = new Otp({ otp: otp, email: email });
        const mailOptions = {
          from: "UIT Edu <novaunisec@gmail.com>",
          to: email,
          subject: "UIT Edu - Xác minh địa chỉ email",
          html: `<!DOCTYPE html>
        <html>
        <head>
        
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <title>Email Confirmation</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style type="text/css">
          /**
           * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
           */
          /* @media screen {
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: normal;
              font-weight: 400;
              src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
            }
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: normal;
              font-weight: 700;
              src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
            }
          } */
          /**
           * Avoid browser level font resizing.
           * 1. Windows Mobile
           * 2. iOS / OSX
           */
          body,
          table,
          td,
          a {
            -ms-text-size-adjust: 100%; /* 1 */
            -webkit-text-size-adjust: 100%; /* 2 */
          }
          /**
           * Remove extra space added to tables and cells in Outlook.
           */
          table,
          td {
            mso-table-rspace: 0pt;
            mso-table-lspace: 0pt;
          }
          /**
           * Better fluid images in Internet Explorer.
           */
          img {
            -ms-interpolation-mode: bicubic;
          }
          /**
           * Remove blue links for iOS devices.
           */
          a[x-apple-data-detectors] {
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            color: inherit !important;
            text-decoration: none !important;
          }
          /**
           * Fix centering issues in Android 4.4.
           */
          div[style*="margin: 16px 0;"] {
            margin: 0 !important;
          }
          body {
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          /**
           * Collapse table borders to avoid space between cells.
           */
          table {
            border-collapse: collapse !important;
          }
          a {
            color: #1a82e2;
          }
          img {
            height: auto;
            line-height: 100%;
            text-decoration: none;
            border: 0;
            outline: none;
          }
          </style>
        
        </head>
        <body style="background-color: #e9ecef;">
        
          <!-- start preheader -->
          <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
          👋Để hoàn tất đăng ký, chúng tôi cần xác minh địa chỉ email của bạn.
          </div>
          <!-- end preheader -->
        
          <!-- start body -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
        
            <!-- start logo -->
            <tr>
              <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                    <td align="center" valign="top" style="padding: 36px 24px;">
                      <a href="https://www.facebook.com/NOVAUniverseVietnam" target="_blank" style="display: inline-block;">
                        <img src="https://res.cloudinary.com/dc8kxjddi/image/upload/v1685730974/IMAGE/logonova_gqhm3y.png" alt="Logo" border="0" width="48" style="display: block; width: 68px; max-width: 78px; min-width: 78px;">
                      </a>
                    </td>
                  </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
            <!-- end logo -->
        
            <!-- start hero -->
            <tr>
              <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                      <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Xác minh địa chỉ email của bạn</h1>
                    </td>
                  </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
            <!-- end hero -->
        
            <!-- start copy block -->
            <tr>
              <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                
        
                  <!-- start copy -->
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                      <div style="display: flex; align-items: center;">    
                        <p style="margin: 0;">Xin chào</p>
                        <img src="https://raw.githubusercontent.com/ABSphreak/ABSphreak/master/gifs/Hi.gif" alt="Hi" style="width: 30px; height: 30px; margin-right: 0px;">
                        <p style="margin: 0;">,</p>
                      </div>
                      <p style="margin: 0;">Nhập mã bên dưới để hoàn tất việc đăng ký tài khoản UIT Edu của bạn:</p>
                    </td>
                  </tr>
                  
                  <!-- end copy -->
                  <!-- start button -->
                  <tr>
                    <td align="left" bgcolor="#ffffff">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                            <table border="0" cellpadding="0" cellspacing="0">
                              <td style="font-size: 15px; padding: 14px 32px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;text-align: center; border-radius: 19px; display: block; border: 3px solid #e9ecef; background: 0% repeat #e367a6;">
                                <span style="font-size: 26px; line-height: 21px; color: #ffffff;">
                                  <span style="font-weight: 700; margin-left: 0px; margin-right: 0px;">${otp}</span>
                                </span>
                              </td>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- end button -->
        
                  <!-- start copy -->
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                      <p style="margin: 0;">Để đảm bảo an toàn cho tài khoản của bạn, xin vui lòng không chia sẻ mã này với bất kỳ ai để tránh mất thông tin cá nhân và tài khoản.</p>
                    </td>
                  </tr>
                  <!-- end copy -->
        
                  <!-- start copy -->
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                      <p style="margin: 0;">Thân ái./.<br> Đội ngũ UIT Universe</p>
                    </td>
                  </tr>
                  <!-- end copy -->
        
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
            <!-- end copy block -->
        
            <!-- start footer -->
            <tr>
              <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
        
                  <!-- start permission -->
                  <tr>
                    <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 20px; color: #666;">
                      <p style="margin: 0;">Bạn nhận được email này vì chúng tôi đã nhận được yêu cầu xác thực cho tài khoản của bạn. Nếu bạn không phải người yêu cầu xác thực này, xin vui lòng trả lời email này để thông báo cho chúng tôi.</p>
                    </td>
                  </tr>
                  <!-- end permission -->
        
                  <!-- start unsubscribe -->
                  <tr>
                    <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 11px; line-height: 20px; color: #666;">
                      <p style="margin: 0;">Thu Duc City, Ho Chi Minh City</p>
                      <p style="margin: 0;">© 2023 UIT Universe</p>
                    </td>
                  </tr>
                  <!-- end unsubscribe -->
        
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
            <!-- end footer -->
        
          </table>
          <!-- end body -->
        
        </body>
        </html>`,
        };
        TransporterService.transporter.sendMail(
          mailOptions,
          async (error, info) => {
            if (error) {
              return res.status(400).json({
                success: false,
                message: error.message,
              });
            } else {
              await data.save();
              return res.status(200).json({
                success: true,
                message: "OTP sent",
              });
            }
          }
        );
      } catch (e) {
        return res.status(500).json({
          success: false,
          message: error,
        });
      }
    },
  ],
  verifyOtp: async (req, res) => {
    try {
      const { email, otp } = req.body;

      var otpDocument = await Otp.findOne({ email: email });

      if (otpDocument.otp == otp) {
        await Otp.deleteOne(otpDocument);
        return res.status(200).json({
          success: true,
          message: "OTP verified",
        });
      }
      return res.status(500).json({
        success: false,
        message: "OTP does not match",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
};
