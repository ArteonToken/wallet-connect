const test = require('tape')
const env = require('dotenv')
const {connect} = require('./dist/network-connect.js')

const {rpcUrl, mumbaiRpcUrl, mnemonic, privateKey} = env.config().parsed

test('connects to privateKeyWallet', async tape => {
  tape.plan(3)
  const result = await connect({
    privateKey,
    rpcUrl
  })
  const signer = await result.provider.getSigner()
  tape.ok(signer._isSigner, 'provider can sign')
  tape.ok(result.wallet._isSigner, 'wallet can sign')

  tape.ok(Object.keys(result).length === 3, 'can connect')
})

test('connects to hdWallet', async tape => {
  tape.plan(2)

  const result = await connect({
    mnemonic,
    rpcUrl
  })
  const signer = await result.provider.getSigner()

  tape.ok(signer._isSigner, 'can sign')
  tape.ok(Object.keys(result).length === 3, 'can connect')
})

test('connects to polygon mainnet', async tape => {
  tape.plan(2)

  const result = await connect({
    mnemonic,
    rpcUrl: mumbaiRpcUrl
  })
  const signer = await result.provider.getSigner()

  tape.ok(signer._isSigner, 'can sign')
  tape.ok(Object.keys(result).length === 3, 'can connect')
})

test('connects to polygon mumbai', async tape => {
  tape.plan(2)

  const result = await connect({
    mnemonic,
    rpcUrl: mumbaiRpcUrl
  })
  const signer = await result.provider.getSigner()

  tape.ok(signer._isSigner, 'can sign')
  tape.ok(Object.keys(result).length === 3, 'can connect')
})
