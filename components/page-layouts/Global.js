import { Head } from "../Head";
import { Topbar } from "../Topbar";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

export const Layout = ({children}) => {
  return (
    <>
    <Head />

    <div className={`main-layout`}>

      <Navbar />

      <Topbar />
      
      <div className={`mainbody`}>
        {children}
        <Footer />
      </div>

    </div>
    </>
  );
};
