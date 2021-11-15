const SwapTokens = ({}) => {
  return (
    <>
      <div className="global-padding">

        <div className="mb-4">
          
          <div className="mt-1 relative flex rounded-md shadow-sm">
            <div className="mr-2 flex-grow">
              <label for="currency" className="uppercase text-sm mb-2 block tracking-wide text-gray-400 font-semibold">Currency</label>
              <select id="currency" name="currency" className="select-custom">
                <option className="text-gray-300 selected" selected>BUSD</option>
                <option className="text-gray-300">RIR</option>    
              </select>
            </div>
            
            <div className="ml-2 flex-grow">
              <label for="currency" className="uppercase text-sm mb-2 block tracking-wide text-gray-400 font-semibold">Amount</label>
                <select id="amount" name="amount" className="select-custom">
                  <option className="text-gray-300" selected>100</option>
                  <option className="text-gray-300">200</option>
                  <option className="text-gray-300">300</option>
                  <option className="text-gray-300">400</option>
                  <option className="text-gray-300">500</option>
                </select>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <button class="btn btn-default btn-default-lg w-full btn-purple" disabled="" id="swap-button" width="100%" scale="md">
            Approve Contract
          </button>
        </div>

      </div>

    </>
  )
}

export default SwapTokens