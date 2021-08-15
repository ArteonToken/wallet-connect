const test = require('tape')
const {connect} = require('./dist/network-connect.js')

const rpcUrl = 'https://goerli.infura.io/v3/d7acc44d359646f59bf02a00930a15e6'
const mumbaiRpcUrl = 'https://polygon-mumbai.infura.io/v3/d7acc44d359646f59bf02a00930a15e6'
const privateKey = '0x0000000000000000000000000000000000000000000000000000000000000005'
const mnemonic = 'athlete cross jealous setup cook average voyage gift prepare gown sick cabin'

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
