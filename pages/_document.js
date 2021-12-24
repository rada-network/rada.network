import Document, { Html, Head, Main, NextScript } from 'next/document'

import Script from 'next/script'

export default class MyDocument extends Document {
  render() {
    return (
      <Html class="notranslate" translate="no">
        <Head>
        <meta name="google" content="notranslate" />
        <Script strategy="lazyOnload" src='https://cdn.blockpass.org/widget/scripts/release/3.0.2/blockpass-kyc-connect.prod.js' />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />

          <Script
            id="gtag"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <Script id="fbq" dangerouslySetInnerHTML={{
            __html : `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '3099266543734836');
              fbq('track', 'PageView');
            `
          }} />
          <noscript><img height="1" width="1" style={{display: 'none'}}
              src="https://www.facebook.com/tr?id=3099266543734836&ev=PageView&noscript=1"
            />
          </noscript>
          <Script
            id="twitter"
            dangerouslySetInnerHTML={{
              __html: `
              window.twttr = (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0],
                  t = window.twttr || {};
                if (d.getElementById(id)) return t;
                js = d.createElement(s);
                js.id = id;
                js.src = "https://platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);

                t._e = [];
                t.ready = function(f) {
                  t._e.push(f);
                };

                return t;
              }(document, "script", "twitter-wjs"));
              `,
            }}
          />
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    )
  }
}