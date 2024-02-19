import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
providers: [
    CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "graslowsnail" },
      password: { label: "Password", type: "password" }
    },
      async authorize(credentials, req) {
        // Specify the credentials you want to allow
        const allowedUser = {
          username: process.env.NEXT_PUBLIC_ADMIN_USERNAME, // Change this to your desired username
          password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD, // Change this to your desired password
        };

        // Check if the credentials provided match the allowed credentials
        if (credentials && credentials.username === allowedUser.username && credentials.password === allowedUser.password) {
          // If credentials match, return the user object
          const user = { id: 1, name: "Admin User", email: "admin@example.com" };
          return user;
        } else {
          // If credentials do not match, return null to indicate authentication failure
          return null;
        }
    }
  })
  ],
})

export { handler as GET, handler as POST };


