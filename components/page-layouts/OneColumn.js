import { Head } from "../Head";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

export const Layout = ({children, extraClass, meta}) => {
  return (
    <>
    <Head meta={meta} />
    <div className={`wrapper ${extraClass || ''}`}>
      <Navbar />
      
      <div className="mainbody">
        {children}
      </div>

      <Footer />
    </div>
    </>
  );
};
