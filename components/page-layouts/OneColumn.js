import { Head } from "../Head";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

import styles from "../../styles/modules/Layout.module.css";

export const Layout = ({children, extraClass, meta}) => {
  console.log(meta)
  return (
    <>
    <Head title={meta.title} description={meta.description} />
    <div className={`${styles.wrapper} ${extraClass || ''}`}>
      <Navbar />
      
      <div className={`${styles.mainbody}`}>
        {children}
      </div>

      <Footer />
    </div>
    </>
  );
};
