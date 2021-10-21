import {observer} from "mobx-react";
import {Transition,Popover} from "@headlessui/react"
import { usePopper } from 'react-popper'
import {useRef, useState} from "react";
import { getSourceFromUri } from "./PostsList";
import RadaPost from "./../svg/RadaPost";
export const PostDetailAuthor = observer(({item,isRada}) => {
  let [referenceElement, setReferenceElement] = useState()
  let [popperElement, setPopperElement] = useState()
  let { styles, attributes } = usePopper(referenceElement, popperElement)
  const buttonRef = useRef();
  let authorImg = ""
  if (item.author && item.author.image.small){
    authorImg = item.author.image.small
  }
  if (authorImg && authorImg !== ""){
    return (
      <Popover className="relative">
        
        <Popover.Panel ref={setPopperElement}
                       style={styles.popper}
                       {...attributes.popper}>
          {({ close }) => (
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform origin-top-left opacity-100 scale-0"
              enterTo="transform origin-top-left opacity-100 scale-100"
              leave="transition origin-bottom-right ease-in duration-75"
              leaveFrom="transform origin-bottom-right opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-0"
            >
            <div className={`popper popper-author-info`}>
              <div>
                <div className="page-close">
                  <button onClick={() => {buttonRef.current?.click()}} className="btn popper-close-btn">
                    <span class="icon"><i class="fa-solid fa-times hidden md:!block"></i></span>
                  </button>
                </div>
                <div className="popper-header">
                  <span class="avatar mr-2">
                    <img src={authorImg} alt={getSourceFromUri(item)}/>
                  </span>
                  <div className="flex flex-col">
                    <strong className="text-base">{getSourceFromUri(item)}</strong>
                  </div>
                </div>
                <div className="popper-body">
                  {item.author.description}
                </div>
                <div className="popper-footer">
                  <div className="about-social">
                    {item.author.facebook && 
                    <a className="btn" href={item.author.facebook} rel="nofollow" target="_blank">
                      <i class="fa-brands fa-facebook-f"></i>
                    </a>
                    }
                    {item.author.linkedin &&
                    <a className="btn" href={item.author.linkedin} rel="nofollow" target="_blank">
                      <i class="fa-brands fa-linkedin-in"></i>
                    </a>
                    }
                    {item.author.twitter && 
                    <a className="btn" href={item.author.twitter} rel="nofollow" target="_blank">
                      <i class="fa-brands fa-twitter"></i>
                    </a>
                    }
                    
                  </div>
                </div>
              </div>
            </div>
            </Transition>
          )}
        </Popover.Panel>
  
        <Popover.Button className="btn flex justify-center" ref={buttonRef} title="Author">
        <>
        {isRada ? (
          <>
          {authorImg && authorImg !== "" ? 
          <span className="mr-1.5 relative -bottom-0.5">
            <span className="avatar-sm">
              <img src={authorImg} alt={getSourceFromUri(item)}/>
            </span> 
          </span>
          : <span className="icon icon-rada w-3.5 mr-1.5 opacity-70">
            <RadaPost />
            </span>
          }
          </>
        ) : (
          <span className="icon mr-1.5">
            <i className="fa-duotone fa-newspaper"></i>
          </span>
        )}
  
        <span className="metadata-value" title={getSourceFromUri(item)}>
          {getSourceFromUri(item)}
        </span>
        </>
        </Popover.Button>
  
      </Popover>
  
    )
  }

  return (
    <>
      {isRada ? (
        <>
        <span className="icon icon-rada w-3.5 mr-1.5 opacity-70">
          <RadaPost />
        </span>
        </>
      ) : (
        <span className="icon mr-1.5">
          <i className="fa-duotone fa-newspaper"></i>
        </span>
      )}

      <span className="metadata-value" title={getSourceFromUri(item)}>
        {getSourceFromUri(item)}
      </span>
      </>
  )
  
})