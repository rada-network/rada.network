import { CheckSvg } from "../../../../components/svg/SvgIcons";
const SwapTokens = ({}) => {
  return (
    <>
      <div className="global-padding">
        <div className="mb-2 flex gap-4">
          <div className="w-1/2">
            <label for="currency" className="mb-2 block tracking-wide font-medium opacity-70">Number of Boxes</label>
          </div>
          <div className="w-1/2">
            <label for="rir" className="mb-2 block tracking-wide font-medium opacity-70">Bid</label>
          </div>
          
        </div>
        <div className="relative">
          <div className="mb-4 flex gap-4 relative">
            <div className="w-1/2 flex-grow">
              <select id="box" name="amount" className="select-custom w-full ">
                {/* remove '!rounded-l-none' if user doesn't have RIR */}
                <option className="text-gray-300" selected>1</option>
                <option className="text-gray-300">2</option>
                <option className="text-gray-300">3</option>
                <option className="text-gray-300">4</option>
                <option className="text-gray-300">5</option>
                <option className="text-gray-300">6</option>
                <option className="text-gray-300">7</option>
                <option className="text-gray-300">8</option>
                <option className="text-gray-300">9</option>
                <option className="text-gray-300">10</option>
              </select>
            </div>
            <div className="w-1/2  flex-grow">
              <select id="rir" name="rir" className="select-custom  w-full ">
                {/* remove '!rounded-l-none' if user doesn't have RIR */}
                <option className="text-gray-300" selected>100 BUSD</option>
                <option className="text-gray-300">200 BUSD</option>
                <option className="text-gray-300">300 BUSD</option>
                <option className="text-gray-300">400 BUSD</option>
                <option className="text-gray-300">500 BUSD</option>
                <option className="text-gray-300">600 BUSD</option>
                <option className="text-gray-300">700 BUSD</option>
                <option className="text-gray-300">800 BUSD</option>
                <option className="text-gray-300">900 BUSD</option>
                <option className="text-gray-300">1000 BUSD</option>
              </select>          
            </div>
          </div>
          <button className="!absolute right-0 text-gray-600 dark:text-white !top-1 -mr-10 w-8 h-8 rounded-full flex items-center justify-items-center justify-center
          bg-gray-200 dark:bg-gray-600 text-lg hover:bg-red-400 dark:hover:bg-red-400">&times;</button>
        </div>
       
        <div className="relative">
          <div className="mb-4 flex gap-4 relative">
            <div className="w-1/2 flex-grow">
              <select id="box" name="amount" className="select-custom w-full ">
                {/* remove '!rounded-l-none' if user doesn't have RIR */}
                <option className="text-gray-300" selected>1</option>
                <option className="text-gray-300">2</option>
                <option className="text-gray-300">3</option>
                <option className="text-gray-300">4</option>
                <option className="text-gray-300">5</option>
                <option className="text-gray-300">6</option>
                <option className="text-gray-300">7</option>
                <option className="text-gray-300">8</option>
                <option className="text-gray-300">9</option>
                <option className="text-gray-300">10</option>
              </select>
            </div>
            <div className="w-1/2  flex-grow">
              <select id="rir" name="rir" className="select-custom  w-full ">
                {/* remove '!rounded-l-none' if user doesn't have RIR */}
                <option className="text-gray-300" selected>100 BUSD</option>
                <option className="text-gray-300">200 BUSD</option>
                <option className="text-gray-300">300 BUSD</option>
                <option className="text-gray-300">400 BUSD</option>
                <option className="text-gray-300">500 BUSD</option>
                <option className="text-gray-300">600 BUSD</option>
                <option className="text-gray-300">700 BUSD</option>
                <option className="text-gray-300">800 BUSD</option>
                <option className="text-gray-300">900 BUSD</option>
                <option className="text-gray-300">1000 BUSD</option>
              </select>          
            </div>
          </div>
          <button className="!absolute right-0 text-gray-600 dark:text-white !top-1 -mr-10 w-8 h-8 rounded-full flex items-center justify-items-center justify-center
          bg-gray-200 dark:bg-gray-600 text-lg hover:bg-red-400 dark:hover:bg-red-400">&times;</button>
        </div>
        <div className="relative">
          <div className="mb-4 flex gap-4 relative">
            <div className="w-1/2 flex-grow">
              <select id="box" name="amount" className="select-custom w-full ">
                {/* remove '!rounded-l-none' if user doesn't have RIR */}
                <option className="text-gray-300" selected>--</option>
                <option className="text-gray-300">1</option>
                <option className="text-gray-300">2</option>
                <option className="text-gray-300">3</option>
                <option className="text-gray-300">4</option>
                <option className="text-gray-300">5</option>
                <option className="text-gray-300">6</option>
                <option className="text-gray-300">7</option>
                <option className="text-gray-300">8</option>
                <option className="text-gray-300">9</option>
                <option className="text-gray-300">10</option>
              </select>
            </div>
            <div className="w-1/2  flex-grow">
              <select id="rir" name="rir" className="select-custom  w-full ">
                {/* remove '!rounded-l-none' if user doesn't have RIR */}
                <option className="text-gray-300" selected>Select BUSD</option>
                <option className="text-gray-300">100 BUSD</option>
                <option className="text-gray-300">200 BUSD</option>
                <option className="text-gray-300">300 BUSD</option>
                <option className="text-gray-300">400 BUSD</option>
                <option className="text-gray-300">500 BUSD</option>
                <option className="text-gray-300">600 BUSD</option>
                <option className="text-gray-300">700 BUSD</option>
                <option className="text-gray-300">800 BUSD</option>
                <option className="text-gray-300">900 BUSD</option>
                <option className="text-gray-300">1000 BUSD</option>
              </select>          
            </div>
          </div>
          
        </div>
        
        <div className="mb-4 flex gap-4 items-center pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="w-1/2">
           Total
          </div>
          <div className="w-1/2 text-right text-xl ">
            500 BUSD       
          </div>
        </div>


          

          
          {/* <div className="dark:text-gray-400 mt-2 text-gray-500">You have to pay <strong>100 busd</strong></div> */}
       
        {/* chưa nhập amount thì ẩn 2 nút enable cái này đi */}
        <div className="mt-4  grid grid-cols-2 gap-4"> 
          {/* bỏ grid grid-cols-2 nếu user không có RIR hoặc không dùng RIR */}
          <div className="flex-shrink-0 flex-grow">
            <button className="btn relative  w-full btn-default btn-default-lg btn-purple" disabled="" id="swap-button" width="100%" scale="md">
            <span className="spinner" /> 
              Enable BUSD
            </button>     
          </div>
          <div  className="flex-shrink-0 flex-grow">
            <button className="btn disabled relative w-full btn-default btn-default-lg btn-purple" disabled="" id="swap-button" width="100%" scale="md">
            {/* <span className="spinner" />  */}
              Prefund
            </button>         
          </div>
        </div>

        

      </div>

    </>
  )
}

export default SwapTokens