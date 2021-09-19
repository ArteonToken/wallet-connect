export const networksById = {
  1: 'mainnet',
  3: 'ropsten',
  5: 'goerli',
  56: 'binance-smartchain',
  97: 'binance-smartchain-testnet',
  137: 'polygon-mainnet',
  80001: 'polygon-mumbai',
  90001: 'mango' // ArteonChain testnet
}

export const networksByName = {
  'mainnet': 1,
  'ropsten': 3,
  'goerli': 5,
  'binance-smartchain': 56,
  'binance-smartchain-testnet': 97,
  'polygon-mainnet': 137,
  'polygon-mumbai': 80001,
  'mango': 90001
}

export const DEFAULT_NETWORK = {
  name: 'mainnet',
  chainId: 1,
}

export const rpcUrlsById = {
  90001: 'https://mumbai.leofcoin.org',
  90000: 'https://arteon.leofcoin.org',
  80001: `https://rpc-mumbai.matic.today`,
  137: `https://rpc-mainnet.matic.network`,
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  56: 'https://bsc-dataseed.binance.org'
}

export const symbolsById = {
  90001: 'tArteon',
  90000: 'Arteon',
  80001: 'tMATIC',
  137: `MATIC`,
  97: 'BNB',
  56: 'BNB'
}

export const explorersById = {
  80001: 'https://mumbai.polygonscan.com',
  137: `https://polygonscan.com`,
  97: 'https://testnet.bscscan.com',
  56: 'https://bscscan.com'
}

export const iconUrlsById = {
  90001: 'https://mining.arteon.org/assets/arteon.svg',
  80001: 'https://docs.matic.network/img/matic-logo.svg',
  137: 'https://docs.matic.network/img/matic-logo.svg',
  97: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/bnb.svg',
  56: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/bnb.svg',
}

export const chainNamesById = {
  90001: 'Arteon Mango',
  80001: 'Matic(Polygon) Testnet Mumbai',
  137: 'Matic(Polygon) Mainnet',
  97: 'Binance Smart Chain Testnet',
  56: 'Binance Smart Chain'
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

export const chainNameFor = (chainId) => {
  return chainNamesById[chainId]
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
