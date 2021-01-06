const isProduction = process.env.NODE_ENV === "production";

export default {
  isProduction,
  loginRedirectURL: "/",
  siteURL: isProduction ? "https://example.com" : "http://localhost:3000",
  email: {
    // Change to your verified sender in Sendgrid
    // at https://app.sendgrid.com/settings/sender_auth/senders
    fromAddress: "team@example.com",
  },
};
