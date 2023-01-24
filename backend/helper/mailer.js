const nodemailer = require("nodemailer")
const { google } = require("googleapis")

/**
 * OAuth2 kullanarak gmail hesabı ile mail gönderme
 * https://developers.google.com/oauthplayground
 * https://developers.google.com/gmail/api/quickstart/nodejs
 *
 * https://mail.google.com | token oluşturmak için
 */
const { OAuth2 } = google.auth
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground"
const { EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH, MAILING_ACCESS } =
  process.env

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET,
  MAILING_SECRET,
  OAUTH_PLAYGROUND
)

exports.sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  })

  const accessToken = auth.getAccessToken()

  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  })

  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Facebook email verification",
    html: `
      <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" 
      content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Document</title></head><body><div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998"><img src="https://res.cloudinary.com/duc05ntwm/image/upload/v1673647269/facebook-logo-icon-facebook-logo-png-transparent-svg-vector-bie-supply-16_iosnp5.png" alt="" style="width:30px"><span>Action requise : Activate your facebook account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141023;font-size:17px;font-family:Roboto"><span>${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently created a new Facebook account. Please click the button below to confirm your email address and activate your account.</span></div><a href=${url} style="width:200px;padding:10px 15px;background-color:#3b5998;color:#fff;text-decoration:none;font-weight:800">Confirm your account</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Facebook allows you to connect with friends and family, share your life, and discover new things. 
      We hope you enjoy your time on Facebook.</span></div></div></body></html>
          `,
  }

  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err

    return res
  })
}
