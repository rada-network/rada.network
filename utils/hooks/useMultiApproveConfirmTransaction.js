import { useEffect, useReducer, useRef,useState } from 'react'
import { noop } from 'lodash'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import {toast} from "react-toastify"
import useActiveWeb3React from './useActiveWeb3React'
import { useTranslation } from "next-i18next";

const initialState = {
  approvalState: 'idle',
  confirmState: 'idle',
}

const reducer = (state, actions) => {
  switch (actions.type) {
    case 'initial_state':
      return {
        ...state,
        approvalState: 'idle',
        confirmState: 'idle',
      }
    case 'requires_approval':
      return {
        ...state,
        approvalState: 'success',
      }
    case 'approve_sending':
      return {
        ...state,
        approvalState: 'loading',
      }
    case 'approve_receipt':
      return {
        ...state,
        approvalState: 'success',
      }
    case 'approve_error':
      return {
        ...state,
        approvalState: 'fail',
      }
    case 'confirm_sending':
      return {
        ...state,
        confirmState: 'loading',
      }
    case 'confirm_receipt':
      return {
        ...state,
        confirmState: 'success',
      }
    case 'confirm_error':
      return {
        ...state,
        confirmState: 'fail',
      }
    default:
      return state
  }
}

const useMultiApproveConfirmTransaction = ({
  onApprove,
  onConfirm,
  onRequiresApproval,
  onSuccess = noop,
  onApproveSuccess = noop,
}) => {
  const { account } = useActiveWeb3React()
  const [state, dispatch] = useReducer(reducer, initialState)
  const [requireApprove, setRequireApprove] = useState({busd : 0,rir : 0})
  const handlePreApprove = useRef(onRequiresApproval)
  const {t} = useTranslation("launchpad")
  // Check if approval is necessary, re-check if account changes
  useEffect(() => {
    if (!!account && handlePreApprove.current) {
      handlePreApprove.current().then((result) => {
        setRequireApprove(result);
        if (result.rir > 0 && result.busd > 0) {
          dispatch({ type: 'requires_approval' })
        }
      })
    }
  }, [account, handlePreApprove, dispatch])

  return {
    isApproving: state.approvalState === 'loading',
    isApproved: state.approvalState === 'success',
    isConfirming: state.confirmState === 'loading',
    isConfirmed: state.confirmState === 'success',
    hasApproveFailed: state.approvalState === 'fail',
    hasConfirmFailed: state.confirmState === 'fail',
    handleApprove: async () => {
      try {
        const txs = await onApprove(requireApprove)
        dispatch({ type: 'approve_sending' })
        let receipts  = []
        for (const tx of txs) {
          receipts.push(await tx.wait())
        }
        let status = true;
        for (const receipt of receipts){
          if (!receipt.status) {
            status = false;
            break;
          }
        }
        if (status){
          dispatch({ type: 'approve_receipt' })
          onApproveSuccess({ state, receipts })
        }
      } catch (error) {
        console.log(error)
        dispatch({ type: 'approve_error' })
        toast.error(t(error?.data?.message || error?.message))
      }
    },
    handleConfirm: async (params = {}) => {
      dispatch({ type: 'confirm_sending' })
      try {
        const tx = await onConfirm(params)
        const receipt = await tx.wait()
        if (receipt.status) {
          dispatch({ type: 'confirm_receipt' })
          onSuccess({ state, receipt })
        }
      } catch (error) {
        console.log(error)
        dispatch({ type: 'confirm_error' })
        toast.error(t(error?.data?.message || error?.message))
      }
    },
    handleReload: async (params = {}) => {
      dispatch( {type: 'initial_state' })
      if (account && handlePreApprove.current) {
        handlePreApprove.current().then((result) => {
          if (result) {
            dispatch({ type: 'requires_approval' })
          }
        })
      }
    },
  }
}

export default useMultiApproveConfirmTransaction
