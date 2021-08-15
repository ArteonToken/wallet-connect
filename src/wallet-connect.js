import { networksByName, networksById, networkFromRpc, DEFAULT_NETWORK } from './utils'
import { providers, Wallet, utils } from 'ethers'
const { HDNode } = utils
const { Web3Provider, JsonRpcProvider } = providers

/**
 * @param { String | undefined } rpcUrl - when undefined metaMask is returned
 * @param { Object } network - { name, chainId}
 *
 * @return { Web3Provider }
 */
const providerFor = (rpcUrl, network) => {
  if (rpcUrl.includes('infura') || rpcUrl.includes('etherscan')) {
    return new JsonRpcProvider(rpcUrl, network)
  }

  return new Web3Provider(globalThis.ethereum)
}

/**
 * @param { Object } network - { name, chainId}
 *
 * @return { Object } { Web3Provider, accounts }
 */
export const metaMask = async (network) => {
  await globalThis.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: {
      chainId: network.chainId,
    },
  })
  const accounts = await globalThis.ethereum.request({
    method: 'eth_requestAccounts',
  })
  return {
    provider: providerFor(),
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
 * @param {Object} params {rpcUrl, id, password, mnemonic, privateKey}
 * @param {Object | Number | String | undefined} network {name, chainId} | name | chainId
 *
 * @return { Provider } { JsonRpcProvider | Web3Provider }
 */
export const connect = async (params = {}, network) => {
  if (!network) {
    network = params.rpcUrl ? networkFromRpc(params.rpcUrl) : DEFAULT_NETWORK
  }
  if (typeof network === 'object') {
    if (network.name !== networksById[Number(network.chainId)]) {
      throw console.error('invalid network name')
    }
    if (Number(network.chainId) !== Number(networksByName[network.name])) {
      throw console.error('invalid network chainId')
    }
  } else if (!isNaN(network)) {
    network = {
      chainId: network,
      name: networksById(network),
    }
  } else {
    network = {
      chainId: networksByName[network],
      name: network,
    }
  }
  if (params.mnemonic) return hdWallet(network, params)
  if (params.privateKey) return privateKey(network, params)
  return metaMask(network.chainId)
}

export default {
  connect,
  providerFor,
  metaMask,
  privateKey,
  hdWallet,
}
