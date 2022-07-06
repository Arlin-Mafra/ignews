import NextAuth, { Account, Profile, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna";

interface signInProps {
  user: User;
  account: Account;
  profile: Profile;
  email: {
    verificationRequest?: boolean;
  };
}

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "read:user",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: signInProps) {
      const { email } = user;
      try {
        if (!user) {
          await fauna.query(
            q.Create(q.Collection("users"), { data: { email } })
          );
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});
