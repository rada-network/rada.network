import { Head } from "../Head";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

export const Layout = ({children, extraClass, meta}) => {
  return (
    <>
    <Head title={meta?.title} description={meta?.description} keyword={meta.keyword} />
    <div className={`wrapper ${extraClass || ''}`}>
      <Navbar />
      
      <div className={`mainbody`}>
        {children}
      </div>

      <Footer />
    </div>
    </>
  );
};
