import { Head } from "../Head";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

export const Layout = ({children, extraClass, meta}) => {
  console.log(meta)
  return (
    <>
    <Head title={meta.title} description={meta.description} />
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
