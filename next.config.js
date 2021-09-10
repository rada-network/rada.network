const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')
const { i18n } = require('./next-i18next.config');
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
    pwa: {
      dest: 'public',
      publicExcludes: ["!vendors/*", "!vendors/**/*", "!vendors/**/**/*", "!vendors/**/**/**/*"],
      buildExcludes: [/chunks\/.*$/],
      disable: isDev
    },
    i18n,
    images : {
      domains: [
        's3.cointelegraph.com',
        'cryptoslate.com',
        'cdn.coingape.com',
        'webgiacoin.com',
        'tintucbitcoin.com',
        'sgp1.digitaloceanspaces.com',
        'coin68.com',
        'image.vietstock.vn',
        'img.youtube.com',
        'blogtienao.com',
      ],
    },
  }

  // next.config.js object
  return withPWA(env)
}
