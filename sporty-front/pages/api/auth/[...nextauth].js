import jwt_decode from "jwt-decode";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://127.0.0.1:8000/accounts/token/", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const drf_access_token = await res.json();

        if (res.ok && drf_access_token) {
          const { user_id } = jwt_decode(drf_access_token["access"]);
          const user_res = await fetch(
            `http://127.0.0.1:8000/accounts/api/user/${user_id}`,
          );
          const user = await user_res.json();
          user.accessToken = drf_access_token;
          return user;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user["accessToken"]["access"];
        token.userId = user.id;
        token.username = user.username;
        token.nickname = user.nickname;
        token.avatar = user.avatar;
        token.school = user.school;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.userId = token.userId;
      session.user.username = token.username;
      session.user.nickname = token.nickname;
      session.user.avatar = token.avatar;
      session.user.school = token.school;
      return session;
    },
  },
  pages: {
    signIn: "/page/account/login",
  },
  secret: "secret",
};

export default NextAuth(authOptions);
