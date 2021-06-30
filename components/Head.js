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
      href="https://fonts.gstatic.com"
      media="print"
      onLoad="this.media='all'"
      key="google-fonts-preconnect"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
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
      href="/vendors/font-awesome5-pro/css/all.min.css"
      media="print"
      onLoad="this.media='all'"
      key="fontawesome"
    />
    </HTMLHead>

  );
};
