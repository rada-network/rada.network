export const UserDistribution = ({props}) => { 
  return (
    <>
    {/* Distribution */}
      <div className="card card-pagecontent">
        <div className="card-header">
          <span className="card-title">
            Contribution (required)
          </span>
        </div>
        {props.lang == "vi" ? 
        <ContentVi /> : 
        <ContentEn />
        }
        

      </div>
      {/* END: Distribution */}
    </>
  )
}

const ContentVi = function(){
  return (
    <div className="card-body">
      <div className="list-group">

        <div className="list-group--item !justify-start !items-start !flex-nowrap"> 
          
          <i className="fa-solid fa-circle-1 mr-2 md:mr-4 text-xl md:text-3xl text-purple-500"></i>

          <div>
            <h3 className="font-semibold mt-1 mb-2 lg:mt-2">
            Level 1: <strong>Raders</strong>
            </h3>
            <ul className="grid grid-cols-1 w-full">
              <li className="mb-1"><i className="fa-solid fa-check text-green-400 mr-2"></i> <strong>Yêu cầu:</strong> Subscribe các channel RADA</li>
              <li className="mb-1"><i className="fa-solid fa-check text-green-400 mr-2"></i> <strong>Quyền lợi:</strong> Token trị giá $20 (Private Sale)</li>
              <li className="mb-1"><i className="fa-solid fa-check text-green-400 mr-2"></i> <strong>Số lượng:</strong> 100 người</li>
            </ul>
          </div>
        </div>

        <div className="list-group--item !justify-start !items-start !flex-nowrap"> 

          <i className="fa-solid fa-circle-2 mr-2 md:mr-4 text-xl md:text-3xl text-yellow-500"></i>

          <div>
            <h3 className="font-semibold mt-1 mb-2 lg:mt-2">
            Level 2: <strong>RADA Contributor</strong>(Những người có đóng góp cho RADA)
            </h3>
            <ul className="grid grid-cols-1 w-full">
              <li className="mb-1"><i className="fa-solid fa-check text-green-400 mr-2"></i> <strong>Yêu cầu:</strong> Đáp ứng ít nhất 1 trong các tiêu chí sau</li>
              <ul className="grid grid-cols-1 w-full ml-8">
                <li className="mb-1">
                  <i className="fa-solid fa-circle-small text-green-200 mr-2"></i>
                  Đăng bài trong RADA Group
                </li>
                <li className="mb-1"><i className="fa-solid fa-circle-small text-green-200 mr-2"></i>Dịch thuật 1 bài viết sang ngôn ngữ bất kỳ</li>
                <li className="mb-1"><i className="fa-solid fa-circle-small text-green-200 mr-2"></i>Ít nhất 1 commit lên RADA Repository</li>
                <li className="mb-1"><i className="fa-solid fa-circle-small text-green-200 mr-2"></i>Đã điền đơn đăng ký</li>
              </ul>
              <li className="mb-1"><i className="fa-solid fa-check text-green-400 mr-2"></i> <strong>Quyền lợi:</strong> Token trị giá $100 (Private Sale)</li>
              <li className="mb-1">
                <i className="fa-solid fa-check text-green-400 mr-2"></i> 
                <strong>Số lượng:</strong> <a href="https://forms.gle/SkhQPsauBeQLSq6J8" target="_blank">100 người đầu tiên điền đơn</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="list-group--item !justify-start !items-start !flex-nowrap"> 

          <i className="fa-solid fa-circle-3 mr-2 md:mr-4 text-xl md:text-3xl text-green-500"></i>

          <div>
            <h3 className="font-semibold mt-1 mb-2 lg:mt-2">
            Level 3: <strong>RADA Team & RADA Advisors</strong>
            </h3>
            <ul className="grid grid-cols-1 w-full">
              <li className="mb-1"><i className="fa-solid fa-check text-green-400 mr-2"></i> <strong>Yêu cầu:</strong> đáp ứng một trong 2 tiêu chí sau</li>
              <ul className="grid grid-cols-1 w-full ml-8">
                <li className="mb-1"><i className="fa-solid fa-circle-small text-green-200 mr-2"></i>Thành viên, <strong>cống hiến, làm việc full time</strong> cho RADA.</li>
                <li className="mb-1"><i className="fa-solid fa-circle-small text-green-200 mr-2"></i><strong>Advisor</strong> của RADA</li>
              </ul>
              <li className="mb-1"><i className="fa-solid fa-check text-green-400 mr-2"></i> <strong>Quyền lợi:</strong> Token trị giá $200 (Private Sale)</li>
            </ul>
          </div>
        </div>

      </div>
                  
    </div>
  )
}

const ContentEn = function(){
  return (
    <div className="card-body">
      <div className="list-group">

        <div className="list-group--item !justify-start !items-start !flex-nowrap"> 
          
          <i className="fa-solid fa-circle-1 mr-2 md:mr-4 text-xl md:text-3xl text-purple-500"></i>

          <div>
            <h3 className="font-semibold mt-1 mb-2 lg:mt-2">
            Level 1: <strong>Raders</strong>
            </h3>
            <ul className="grid grid-cols-1 w-full">
              <li className="mb-1"><i className="fa-solid fa-check text-green-400 mr-2"></i> <strong>Requirements:</strong> Subscribe to RADA channels</li>
              <li className="mb-1"><i className="fa-solid fa-check text-green-400 mr-2"></i> <strong>Benefits:</strong> $20 worth of tokens (Private Sale)</li>
              <li className="mb-1"><i className="fa-solid fa-check text-green-400 mr-2"></i> <strong>Quantity:</strong> 100 people</li>
            </ul>
          </div>
        </div>

        <div className="list-group--item !justify-start !items-start !flex-nowrap"> 

          <i className="fa-solid fa-circle-2 mr-2 md:mr-4 text-xl md:text-3xl text-yellow-500"></i>

          <div>
            <h3 className="font-semibold mt-1 mb-2 lg:mt-2">
            Level 2: <strong>RADA Contributor</strong>(RADA Contributors)
            </h3>
            <ul className="grid grid-cols-1 w-full">
              <li className="mb-1"><i className="fa-solid fa-check text-green-400 mr-2"></i> <strong>Requirements:</strong>Meet at least 1 of the following criteria</li>
              <ul className="grid grid-cols-1 w-full ml-8">
                <li className="mb-1">
                  <i className="fa-solid fa-circle-small text-green-200 mr-2"></i>
                  Least 1 post in RADA's FB Group
                </li>
                <li className="mb-1"><i className="fa-solid fa-circle-small text-green-200 mr-2"></i>Least 1 translation into 2nd language</li>
                <li className="mb-1"><i className="fa-solid fa-circle-small text-green-200 mr-2"></i>Least 1 git commit to RADA's repository</li>
                <li className="mb-1"><i className="fa-solid fa-circle-small text-green-200 mr-2"></i>Submitted this form application</li>
              </ul>
              <li className="mb-1"><i className="fa-solid fa-check text-green-400 mr-2"></i> <strong>Benefits:</strong> $100 worth of tokens(Private sale)</li>
              <li className="mb-1">
                <i className="fa-solid fa-check text-green-400 mr-2"></i> 
                <strong>Quantity:</strong>
                <a rel="nofollow " href="https://forms.gle/SkhQPsauBeQLSq6J8" target="_blank">First 100 people to fill out the application</a>
               </li>
            </ul>
          </div>
        </div>

        <div className="list-group--item !justify-start !items-start !flex-nowrap"> 

          <i className="fa-solid fa-circle-3 mr-2 md:mr-4 text-xl md:text-3xl text-green-500"></i>

          <div>
            <h3 className="font-semibold mt-1 mb-2 lg:mt-2">
            Level 3: <strong>RADA Team & RADA Advisors</strong>
            </h3>
            <ul className="grid grid-cols-1 w-full">
              <li className="mb-1"><i className="fa-solid fa-check text-green-400 mr-2"></i> <strong>Requirements:</strong> meet one of the following 2 criteria</li>
              <ul className="grid grid-cols-1 w-full ml-8">
                <li className="mb-1"><i className="fa-solid fa-circle-small text-green-200 mr-2"></i>Devoted member, working full time for RADA.</li>
                <li className="mb-1"><i className="fa-solid fa-circle-small text-green-200 mr-2"></i><strong>Advisor</strong> for RADA</li>
              </ul>
              <li className="mb-1"><i className="fa-solid fa-check text-green-400 mr-2"></i> <strong>Benefits:</strong> $200 worth of tokens (Private sale)</li>
            </ul>
          </div>
        </div>

      </div>
                  
    </div>
  )
}