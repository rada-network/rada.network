const MainActions = ({}) => {
  return (
    <>
      <div className="box project-main-actions">

        <div className="box-header text-center sr-only">
          <h3>Public Sale</h3>
        </div>

        <div className="box-body">

          {/* Steps Progress */}
          <nav aria-label="Progress">
            <ol role="list" className="steps">

              <li className="step">
                {/* Completed Step */}
                <a href="#" className="group flex items-center w-full">
                  <span className="px-4 py-3 flex items-center text-sm font-medium">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary-600 rounded-full group-hover:bg-primary-800">
                      {/* Heroicon name: solid/check */}
                      <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-900 dark:text-gray-200">Overview</span>
                  </span>
                </a>
                {/* Arrow separator for lg screens and up */}
                <div className="step--arrow" aria-hidden="true">
                  <svg className="h-full w-full text-gray-300 dark:text-gray-700" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                    <path d="M0 -2L20 40L0 82" vector-effect="non-scaling-stroke" stroke="currentcolor" stroke-linejoin="round" />
                  </svg>
                </div>
              </li>

              <li className="step">
                {/* Current Step */}
                <a href="#" className="px-4 py-3 flex items-center text-sm font-medium" aria-current="step">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-primary-600 rounded-full">
                    <span className="text-primary-600 dark:text-primary-400">02</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-primary-600 dark:text-primary-400">Application</span>
                </a>
                {/* Arrow separator for lg screens and up */}
                <div className="step--arrow" aria-hidden="true">
                  <svg className="h-full w-full text-gray-300 dark:text-gray-700" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                    <path d="M0 -2L20 40L0 82" vector-effect="non-scaling-stroke" stroke="currentcolor" stroke-linejoin="round" />
                  </svg>
                </div>
              </li>

              <li className="step">
                {/* Upcoming Step */}
                <a href="#" className="group flex items-center">
                  <span className="px-4 py-3 flex items-center text-sm font-medium">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                      <span className="text-gray-500 group-hover:text-gray-900">03</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">Preview</span>
                  </span>
                </a>
              </li>

            </ol>
          </nav>

        </div>

      </div>
    </>
  );
}

export default MainActions