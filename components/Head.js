import HTMLHead from 'next/head'
import ReactTooltip from 'react-tooltip';

export const Head = ({title,description,facebook,twitter,keyword}) => {
  return (
    <>
    <HTMLHead>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta name="keyword" content={keyword}/>
      {/*<title>{meta.title == null || undefined ? "dhunt.io" : meta.title}</title>*/}
      {/*<meta name={meta.description == null ? "description" : meta.description} content={meta.content == null ? "dhunt.io" : meta.content}/>*/}
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
      rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        media="print"
        onLoad="this.media='all'"
        key="google-fonts"
      />
      <link 
        href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" 
        rel="stylesheet"
        media="print"
        onLoad="this.media='all'"
        key="google-fonts_2"
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
        href="/vendors/font-awesome5-pro/css/all.min.css"
        media="print"
        onLoad="this.media='all'"
        key="fontawesome"
      />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#317EFB" />
    </HTMLHead>

    <ReactTooltip type="info" clickable={true} html={true} />
    </>
  );
};
