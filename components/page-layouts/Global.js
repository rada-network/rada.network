import { Head } from "../Head";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

export const Layout = ({children, extraClass}) => {
  return (
    <>
    <Head />
    <div className={`wrapper page-global ${extraClass || ''}`}>
      <Navbar />
      
      <div className="mainbody">
        {children}
      </div>

      <Footer />
    </div>
    </>
  );
};
