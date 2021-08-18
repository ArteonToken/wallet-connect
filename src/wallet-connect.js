import {
  networksByName, networksById, networkFromRpc, DEFAULT_NETWORK,
  rpcUrlFor, blockExplorerFor, symbolFor, iconUrlFor, chainNameFor,
} from './utils'
import { providers, Wallet, utils, BigNumber } from 'ethers'
const { HDNode } = utils
const { Web3Provider, JsonRpcProvider } = providers

/**
 * @param { String | undefined } rpcUrl - when undefined metaMask is returned
 * @param { Object } network - { name, chainId}
 *
 * @return { Object } {Web3Provider}
 */
const providerFor = (rpcUrl, network) => {
  /* istanbul ignore next */
  if (!rpcUrl) return new Web3Provider(globalThis.ethereum, network)
  /* istanbul ignore else */
  if (rpcUrl.includes('infura') || rpcUrl.includes('etherscan')) {
    return new JsonRpcProvider(rpcUrl, network)
  }
}

/**
 * @param { Object } network - { name, chainId}
 *
 * @return { Promise } { Web3Provider, accounts }
 */
/* istanbul ignore next */
export const metaMask = async (network) => {
  /* istanbul ignore next */
  const provider = providerFor(undefined, network)
  try {
    await globalThis.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{
        chainId: new BigNumber.from(network.chainId)._hex.replace('x0', 'x'),
      }],
    })
  } catch (e) {
    if (e.code === 4902) {
      await globalThis.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainName: chainNameFor(network.chainId),
          chainId: new BigNumber.from(network.chainId)._hex.replace('x0', 'x'),
          rpcUrls: [rpcUrlFor(network.chainId)],
          blockExplorerUrls: [blockExplorerFor(network.chainId)],
          iconUrls: [iconUrlFor(network.name)],
          nativeCurrency: {
            name: network.name,
            symbol: symbolFor(network.chainId),
            decimals: 18,
          },
        }],
      });
    }
  }
  /* istanbul ignore next */
  const accounts = await globalThis.ethereum.request({
    method: 'eth_requestAccounts',
  })
  /* istanbul ignore next */
  return {
    provider,
    accounts,
  }
}

/**
 * @param { Object } network - { name, chainId}
 * @param { Object } params - { rpcUrl, privateKey}
 *
 * @return { Object } { JsonRpcProvider, Wallet, accounts }
 */
export const privateKey = (network, params) => {
  const provider = providerFor(params.rpcUrl, network)
  const wallet = new Wallet(params.privateKey, provider)
  return {
    provider,
    wallet,
    accounts: [wallet.address],
  }
}

/**
 * @param { Object } network - { name, chainId}
 * @param { Object } params - { rpcUrl, mnemonic}
 *
 * @return { Object } { JsonRpcProvider, HDNode, accounts }
 */
export const hdWallet = (network, params) => {
  const provider = providerFor(params.rpcUrl, network)
  const wallet = HDNode.fromMnemonic(params.mnemonic, provider)
  return {
    provider,
    wallet,
    accounts: [wallet.address],
  }
}

/**
 * @param {Object} params - {rpcUrl, id, password, mnemonic, privateKey}
 * @param {Object | Number | String | undefined} network - {name, chainId} | name | chainId
 *
 * @return { Provider } { hdWallet | privateKey | metaMask }
 */
/* istanbul ignore next */
export const connect = async (params = {}, network = {}) => {
  if (typeof params === 'string') network = params
  if (!isNaN(params)) network = params
  if (typeof params === 'object') {
    if (params.name) network.name = params.name
    if (params.chainId) network.chainId = params.chainId
  }

  if (Object.keys(network).length === 0) {
    network = params.rpcUrl ? networkFromRpc(params.rpcUrl) : DEFAULT_NETWORK
  }

  if (typeof network === 'object') {
    if (network.name !== networksById[Number(network.chainId)] ||
        Number(network.chainId) !== Number(networksByName[network.name])) {
      throw new Error('invalid network name/chainId')
    }
  } else if (!isNaN(network)) {
    network = {
      chainId: network,
      name: networksById[network],
    }
  } else {
    network = {
      chainId: networksByName[network],
      name: network,
    }
  }
  /* istanbul ignore next */
  if (params.mnemonic) return hdWallet(network, params)
  if (params.privateKey) return privateKey(network, params)
  /* istanbul ignore next */
  return metaMask(network)
}

export default {
  connect,
  providerFor,
  metaMask,
  privateKey,
  hdWallet,
}
