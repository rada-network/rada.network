import HTMLHead from 'next/head'

export const Head = () => {
  return (

    <HTMLHead>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
      media="print"
      onLoad="this.media='all'"
      key="google-fonts"
    />
    <link
      rel="stylesheet"
      href="https://cdn.cryptofonts.com/1.3.0/cryptofont.css"
      media="print"
      onLoad="this.media='all'"
      key="cryptoicons"
    />
    <link
      rel="stylesheet"
      href="./vendors/font-awesome5-pro/css/all.min.css"
      media="print"
      onLoad="this.media='all'"
      key="fontawesome"
    />
    </HTMLHead>

  );
};
