import Credentials from "next-auth/providers/credentials";
export const authOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = {
            id: 1,
            email: "test@test.com",
            password: "qwe123",
            name: "Test User",
            role: "user",
          };
          if (!user) {
            return null;
          }

          const isPasswordValid = credentials.password === user.password;
          if (!isPasswordValid) {
            return null;
          }

          return {
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Ath error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signUp: "/signup",
  },
};
