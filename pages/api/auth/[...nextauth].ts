import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import TwitterProvider from "next-auth/providers/twitter"
import EmailProvider from "next-auth/providers/email"
import {PrismaAdapter} from "@next-auth/prisma-adapter";
// import Auth0Provider from "next-auth/providers/auth0"
// import AppleProvider from "next-auth/providers/apple"
import prismaClient from "@/app/.core/adapter/prismaAdapter";

export const authOptions: NextAuthOptions = {
    // https://next-auth.js.org/configuration/providers/oauth
    adapter: PrismaAdapter(prismaClient),
    secret:process.env.NEXTAUTH_SECRET,
    providers: [
        /* * /
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
            maxAge: 4 * 60 * 60,
        }),
        /* */
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        // Temporarily removing the Apple provider from the demo site as the
        // callback URL for it needs updating due to Vercel changing domains
        /*
        Providers.Apple({
          clientId: process.env.APPLE_ID,
          clientSecret: {
            appleId: process.env.APPLE_ID,
            teamId: process.env.APPLE_TEAM_ID,
            privateKey: process.env.APPLE_PRIVATE_KEY,
            keyId: process.env.APPLE_KEY_ID,
          },
        }),
        Auth0Provider({
          clientId: process.env.AUTH0_ID,
          clientSecret: process.env.AUTH0_SECRET,
          issuer: process.env.AUTH0_ISSUER,
        }),
        */
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        /* * /
        TwitterProvider({
            clientId: process.env.TWITTER_ID,
            clientSecret: process.env.TWITTER_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
        }),
        /* * /
        CredentialsProvider({
            // The name to display on the sign-in form (e.g. 'Sign in with...')
            id: 'Credentials_based_login',
            name: 'Password',
            // The credentials are used to generate a suitable form on the sign-in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username or Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const res = await fetch("/your/endpoint", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()

                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        }),
        /* */
    ],
    theme: {
        colorScheme: "light",
    },
    session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        strategy: "database",
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days
        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
        /* * /
        encode: async ({ secret, token, maxAge }) => {
            const jwt = require('jsonwebtoken')
            const encodedToken = jwt.sign(token, secret, { expiresIn: maxAge })
            return encodedToken;
        },
        /* */
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const isAllowedToSignIn = true;
            if (isAllowedToSignIn) {
                return true;
            } else {
                // Return false to display a default error message
                return false;
                // Or you can return a URL to redirect to:
                // return '/unauthorized'
            }
        },
        async redirect({ url, baseUrl }) {
            // called on sign-in and sign-out
            // console.log("redirect urls", url, baseUrl);
            return baseUrl;
        },
        async session({ session, user, token }) {
            const userData = await prismaClient.user.findUnique({ where: { email: user.email } });
            session.user = user;
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            token.userRole = "admin"
            return token
        },
    },
    /* Custom Pages * /
    // https://next-auth.js.org/configuration/pages#examples
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    /* */
}

export default NextAuth(authOptions)
