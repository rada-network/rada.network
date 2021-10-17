import { useEffect, useState } from "react";
import utils from "../../lib/util";
import getClient from "../../data/client";
import submitInvest from "../../data/query/submitInvest";
import { getInvestById } from "../../data/query/getInvestById";
import TokenInfoHeader from "./TokenInfoHeader";
import { useTranslation } from "next-i18next";
import numberFormatter from "../utils/numberFormatter";
import roundNumber from "../utils/roundNumber";

import { toast } from "react-toastify";
import moment from "moment";

export default function TokenInfoInvest({
  tokenData,
  tokenInfo,
  investCampaign,
  usdCoinInfo,
  btcCoinInfo,
}) {
  const { t, i18n } = useTranslation();
  const [investData, setInvestData] = useState({});
  const [investInfo, setInvestInfo] = useState({
    number_rir: "",
    wallet_address: "",
  });

  useEffect(() => {
    investCampaign &&
      getInvestById({ id: investCampaign.id }).then(function (res) {
        setInvestData(res.data.investCampaignById);
      });
  }, [investCampaign]);

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

  const handleNumberRirChange = (value) => {
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
    const client = getClient();
    const { data } = await client.mutate({
      mutation: submitInvest,
      variables: invest,
    });
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
    }
  };

  return (
    <div className="section section-coininfo--team">
      <div className="grid grid-cols-1">
        {/* Post Header */}
        <div className="flex flex-col">
          <TokenInfoHeader tokenData={tokenData} token={tokenInfo} />

          <div className="mt-4">
            <div className="flex flex-wrap md:flex-nowrap items-start w-full">
              {/* Pricing */}
              <div className="flex flex-col flex-shrink-0 flex-0 mb-4">
                <div className="pricing">
                  <span className="pricing-value">
                    {numberFormatter(usdCoinInfo?.AggregatedData?.PRICE || 0, {
                      style: "currency",
                      currency: "USD",
                      notation: "compact",
                      minimumFractionDigits: 1,
                    })}
                  </span>
                  <span
                    className="pricing-indicator"
                    type={
                      usdCoinInfo?.AggregatedData?.CHANGE24HOUR > 0
                        ? "up"
                        : "down"
                    }
                  >
                    <i
                      className={`fa-solid fa-caret-${
                        usdCoinInfo?.AggregatedData?.CHANGE24HOUR > 0
                          ? "up"
                          : "down"
                      } mr-1`}
                    ></i>
                    {/* {usdCoinInfo?.AggregatedData?.CHANGE24HOUR < 0 && '-'} */}
                    {roundNumber(
                      Math.abs(usdCoinInfo?.AggregatedData?.CHANGE24HOUR || 0),
                      6
                    )}
                    %
                  </span>
                </div>
                <div className="pricing pricing-sm mt-2">
                  <span className="pricing-value opacity-50">
                    {btcCoinInfo?.AggregatedData?.PRICE} BTC
                  </span>
                  <span
                    className="pricing-indicator"
                    type={
                      usdCoinInfo?.AggregatedData?.CHANGE24HOUR > 0
                        ? "up"
                        : "down"
                    }
                  >
                    <i
                      className={`fa-solid fa-caret-${
                        btcCoinInfo?.AggregatedData?.CHANGE24HOUR > 0
                          ? "up"
                          : "down"
                      } mr-1`}
                    ></i>
                    {/* {btcCoinInfo?.AggregatedData?.CHANGE24HOUR < 0 && '-'} */}
                    {roundNumber(
                      Math.abs(btcCoinInfo?.AggregatedData?.CHANGE24HOUR || 0),
                      6
                    )}
                    %
                  </span>
                </div>
              </div>
              {/* END: Pricing */}

              {/* Pricing Info */}
              <div className="flex flex-wrap md:flex-nowrap w-full md:ml-6 md:space-x-2 md:divide-x divide-gray-400 divide-opacity-20">
                <div className="md:text-center pr-4 md:pr-0 md:w-1/2 lg:w-full">
                  <div className="w-full lg:w-auto">
                    <span className="uppercase opacity-50 text-2xs md:text-xs">
                      Market Cap
                    </span>
                  </div>
                  <div className="mb-2">
                    <strong href="#" className="">
                      {numberFormatter(
                        usdCoinInfo?.AggregatedData?.MKTCAP || 0,
                        {
                          style: "currency",
                          currency: "USD",
                          notation: "compact",
                          minimumFractionDigits: 1,
                        }
                      )}
                    </strong>
                  </div>
                </div>

                <div className="md:text-center pr-4 md:pr-0 md:w-1/2 lg:w-full">
                  <div className="w-full lg:w-auto">
                    <span className="uppercase opacity-50 text-2xs md:text-xs">
                      Volume 24h
                    </span>
                  </div>
                  <div className="mb-2">
                    <strong href="#" className="">
                      {numberFormatter(
                        usdCoinInfo?.AggregatedData?.VOLUME24HOUR || 0,
                        {
                          style: "currency",
                          currency: "USD",
                          notation: "compact",
                          minimumFractionDigits: 1,
                        }
                      )}
                    </strong>
                  </div>
                </div>

                <div className="md:text-center pr-4 md:pr-0 md:w-1/2 lg:w-full">
                  <div className="w-full lg:w-auto">
                    <span
                      className="uppercase opacity-50 text-2xs md:text-xs"
                      title="Circulating Supply"
                    >
                      C. Supply
                    </span>
                  </div>
                  <div className="mb-2">
                    <strong href="#" className="">
                      {numberFormatter(
                        usdCoinInfo?.AggregatedData?.CIRCULATINGSUPPLY || 0,
                        {
                          notation: "compact",
                          minimumFractionDigits: 1,
                        }
                      )}
                    </strong>
                  </div>
                </div>

                <div className="md:text-center md:w-1/2 lg:w-full">
                  <div className="w-full lg:w-auto">
                    <span className="uppercase opacity-50 text-2xs md:text-xs">
                      Total Supply
                    </span>
                  </div>
                  <div className="mb-2">
                    <strong href="#" className="">
                      {numberFormatter(
                        usdCoinInfo?.AggregatedData?.SUPPLY ||
                          parseInt(
                            tokenData?.total_supply
                              ?.replaceAll(",", "")
                              .replaceAll(".", "")
                          ) ||
                          0,
                        {
                          notation: "compact",
                          minimumFractionDigits: 1,
                        }
                      )}
                    </strong>
                  </div>
                </div>
              </div>
              {/* END: Pricing Info */}
            </div>
          </div>
        </div>
        {/* End: Post Header */}

        {/* Post Content */}
        <div className="w-full mt-4">
          {/* investment meta */}
          <div className="flex w-full">
            <div className="text-sm w-full">
              <div className="flex flex-wrap items-end justify-between mb-2">
                <div className="w-full lg:w-auto">
                  <div className="uppercase opacity-50 text-2xs md:text-xs">
                    Your maximum allocation
                    <span
                      className="hasTooltip"
                      data-tip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                      data-event="click"
                    >
                      {" "}
                      wallet{" "}
                      <i className="fa-duotone fa-info-circle text-base" />
                    </span>
                  </div>
                </div>
                <div className="text-lg font-semibold flex items-center">
                  {investData.max_rir_per_user}RIR
                  <div className="w-4 h-4 ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 22.14 23.04"
                    >
                      <path
                        d="M11.07,22.84c-2.83,0-8.39-3.2-9.81-5.66s-1.41-8.87,0-11.32S8.24.2,11.07.2s8.39,3.21,9.8,5.66,1.42,8.87,0,11.32S13.9,22.84,11.07,22.84Z"
                        fill="#374050"
                        stroke="#9ca2af"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="0.4"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M6.72,11.51a10.4,10.4,0,0,1,.1-1.58c.07-.38.25-.35.39-.27l1.41.92a1.14,1.14,0,0,1,.47.93v0a1.13,1.13,0,0,1-.47.93l-1.41.92c-.14.08-.32.1-.39-.27a10.4,10.4,0,0,1-.1-1.58h0Z"
                        fill="#9ca2af"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M15.41,11.51a9.26,9.26,0,0,0-.11-1.58c-.06-.38-.25-.35-.39-.27l-1.4.92a1.14,1.14,0,0,0-.47.93v0a1.13,1.13,0,0,0,.47.93l1.4.92c.14.08.33.1.39-.27a9.26,9.26,0,0,0,.11-1.58h0Z"
                        fill="#9ca2af"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M8.9,7.75a10.4,10.4,0,0,1,1.42-.7c.36-.13.43,0,.43.2l-.1,1.68a1.13,1.13,0,0,1-.57.87h0a1.13,1.13,0,0,1-1,.06l-1.5-.76c-.14-.07-.25-.22,0-.47a10.45,10.45,0,0,1,1.32-.88h0Z"
                        fill="#9ca2af"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M13.24,15.28a9.77,9.77,0,0,0,1.32-.88c.29-.25.18-.4,0-.47l-1.5-.76a1.13,1.13,0,0,0-1,.06h0a1.15,1.15,0,0,0-.57.87l-.09,1.67c0,.16.07.34.42.2a9.46,9.46,0,0,0,1.43-.7Z"
                        fill="#9ca2af"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M13.23,7.75a10.52,10.52,0,0,0-1.43-.7c-.35-.13-.43,0-.42.2l.1,1.68A1.12,1.12,0,0,0,12,9.8h0a1.12,1.12,0,0,0,1,.06l1.5-.76c.13-.07.25-.22,0-.47a10.45,10.45,0,0,0-1.32-.88h0Z"
                        fill="#9ca2af"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M8.88,15.28a10.45,10.45,0,0,1-1.32-.88c-.29-.25-.18-.4,0-.47L9,13.17a1.12,1.12,0,0,1,1,.06h0a1.13,1.13,0,0,1,.56.87l.1,1.68c0,.16-.07.33-.42.2a10.52,10.52,0,0,1-1.43-.7h0Z"
                        fill="#9ca2af"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M11.07,3.36A1.56,1.56,0,1,1,9.51,4.92,1.57,1.57,0,0,1,11.07,3.36Z"
                        fill="#fff"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M11.07,16.56a1.56,1.56,0,1,1-1.56,1.56A1.56,1.56,0,0,1,11.07,16.56Z"
                        fill="#fff"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M18.13,7.44A1.55,1.55,0,1,1,16,6.87,1.55,1.55,0,0,1,18.13,7.44Z"
                        fill="#fff"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M6.7,14a1.55,1.55,0,1,1-2.12-.57A1.55,1.55,0,0,1,6.7,14Z"
                        fill="#fff"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M4,7.44a1.55,1.55,0,1,1,.57,2.13A1.55,1.55,0,0,1,4,7.44Z"
                        fill="#fff"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M15.44,14A1.55,1.55,0,1,1,16,16.17,1.55,1.55,0,0,1,15.44,14Z"
                        fill="#fff"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-end justify-between mb-2">
                <div className="w-full lg:w-auto">
                  <div className="uppercase opacity-50 text-2xs md:text-xs">
                    Available RIR for this project{" "}
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
                <div className="flex items-center">
                  {investData.total_rir_approved}/
                  <span className="text-gray-500">{investData.total_rir}</span>
                  RIR
                  <div className="w-4 h-4 ml-2 dark:opacity-100 opacity-90">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 22.14 23.04"
                    >
                      <path
                        d="M11.07,22.84c-2.83,0-8.39-3.2-9.81-5.66s-1.41-8.87,0-11.32S8.24.2,11.07.2s8.39,3.21,9.8,5.66,1.42,8.87,0,11.32S13.9,22.84,11.07,22.84Z"
                        fill="#374050"
                        stroke="#9ca2af"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="0.4"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M6.72,11.51a10.4,10.4,0,0,1,.1-1.58c.07-.38.25-.35.39-.27l1.41.92a1.14,1.14,0,0,1,.47.93v0a1.13,1.13,0,0,1-.47.93l-1.41.92c-.14.08-.32.1-.39-.27a10.4,10.4,0,0,1-.1-1.58h0Z"
                        fill="#9ca2af"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M15.41,11.51a9.26,9.26,0,0,0-.11-1.58c-.06-.38-.25-.35-.39-.27l-1.4.92a1.14,1.14,0,0,0-.47.93v0a1.13,1.13,0,0,0,.47.93l1.4.92c.14.08.33.1.39-.27a9.26,9.26,0,0,0,.11-1.58h0Z"
                        fill="#9ca2af"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M8.9,7.75a10.4,10.4,0,0,1,1.42-.7c.36-.13.43,0,.43.2l-.1,1.68a1.13,1.13,0,0,1-.57.87h0a1.13,1.13,0,0,1-1,.06l-1.5-.76c-.14-.07-.25-.22,0-.47a10.45,10.45,0,0,1,1.32-.88h0Z"
                        fill="#9ca2af"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M13.24,15.28a9.77,9.77,0,0,0,1.32-.88c.29-.25.18-.4,0-.47l-1.5-.76a1.13,1.13,0,0,0-1,.06h0a1.15,1.15,0,0,0-.57.87l-.09,1.67c0,.16.07.34.42.2a9.46,9.46,0,0,0,1.43-.7Z"
                        fill="#9ca2af"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M13.23,7.75a10.52,10.52,0,0,0-1.43-.7c-.35-.13-.43,0-.42.2l.1,1.68A1.12,1.12,0,0,0,12,9.8h0a1.12,1.12,0,0,0,1,.06l1.5-.76c.13-.07.25-.22,0-.47a10.45,10.45,0,0,0-1.32-.88h0Z"
                        fill="#9ca2af"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M8.88,15.28a10.45,10.45,0,0,1-1.32-.88c-.29-.25-.18-.4,0-.47L9,13.17a1.12,1.12,0,0,1,1,.06h0a1.13,1.13,0,0,1,.56.87l.1,1.68c0,.16-.07.33-.42.2a10.52,10.52,0,0,1-1.43-.7h0Z"
                        fill="#9ca2af"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M11.07,3.36A1.56,1.56,0,1,1,9.51,4.92,1.57,1.57,0,0,1,11.07,3.36Z"
                        fill="#fff"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M11.07,16.56a1.56,1.56,0,1,1-1.56,1.56A1.56,1.56,0,0,1,11.07,16.56Z"
                        fill="#fff"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M18.13,7.44A1.55,1.55,0,1,1,16,6.87,1.55,1.55,0,0,1,18.13,7.44Z"
                        fill="#fff"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M6.7,14a1.55,1.55,0,1,1-2.12-.57A1.55,1.55,0,0,1,6.7,14Z"
                        fill="#fff"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M4,7.44a1.55,1.55,0,1,1,.57,2.13A1.55,1.55,0,0,1,4,7.44Z"
                        fill="#fff"
                        fill-rule="evenodd"
                      />
                      <path
                        d="M15.44,14A1.55,1.55,0,1,1,16,16.17,1.55,1.55,0,0,1,15.44,14Z"
                        fill="#fff"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-between mb-2">
                <div className="w-full lg:w-auto">
                  <span className="uppercase opacity-50 text-2xs md:text-xs">
                    Token Generated Events (TGE)
                    <span
                      className="hasTooltip"
                      data-tip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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
                <div className="w-full lg:w-auto">
                  <span className="uppercase opacity-50 text-2xs md:text-xs">
                    Unlocked at TGE{" "}
                    <span
                      className="hasTooltip"
                      data-tip="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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
                <div className="w-full lg:w-auto">
                  <span className="uppercase opacity-50 text-2xs md:text-xs">
                    Status
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

          <div className="card--wrapper mt-4">
            <h3 className="text-gray-400 card--header">
              Invest in this project in 5 minutes following these simple steps
            </h3>
            <div className="card--body">
              <div className="step--wrapper">
                <div className="step--header flex">
                  <span className="step--indicator">1</span>
                  <h3>Amount of RIR you want to invest</h3>
                </div>
                <div className="step--content">
                  <form>
                    <label
                      for="rir-amount"
                      className="flex inline-field--wrapper relative items-stretch"
                    >
                      <div className="w-12 flex items-center bg-gray-100 border border-gray-200 rounded-l dark:border-gray-700 dark:bg-gray-800">
                        <span className="flex w-5 h-5 m-auto opacity-60">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 22.14 23.04"
                          >
                            <path
                              d="M11.07,22.84c-2.83,0-8.39-3.2-9.81-5.66s-1.41-8.87,0-11.32S8.24.2,11.07.2s8.39,3.21,9.8,5.66,1.42,8.87,0,11.32S13.9,22.84,11.07,22.84Z"
                              fill="#374050"
                              stroke="#9ca2af"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="0.4"
                              fill-rule="evenodd"
                            />
                            <path
                              d="M6.72,11.51a10.4,10.4,0,0,1,.1-1.58c.07-.38.25-.35.39-.27l1.41.92a1.14,1.14,0,0,1,.47.93v0a1.13,1.13,0,0,1-.47.93l-1.41.92c-.14.08-.32.1-.39-.27a10.4,10.4,0,0,1-.1-1.58h0Z"
                              fill="#9ca2af"
                              fill-rule="evenodd"
                            />
                            <path
                              d="M15.41,11.51a9.26,9.26,0,0,0-.11-1.58c-.06-.38-.25-.35-.39-.27l-1.4.92a1.14,1.14,0,0,0-.47.93v0a1.13,1.13,0,0,0,.47.93l1.4.92c.14.08.33.1.39-.27a9.26,9.26,0,0,0,.11-1.58h0Z"
                              fill="#9ca2af"
                              fill-rule="evenodd"
                            />
                            <path
                              d="M8.9,7.75a10.4,10.4,0,0,1,1.42-.7c.36-.13.43,0,.43.2l-.1,1.68a1.13,1.13,0,0,1-.57.87h0a1.13,1.13,0,0,1-1,.06l-1.5-.76c-.14-.07-.25-.22,0-.47a10.45,10.45,0,0,1,1.32-.88h0Z"
                              fill="#9ca2af"
                              fill-rule="evenodd"
                            />
                            <path
                              d="M13.24,15.28a9.77,9.77,0,0,0,1.32-.88c.29-.25.18-.4,0-.47l-1.5-.76a1.13,1.13,0,0,0-1,.06h0a1.15,1.15,0,0,0-.57.87l-.09,1.67c0,.16.07.34.42.2a9.46,9.46,0,0,0,1.43-.7Z"
                              fill="#9ca2af"
                              fill-rule="evenodd"
                            />
                            <path
                              d="M13.23,7.75a10.52,10.52,0,0,0-1.43-.7c-.35-.13-.43,0-.42.2l.1,1.68A1.12,1.12,0,0,0,12,9.8h0a1.12,1.12,0,0,0,1,.06l1.5-.76c.13-.07.25-.22,0-.47a10.45,10.45,0,0,0-1.32-.88h0Z"
                              fill="#9ca2af"
                              fill-rule="evenodd"
                            />
                            <path
                              d="M8.88,15.28a10.45,10.45,0,0,1-1.32-.88c-.29-.25-.18-.4,0-.47L9,13.17a1.12,1.12,0,0,1,1,.06h0a1.13,1.13,0,0,1,.56.87l.1,1.68c0,.16-.07.33-.42.2a10.52,10.52,0,0,1-1.43-.7h0Z"
                              fill="#9ca2af"
                              fill-rule="evenodd"
                            />
                            <path
                              d="M11.07,3.36A1.56,1.56,0,1,1,9.51,4.92,1.57,1.57,0,0,1,11.07,3.36Z"
                              fill="#fff"
                              fill-rule="evenodd"
                            />
                            <path
                              d="M11.07,16.56a1.56,1.56,0,1,1-1.56,1.56A1.56,1.56,0,0,1,11.07,16.56Z"
                              fill="#fff"
                              fill-rule="evenodd"
                            />
                            <path
                              d="M18.13,7.44A1.55,1.55,0,1,1,16,6.87,1.55,1.55,0,0,1,18.13,7.44Z"
                              fill="#fff"
                              fill-rule="evenodd"
                            />
                            <path
                              d="M6.7,14a1.55,1.55,0,1,1-2.12-.57A1.55,1.55,0,0,1,6.7,14Z"
                              fill="#fff"
                              fill-rule="evenodd"
                            />
                            <path
                              d="M4,7.44a1.55,1.55,0,1,1,.57,2.13A1.55,1.55,0,0,1,4,7.44Z"
                              fill="#fff"
                              fill-rule="evenodd"
                            />
                            <path
                              d="M15.44,14A1.55,1.55,0,1,1,16,16.17,1.55,1.55,0,0,1,15.44,14Z"
                              fill="#fff"
                              fill-rule="evenodd"
                            />
                          </svg>
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
                        <button
                          disabled={investInfo.number_rir === ""}
                          onClick={() => handleNumberRirChange(1)}
                          className="mr-1 leading-0 w-6 center bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          +
                        </button>
                        <button
                          disabled={investInfo.number_rir === ""}
                          onClick={() => handleNumberRirChange(1)}
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
                  <h3>Your wallet</h3>
                </div>
                <div className="step--content">
                  <form>
                    <label for="wallet" className="inline--label">
                      Your {tokenData?.platform.networkName} wallet address
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
                      {tokenData?.name} is running on{" "}
                      {tokenData?.platform.networkName}. Please make sure that
                      you enter the correct {tokenData?.platform.networkName}{" "}
                      wallet address.
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
        </div>
        {/* End: Post Content */}
      </div>
    </div>
  );
}
