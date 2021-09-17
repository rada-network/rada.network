import React from "react";

export default function Intro({ dataStore }) {
  return (
    <div className="page-about">

      <div className={`page-about-deco`} />

      <div className="page-about-content">

        <div className="page-about-content--section content-section--1">

          <span className="icon"><i class="fa-solid fa-info"></i></span>

          <div>
            <h3>RADA là gì?</h3>
            <p>
              RADA là phiên bản “Báo mới” dành cho các nhà đầu tư Blockchain và
              Crypto.
            </p>
          </div>

        </div>

        <div className="page-about-content--section content-section--2">

          <span className="icon"><i class="fa-regular fa-rocket"></i></span>

          <div>
            <h3>RADA sẽ hoạt động như thế nào?</h3>
            <p>
              <u>Bước 1</u>: Hệ thống sẽ “quyét” toàn bộ các tin tức về Blockchain/Crypto
              các trang tin lớn trên thế giới và Việt Nam.
            </p>
            <p>
              <u>Bước 2</u>:Công nghệ Big data và AI đề xuất các tin tức, thông tin quan
              trọng nhất để đảm bảo bạn không bỏ lỡ cơ hội quan trọng nào trong
              thị trường Crypto.
            </p>
            <p>
              Rada.co hỗ trợ đa ngôn ngữ, các users đến từ quốc gia nào sẽ được
              điều hướng sang ngôn ngữ địa phương, sử dụng đầu vào là các nguồn
              tin từ báo chí địa phương.
            </p>
          </div>
        </div>

        {/* <h3 className="text-color-title">Phiên bản hiện tại</h3>
        <p>
          - Bản daily built mới nhất cho thị trường Việt Nam tại:{" "}
          <a
            className="link"
            target="_blank"
            href="https://rada.co/vi"
            rel="noreferrer"
          >
            https://rada.co/vi
          </a>
        </p>
        <p>
          - Phiên bản dành cho cho những người sử dụng tiếng Anh sẽ được hoàn
          thiện tại:{" "}
          <a
            className="link"
            target="_blank"
            href="https://rada.co/en"
            rel="noreferrer"
          >
            https://rada.co/en
          </a>
        </p> */}

        {/* <h3 className="text-color-title">Cộng đồng</h3>
        <p>
          Tham gia vào cộng đồng Rada.co để tham gia thảo luận, yêu cầu tính
          năng mới và nhận những cập nhật mới nhất về dự án.
        </p> */}

          <div className="page-about-content--section">

          <ul className="about-links">
            <li><a href="#">Copyright</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms of Use</a></li>
          </ul>

          <div className="about-social">
          <a
              className="btn-facebook" 
              target="_blank"
              href="https://www.facebook.com/RADA-Media-100147568952754"
            >
              <i className="fab fa-facebook" />
            </a>

            <a
              className="btn-discord" 
              target="_blank"
              href="https://discord.gg/ENm9SpQs"
              rel="noreferrer"
            >
              <i className="fab fa-discord" />
            </a>

            <a
              className="btn-twitter" 
              target="_blank" 
              href="https://twitter.com/radamedia"
              rel="noreferrer"
            >
              <i className="fab fa-twitter" />
            </a>

            <a 
              className="btn-medium" 
              target="_blank" 
              href="https://medium.com/@radamedia"
              rel="noreferrer"
            >
              <i className="fab fa-medium-m" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
