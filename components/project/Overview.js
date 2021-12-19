import { BscSvg} from "@components/svg/SvgIcons";
import CopyToClipboard from "react-copy-to-clipboard";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Link from "next/link"

const ProjectContent = function({project}){
  const {t,i18n} = useTranslation("launchpad")
  const handleCopy = () => {
    toast.success("Copied to clipboard", {})
  }

  return (
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="card card-default project-brief">
        <div className="card-header">
          <h3>Overview</h3>
        </div>
        <div className="card-body flex flex-col">
          <ul className="mb-0 mt-auto flex-shrink-0 flex-grow">   
          
            {project.token.contract_address && (
              <li className="list-pair mb-2">
              <span className="list-key !w-1/2 text-xs md:text-sm capitalize">
                {project.token.symbol}'s Contract
              </span>
              <div className="ml-auto flex items-center list-value font-semibold">
                <a target="_blank" href="" title={project.token.contract_address}>{`${project.token.contract_address.substr(0, 5)}...${project.token.contract_address.substr(-4)}`}</a>
                <CopyToClipboard text=""
                  onCopy={handleCopy}
                  text={project.token.contract_address}
                >
                  <button className="btn btn-default ml-2">
                    <i className="fa-duotone fa-copy text-2xs"></i>
                  </button>
                </CopyToClipboard>
              </div>
              </li>
            )}
            
            <li className="list-pair mb-2">
              <span className="list-key !w-1/2 text-xs md:text-sm capitalize">
                Network
              </span>
              <div className="ml-auto flex items-center list-value">
                {/* <span className="w-4 h-4 mr-2 -mt-1">
                  <BscSvg />
                </span> */}
                <span>{project.platform.name}</span>
              </div>
            </li>

            <li className="list-pair mb-2">
              <span className="list-key !w-1/2 text-xs md:text-sm capitalize">
                Website
              </span>
              <div className="list-value flex justify-end ml-auto items-center">
                <a href={project.website} target="_blank" className="link">{project.website}</a>
              </div>
            </li>

            <li className="list-pair mb-2">
              <span className="list-key !w-1/2 text-xs md:text-sm capitalize">
                Connect
              </span>
              <ul className="flex ml-auto space-x-3">
                {project.twitter && (
                  <li>
                    <a className="flex justify-center items-center" title="Twitter" target="_blank" href={project.twitter} rel="noreferrer">
                      <i className="fa-brands fa-twitter text-base"></i>
                      <span className="sr-only">Twitter</span>
                    </a>
                  </li>

                )}

                {project.discord && (
                <li>
                  <a className="flex justify-center items-center" title="Discord" target="_blank" href={project.discord} rel="noreferrer">
                    <i className="fa-brands fa-discord text-base"></i>
                    <span className="sr-only">Discord</span>
                  </a>
                </li>
                )}
                
                {project.medium && (
                  <li>
                    <a className="flex justify-center items-center" title="Medium" target="_blank" href={project.medium}>
                      <i className="fa-brands fa-medium text-base"></i>
                      <span className="sr-only">Medium</span>
                    </a>
                  </li>
                )}
                
                {project.telegram && (
                  <li>
                    <a className="flex justify-center items-center" title="Telegram"  target="_blank" href={project.telegram} rel="noreferrer">
                      <i className="fa-brands fa-telegram-plane text-base"></i>
                      <span className="sr-only">Telegram</span>
                    </a>
                  </li>
                )}
              </ul>
            </li>
          </ul>

        </div>
      </div>
      {/* end of project-brief */}

      <div className="card card-default project-process">
        <div className="card-header">
          <h3>{project.content.title}</h3>
        </div>
        <div className="card-body">
          <div className="h-full" 
            dangerouslySetInnerHTML={{ __html: project.content?.description }}
          ></div>
          <p className="mt-auto pt-4">
            <Link href={`/${i18n.language}/launchverse/${project.slug}/reearch`} >
              <a href={`/${i18n.language}/launchverse/${project.slug}/reearch`} className="link">{t("Read full research")}</a>
            </Link> 
          </p>
        </div>

      </div>

    </div>
  )
}

export default ProjectContent; 