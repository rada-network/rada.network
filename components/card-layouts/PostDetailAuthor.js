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
  return (
    <Popover className="relative">
      
      <Popover.Panel ref={setPopperElement}
                     style={styles.popper}
                     {...attributes.popper}>
        {({ close }) => (
          <Transition
            enter="transition ease duration-100"
            enterFrom="transform origin-top-left scale-0"
            enterTo="transform origin-top-left scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-0"
          >
          <div className={`popper popper-author-info`}>
            <div>
              <div className="page-close">
                <button className="btn popper-close-btn">
                  <span class="icon"><i class="fa-solid fa-times hidden md:!block"></i></span>
                </button>
              </div>
              <div className="popper-header">
                <span class="avatar mr-2">
                  <img src="https://gql.dhunt.io/media/assets/ebbc06f0-d4e2-49e2-91db-d37ed33a80ab?format=webp&amp;width=256" alt="Quang Hong Dang" />
                </span>
                <div className="flex flex-col">
                  <strong className="text-base">Quang Hong Dang</strong>
                </div>
              </div>
              <div className="popper-body">
                Thông tin giới thiệu về tác giả ở đây. Min 2 dòng. Max khoảng 4 dòng.
              </div>
              <div className="popper-footer">
                <div className="about-social">
                  <a className="btn" href="" rel="nofollow" target="_blank">
                    <i class="fa-brands fa-facebook-f"></i>
                  </a>
                  <a className="btn" href="" rel="nofollow" target="_blank">
                    <i class="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a className="btn" href="" rel="nofollow" target="_blank">
                    <i class="fa-brands fa-twitter"></i>
                  </a>
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
})