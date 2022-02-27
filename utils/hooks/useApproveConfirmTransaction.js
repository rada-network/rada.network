import { useEffect, useReducer, useRef,useState } from 'react'
import { noop } from 'lodash'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import {toast} from "react-toastify"
import useActiveWeb3React from './useActiveWeb3React'
import {useTranslation} from "next-i18next"

const initialState = {
  approvalState: 'idle',
  confirmState: 'idle',
}

const reducer = (state, actions) => {
  switch (actions.type) {
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

const useApproveConfirmTransaction = ({
  initData,
  onApprove,
  onConfirm,
  onRequiresApproval,
  onSuccess = noop,
  onApproveSuccess = noop,
  onError = noop,
}) => {
  const { account } = useActiveWeb3React()
  const [state, dispatch] = useReducer(reducer, initialState)
  const handlePreApprove = useRef(onRequiresApproval)
  const {t} = useTranslation("launchpad")

  // Check if approval is necessary, re-check if account changes
  useEffect(() => {
    if (account && handlePreApprove.current) {
      handlePreApprove.current().then((result) => {
        if (result) {
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
        dispatch({ type: 'approve_sending' })
        const tx = await onApprove()
        const receipt = await tx.wait()
        if (receipt.status) {
          dispatch({ type: 'approve_receipt' })
          onApproveSuccess({ state, receipt })
        }
      } catch (error) {
        dispatch({ type: 'approve_error' })
        console.log(error)
        if (!!error?.data?.message){
          store.transaction.updateError(t(error?.data?.message?.replace("execution reverted: ","").replace("ERC20: ","")), true);
        }
        else if (!!error?.message){
          store.transaction.updateError(t(error?.message), true);
        } else {
          store.transaction.updateError(t(error.toString().replace("execution reverted: ","").replace("ERC20: ","")), true);
        }
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
        dispatch({ type: 'confirm_error' })
        console.log(error.message)
        if (!!error?.data?.message){
          store.transaction.updateError(t(error?.data?.message?.replace("execution reverted: ","").replace("ERC20: ","")), true);
        }
        else if (!!error?.message){
          store.transaction.updateError(t(error?.message), true);
        } else {
          store.transaction.updateError(t(error.toString().replace("execution reverted: ","").replace("ERC20: ","")), true);
        }
      }
    },
  }
}

export default useApproveConfirmTransaction