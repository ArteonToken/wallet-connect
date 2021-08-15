import { networksByName, networksById, networkFromRpc, DEFAULT_NETWORK } from './utils'
import { providers, Wallet, utils } from 'ethers'
const { HDNode } = utils
const { Web3Provider, JsonRpcProvider } = providers

const providerFor = (rpcUrl, network) => {
  if (rpcUrl.includes('infura') || rpcUrl.includes('etherscan')) {
    return new JsonRpcProvider(rpcUrl, network)
  }

  return new Web3Provider(globalThis.ethereum)
}

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

export const privateKey = (network, params) => {
  const provider = providerFor(params.rpcUrl, network)
  const wallet = new Wallet(params.privateKey, provider)
  return {
    provider,
    wallet,
    accounts: [wallet.address],
  }
}

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
 * @param {Object | Number | String} network {name, chainId} | name | chainId
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
