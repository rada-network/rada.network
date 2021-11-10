import { CheckSvg } from "../../../../svg/SvgIcons";

const Timeline = ({ step }) => {
    const cstep = step || 1

    const Step = ({step, title, desc}) => {
        // console.log('tl:', cstep, props.step)
        const cls = ['step-compact']
        if (cstep == step) cls.push('is-current')
        if (cstep > step) cls.push('is-complete')
        return <li className={cls.join(' ')}>
            <a href="#" className="step-compact-body" aria-current="step">
                <div className="step-compact-body--icon">
                    <span className="step-compact-body--icon--text">
                        {cstep > step ? <CheckSvg /> : step}
                    </span>
                </div>
                <div className="step-compact-body--content">
                    <span className="step-compact-body--title">{title}</span>
                    <span className="step-compact-body--text">
                        {desc}
                    </span>
                </div>
            </a>
        </li>
    }

    return (
        <>
            {/* Steps Progress */}
            <nav aria-label="Progress">
                <ol role="list" className="steps-compact ">

                    <Step step="1" title="Whitelist" desc="Apply for whitelist" />

                    <Step step="2" title="Swap" desc="Swap for token" />

                    <Step step="3" title="Claim" desc="Claim your token" />

                </ol>
            </nav>

        </>
    )
}

export default Timeline