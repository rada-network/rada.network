import HTMLHead from 'next/head'
import { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';

export const Head = ({title,description,facebook,twitter,keyword,meta}) => {
  const [isTooltipVisible, setTooltipVisibility] = useState(false);
  useEffect(() => {
    setTooltipVisibility(true);
  }, []);

  return (
    <>
    <HTMLHead>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta name="keyword" content={keyword}/>
      {"og:type" in meta && <meta property="og:type" content={meta["og:type"]} />}
      {"og:title" in meta && <meta property="og:title" content={meta["og:title"]} />}
      {"og:description" in meta && <meta property="og:description" content={meta["og:description"]} />}
      {"og:image" in meta && <meta property="og:image" content={meta["og:image"]} />}
      {"og:url" in meta && <meta property="og:url" content={meta["og:url"]} />}
      {"article:tag" in meta && <meta property="article:tag" content={meta["article:tag"]} />}
      {"article:section" in meta && <meta property="article:section" content={meta["article:section"]} />}
      {"article:published_time" in meta && <meta property="article:published_time" content={meta["article:published_time"]} />}
      {"article:author" in meta && <meta property="article:author" content={meta["article:author"]} />}
      <meta property="og:site_name" content="Rada" />
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
        media="print"
        onLoad="this.media='all'"
        key="google-fonts-preconnect_1"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="crossorigin"
        media="print"
        onLoad="this.media='all'"
        key="google-fonts-preconnect_2"
      />
      <link 
        href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" 
        rel="stylesheet"
        media="print"
        onLoad="this.media='all'"
        key="google-fonts"
      />
      <link
        rel="stylesheet"
        href="/vendors/cryptocurrency-icons/styles/cryptofont.nnth.css"
        media="print"
        onLoad="this.media='all'"
        key="cryptoicons"
      />
      <link
      rel="stylesheet"
        href="/vendors/font-awesome6-pro/css/all.min.css"
        media="print"
        onLoad="this.media='all'"
        key="fontawesome"
      />

      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#C4B5FD" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
    </HTMLHead>

    {isTooltipVisible && <ReactTooltip type="info" clickable={true} html={true} />}
    </>
  );
};
