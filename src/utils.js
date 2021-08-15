export const networksById = {
  1: 'mainnet',
  3: 'ropsten',
  5: 'goerli',
  137: 'polygon-mainnet',
  8001: 'polygon-mumbai',
}

export const networksByName = {
  'mainnet': 1,
  'ropsten': 3,
  'goerli': 5,
  'polygon-mainnet': 137,
  'polygon-mumbai': 8001,
}

export const DEFAULT_NETWORK = {
  name: 'mainnet',
  chainId: 1,
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

export default {
  DEFAULT_NETWORK,
  networkFromRpc,
  networksById,
  networksByName,
}
