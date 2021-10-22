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
import Countdown, { zeroPad, calcTimeDelta, formatTimeDelta } from 'react-countdown';
import router from "next/router";


export default function TokenInfoInvest({
  tokenData,
  tokenInfo,
  investCampaign,
  usdCoinInfo,
  btcCoinInfo,
}) {
  const { t, i18n } = useTranslation("invest");
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


  // Renderer callback with condition
  const countdownRenderer = ({days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      router.reload()
    } else {
      // Render a countdown
      return <span className="label label--active">{zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
    }
  };

  return (
    <div className="section section-coininfo--team">
      <div onClick={e => e.stopPropagation()}>
        <ReactTooltip type="info" multiline={true} globalEventOff="click" clickable={true} html={true} offset={{right: 100}} />
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
              <div className="flex items-end justify-between mb-2">
                <div className="field-label">
                  <div className="field-label--text">
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
                <div className="flex items-center flex-shrink-0">
                  {investData.max_rir_per_user} RIR
                  <div className="w-4 h-4 ml-2">
                    <RadaSvg />
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-between mb-2">
                <div className="field-label">
                  <div className="field-label--text">
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
                <div className="flex items-center flex-shrink-0">
                  {investData.total_rir - investData.total_rir_approved}/
                  <span className="text-gray-500">{investData.total_rir}</span>
                  RIR
                  <div className="w-4 h-4 ml-2 dark:opacity-100 opacity-90">
                    <RadaSvg />
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-between mb-2">
                <div className="field-label">
                  <div className="field-label--text">
                    {t("Your balance")}
                    <span
                      className="hasTooltip"
                      data-tip={t("Your balance tip")}
                      data-event="click"
                    > {" "}
                      <i className="fa-duotone fa-info-circle text-base" />
                    </span>
                  </div>
                </div>
                {Object.keys(investProfile).length !== 0 && 
                <div className="flex items-center flex-shrink-0">
                  <span className="mr-1">
                    {investProfile.approved_rir - investProfile.used_rir}
                  </span> RIR
                  
                  <div className="w-4 h-4 ml-2 dark:opacity-100 opacity-90">
                    <RadaSvg />
                  </div>
                  <Link
                    href={`/${i18n.language}/user/topUp`}
                  >
                    <a href={`/${i18n.language}/user/topUp`} className="ml-2 text-xs uppercase rounded px-1.5 py-0.5 bg-gray-200 dark:bg-gray-800">Top Up</a>
                  </Link>
                </div>
                }
              </div>

              <div className="flex justify-between mb-2">
                <div className="field-label">
                  <span className="field-label--text">
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
                <div className="flex items-center flex-shrink-0">
                  {investData.tge_date &&
                    moment(investData.tge_date).format("DD MMMM YYYY")}
                </div>
              </div>

              <div className="flex justify-between mb-2">
                <div className="field-label">
                  <span className="field-label--text">
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
                <div className="flex items-center flex-shrink-0">{investData.tge_unlock}%</div>
              </div>

              <div className="flex justify-between mb-2 items-center">
                <div className="field-label">
                  <span className="field-label--text">
                    {t("Project status")}
                  </span>
                </div>
                <div className="label label--active">
                  {t(investData.invest_status)}
                </div>
              </div>
              {investData?.price !== 0 && 
              <div className="flex justify-between mb-2 items-center">
                <div className="field-label">
                  <span className="field-label--text">
                    {t("Token price")}
                  </span>
                </div>
                <div className="flex items-center flex-shrink-0">{investData.price} USDT</div>
              </div>
              }
              {investData.start_date && (new Date(investData.start_date)) > (new Date()) ?
              <div className="flex justify-between mb-2">
                <div className="field-label">
                  <span className="field-label--text">
                    {t("start date")}
                  </span>
                </div>
                <div className="flex items-center flex-shrink-0">
                  {investData.start_date &&
                    <Countdown
                    zeroPadTime={2}
                    zeroPadDays={2}
                    date={new Date(investData.start_date)}
                    renderer={countdownRenderer}
                  />}
                </div>
              </div>
              :
              <div className="flex justify-between mb-2">
                <div className="field-label">
                  <span className="field-label--text">
                    {t("end date")}
                  </span>
                </div>
                <div className="flex items-center flex-shrink-0">
                  {investData.end_date && (new Date(investData.end_date)) > (new Date()) &&
                    <Countdown
                    date={new Date(investData.end_date)}
                    renderer={countdownRenderer}
                  />}
                </div>
              </div>
              }
            </div>
          </div>
          {/* End: Investment Meta */}
          {(investData.start_date === null || (new Date(investData.start_date)) < (new Date())) && 
          <InvestForm
            investData={investData}
            tokenData={tokenData}
            getDataCampaign={getDataCampaign}
            investCampaign={investCampaign}
          />
          }
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
  const [adjustInvest, setAdjustInvest] = useState(false);
  const store = useStore();
  const { t } = useTranslation("invest");

  const handleInputChange = (e) => {
    let { name, value, t } = e.target;
    if (
      name === "number_rir" &&
      (isNaN(value) || value > investData?.max_rir_per_user)
    )
      return;
    setInvestInfo({
      ...investInfo,
      [name]: t === "number" ? value : value,
    });
  };

  const handleNumberRirChange = (e,value) => {
    e.preventDefault()
    e.stopPropagation()
    let valueChanged = parseFloat(investInfo.number_rir) + value;
    if (valueChanged < 0 || valueChanged > investData?.max_rir_per_user) return;
    setInvestInfo({
      ...investInfo,
      number_rir: valueChanged.toFixed(1),
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
      setAdjustInvest(false);
      return false;
    }
    const { status, msg } = data.submitInvest;
    setButtonInvestDisabled(false)
    setAdjustInvest(false)
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

  const handleAdjustInvestment = () => {
    setAdjustInvest(true)
    if (investData?.invest_log?.length > 0){
      setInvestInfo({
        ...investInfo,
        number_rir: investData?.invest_log[0].number_rir,
        wallet_address: investData?.invest_log[0].wallet_address,
      });
    }
  };

  if (store.user?.id === "") {
    return (
      <div className="card--wrapper mt-4">
        <h3 className="text-gray-400 card--header">{t("Invest with RADA today")}</h3>
        <div className="card--body p-3 lg:p-5 flex">
          <div className="flex mt-2 mr-3 w-12 h-12 p-2.5 mb-2 border-4 border-purple-300 bg-purple-300 text-purple-500 dark:bg-purple-400 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path fill="currentColor" d="M23.146,5.4,20.354,2.6a.5.5,0,0,0-.708,0L7.854,14.4a.5.5,0,0,1-.708,0L4.354,11.6a.5.5,0,0,0-.708,0L.854,14.4a.5.5,0,0,0,0,.707L7.146,21.4a.5.5,0,0,0,.708,0L23.146,6.1A.5.5,0,0,0,23.146,5.4Z"/></svg>
          </div>
          <p className="text-sm">{t("Invest with RADA tip")}</p>
        </div>
        {/* Card body */}
        <div className="card--footer px-3 py-2 lg:px-5">
          <a className="btn btn-primary px-3 py-2">
            {t("apply now")}
          </a>
        </div>
      </div>
    );
  }
  return (
    <>
      {investData?.invest_log?.length === 0 || adjustInvest  ? (
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
                    htmlFor="rir-amount"
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
                      t="number"
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
                <h3>{t("invest input wallet",
                  {network_name : tokenData?.platform?.name}
                )}</h3>
              </div>
              <div className="step--content">
                <form>
                  <label htmlFor="wallet" className="inline--label">
                    {t("invest input wallet tip", {
                      network_name: tokenData?.platform?.name,
                      token_name: tokenData?.name,
                    })}
                  </label>
                  <input
                    id="wallet"
                    className="inline--field"
                    type="text"
                    t="text"
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

          <div className="card--footer px-3 py-2 lg:px-5">
            <button
              className={`btn btn-primary py-2 px-4 ` + (buttonInvestDisabled? "disabled" : "")}
              onClick={handleSubmitInvest}
            >
              Invest
            </button>
            {adjustInvest && <button
              className={`btn m-3 lg:m-5 btn-primary py-2 px-3 `  + (buttonInvestDisabled? "disabled" : "")}
              onClick={() => {setAdjustInvest(false)}}
            >
              Cancel
            </button>}
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
            <button onClick={handleAdjustInvestment} className="btn btn-primary py-2 px-3">
              Adjust your investment
            </button>
          </div>
        </div>
      )}
    </>
  );
};
