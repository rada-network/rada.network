import { Navbar } from "../navbars/Navbar";
import { Footer } from "../footers/Footer";

export const Layout = ({children, extraClass}) => {
  return (
    <>
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
