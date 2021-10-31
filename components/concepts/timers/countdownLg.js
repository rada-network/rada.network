const CountDownLg = ({}) => {
  return (
    <>
      <div class="">

        <h3 class="text-3xl text-center mb-4 font-normal">
          <span className="text-color-title">Moniwar's Whitelist opens</span>
        </h3>

        <div class="text-6xl text-center flex w-full items-center justify-center">

            <div class="text-2xl mr-1 opacity-50 font-light">in</div>

            <div class="w-24 mx-1 p-2 bg-white text-primary-500 rounded-lg">
              <div class="font-mono leading-none" x-text="days">00</div>
              <div class="font-mono uppercase text-sm leading-none">Days</div>
            </div>

            <div class="w-24 mx-1 p-2 bg-white text-primary-500 rounded-lg">
              <div class="font-mono leading-none" x-text="hours">00</div>
              <div class="font-mono uppercase text-sm leading-none">Hours</div>
            </div>

            <div class="w-24 mx-1 p-2 bg-white text-primary-500 rounded-lg">
              <div class="font-mono leading-none" x-text="minutes">00</div>
              <div class="font-mono uppercase text-sm leading-none">Minutes</div>
            </div>

            <div class="text-2xl mr-1 opacity-50 font-light">and</div>

            <div class="w-24 mx-1 p-2 bg-white text-primary-500 rounded-lg">
              <div class="font-mono leading-none" x-text="seconds">00</div>
              <div class="font-mono uppercase text-sm leading-none">Seconds</div>
            </div>

        </div>

        <p class="text-sm text-center mt-4">
          <span className="text-color-desc">You need to apply for whitelist to joint the pool.</span><br />
          <span className="text-color-desc">Whitelist opens in:</span> <strong>6:00 PM 28 Jan, 2022 (GMT +7)</strong>
        </p>

      </div>

    </>
  )
}

export default CountDownLg