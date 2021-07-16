import HTMLHead from 'next/head'

export const Head = ({title,description,facebook,twitter,keyword}) => {
  return (

    <HTMLHead>
      <title>{title}</title>
      <meta name="description" content={description}/>
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
        href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap" 
        rel="stylesheet"
        media="print"
        onLoad="this.media='all'"
        key="google-fonts_2"
      />
      <link 
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" 
        rel="stylesheet"
        media="print"
        onLoad="this.media='all'"
        key="google-fonts_3"
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
      <link
        href="/icons/favicon-16x16.png"
        rel="icon"
        type="image/png"
        sizes="16x16"
      />
      <link
        href="/icons/favicon-32x32.png"
        rel="icon"
        type="image/png"
        sizes="32x32"
      />
      <link rel="apple-touch-icon" href="/apple-icon.png"/>
      <meta name="theme-color" content="#317EFB" />
    </HTMLHead>

  );
};
