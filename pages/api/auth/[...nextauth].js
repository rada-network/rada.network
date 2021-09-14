import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {getTokenFromYourAPIServer} from "./../../../data/query/user"

const callbacks = {}

callbacks.signIn = async function signIn(profile, account, oauthProfile) {
    profile.accessToken = await getTokenFromYourAPIServer(profile,account,oauthProfile)
    return true
}

callbacks.jwt = async function jwt(token, user) {
    if (user) {
        token = { accessToken: user.accessToken }
    }

    return token
}

callbacks.session = async function session(session, token) {
    session.accessToken = token.accessToken
    return session
}

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    Providers.Facebook({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET
      }),
      Providers.Twitter({
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET
      })
  ],
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY
  
    // You can also specify a public key for verification if using public/private key (but private only is fine)
    // verificationKey: process.env.JWT_SIGNING_PUBLIC_KEY,
  
    // If you want to use some key format other than HS512 you can specify custom options to use
    // when verifying (note: verificationOptions should include a value for maxTokenAge as well).
    // verificationOptions = {
    //   maxTokenAge: `${maxAge}s`, // e.g. `${30 * 24 * 60 * 60}s` = 30 days
    //   algorithms: ['HS512']
    // },
  },
  callbacks : callbacks,
  debug: true
}

export default (req, res) => NextAuth(req, res, options)