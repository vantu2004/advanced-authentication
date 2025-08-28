export const otpEmail = `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">{otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Your Brand Inc</p>
      <p>1600 Amphitheatre Parkway</p>
      <p>California</p>
    </div>
  </div>
</div>`

export const resetPasswordEmail = `
<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <title>{{appName}} — Reset your password</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
</head>
<body style="margin:0; padding:0; background:#f3f4f6;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f3f4f6;">
    <tr>
      <td align="center" style="padding:24px;">
        <!-- Container -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <!-- Header -->
          <tr>
            <td align="center" style="padding:28px 24px; background:#0ea5e9;">
              <span style="display:inline-block; font-family:Arial,Helvetica,sans-serif; font-size:20px; font-weight:700; color:#ffffff;">
                {{appName}}
              </span>
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td style="padding:28px 28px 0 28px; font-family:Arial,Helvetica,sans-serif;">
              <h1 style="margin:0 0 12px 0; font-size:22px; line-height:1.3; color:#111827; font-weight:700;">
                Reset your password
              </h1>
              <p style="margin:0; font-size:14px; line-height:1.7; color:#374151;">
                Hi {{name}}, we received a request to reset your {{appName}} password.
                Click the button below to choose a new one. This link expires in {{expiry}}.
              </p>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding:24px 28px 8px 28px;">
              <a href="{{resetLink}}"
                 style="display:inline-block; text-decoration:none; background:#0ea5e9; color:#ffffff; font-family:Arial,Helvetica,sans-serif; font-size:16px; font-weight:700; padding:12px 20px; border-radius:10px;">
                Reset Password
              </a>
            </td>
          </tr>

          <!-- Link fallback -->
          <tr>
            <td style="padding:20px 28px 0 28px; font-family:Arial,Helvetica,sans-serif;">
              <p style="margin:0; font-size:13px; line-height:1.7; color:#6b7280;">
                Button not working? Paste this URL into your browser:
                <br>
                <a href="{{resetLink}}" style="color:#0ea5e9; text-decoration:underline; word-break:break-all;">
                  {{resetLink}}
                </a>
              </p>
            </td>
          </tr>

          <!-- Security note -->
          <tr>
            <td style="padding:20px 28px 0 28px; font-family:Arial,Helvetica,sans-serif;">
              <p style="margin:0; font-size:12px; line-height:1.7; color:#9ca3af;">
                If you didn’t request a password reset, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 28px 28px 28px; font-family:Arial,Helvetica,sans-serif;">
              <hr style="border:none; border-top:1px solid #e5e7eb; margin:0 0 16px 0;">
              <p style="margin:0; font-size:12px; color:#9ca3af;">
                © {{year}} {{appName}} • This is an automated message, please don’t reply.
              </p>
            </td>
          </tr>
        </table>
        <!-- /Container -->

        <!-- Preheader spacing for small screens -->
        <div style="height:24px; line-height:24px;">&zwnj;</div>
      </td>
    </tr>
  </table>
</body>
</html>

`