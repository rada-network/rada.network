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
              <span className="list-key">
                {project.token.symbol}'s Contract
              </span>
              <div className="ml-auto flex items-center list-value font-semibold">
                <a target="_blank" href="" title={project.token.contract_address}>{`${project.token.contract_address.substr(0, 5)}...${project.token.contract_address.substr(-4)}`}</a>
                <CopyToClipboard text=""
                  onCopy={handleCopy}
                  text={project.token.contract_address}
                >
                  <button class="btn btn-default ml-2">
                    <i className="fa-duotone fa-copy text-2xs"></i>
                  </button>
                </CopyToClipboard>
              </div>
              </li>
            )}
            
            <li className="list-pair mb-2">
              <span className="list-key">
                Network
              </span>
              <div className="ml-auto flex items-center list-value">
                <span className="w-4 h-4 mr-2">
                  <BscSvg />
                </span>
                <span>{project.platform.name}</span>
              </div>
            </li>

            <li className="list-pair mb-2">
              <span className="list-key">
                Website
              </span>
              <div className="list-value flex justify-end ml-auto items-center">
                <i class="fa-solid fa-globe mr-2"></i>
                <a href={project.website} target="_blank" className="link">{project.website}</a>
              </div>
            </li>

            <li className="list-pair mb-2">
              <span className="list-key">
                Connect
              </span>
              <ul className="flex ml-auto">
                {project.twitter && (
                  <li className="ml-2">
                    <a class="btn-twitter" title="Twitter" target="_blank" href={project.twitter} rel="noreferrer">
                      <i class="fa-brands fa-twitter"></i>
                      <span className="sr-only">Twitter</span>
                    </a>
                  </li>

                )}

                {project.discord && (
                  <li className="ml-2">
                  <a class="btn-discord"  title="Discord" target="_blank" href={project.discord} rel="noreferrer">
                    <i class="fa-brands fa-discord"></i>
                    <span className="sr-only">Discord</span>
                  </a>
                  </li>
                )}
                
                {project.medium && (
                  <li className="ml-2">
                    <a class="btn-medium"  title="Medium" target="_blank" href={project.medium}>
                      <i class="fa-brands fa-medium"></i>
                      <span className="sr-only">Medium</span>
                    </a>
                  </li>
                )}
                
                {project.telegram && (
                  <li className="ml-2">
                    <a class="btn-telegram"  title="Telegram"  target="_blank" href={project.telegram} rel="noreferrer">
                      <i class="fa-brands fa-telegram"></i>
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