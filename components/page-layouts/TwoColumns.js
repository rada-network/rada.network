import { Head } from "../Head";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

import { Widget } from "../widgets/Generic";

export const Layout = ({children, extraClass, meta}) => {
  return (
    <>
    <Head meta={meta} />
    <div className={`wrapper page-2-cols ${extraClass || ''}`}>
      <Navbar />
      
      <div className="mainbody">
        {children}
      </div>

      <div className="sidebar">
        <Widget 
          title="Pricing"
          text="Lorem Ipsum Dolor sit Amet"
        />
      </div>

      <Footer />
    </div>
    </>
  );
};
