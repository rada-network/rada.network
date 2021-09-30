const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')
const { i18n } = require('./next-i18next.config');
const isProd = process.env.NODE_ENV === 'production'


// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  console.log(`isDev:${isDev}  isProd:${isProd}`)

  const env = {
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
    assetPrefix: isProd ? 'https://cdn.rada.network' : '',
  }

  return env
  // next.config.js object
  //return withPWA(env)
}
