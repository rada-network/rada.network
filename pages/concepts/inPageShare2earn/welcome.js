import { Head } from "../../../components/Head";

function Concept() {
  return (
    <>     
    <Head />

    <div className="pane-content--sec--main grid scrollbar">

      <div className="page page-share2earn">

        <div className="section max-w-screen-sm mx-auto">

          <div className="section-body">
            <h1 className="mb-4">
              <span class="text-xl lg:text-2xl font-semibold text-color-title">
                Join program now. Earn RIR token ✨
              </span>
            </h1>

            <div className="box box--primary box-share2earn mb-4">
              <div className="box-body">
                <div className="mb-4">
                  <img className="" src={process.env.NEXT_PUBLIC_CDN + "/images/logos/share2earn.png"} alt="RADA Share2Earn Program" />
                </div>
                <h2 className="flex flex-col font-altsans">
                  <strong className="text-4xl font-semibold flex items-center tracking-wider">
                    <span>Share</span>
                    <span className="text-3xl flex items-center justify-center bg-white w-9 h-9 rounded-full text-primary-500 mx-2 font-bold">2</span>
                    <span>Earn</span>
                  </strong>
                  <span className="mt-1 text-lg font-medium tracking-wide">by RADA Network</span>
                </h2>
              </div>
            </div>

            <p className="text-sm mb-8 text-gray-500 dark:text-gray-400">To encourage our members to share and help our project’s community grow farther, Rada will reward <span className="text-primary-700 dark:text-primary-400">RIR token</span> for each person visit through your refferal link and make these actions below:</p>

            <ul className="text-sm space-y-6">
              <li className="flex items-center">
                <span className="icon shape--hexagon mr-4 !flex w-px-40 h-px-40 items-center justify-center">
                  <i class="fa-light fa-hexagon"></i>
                  <i className="fa-duotone fa-user-plus"></i>
                </span>
                <div className="flex flex-col">
                  <strong className="text-base text-color-title">A Refferal Person join Share2Earn program</strong>
                  <span className="text-gray-500 dark:text-gray-400">You get <span className="text-primary-700 dark:text-primary-400">+0.5 RIR</span> for each</span>
                </div>
              </li>
              <li className="flex items-center">
                <span className="icon shape--hexagon mr-4 !flex w-px-40 h-px-40 items-center justify-center">
                  <i class="fa-light fa-hexagon"></i>
                  <i class="fa-duotone fa-hand-holding-heart"></i>
                </span>
                <div className="flex flex-col">
                  <strong className="text-base text-color-title">A Refferal Person join IDO and buy allocation</strong>
                  <span className="text-gray-500 dark:text-gray-400">You get <span className="text-primary-700 dark:text-primary-400">+1 RIR</span> for each</span>
                </div>
              </li>
              <li className="flex items-center">
                <span className="icon shape--hexagon mr-4 !flex w-px-40 h-px-40 items-center justify-center">
                  <i class="fa-light fa-hexagon"></i>
                  <i className="fa-duotone fa-users"></i>
                </span>
                <div className="flex flex-col">
                  <strong className="text-base text-color-title">Get refferal bonus for each new refferal level 2 member</strong>
                  <span className="text-gray-500 dark:text-gray-400">You get <span className="text-primary-700 dark:text-primary-400">+0.1 RIR</span> for each</span>
                </div>
              </li>
            </ul>

            <form className="mt-4">

              <fieldset class="space-y-4 mb-4 text-gray-500 dark:text-gray-400">
                <legend class="sr-only">Notifications</legend>
                <div class="relative flex items-start">
                  <div class="flex items-center h-5">
                    <input id="comments" aria-describedby="comments-description" name="comments" type="checkbox" class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="comments" class="">
                      I confirm that I have to finish all missions to be eligible to receive rewards from Rada Network
                    </label>
                  </div>
                </div>
              </fieldset>

              <btn className="mt-4 btn btn-yellow w-full justify-center py-3 px-4" type="submit">Joint Program</btn>

            </form>

          </div>

        </div>

      </div>
   
    </div>

    </>
  )
}

export default Concept
