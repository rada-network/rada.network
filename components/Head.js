import HTMLHead from "next/head";
import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { useRouter } from "next/router";
import { observer } from "mobx-react";
import { usePageStore } from "../lib/usePageStore";
import _ from "lodash";
import utils from "@lib/util";
import Script from "next/script";
import LazyLoadCSS from "./LazyLoadCSS";

export const Head = observer(({ meta }) => {
  const { asPath, pathname } = useRouter();
  const { dataStore, detailStore } = usePageStore();
  meta = _.isEmpty(dataStore.meta) ? meta : dataStore.meta;
  meta = meta || {};
  return (
    <>
      <HTMLHead>
        {detailStore.data?.airdrop && (
          <Script
            id="gleam"
            dangerouslySetInnerHTML={{
              __html: `
            (function(d, t){
              var key = '${detailStore.data?.airdrop.gleam_tracking_code}';
              var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
                g.src = "https://gleam.io/"+key+"/trk.js"; s.parentNode.insertBefore(g, s);
            }(document, "script"));
            `,
            }}
          />
        )}
        <title>RADA - {meta.title || ""}</title>
        {meta.description && (
          <>
            <meta
              name="description"
              content={utils.stripHTML(meta.description)}
            />
            <meta
              property="og:description"
              content={utils.stripHTML(meta.description)}
            />
          </>
        )}
        {meta.keyword && <meta name="keyword" content={meta.keyword} />}

        {"og:type" in meta && (
          <meta property="og:type" content={meta["og:type"]} />
        )}
        {!("og:type" in meta) && (
          <meta property="og:type" content={`website`} />
        )}

        {"og:title" in meta && (
          <meta property="og:title" content={meta["og:title"]} />
        )}
        {!("og:title" in meta) && (
          <meta property="og:title" content={meta.title || ""} />
        )}

        {"og:image" in meta && (
          <meta property="og:image" content={meta["og:image"]} />
        )}
        {!("og:image" in meta) && (
          <meta
            property="og:image"
            content={
              process.env.NEXT_PUBLIC_CDN + "/android-chrome-512x512.png"
            }
          />
        )}

        {"og:url" in meta && (
          <meta property="og:url" content={meta["og:url"]} />
        )}
        {!("og:url" in meta) && <meta property="og:url" content={asPath} />}

        {"article:tag" in meta && (
          <meta property="article:tag" content={meta["article:tag"]} />
        )}
        {"article:section" in meta && (
          <meta property="article:section" content={meta["article:section"]} />
        )}
        {"article:published_time" in meta && (
          <meta
            property="article:published_time"
            content={meta["article:published_time"]}
          />
        )}
        {"article:author" in meta && (
          <meta property="article:author" content={meta["article:author"]} />
        )}

        <meta property="og:site_name" content="RADA" />
        <meta name="theme-color" content="#E5E7EB" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="robots"
          content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
        />

        {/* <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
        key="google-fonts-preconnect_1"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="crossorigin"

        key="google-fonts-preconnect_2"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
        rel="stylesheet"
        key="google-fonts"
      /> */}

        {meta?.alternate?.map((alternate) => (
          <link
            key={alternate.hreflang}
            rel="alternate"
            hrefLang={alternate.hreflang}
            href={alternate.href}
          />
        ))}

        <link rel="manifest" href={"/manifest.json"} />
      </HTMLHead>
      <LazyLoadCSS href="https://rsms.me/inter/inter.css" />

      <LazyLoadCSS
        href={
          process.env.NEXT_PUBLIC_CDN +
          "/vendors/font-awesome6-pro/css/all.min.css"
        }
      />

      <LazyLoadCSS
        rel="stylesheet"
        href={
          process.env.NEXT_PUBLIC_CDN +
          "/vendors/cryptocurrency-icons/styles/cryptofont.nnth.css"
        }
      />

      <TooltipWrapper />
    </>
  );
});

const TooltipWrapper = () => {
  const [isTooltipVisible, setTooltipVisibility] = useState(false);
  useEffect(() => {
    setTooltipVisibility(true);
  }, []);
  return (
    <>
      {isTooltipVisible && (
        <ReactTooltip type="info" clickable={true} html={true} />
      )}
    </>
  );
};
