import User from "models/UserModel";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import bcryptjs from "bcryptjs";
import Admin from "models/AdminModel";
import Instructor from "models/InstructorModel";
import connectDB from "db/newdb";

export const authOptions = {
  site: process.env.NEXTAUTH_URL,
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    CredentialsProvider({
      async authorize(credentials) {
        await connectDB();
        if (credentials.callbackUrl.includes('/authentication/sign-admin') || credentials.callbackUrl.includes('/authentication/sign-as-instructor') || credentials.callbackUrl.includes('/authentication/sign-up-instructor')) {
          const admin = await Admin.findOne({
            email: credentials.email,
          });
          const instructor = await Instructor.findOne({
            email: credentials.email,
          });
          if (admin && bcryptjs.compareSync(credentials.password, admin.password)) {
            return {
              _id: admin._id,
              email: admin.email,
              fname: admin.fname,
              lname: admin.lname,
              role: admin.roles,
            };
          }
          if (instructor && bcryptjs.compareSync(credentials.password, instructor.password)) {
            if (instructor.verified) {
              return {
                _id: instructor._id,
                email: instructor.email,
                fname: instructor.fname,
                lname: instructor.lname,
                role: instructor.roles,
              };
            }
            throw new Error("Your not assigned as instructor");
          }
        }

        if (credentials.callbackUrl.includes('/authentication/sign-in') || credentials.callbackUrl.includes('/authentication/sign-up') || credentials.callbackUrl.includes('/authentication/sign-code')) {
          const user = await User.findOne({
            email: credentials.email,
          });
          if (user && bcryptjs.compareSync(credentials.password, user.password)) {
            return {
              _id: user._id,
              email: user.email,
              fname: user.fname,
              lname: user.lname,
              role: user.role,
            };
          }
        }
        throw new Error("Invalid email or password");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, profile }) {
      if (profile) {
        token._id = profile.id
        token.image = profile.avatar_url
        token.role = profile.type
        token.name = profile.name
      }
      if (user?._id) {
        token._id = user._id;
        token.email = user.email;
        token.fname = user.fname;
        token.lname = user.lname;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token, profile }) {
      if (token?._id) {
        session.user._id = token._id;
        session.user.email = token.email;
        session.user.fname = token.fname;
        session.user.lname = token.lname;
        session.user.role = token.role;
      }
      return session;
    },
    pages: {
      signIn: "/authentication/sign-in",
      // error: '/auth/error',
      // signOut: '/auth/signout'
    },
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);