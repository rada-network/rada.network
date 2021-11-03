const SwapTokens = ({}) => {
  return (
    <>
      <div className="global-padding">

        <div className="mb-4">
          <label for="price" className="block text-xs font-medium uppercase mb-2">You pay</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input type="text" inputmode="decimal" pattern="^[0-9]*[.,]?[0-9]*$" name="price" id="price" className="inputbox inputbox-lg inputbox-numbers !pr-20" placeholder="0.00" />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label for="currency" className="sr-only">Currency</label>
              <select id="currency" name="currency" className="focus:ring-primary-500 focus:border-primary-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent rounded-md text-sm">
                <option>USDT</option>
                <option>BUSD</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label for="price" className="block text-xs font-medium uppercase mb-2">for</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input type="text" name="price" id="price" className="inputbox inputbox-lg inputbox-numbers !pr-20" placeholder="0.00" />
            <div className="absolute inset-y-0 right-0 flex items-center px-4">
              <label for="currency" className="sr-only">Currency</label>
              <span id="currency" name="currency" className="pr-4">
                PRL
              </span>
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