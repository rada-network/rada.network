const ProjectTimeline1 = ({}) => {
  return (
    <>
    {/* Steps Progress */}
    <nav aria-label="Progress">
      <ol role="list" className="steps">

        <li className="step step--current">
          {/* Current Step */}
          <a href="#" className="step-body" aria-current="step">
            <span className="step-body--icon">
              <span className="step-body--icon--text">01</span>
            </span>
            <span className="step-body--title">Overview</span>
          </a>
        </li>

        <li className="step">
          {/* Upcoming Step */}
          <a href="#" className="step-body">
            <span className="step-body--icon">
              <span className="step-body--icon--text">02</span>
            </span>
            <span className="step-body--title">Application</span>
          </a>
        </li>

        <li className="step">
          {/* Upcoming Step */}
          <a href="#" className="group flex items-center">
            <span className="step-body">
              <span className="step-body--icon">
                <span className="step-body--icon--text">03</span>
              </span>
              <span className="step-body--title">Preview</span>
            </span>
          </a>
        </li>

      </ol>
    </nav>

    </>
  )
}

export default ProjectTimeline1