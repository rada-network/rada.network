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
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-0"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          >
          <div className={`popper`}>
            <p>content</p>
          </div>
          </Transition>
        )}
      </Popover.Panel>

      <Popover.Button className="btn flex justify-center hover:opacity-100" ref={buttonRef} title="Author">
      <>
      {isRada ? (
        <span className="mr-1.5">
          {authorImg && authorImg !== "" ? 
          <span className="avatar-sm">
            <img src={authorImg} alt={getSourceFromUri(item)}/>
          </span> 
          : <RadaPost />}
        </span>
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