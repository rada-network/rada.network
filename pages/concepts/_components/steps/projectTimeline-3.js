const ProjectTimeline = ({}) => {
  return (
    <>
    {/* Steps Progress */}
    <nav aria-label="Progress">
      <ol role="list" className="steps">

        <li className="step step--completed">
          {/* Current Step */}
          <a href="#" className="step-body">
            <span className="step-body--icon">
              <span className="step-body--icon--text"><i className="fas fa-check"></i></span>
            </span>
            <span className="step-body--content">
              <span className="step-body--title">Whitelist</span>
              <span className="step-body--text">
                Apply for whitelist
              </span>
            </span>
          </a>
          <div className="hidden md:!block absolute top-0 right-0 h-full w-6" aria-hidden="true">
            <svg className="h-full w-full text-gray-300 dark:text-gray-400 dark:text-opacity-40" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
              <path d="M0 -2L20 40L0 82" vector-effect="non-scaling-stroke" stroke="currentcolor" stroke-linejoin="round" />
            </svg>
          </div>
        </li>

        <li className="step step--completed">
          {/* Upcoming Step */}
          <a href="#" className="step-body">
            <span className="step-body--icon">
              <span className="step-body--icon--text"><i className="fas fa-check"></i></span>
            </span>
            <span className="step-body--content">
              <span className="step-body--title">Swap</span>
              <span className="step-body--text">Start buying tokens</span>
            </span>
          </a>
          <div className="hidden md:!block absolute top-0 right-0 h-full w-6" aria-hidden="true">
            <svg className="h-full w-full text-gray-300 dark:text-gray-400 dark:text-opacity-40" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
              <path d="M0 -2L20 40L0 82" vector-effect="non-scaling-stroke" stroke="currentcolor" stroke-linejoin="round" />
            </svg>
          </div>
        </li>

        <li className="step step--current">
          {/* Upcoming Step */}
          <a href="#" className="step-body" aria-current="step">
            <span className="step-body--icon">
              <span className="step-body--icon--text">03</span>
            </span>
            <span className="step-body--content">
              <span className="step-body--title">Claim</span>
              <span className="step-body--text">Claim your tokens</span>
            </span>
          </a>
        </li>

      </ol>
    </nav>

    </>
  )
}

export default ProjectTimeline