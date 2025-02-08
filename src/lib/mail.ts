import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY!);

export async function sendVerificationEmail(email: string, token: string) {
  const link = `http://localhost:3000/verify-email?token=${token}`;
  return resend.emails.send({
    from: "testing@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `
        <h1>Verify your email</h1>
        <p>Click the link below to verify your email</p>
        <a href="${link}">Verify</a></p>
    `,
  });
}

export async function resetPassword(email: string, token: string) {
  const link = `http://localhost:3000/reset-password?token=${token}`;

  return resend.emails.send({
    from: "testing@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `
        <h1>You have requested to reset your password</h1>
        <p>Click the link below to reset password</p>
        <a href="${link}">Reset</a></p>
    `,
  });
}
