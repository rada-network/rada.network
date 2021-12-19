import React from 'react';
import ReactDOM from 'react-dom';
import InputRange from 'react-input-range';

const SwapTokens = ({}) => {
  return (
    <>
      <div className="global-padding">
        
        <div className="mb-4">
          <label for="price" className="block text-gray-500 dark:text-gray-400 text-xs font-medium uppercase mb-2">You pay</label>
          <div className="mt-1 relative ">
            <div className="input-range--container">
              <InputRange
                maxValue={1000}
                minValue={100}
                step={100}
                onChange={200} />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label for="price" className="block text-gray-500 dark:text-gray-400 text-xs font-medium uppercase mb-2">for</label>
          <div className="mt-1 relative rounded-md shadow-sm ">
            <div className="text-gray-600 dark:text-gray-300 font-bold">0.00</div>
            {/* <input type="text" name="price" id="price" className="inputbox disabled inputbox-lg inputbox-numbers !pr-20" placeholder="0.00" /> */}
            <div className="absolute inset-y-0 right-0 flex items-center text-gray-500">
              <label for="currency" className="sr-only">Currency</label>
              <span id="currency" name="currency" className="text-right">
                PRL
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button className="btn btn-default btn-default-lg w-full btn-purple" disabled="" id="swap-button" width="100%" scale="md">
            Approve Contract
          </button>
        </div>

      </div>

    </>
  )
}

export default SwapTokens