import { CheckSvg } from "../../../../components/svg/SvgIcons";
const SwapTokens = ({}) => {
  return (
    <>
      <div className="global-padding">
        <div className="mb-4 p2-4 flex border-b dark:border-opacity-40 border-gray-200 dark:border-gray-700">
          <div className="w-1/5 flex-shrink-0 pr-2">
            <label for="currency" className="mb-2 block tracking-wide font-medium opacity-70">Boxes</label>
          </div>
          <div className="w-2/5 flex-shrink-0 pl-2">
            <label for="rir" className="mb-2 block tracking-wide font-medium opacity-70">Price</label>
          </div>
          
        </div>
        <div className="flex relative mb-4">
          <div className="w-1/5 pr-2  flex-shrink-0">
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
          <div className="w-2/5 pl-2 flex-shrink-0">
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
          <button className="ml-4 w-2/5 flex-grow btn btn-primary px-2 flex justify-center">
            <i className="fas fa-check-circle mr-1"></i> Update
          </button>
        </div>
        

        <div className="mb-4 flex relative">
          <div className="w-1/5 pr-2 flex-shrink-0">
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
          <div className="w-2/5 pl-2 flex-shrink-0">
            <select id="rir" name="rir" className="select-custom  w-full ">
              {/* remove '!rounded-l-none' if user doesn't have RIR */}
              <option className="text-gray-300" selected>Select price</option>
              <option className="text-gray-300" >100 BUSD</option>
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
          <button className="ml-4 w-2/5 flex-grow btn btn-primary px-2 disabled flex justify-center">
            <i className="fas fa-plus-circle mr-1"></i> Add
          </button>
        </div>
        
        
        <div className="mb-4 flex gap-4 items-center py-4 border-b border-t dark:border-opacity-40 border-gray-200 dark:border-gray-700">
          <div className="w-1/2">
           Total
          </div>
          <div className="w-1/2 text-lg text-right font-semibold">
            500 BUSD       
          </div>
        </div>


          

          
          {/* <div className="dark:text-gray-400 mt-2 text-gray-500">You have to pay <strong>100 busd</strong></div> */}
       
        {/* chưa nhập amount thì ẩn 2 nút enable cái này đi */}
        <div className="mt-4  grid grid-cols-2 gap-4"> 
          {/* bỏ grid grid-cols-2 nếu user không có RIR hoặc không dùng RIR */}
          <div className="flex-shrink-0 flex-grow">
            <button className="btn relative disabled  w-full btn-default btn-default-lg btn-purple" disabled="" id="swap-button" width="100%" scale="md">
            {/* <span className="spinner" />  */}
              Enable BUSD
            </button>     
          </div>
          <div  className="flex-shrink-0 flex-grow">
            <button className="btn relative w-full btn-default btn-default-lg btn-purple" disabled="" id="swap-button" width="100%" scale="md">
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