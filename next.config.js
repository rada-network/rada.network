const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");
const { i18n } = require("./next-i18next.config");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const isProd = process.env.NODE_ENV === "production";

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  console.log(process.env.NEXT_PUBLIC_CHAIN);
  // when `next build` or `npm run build` is used
  const env = {
    pwa: {
      dest: "public",
      publicExcludes: [
        "!vendors/*",
        "!vendors/**/*",
        "!vendors/**/**/*",
        "!vendors/**/**/**/*",
      ],
      buildExcludes: [/chunks\/.*$/],
      disable: isDev,
    },
    i18n,
    images: {
      domains: [
        "s3.cointelegraph.com",
        "coindesk.com",
        "cryptoslate.com",
        "cdn.coingape.com",
        "webgiacoin.com",
        "tintucbitcoin.com",
        "sgp1.digitaloceanspaces.com",
        "coin68.com",
        "image.vietstock.vn",
        "tapchibitcoin.io",
        "img.youtube.com",
        "blogtienao.com",
        "d11gciwieyoy00.cloudfront.net",
        "gql.dhunt.io",
        "media.rada.network",
        "cdn.rada.network",
        "localhost",
        "cafebitcoin.org",
        "toiyeubitcoin.com",
        "marginatm.com",
        "vietnambiz.vn",
        "toiyeubitcoin.sgp1.digitaloceanspaces.com",
        "d3f5j9upkzs19s.cloudfront.net",
        "www.tradingview.com",
        "file.publish.vn",
        "cdn.vietnambiz.vn",
        "lh3.googleusercontent.com",
        "pbs.twimg.com",
        "cdn.shortpixel.ai",
        "bitcoinist.com",
        "ucarecdn.com",
        "www.newsbtc.com",
        "adapulse.io"
      ],
    },
    assetPrefix: isProd ? process.env.NEXT_PUBLIC_CDN : "",
    serverRuntimeConfig: {
      PROJECT_ROOT: __dirname,
    },
    experimental: { optimizeCss: true }
  };

  // next.config.js object
  return withPWA(env);
};
