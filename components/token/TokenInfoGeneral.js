import { useEffect } from "react";
import numberFormatter from "../utils/numberFormatter";
import roundNumber from "../utils/roundNumber";

import { useTranslation } from "next-i18next";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

const TokenInfoHeader = dynamic(import("./TokenInfoHeader"));

export default function TokenInfoGeneral({
  tokenData,
  tokenInfo,
  usdCoinInfo,
  btcCoinInfo,
}) {
  const { t } = useTranslation();
  useEffect(() => {
    window.Gleam = window.Gleam || [];
    window.Gleam.push(["token-info-pageview", tokenInfo?.symbol]);
  }, []);
  const handleCopy = () => {
    toast.success("Copied to clipboard", {});
  };
  return (
    <div className="section section-coininfo--general">
      <div className="grid grid-cols-1">
        {/* Post Header */}
        <div className="flex flex-col">
          <TokenInfoHeader tokenData={tokenData} token={tokenInfo} />

          <div className="mt-4">
            <div className="flex flex-wrap xl:flex-nowrap items-center w-full">
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
              <div className="flex flex-wrap md:flex-nowrap w-full lg:ml-6 lg:space-x-2 lg:divide-x divide-gray-400 divide-opacity-20">
                <div className="lg:text-center pr-4 lg:pr-0 lg:w-full">
                  <div className="field-label">
                    <span className="field-label--text">Market Cap</span>
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

                <div className="lg:text-center pr-4 lg:pr-0 lg:w-full">
                  <div className="field-label">
                    <span className="field-label--text">Volume 24h</span>
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

                <div className="lg:text-center pr-4 lg:pr-0 lg:w-full">
                  <div className="field-label">
                    <span
                      className="field-label--text"
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

                <div className="lg:text-center pr-4 lg:pr-0 lg:w-full">
                  <div className="field-label">
                    <span className="field-label--text">Total Supply</span>
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

          <div className="mt-4">
            <div className="flex w-full">
              <div className="text-sm w-full">
                {tokenData?.link?.find(
                  (item) =>
                    item.group !== null &&
                    item.group.toLowerCase() === "homepage"
                ) && (
                  <div className="field">
                    <div className="field-label">
                      <span className="field-label--text">
                        {tokenData?.link?.map(
                          (item) =>
                            item.group !== null &&
                            item.group.toLowerCase() === "homepage"
                        ).length > 1
                          ? "Websites"
                          : "Website"}
                      </span>
                    </div>
                    <div className="">
                      {tokenData?.link?.map(
                        (item) =>
                          item.group !== null &&
                          item.group.toLowerCase() === "homepage" && (
                            <a
                              href={item.url}
                              className="btn btn-default btn-default-sm"
                              rel="nofollow"
                              target="_blank"
                            >
                              <span className="icon">
                                <i class="fa-regular fa-globe"></i>
                              </span>
                              <span className="btn--text">{item.name}</span>
                            </a>
                          )
                      )}
                    </div>
                  </div>
                )}
                {tokenData?.link?.find(
                  (item) => item.group === "community"
                ) && (
                  <div className="field">
                    <div className="field-label">
                      <span className="field-label--text">Community</span>
                    </div>
                    <div className="">
                      {tokenData?.link?.map(
                        (item) =>
                          item.group === "community" && (
                            <a
                              key={item.id}
                              href={item.url}
                              className="btn btn-default btn-default-sm"
                              rel="nofollow"
                              target="_blank"
                            >
                              <span className="icon">
                                <i
                                  class={`fa-brands fa-${item.name.toLowerCase()}`}
                                ></i>
                              </span>
                              <span className="btn--text">{item.name}</span>
                            </a>
                          )
                      )}
                    </div>
                  </div>
                )}
                {tokenData?.link?.find(
                  (item) => item.group === "explorers"
                ) && (
                  <div className="field">
                    <div className="field-label">
                      <span className="field-label--text">Explorer</span>
                    </div>
                    <div className="">
                      {tokenData?.link?.map(
                        (item, index) =>
                          item.group === "explorers" && (
                            <a
                              key={item.id}
                              href={item.url}
                              className="btn btn-default btn-default-sm"
                              rel="nofollow"
                              target="_blank"
                            >
                              <span className="btn--text">{item.name}</span>
                            </a>
                          )
                      )}
                    </div>
                  </div>
                )}
                {tokenData?.contract_address && (
                  <div className="field">
                    <div className="field-label">
                      <span className="field-label--text">Contract</span>
                    </div>
                    <div className="">
                      <CopyToClipboard
                        onCopy={handleCopy}
                        text={tokenData?.contract_address}
                      >
                        <a href="#" className="btn btn-default btn-default-sm">
                          <span className="icon">
                            <i
                              class={`cf cf-${tokenData?.platform?.networkName}`}
                            ></i>
                          </span>
                          <span className="btn--text">{`${tokenData?.contract_address.substr(
                            0,
                            6
                          )}...${tokenData?.contract_address.substr(
                            -6
                          )} `}</span>
                          <span className="icon">
                            <i class="fa-regular fa-copy text-2xs"></i>
                          </span>
                        </a>
                      </CopyToClipboard>
                    </div>
                  </div>
                )}
                {tokenData?.link?.find(
                  (item) =>
                    item.group === "whitepaper" || item.group === "tokenomic"
                ) && (
                  <div className="field">
                    <div className="field-label">
                      <span className="field-label--text">More</span>
                    </div>
                    <div className="">
                      {tokenData?.link?.map(
                        (item, index) =>
                          item.group === "whitepaper" && (
                            <a
                              key={item.id}
                              href={item.url}
                              className="btn btn-default btn-default-sm"
                              rel="nofollow"
                              target="_blank"
                            >
                              <span className="btn--text">{item.name}</span>
                            </a>
                          )
                      )}
                      {tokenData?.link?.map(
                        (item, index) =>
                          item.group === "tokenomic" && (
                            <a
                              key={item.id}
                              href={item.url}
                              className="btn btn-default btn-default-sm"
                              rel="nofollow"
                              target="_blank"
                            >
                              <span className="btn--text">{item.name}</span>
                            </a>
                          )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* End: Post Header */}

        {/* Post Content */}
        <div className="w-full mt-4">
          {tokenData?.cover !== null && (
            <div className="post-media">
              <img src={tokenData?.cover} alt={tokenData?.name} />
            </div>
          )}
          {tokenData?.token_description?.map((item) => (
            <div
              key={item.id}
              className="post-content mt-8"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          ))}
          {tokenData?.token_description?.length == 0 && (
            <div className="post-content empty-state text-center py-8 lg:px-8">
              <span class="icon">
                <i class="fa-duotone fa-telescope text-5xl text-yellow-500"></i>
              </span>
              <p
                class="opacity-50 pt-8 pb-2 m-auto"
                dangerouslySetInnerHTML={{
                  __html: t("no token description", {
                    name: `<strong>${tokenData?.name} (${tokenData?.symbol})</strong>`,
                  }),
                }}
              >
                {}
              </p>
              <a
                target="_blank"
                rel="nofollow noreferrer"
                href={`https://www.jotform.com/form/212882028654459`}
                className="btn btn-default btn-lg btn-primary"
              >
                <span class="icon">
                  <i class="fa-solid fa-heart"></i>
                </span>
                <span class="btn--text">{t("contribute")}</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
