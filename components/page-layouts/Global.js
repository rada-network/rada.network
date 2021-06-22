import { Head } from "../Head";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

import styles from "../../styles/modules/Layout";

export const Layout = ({children, extraClass}) => {
  return (
    <>
    <Head />
    <div className={`wrapper page-global ${extraClass || ''}`}>
      <Navbar />
      
      <div className={`${styles.mainbody}`}>
        {children}
      </div>

      <Footer />
    </div>
    </>
  );
};
