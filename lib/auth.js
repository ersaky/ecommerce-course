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
            role: "admin",
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
  pages: {
    signIn: "/login",
    signUp: "/signup",
  },
};
