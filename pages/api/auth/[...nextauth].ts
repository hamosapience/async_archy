import NextAuth from "next-auth";

import Auth0Provider from "next-auth/providers/auth0";

export default NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token, profile, user, account }) {
      console.log("token", token, "p", profile, "u", user, "a", account);
      token.roles = profile?.["http://localhost:3000/roles"];
      return token;
    },
  },
});
