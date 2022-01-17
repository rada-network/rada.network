/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (tokenAddress, tokenSymbol, tokenDecimals, networkType) => {
  try {
    const tokenAdded = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: networkType,
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
        },
      },
    })
    if (wasAdded) {
      console.log('Token add successfuly!!');
    } else {
      console.log('Can not add token to Metamask');
    }
    return tokenAdded
  } catch (error) {
    console.log("Error" + error);
  }
}
