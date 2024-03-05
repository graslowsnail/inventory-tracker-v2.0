import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
providers: [
    CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    credentials: {
      username: { label: "Username", type: "text", placeholder: "graslowsnail" },
      password: { label: "Password", type: "password" }
    },

      async authorize(credentials, req) {
        // Specify the credentials you want to allow
        const allowedUser = {
          username: process.env.NEXT_PUBLIC_ADMIN_USERNAME, 
          password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
        };

        // Check if the credentials provided match the allowed credentials
        if (credentials && credentials.username === allowedUser.username && credentials.password === allowedUser.password) {
          // If credentials match, return the user object
          const user = { id: 1, name: "X-Rain Admin", email: "graslowsnail@gmail.com" };
          return user;
        } else {
          // If credentials do not match, return null to indicate authentication failure
          return null;
        }
    }
  })
  ],
  session: {
    // Configure session expiration
    strategy: 'jwt',
    maxAge: 1800, // 30 minutes in seconds
    updateAge: 24 * 60 * 60, // 24 hours in seconds - How frequently to update the session
  },
})

export { handler as GET, handler as POST };


