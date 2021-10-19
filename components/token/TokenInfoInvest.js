import { useEffect, useState } from "react";
import utils from "../../lib/util";
import getClient from "../../data/client";
import submitInvest from "../../data/query/submitInvest";
import { getInvestById } from "../../data/query/getInvestById";
import TokenInfoHeader from "./TokenInfoHeader";
import { useTranslation } from "next-i18next";
import numberFormatter from "../utils/numberFormatter";
import roundNumber from "../utils/roundNumber";
import RadaSvg from "../svg/rada";
import useStore from "../../lib/useStore";
import { toast } from "react-toastify";
import moment from "moment";
import ReactTooltip from 'react-tooltip';
import { getInvestProfile } from "../../data/query/getInvestProfile";
import Link from "next/link";

export default function TokenInfoInvest({
  tokenData,
  tokenInfo,
  investCampaign,
  usdCoinInfo,
  btcCoinInfo,
}) {
  const { t, i18n } = useTranslation("invest");
  console.log(i18n)
  const [investData, setInvestData] = useState({});
  const [investProfile, setInvestProfile] = useState({});

  useEffect(() => {
    getDataCampaign();
  }, [investCampaign]);

  const getDataCampaign = function () {
    getInvestProfile().then(function(res){
      setInvestProfile(res.data.investProfile)
    },function(err){

    })
    investCampaign &&
      getInvestById({ id: investCampaign.id }).then(
        function (res) {
          setInvestData(res.data.investCampaignById);
        },
        function (err) {}
      );
  };

  return (
    <div className="section section-coininfo--team">
      <div onClick={e => e.stopPropagation()}>
        <ReactTooltip type="info" multiline={true} globalEventOff="click" clickable={true} html={true} />
      </div>
      <div className="grid grid-cols-1">
        {/* Post Header */}
        <div className="flex flex-col">
          <TokenInfoHeader tokenData={tokenData} token={tokenInfo} />
        </div>
        {/* End: Post Header */}

        {/* Post Content */}
        <div className="w-full mt-4">
          {/* investment meta */}
          <div className="flex w-full">
            <div className="text-sm w-full">
              <div className="flex flex-wrap items-end justify-between mb-2">
                <div className="field-label">
                  <div className="uppercase opacity-50 text-2xs md:text-xs">
                    {t("Your maximum allocation")}
                    <span
                      className="hasTooltip"
                      data-tip={t("Your maximum allocation tooltip")}
                      data-event="click"
                    >
                      {" "}
                      <i className="fa-duotone fa-info-circle text-base" />
                    </span>
                  </div>
                </div>
                <div className="text-lg font-semibold flex items-center">
                  {investData.max_rir_per_user}RIR
                  <div className="w-4 h-4 ml-2">
                    <RadaSvg />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-end justify-between mb-2">
                <div className="field-label">
                  <div className="uppercase opacity-50 text-2xs md:text-xs">
                    {t("Available allocation for this project")}
                    <span
                      className="hasTooltip"
                      data-tip={t(
                        "Available allocation for this project tooltip"
                      )}
                      data-event="click"
                    >
                      {" "}
                      <i className="fa-duotone fa-info-circle text-base" />
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  {investData.total_rir - investData.total_rir_approved}/
                  <span className="text-gray-500">{investData.total_rir}</span>
                  RIR
                  <div className="w-4 h-4 ml-2 dark:opacity-100 opacity-90">
                    <RadaSvg />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-end justify-between mb-2">
                <div className="w-full lg:w-auto">
                  <div className="uppercase opacity-50 text-2xs md:text-xs">
                    Your balance
                    <span
                      className="hasTooltip"
                      data-tip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                      data-event="click"
                    >
                      {" "}
                      <i className="fa-duotone fa-info-circle text-base" />
                    </span>
                  </div>
                </div>
                {Object.keys(investProfile).length !== 0 && 
                <div className="flex items-center">
                  <span className="text-gray-500">
                    <strong className="text-gray-900 dark:text-white">
                      {investProfile.approved_rir - investProfile.used_rir}
                    </strong>
                    /{investProfile.approved_rir}
                  </span>
                  RIR
                  <div className="w-4 h-4 ml-2 dark:opacity-100 opacity-90">
                    <RadaSvg />
                  </div>
                  <Link
                    href={`/${i18n.language}/user/topUp`}
                    className="ml-2 btn-neutral rounded px-1.5 py-0.5"
                  >
                    Top up
                  </Link>
                </div>
                }
              </div>

              <div className="flex flex-wrap justify-between mb-2">
                <div className="field-label">
                  <span className="uppercase opacity-50 text-2xs md:text-xs">
                    {t("Token Generation Events (TGE)")}
                    <span
                      className="hasTooltip"
                      data-tip={t("Token Generation Events (TGE) tooltip")}
                      data-event="click"
                    >
                      {" "}
                      <i className="fa-duotone fa-info-circle text-base" />
                    </span>
                  </span>
                </div>
                <div className="">
                  {investData.tge_date &&
                    moment(investData.tge_date).format("DD MMMM YYYY")}
                </div>
              </div>

              <div className="flex flex-wrap justify-between mb-2">
                <div className="field-label">
                  <span className="uppercase opacity-50 text-2xs md:text-xs">
                    {t("Unlocked token ratio at TGE")}{" "}
                    <span
                      className="hasTooltip"
                      data-tip={t("Unlocked token ratio at TGE tooltip")}
                      data-event="click"
                    >
                      {" "}
                      <i className="fa-duotone fa-info-circle text-base" />
                    </span>
                  </span>
                </div>
                <div className="">{investData.tge_unlock}%</div>
              </div>

              <div className="flex flex-wrap justify-between mb-2">
                <div className="field-label">
                  <span className="uppercase opacity-50 text-2xs md:text-xs">
                    {t("Project status")}
                  </span>
                </div>
                <div className="label label--active">
                  {t(investData.invest_status)}
                </div>
                {/*
                      <div className="label label--inactive">
                        Close for investment
                      </div>
                      */}
              </div>
            </div>
          </div>
          {/* End: Investment Meta */}

          <InvestForm
            investData={investData}
            tokenData={tokenData}
            getDataCampaign={getDataCampaign}
            investCampaign={investCampaign}
          />
        </div>
        {/* End: Post Content */}
      </div>
    </div>
  );
}

const InvestForm = function ({
  investData,
  tokenData,
  getDataCampaign,
  investCampaign,
}) {
  const [investInfo, setInvestInfo] = useState({
    number_rir: 0,
    wallet_address: "",
  });
  const [buttonInvestDisabled, setButtonInvestDisabled] = useState(false);
  const store = useStore();
  const { t } = useTranslation("invest");

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (
      name === "number_rir" &&
      (isNaN(value) || +value > investData?.max_rir_per_user)
    )
      return;
    setInvestInfo({
      ...investInfo,
      [name]: type === "number" ? +value : value,
    });
  };

  const handleNumberRirChange = (e,value) => {
    e.preventDefault()
    e.stopPropagation()
    let valueChanged = +investInfo.number_rir + value;
    if (valueChanged < 0 || valueChanged > investData?.max_rir_per_user) return;
    setInvestInfo({
      ...investInfo,
      number_rir: valueChanged,
    });
  };

  const handleSubmitInvest = async (e) => {
    e.preventDefault();
    if (investInfo.number_rir === "" || investInfo.wallet_address === "")
      return;
    const invest = {
      invest_campaign_id: investCampaign.id,
      number_rir: +investInfo.number_rir,
      wallet_address: investInfo.wallet_address,
    };
    setButtonInvestDisabled(true);
    const client = getClient();
    const { data, errors } = await client.mutate({
      mutation: submitInvest,
      variables: invest,
      errorPolicy: "all",
    });
    if (errors) {
      toast.error("Need login to invest!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setButtonInvestDisabled(false);
      return false;
    }
    const { status, msg } = data.submitInvest;
    if (status === "error") {
      toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setInvestInfo({
        number_rir: "",
        wallet_address: "",
      });
      toast.success(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      getDataCampaign();
    }
  };

  if (store.user?.id === "") {
    return (
      <div className="card--wrapper mt-4">
        <h3 className="text-gray-400 card--header">{t("Contribute to invest")}</h3>
        <div className="card--body p-3 lg:p-5 flex">
          <div className="flex mt-2 mr-3 w-12 h-12 p-2.5 mb-2 border-4 border-purple-300 bg-purple-300 text-purple-500 dark:bg-purple-400 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path fill="currentColor" d="M23.146,5.4,20.354,2.6a.5.5,0,0,0-.708,0L7.854,14.4a.5.5,0,0,1-.708,0L4.354,11.6a.5.5,0,0,0-.708,0L.854,14.4a.5.5,0,0,0,0,.707L7.146,21.4a.5.5,0,0,0,.708,0L23.146,6.1A.5.5,0,0,0,23.146,5.4Z"/></svg>
          </div>
          <p className="text-sm">{t("how to invest tip")}</p>
        </div>
        {/* Card body */}
        <div className="card--footer p-3 lg:p-5">
          <a className="btn btn-primary px-3 py-2">
            {t("how to invest")}
          </a>
        </div>
      </div>
    );
  }
  return (
    <>
      {investData?.invest_log?.length === 0 ? (
        <div className="card--wrapper mt-4">
          <h3 className="text-gray-400 card--header">{t("invest header")}</h3>
          <div className="card--body">
            <div className="step--wrapper">
              <div className="step--header flex">
                <span className="step--indicator">1</span>
                <h3>{t("invest input rir")}</h3>
              </div>
              <div className="step--content">
                <form>
                  <label
                    for="rir-amount"
                    className="flex inline-field--wrapper relative items-stretch"
                  >
                    <div className="w-12 flex items-center bg-gray-100 border border-gray-200 rounded-l dark:border-gray-700 dark:bg-gray-800">
                      <span className="flex w-5 h-5 m-auto opacity-60">
                        <RadaSvg />
                      </span>
                    </div>
                    <input
                      className="inline--field border-l-none pr-16"
                      id="rir-amount"
                      type="text"
                      name="number_rir"
                      value={investInfo.number_rir}
                      onChange={handleInputChange}
                    />
                    <div className="absolute flex right-2 top-2">
                      <button type="button"
                        disabled={investInfo.number_rir === ""}
                        onClick={(e) => handleNumberRirChange(e,investData.block_step)}
                        className="mr-1 leading-0 w-6 center bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        +
                      </button>
                      <button type="button"
                        disabled={investInfo.number_rir === ""}
                        onClick={(e) => handleNumberRirChange(e,0-investData.block_step)}
                        className="w-6 leading-0 center bg-gray-200 dark:bg-gray-800"
                      >
                        -
                      </button>
                    </div>
                  </label>
                </form>
              </div>
            </div>
            {/* End: Step 1 */}

            <div className="sep"></div>
            <div className="step--wrapper">
              <div className="step--header flex">
                <span className="step--indicator">2</span>
                <h3>{t("invest input wallet")}</h3>
              </div>
              <div className="step--content">
                <form>
                  <label for="wallet" className="inline--label">
                    {t("invest input wallet tip", {
                      network_name: tokenData?.platform?.name,
                      token_name: tokenData?.name,
                    })}
                  </label>
                  <input
                    id="wallet"
                    className="inline--field"
                    type="text"
                    name="wallet_address"
                    value={investInfo.wallet_address}
                    onChange={handleInputChange}
                  />
                  <div className="opacity-70 rounded text-sm p-2 mt-2 form-message text-gray-900 form-message--notice bg-green-400">
                    {t("invest input wallet note", {
                      network_name: tokenData?.platform?.name,
                      token_name: tokenData?.name,
                    })}
                  </div>
                </form>
              </div>
            </div>
            {/* End: Step 3 */}
          </div>
          {/* Card body */}

          <div className="card--footer">
            <button
              className="btn m-3 lg:m-5 btn-primary py-2 px-3"
              onClick={handleSubmitInvest}
            >
              Invest
            </button>
          </div>
        </div>
      ) : (
        <div className="card--wrapper mt-4">
          <h3 className="text-gray-400 card--header">
            Thanks for your investment!
          </h3>
          <div className="card--body p-3 lg:p-5 flex">
            <div className="flex mr-3 w-12 h-12 p-2.5 mb-2 border-4 border-purple-300 bg-purple-300 text-purple-500 dark:bg-purple-400 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>check</title>
                <path
                  fill="currentColor"
                  d="M23.146,5.4,20.354,2.6a.5.5,0,0,0-.708,0L7.854,14.4a.5.5,0,0,1-.708,0L4.354,11.6a.5.5,0,0,0-.708,0L.854,14.4a.5.5,0,0,0,0,.707L7.146,21.4a.5.5,0,0,0,.708,0L23.146,6.1A.5.5,0,0,0,23.146,5.4Z"
                />
              </svg>
            </div>
            <p>
              You invested{" "}
              <span className="text-gray-900 dark:text-gray-100 font-bold">
                {investData?.invest_log && investData?.invest_log[0].number_rir}{" "}
                RIR
              </span>{" "}
              in {tokenData?.name} successfully. {investData?.tge_unlock}% of
              the tokens will be transfered to your wallet on{" "}
              {investData.tge_date &&
                moment(investData.tge_date).format("DD MMMM YYYY")}{" "}
            </p>
          </div>
          <div className="card--footer p-3 lg:p-5">
            <button className="btn btn-primary py-2 px-3">
              Adjust your investment
            </button>
          </div>
        </div>
      )}
    </>
  );
};
