const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
} = require('next/constants')

const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
    // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
    const isDev = phase === PHASE_DEVELOPMENT_SERVER
    // when `next build` or `npm run build` is used
    const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
    // when `next build` or `npm run build` is used
    const isStaging =
        phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

    console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)

    const env = {
        future: {
            webpack5: true,
        },
        pwa: {
            dest: 'public',
            publicExcludes : ["!vendors/*","!vendors/**/*","!vendors/**/**/*","!vendors/**/**/**/*"],
            buildExcludes  : [/chunks\/.*$/],
            disable : isDev
        },
        i18n: {
            // These are all the locales you want to support in
            // your application
            locales: ['en', 'vi', 'nl-NL'],
            // This is the default locale you want to be used when visiting
            // a non-locale prefixed path e.g. `/hello`
            defaultLocale: 'en',

        },
    }

    // next.config.js object
    return withPWA(env)
}
