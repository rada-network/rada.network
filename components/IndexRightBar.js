import {observer} from "mobx-react";
import React, {createRef, useEffect} from "react";
import PerfectScrollbar from "perfect-scrollbar";
import Screen from "./Resposive";
import {Wallet} from "./Wallet";
import {PostListDetail} from "./card-layouts/concepts/PostListDetail";
import {Header} from "./headers/HeaderHome";
import {Sidebar} from "./sidebar/Sidebar";

export const IndexRightBar = observer(({dataStore,detailStore,voteStore}) => {

  const scrollBox2 = createRef();
  let ps2;

  useEffect(() => {
    // make scrollbar
    ps2 = new PerfectScrollbar(scrollBox2.current, {});
  }, [scrollBox2]);
  return (
    <>
      <div className={`pane-content--sec` + (dataStore.showDetail ? " pane-content-active" : "")}>

        <Screen from="lg">
          <div className={`pane-content--sec--top`}>
            <div className="leading-10"></div>
            <div className="flex items-center space-x-2">
              {/* <ThemeSwitch /> */}
              <div className="relative">
                <Wallet />
              </div>
            </div>
          </div>
        </Screen>

        {dataStore.showDetail ?
          <PostListDetail detailStore={detailStore} dataStore={dataStore} voteStore={voteStore} />
          :
          ""
        }

        <div className={`pane-content--sec--main scrollbar ` + (dataStore.showDetail ? "hidden" : "")} ref={scrollBox2}>

          <div className="empty-state">
            <div className={`home-emptystate-deco`} />

            <div className="empty-state-content">
            
              <h3>Rada.co là gì?</h3>
              <p>Rada.co là phiên bản “Báo mới” dành cho các nhà đầu tư Blockchain và Crypto.</p>

              <h3>Rada.co sẽ hoạt động như thế nào?</h3>
              <p>Bước 1: Hệ thống sẽ “quyét” toàn bộ các tin tức về Blockchain/Crypto các trang tin lớn trên thế giới và Việt Nam.</p>

              <p>Bước 2: Công nghệ Big data và AI đề xuất các tin tức, thông tin quan trọng nhất để đảm bảo bạn không bỏ lỡ cơ hội quan trọng nào trong thị trường Crypto.</p>

              <p>Rada.co hỗ trợ đa ngôn ngữ, các users đến từ quốc gia nào sẽ được điều hướng sang ngôn ngữ địa phương, sử dụng đầu vào là các nguồn tin từ báo chí địa phương.</p>

              <h3>Phiên bản hiện tại</h3>
              <p>- Bản daily built mới nhất cho thị trường Việt Nam tại: <a className="link" target="_blank" href="https://dev.dhunt.io/vi">https://dev.dhunt.io/vi</a></p>
              <p>- Phiên bản dành cho cho những người sử dụng tiếng Anh sẽ được hoàn thiện tại: <a className="link" target="_blank" href="https://rada.co/en">https://rada.co/en</a></p>

              <h3>Cộng đồng</h3>
              <p>Tham gia vào cộng đồng Rada.co để tham gia thảo luận, yêu cầu tính năng mới và nhận những cập nhật mới nhất về dự án.</p>
              <div className="about-social">
                <a target="_blank" href="https://www.facebook.com/RADA-Media-100147568952754">
                  <i class="fab fa-facebook" />
                </a>

                <a target="_blank" href="https://twitter.com/radamedia">
                  <i class="fab fa-twitter" />
                </a>

                <a target="_blank" href="https://medium.com/@radamedia">
                  <i class="fab fa-medium-m" />
                </a>

                <a target="_blank" href="https://discord.gg/ENm9SpQs">
                  <i class="fab fa-discord" />
                </a>
              </div>

            </div>

          </div>

          {/* <Header props={{
            itemType : "home",
          }}/> */}

          {/* Temporary Disable Widgets */}
          {/* <Sidebar className={`sidebar`} extraClass="" /> */}
        </div>

      </div>
    </>
  )
})