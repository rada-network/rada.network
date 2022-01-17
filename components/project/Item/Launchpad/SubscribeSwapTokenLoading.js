const SubscribeSwapTokenLoading = function ({ currentTime, opendTime, endTime }) {
  return (
    <div className="card-default project-main-actions no-padding overflow-hidden">

      <div className="card-body no-padding">
        <div className="flex flex-col">
          <div className="project-card--container">
            <div className="max-w-2xl mx-auto text-center">

              <div className="flex items-center">
                <div className="mx-auto">
                  <p className="relative mb-4">
                    <span className="spinner-xl"></span>
                  </p>
                  <span className="text-xs mt-8">Please wait</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
export default SubscribeSwapTokenLoading