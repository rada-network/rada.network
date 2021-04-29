import {CommentForm} from "./commentForm";
import {SubSideBar} from "../subSideBar";
import {CommentThreads} from "./commentThreads";

export const CommentList = ({item}) => {
  return (
    <>
      <div className="pt-8 border-t border-gray-100 section section-project-discussions">
        <div className="section-header">
          <div className="section-title">Discussions</div>
        </div>
        <div className="section-body">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-9 md:pr-10">
              {/* Comment Form */}
              <div className="grid grid-cols-1">
                <div className="flex justify-center items-baseline">
                  <CommentForm replyFor={null}  item={item} />
                </div>
              </div>
              {/* Comment Threads */}
              <CommentThreads item={item} />
            </div>
            <SubSideBar />
          </div>
        </div>
      </div>
    </>
  )
}