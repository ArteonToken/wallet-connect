export const networksById = {
  1: 'mainnet',
  3: 'ropsten',
  5: 'goerli',
  137: 'polygon-mainnet',
  80001: 'polygon-mumbai',
}

export const networksByName = {
  'mainnet': 1,
  'ropsten': 3,
  'goerli': 5,
  'polygon-mainnet': 137,
  'polygon-mumbai': 80001,
}

export const DEFAULT_NETWORK = {
  name: 'mainnet',
  chainId: 1,
}

export const rpcUrlsById = {
  80001: `https://rpc-mumbai.maticvigil.com/`,
  137: `https://rpc-mainnet.maticvigil.com/`,
}

export const symbolsById = {
  80001: 'tMATIC',
  137: `MATIC`,
}

export const explorersById = {
  80001: 'https://mumbai.polygonscan.com',
  137: `https://polygonscan.com`,
}

export const iconUrlsById = {
  80001: 'https://docs.matic.network/img/matic-logo.svg',
  137: 'https://docs.matic.network/img/matic-logo.svg',
}
/**
 * @param { String } url - rpcUrl
 * @return {Object} network - { name, chainId }
 */
export const networkFromRpc = (url) => {
  const network = DEFAULT_NETWORK
  for (const name of Object.keys(networksByName)) {
    if (url.includes(name)) {
      network.name = name
      network.chainId = networksByName[name]
    }
  }
  return network
}

export const rpcUrlFor = (chainId) => {
  return rpcUrlsById[chainId]
}

export const symbolFor = (chainId) => {
  return symbolsById[chainId]
}

export const blockExplorerFor = (chainId) => {
  return explorersById[chainId]
}

export const iconUrlFor = (chainId) => {
  return iconUrlsById[chainId]
}
