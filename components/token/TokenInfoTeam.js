import TokenInfoHeader from "./TokenInfoHeader";
import { useTranslation } from "next-i18next";

export default function TokenInfoTeam({tokenData, tokenInfo}) {
    const {t, i18n} = useTranslation()

    return (
        <div className="section section-coininfo--team">

        <div className="grid grid-cols-1">

        {/* Post Header */}
        <div className="flex flex-col">

            <TokenInfoHeader tokenData={tokenData} token={tokenInfo} />

            <div className="mt-4">
            {/* General Info */}
            <div className="flex flex-wrap lg:justify-evenly lg:flex-nowrap w-full lg:space-x-2 lg:divide-x divide-gray-400 divide-opacity-20">

                <div className="lg:text-center flex-0 flex-srink-0 lg:w-full pr-6 lg:pr-0">
                <div className="field-label">
                    <span className="field-label--text">
                    {t('Location')}
                    </span>
                </div>
                <div className="mb-2">
                    <strong className="">
                    {tokenData?.team?.location ? tokenData?.team?.location : "N/A"}
                    </strong>
                </div>
                </div>

                <div className="lg:text-center flex-0 flex-srink-0 lg:w-full pr-6 lg:pr-0">
                <div className="field-label">
                    <span className="field-label--text">
                    {t('Founded')}
                    </span>
                </div>
                <div className="mb-2">
                    <strong className="">
                    {tokenData?.team?.founded ? tokenData?.team?.founded : "N/A"}
                    </strong>
                </div>
                </div>

                <div className="lg:text-center flex-0 flex-srink-0 lg:w-full pr-6 lg:pr-0">
                <div className="field-label">
                    <span className="field-label--text">
                    {t('Employees')}
                    </span>
                </div>
                <div className="mb-2">
                    <strong className="">
                    {tokenData?.team?.employees ? tokenData?.team?.employees : "N/A"}
                    </strong>
                </div>
                </div>

                <div className="lg:text-center flex-0 flex-srink-0 lg:w-full pr-6 lg:pr-0">
                <div className="field-label">
                    <span
                    className="field-label--text"
                    title="Last Funding Type"
                    >
                    {t('Last Funding')}
                    </span>
                </div>
                <div className="mb-2">
                    <strong className="">
                    {tokenData?.team?.last_funding ? tokenData?.team?.last_funding : "N/A"}
                    </strong>
                </div>
                </div>

                <div className="lg:text-center flex-0 flex-srink-0 lg:w-full">
                <div className="field-label">
                    <span className="field-label--text">
                    {t('Headquarter')}
                    </span>
                </div>
                <div className="mb-2">
                    {tokenData?.team?.headquarter ?
                    <a
                    href={tokenData?.team?.headquarter_url}
                    rel="nofollow"
                    target="_blank"
                    >
                    <strong className="">
                    {tokenData?.team?.headquarter}
                    </strong>
                    <span class="icon ml-1 relative -top-0.5"><i class="fa-duotone fa-external-link text-2xs"></i></span>
                    </a>
                    : "N/A"
                    }
                </div>
                </div>

            </div>
            {/* END: General Info */}
            </div>

        </div>
        {/* End: Post Header */}

        {/* Post Content - Team */}
        {(tokenData?.team?.author || tokenData?.partner?.length) ?
        <div>
        <div className="w-full mt-8 lg:mt-16">

        <h2 className="lg:text-center text-xl lg:text-2xl font-semibold">
        {t("Who is building Axie Infinity",{"provider" : tokenData.name})}
        </h2>
        {tokenData?.team?.author ?
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-8 mt-8">

            {tokenData?.team?.author?.map(item =>(
            <div key={item.id} className="card card-team">
            <div className="card-media">
                <div className="avatar avatar-3xl">
                <img src={item.image.small} />
                </div>
            </div>
            <div className="card-body">
                <div className="card-body-header">
                <h3 className="" title={item.name}>{item.name}</h3>
                <p>{item.position}</p>
                </div>
                <div className="card-body-main">
                  <p className="">
                    {item.description}
                  </p>
                </div>
            </div>
            <div className="card-body-footer">
                <div className="cta-wrapper about-social">
                {item.linkedin && <a className="btn" href={item.linkedin} rel="nofollow" target="_blank">
                    <i class="fa-brands fa-linkedin-in"></i>
                </a>}
                {item.twitter && <a className="btn" href={item.twitter} rel="nofollow" target="_blank">
                    <i class="fa-brands fa-twitter"></i>
                </a>}
                {item.facebook && <a className="btn" href={item.facebook} rel="nofollow" target="_blank">
                    <i class="fa-brands fa-facebook"></i>
                </a>}
                </div>
            </div>
            </div>
            ))}

        </div>
        :
        <div className="w-full mt-4">

            <div className="mt-8">

            <div className="post-content empty-state text-center py-8 lg:px-8">
                <span className="icon">
                <i class="fa-duotone fa-telescope text-5xl text-yellow-500"></i>
                </span>
                <p class="opacity-50 pt-8 pb-2 m-auto" dangerouslySetInnerHTML={{__html:t('no token info',{"name" : `<strong>${tokenData?.name} (${tokenData?.symbol})</strong>`})}} >{}</p>
                <button className="btn btn-default btn-lg btn-primary">
                <span className="icon">
                    <i class="fa-solid fa-heart"></i>
                </span>
                <span className="btn--text">{t("contribute")}</span>
                </button>
            </div>

            </div>
        </div>
        }
        </div>

        {/* END: Post Content - Team */}


        {/* Post Content - Partners */}
        <div className="w-full mt-10 lg:mt-16">

            <h2 className="lg:text-center text-xl lg:text-2xl font-semibold">
            {t("Axie Infinity Partners",{"provider" : tokenData.name})}
            </h2>
            {tokenData?.partner?.length > 1 ?
            <div className="flex flex-wrap mt-6 list-partners">
            {tokenData?.partner?.map(item => (
                <div key={item.id} href={item.url} className="">
                <img src={item.image.small} alt={item.name} />
                </div>
            ))}
            </div>
            :
            <div className="w-full mt-4">

            <div className="mt-8">
                {tokenData?.partner?.length ?
                <div className="post-content text-center">
                {tokenData?.partner?.map(item => (
                    <div key={item.id} href={item.url} className="">
                    <img src={item.image.full} />
                    </div>
                ))}
                </div>
                :
                <div className="post-content empty-state text-center py-8 lg:px-8">
                <span className="icon">
                    <i class="fa-duotone fa-telescope text-5xl text-yellow-500"></i>
                </span>
                <p class="opacity-50 pt-8 pb-2 m-auto" dangerouslySetInnerHTML={{__html:t('no token info',{"name" : `<strong>${tokenData?.name} (${tokenData?.symbol})</strong>`})}} >{}</p>
                <a target="_blank" rel="nofollow noreferrer" href={`https://www.jotform.com/form/212882028654459`} className="btn btn-default btn-lg btn-primary">
                    <span className="icon">
                    <i class="fa-solid fa-heart"></i>
                    </span>
                    <span className="btn--text">{t("contribute")}</span>
                </a>
                </div>
                }

            </div>
            </div>
            }

        </div>
        {/* END: Post Content - Partners */}
        </div>
        :

        <>
        <div className="w-full mt-4">

        <div className="mt-8">

            <div className="post-content empty-state text-center py-8 lg:px-8">
            <span className="icon">
                <i class="fa-duotone fa-telescope text-5xl text-yellow-500"></i>
            </span>
            <p class="opacity-50 pt-8 pb-2 m-auto" dangerouslySetInnerHTML={{__html:t('no token info',{"name" : `<strong>${tokenData?.name} (${tokenData?.symbol})</strong>`})}} >{}</p>
            <button className="btn btn-default btn-lg btn-primary">
                <span className="icon">
                <i class="fa-solid fa-heart"></i>
                </span>
                <span className="btn--text">{t("contribute")}</span>
            </button>
            </div>

        </div>
        </div>
        </>
        }

        </div>

        </div>
    )
}