import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { getFaqFeed } from "@data/query/faq";

const HowToUse = ({project, pool}) => {
  const [listFaq,setListFaq] = useState([]);
  const {t,i18n} = useTranslation("launchpad");

  useEffect(() => {
    getFaqFeed({page_slug : `howto/${project.slug}/${pool.slug}`,lang : i18n.language}).then(function(faq) {
      setListFaq(faq)
    })
  }, []);

  return (
    <>
      {listFaq.length > 0 && (
        <div class="order-4 mb-4 md:mb-0 col-start-1 row-start-3 ">
        <div className="card card-default">
          <div className="card-header">
            <h3>{t("how to use")}</h3>
          </div>
          <div className="card-body">
            {listFaq.map(function(item){  
              return (
              <div key={item.question} className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-700 border-opacity-40">
                <h4 className="font-semibold text-xs uppercase tracking-wider mb-2">{item.question}</h4>
                <p className="opacity-80"><div dangerouslySetInnerHTML={{ __html: item.answer }}></div></p>
              </div>
            )})}
          </div>
        </div>
      </div>
      )}
      
    </>
  );
}

export default HowToUse;