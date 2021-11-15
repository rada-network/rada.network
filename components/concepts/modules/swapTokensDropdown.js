import SelectTokenType from "../listboxes/tokens";
const SwapTokens = ({}) => {
  return (
    <>
      <div className="global-padding">

        <div className="mb-4">
          
          <div className="mt-1 relative flex">
            <div className="flex-grow">
              <label for="currency" className="uppercase text-sm mb-2 block tracking-wide text-gray-400 font-semibold">Currency</label>
              <SelectTokenType />
            </div>
            {/* remove the above block if user doesn't have RIR */}
            <div className="flex-grow">
              <label for="currency" className="uppercase text-sm mb-2 block tracking-wide text-gray-400 font-semibold">Amount</label>
              <select id="amount" name="amount" className="select-custom !rounded-l-none">
                {/* remove '!rounded-l-none' if user doesn't have RIR */}
                <option className="text-gray-300" selected>100 BUSD</option>
                <option className="text-gray-300">200 BUSD</option>
                <option className="text-gray-300">300 BUSD</option>
                <option className="text-gray-300">400 BUSD</option>
                <option className="text-gray-300">500 BUSD</option>
              </select>
            </div>
          </div>
          <div className="dark:text-gray-400 mt-2 text-gray-500 text-right">You have to pay <strong>100 busd</strong></div>
        </div>
        <div className="mt-4">
          <button class="btn btn-default btn-default-lg w-full btn-purple" disabled="" id="swap-button" width="100%" scale="md">
            Approve Contract
          </button>
        </div>

      </div>

    </>
  )
}

export default SwapTokens