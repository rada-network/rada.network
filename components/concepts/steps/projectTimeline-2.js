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
              <span className="step-body--icon--text"><i class="fas fa-check"></i></span>
            </span>
            <span className="step-body--content">
              <span className="step-body--title">Whitelist</span>
              <span className="step-body--text">
                Apply for whitelist
              </span>
            </span>
          </a>
        </li>

        <li className="step step--current">
          {/* Upcoming Step */}
          <a href="#" className="step-body" aria-current="step">
            <span className="step-body--icon">
              <span className="step-body--icon--text">02</span>
            </span>
            <span className="step-body--content">
              <span className="step-body--title">Swap</span>
              <span className="step-body--text">Start buying tokens</span>
            </span>
          </a>
        </li>

        <li className="step">
          {/* Upcoming Step */}
          <a href="#" className="step-body">
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