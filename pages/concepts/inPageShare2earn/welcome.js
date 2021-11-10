import { Head } from "../../../components/Head";

function Concept() {
  return (
    <>     
    <Head />

    <div className="pane-content--sec--main grid scrollbar">

      <div className="page page-share2earn">

        <div className="section max-w-screen-sm mx-auto">

          <div className="section-header">
            <h1>
              <span class="text-xl lg:text-2xl font-semibold">
                Join program now. Earn RIR token ✨
              </span>
            </h1>
          </div>

          <div className="section-body">

            <div className="box box--primary box-share2earn">
              <div className="box-body">
                <div className="mt-4 mb-6">
                  <img className="" src={process.env.NEXT_PUBLIC_CDN + "/images/logos/share2earn.png"} alt="RADA Share2Earn Program" />
                </div>
                <h2 className="flex flex-col">
                  <strong className="text-4xl font-semibold flex items-center tracking-wide">
                    <span>Share</span>
                    <span className="text-3xl flex items-center justify-center bg-white w-10 h-10 rounded-full text-primary-500 mx-2 font-bold">2</span>
                    <span>Earn</span>
                  </strong>
                  <span className="mt-2 text-lg font-medium tracking-wide">by RADA Network</span>
                </h2>
              </div>
            </div>

            To encourage our members to share and help our project’s community grow farther, Rada will reward RIR token for each person visit through your refferal link and make these actions below:
          </div>

        </div>

      </div>
   
    </div>

    </>
  )
}

export default Concept
