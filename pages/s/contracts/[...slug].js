import { StaticLayout } from "@components/page-layouts/StaticLayout";

import { useState, useEffect } from "react";
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import {
  useBUSDContract,
  useRIRContract,
  useERC20,
  useLaunchpadContractV2,
} from "@utils/hooks/useContracts";

import useApproveConfirmTransaction from "@utils/hooks/useApproveConfirmTransaction";
import { useCallWithGasPrice } from "@utils/hooks/useCallWithGasPrice";
import { ethers } from "ethers";
import { toast } from "react-toastify";

import dynamic from "next/dynamic";
const WalletProfile = dynamic(import("@components/Wallet"));

export default function ImportOrder(props) {
  const meta = {
    title: "Import order",
  };
  return (
    <StaticLayout meta={meta}>
      <div className={`page-section`}>
        <WalletProfile type={`simple`} />
        <MainContent contractAddress={props.contractAddress} />
      </div>
    </StaticLayout>
  );
}

const MainContent = function ({ contractAddress }) {
  const { account } = useActiveWeb3React();

  const rirContract = useRIRContract();
  const bUSDContract = useBUSDContract();
  const launchpadContract = useLaunchpadContractV2(contractAddress);
  const { callWithGasPrice } = useCallWithGasPrice();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [listSubscription, setListSubscription] = useState([]);
  const [listInitOrder, setListInitOrder] = useState([]);
  const [listWinners, setListWinners] = useState([]);
  const [listSub, setListSub] = useState([]);
  const [numberToken, setNumberToken] = useState(0);
  const [address, setAddress] = useState("");
  const [arrayAddress, setArrayAddress] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");

  useEffect(() => {
    if (!!account) {
      launchpadContract.owner().then(function (owner) {
        if (account === owner) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }
      });
      launchpadContract.admins(account).then(function (res) {
        console.log(res);
        if (res) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      });
      launchpadContract.tokenAddress().then(function (address) {
        setTokenAddress(address);
      });
    } else {
      setIsOwner(false);
      setIsAdmin(false);
    }
  }, [account]);

  useEffect(() => {
    if (!!account) {
      launchpadContract.getSubscribers().then(function (subs) {
        setListSub(subs);
      });
    }
  }, [account]);
  const tokenContract = useERC20(tokenAddress);
  const getAllSubinfo = async function () {
    let allSubInfo = [];
    let allOrder = [];
    let winners = [];
    for (let sub of listSub) {
      let subinfo = await launchpadContract.getOrderSubscriber(sub);
      subinfo = {
        ...subinfo,
        address: sub,
        busd: parseFloat(ethers.utils.formatEther(subinfo.amountBUSD)),
        rir: parseFloat(ethers.utils.formatEther(subinfo.amountRIR)),
      };
      let initOrder = {
        address: sub,
        amountBUSD: parseFloat(ethers.utils.formatEther(subinfo.amountBUSD)),
        amountRIR: parseFloat(ethers.utils.formatEther(subinfo.amountRIR)),
      };

      let winner = {
        address: sub,
        approvedBUSD: parseFloat(
          ethers.utils.formatEther(subinfo.approvedBUSD)
        ),
        refundedBUSD: parseFloat(
          ethers.utils.formatEther(subinfo.refundedBUSD)
        ),
        claimedToken: parseFloat(
          ethers.utils.formatEther(subinfo.claimedToken)
        ),
      };
      winners.push(winner);
      allOrder.push(initOrder);
      allSubInfo.push(subinfo);
    }
    setListWinners(winners);
    setListInitOrder(allOrder);
    setListSubscription(allSubInfo);
  };
  useEffect(() => {
    if (!!account && listSub.length) {
      getAllSubinfo().then(function (res) {});
    }
  }, [account, listSub]);
  const handleImportOrder = async function (e) {
    const listAddress = listInitOrder.map(function (item) {
      return item.address;
    });
    const listBusd = listInitOrder.map(function (item) {
      return ethers.utils.parseEther(item.amountBUSD.toString());
    });

    try {
      const tx = await callWithGasPrice(launchpadContract, "importWinners", [
        listAddress,
        listBusd,
      ]);
      const receipt = await tx.wait();
      if (receipt.status) {
        toast.success("Import success");
      }
      getAllSubinfo();
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  const handleSetEmptyWinner = async function (e) {
    try {
      const tx = await callWithGasPrice(launchpadContract, "setEmptyWins", []);
      const receipt = await tx.wait();
      if (receipt.status) {
        toast.success("Empty success");
      }
      getAllSubinfo();
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  const handleCommitWinner = async function (e) {
    try {
      const tx = await callWithGasPrice(launchpadContract, "commitWinners", []);
      const receipt = await tx.wait();
      if (receipt.status) {
        toast.success("Commit success");
      }
      getAllSubinfo();
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const handleImportWhitelist = async function (e) {
    try {
      const tx = await callWithGasPrice(launchpadContract, "addToWhitelist", [
        address,
      ]);
      const receipt = await tx.wait();
      if (receipt.status) {
        toast.success("Commit success");
      }
      getAllSubinfo();
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  const handleImportArrayWhitelist = async function (e) {
    try {
      let temp = arrayAddress.split(",");
      const tx = await callWithGasPrice(launchpadContract, "importWhitelist", [
        temp,
      ]);
      const receipt = await tx.wait();
      if (receipt.status) {
        toast.success("Commit success");
      }
      getAllSubinfo();
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  const handleImportTokenAddress = async function (e) {
    try {
      const tx = await callWithGasPrice(launchpadContract, "setTokenAddress", [
        tokenAddress,
      ]);
      const receipt = await tx.wait();
      if (receipt.status) {
        toast.success("Commit success");
      }
      getAllSubinfo();
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  const resetApproved = async () => {
    await callWithGasPrice(bUSDContract, "approve", [
      launchpadContract.address,
      0,
    ]);
    await callWithGasPrice(rirContract, "approve", [
      launchpadContract.address,
      0,
    ]);
  };
  const handleCommitTokenAddress = async function (e) {
    try {
      const tx = await callWithGasPrice(
        launchpadContract,
        "commitTokenAddress",
        []
      );
      const receipt = await tx.wait();
      if (receipt.status) {
        toast.success("Commit success");
      }
      getAllSubinfo();
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const {
    isApproving,
    isApproved,
    isConfirmed,
    isConfirming,
    handleApprove,
    handleConfirm,
    handleReload,
  } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      try {
        const response2 = await tokenContract.allowance(
          account,
          launchpadContract.address
        );
        return response2.gt(0);
      } catch (error) {
        return false;
      }
    },
    onApprove: async (requireApprove) => {
      return await callWithGasPrice(tokenContract, "approve", [
        launchpadContract.address,
        ethers.constants.MaxUint256,
      ]);
    },
    onApproveSuccess: async ({ receipts }) => {
      toast.success(`Contract enabled - you can now deposit token`);
    },
    onConfirm: () => {
      return callWithGasPrice(launchpadContract, "deposit", [
        ethers.utils.parseEther(numberToken.toString()),
      ]);
    },
    onSuccess: async ({ receipt }) => {
      getAllSubinfo();
      toast.success(`Deposit success`);
    },
  });

  if (!isAdmin && !isOwner) {
    return null;
  }
  if (!loading) {
    return null;
  }
  return (
    <>
      <h1>Admin action</h1>
      <div className="post-title"></div>
      <div className={`global-padding`}>
        <input
          type="text"
          width={200}
          name="token"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.currentTarget.value)}
        />
        <button
          onClick={(e) => {
            handleImportTokenAddress(e);
          }}
          className="btn btn-default  mr-2"
        >
          Import Token address
        </button>
        <button
          onClick={(e) => {
            handleCommitTokenAddress(e);
          }}
          className="btn btn-default mr-2"
        >
          Commit Token address
        </button>
      </div>
      <div
        className={
          `global-padding` + (isApproving || isConfirming ? " disabled" : "")
        }
      >
        <input
          type="text"
          name="token"
          value={numberToken}
          onChange={(e) => setNumberToken(e.currentTarget.value)}
        />
        <button
          onClick={(e) => {
            handleApprove(e);
          }}
          className={"btn btn-default mr-2 " + (isApproved ? " disabled" : "")}
        >
          Approve Contact
        </button>
        <button
          onClick={(e) => {
            handleConfirm(e);
          }}
          className="btn btn-default mr-2"
        >
          Deposit token
        </button>
      </div>
      <div
        className={
          `global-padding` + (isApproving || isConfirming ? " disabled" : "")
        }
      >
        <input
          type="text"
          name="token"
          value={address}
          onChange={(e) => setAddress(e.currentTarget.value)}
        />
        <button
          onClick={(e) => {
            handleImportWhitelist(e);
          }}
          className="btn btn-default mr-2"
        >
          Import whitelist
        </button>
      </div>

      <div className={`global-padding`}>
        <textarea
          value={arrayAddress}
          onChange={(e) => {
            setArrayAddress(e.currentTarget.value);
          }}
          rows="20"
          cols="50"
        ></textarea>
        <button
          onClick={(e) => {
            handleImportArrayWhitelist(e);
          }}
          className="btn btn-default"
        >
          Import array whitelist
        </button>
      </div>
      <div className={`global-padding`}>
        <p>Subscriber</p>
        <table style={{ width: "100%" }} border="2" cellPadding="2">
          <tbody>
            <tr key={0}>
              <td>Address</td>
              <td>BUSD</td>
              <td>RIR</td>
              <td>&nbsp;</td>
            </tr>
            {listSubscription.map(function (item) {
              return (
                <tr key={item.address}>
                  <td>{item.address}</td>
                  <td>{ethers.utils.formatEther(item.amountBUSD)}</td>
                  <td>{ethers.utils.formatEther(item.amountRIR)}</td>
                  <td>&nbsp;</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <p>Winner</p>
        <table style={{ width: "100%" }} border="2" cellPadding="2">
          <tbody>
            <tr key={0}>
              <td>Address</td>
              <td>Approved BUSD</td>
              <td>Refunced BUSD</td>
              <td>claimedToken</td>
              <td>&nbsp;</td>
            </tr>
            {listWinners.map(function (item) {
              return (
                <tr key={item.address}>
                  <td>{item.address}</td>
                  <td>{item.approvedBUSD}</td>
                  <td>{item.refundedBUSD}</td>
                  <td>{item.claimedToken}</td>
                  <td>&nbsp;</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={`global-padding`}>
        <textarea
          value={JSON.stringify(listInitOrder)}
          onChange={(e) => {
            setListInitOrder(JSON.parse(e.currentTarget.value));
          }}
          rows="20"
          cols="100"
        ></textarea>
        <button
          onClick={(e) => {
            handleImportOrder(e);
          }}
          className="btn btn-default mr-2"
        >
          Import Winner
        </button>
        <button
          onClick={(e) => {
            handleCommitWinner(e);
          }}
          className="btn btn-default mr-2"
        >
          Commit Winner
        </button>
        <button
          onClick={(e) => {
            handleSetEmptyWinner(e);
          }}
          className="btn btn-default"
        >
          Reset Win
        </button>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  if (params.slug.length == 0) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      contractAddress: params.slug[0],
    },
    revalidate: 10,
  };
}
