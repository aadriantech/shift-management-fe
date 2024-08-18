import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '../../../lib/mongodb';
import { verifyPassword } from '../../../lib/auth';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { db } = await connectToDatabase();
        const user = await db.collection('users').findOne({ username: credentials.username });
        if (user && await verifyPassword(credentials.password, user.password)) {
          return { id: user._id, name: user.username, role: user.role, company: user.company };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.company = user.company;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.company = token.company;
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
  }
});
