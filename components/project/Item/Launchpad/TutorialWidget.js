import { useTranslation } from "next-i18next";
import Link from "next/link"
const TutorialWidget = function({project,pool}){
  const {t,i18n} = useTranslation("launchpad")
  const url = project?.content?.share2earn_url
  const share2earn_url = !!url ? url : ( project?.share_campaign?.length >  0 ? `/${i18n.language}/launchverse/${project.slug}/share2earn` : "")
  return (
    // <div className="card card-default">
    //   <div className="card-header">
    //     <h3>{t("More info")}</h3>       
    //   </div>

    //   <div className="card-body">
        <div className="w-full">
          {!!share2earn_url && 
          <Link href={share2earn_url}>
            <div className="w-full p-4 mb-4 bg-primary-600 dark:bg-primary-700 text-white rounded-lg flex items-center cursor-pointer group">
              <span className="icon text-xl opacity-70 w-10 h-10 !flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-full flex-shrink-0 mr-4 shadow">
                <i className="fa-duotone fa-hand-holding-heart"></i>
              </span>
              <div>
                <p className="mb-1 font-medium">{t("Refer a friend to earn RIR")}</p>
              
                <a href={share2earn_url} className="group text-white">
                  <span className="text-sm">{t("Join Share2Earn")}</span>
                  <span className="icon text-xs relative left-1 group-hover:left-2 transition-all"><i className="fas fa-angle-right"></i></span>
                </a>
              
              </div>
            </div>
          </Link>
          }
          {pool.project_pool_content && 
          <div className="w-full p-4 mb-4 bg-gray-100 dark:bg-gray-900 rounded-lg flex cursor-pointer items-center group border border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:bg-white dark:hover:bg-gray-800 dark:hover:border-primary-500">
            <span className="icon text-xl opacity-70 w-10 h-10 !flex items-center justify-center bg-white dark:bg-gray-700 rounded-full flex-shrink-0 mr-4 shadow">
              <i className="fa-duotone fa-info"></i>
            </span>
            <div>
              <p className="font-medium">{pool.project_pool_content.whitelist_title}</p>
              <a href={pool.project_pool_content.whitelist_url} target="_blank" className="group">
                <span className="text-sm">{t("Learn more")}</span>
                <span className="icon text-xs relative left-1 group-hover:left-2 transition-all"><i className="fas fa-angle-right"></i></span>
              </a>
            </div>
          </div>
          }
          <div className="w-full p-4 mb-4 bg-gray-100 dark:bg-gray-900 rounded-lg flex cursor-pointer items-center group border border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:bg-white dark:hover:bg-gray-800 dark:hover:border-primary-500">
            <span className="icon text-xl opacity-70 w-10 h-10 !flex items-center justify-center bg-white dark:bg-gray-700 rounded-full flex-shrink-0 mr-4 shadow">
              <i className="fa-duotone fa-info"></i>
            </span>
            <div>
              <p className="font-medium">{t("How to join RADA LaunchVerse")}</p>
              {/* <Link href={`/launchverse/${project.slug}/share2earn`}>
              <a href={`/launchverse/${project.slug}/share2earn`} className="group">
                <span className="text-sm">{t("Learn more")}</span>
                <span className="icon text-xs relative left-1 group-hover:left-2 transition-all"><i className="fas fa-angle-right"></i></span>
              </a>
              </Link> */}
              <a href={t("Learn more url")} target="_blank" className="group">
                <span className="text-sm">{t("Learn more")}</span>
                <span className="icon text-xs relative left-1 group-hover:left-2 transition-all"><i className="fas fa-angle-right"></i></span>
              </a>
            </div>
          </div>
        </div>
    //   </div>
    // </div>
  )
}
export default TutorialWidget