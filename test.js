const test = require('tape')
const {connect} = require('./dist/wallet-connect.js')

const rpcUrl = 'https://goerli.infura.io/v3/d7acc44d359646f59bf02a00930a15e6'
const etherscanRpcUrl = 'https://api.etherscan.io?apikey=SVUVR9EZ8PPS9QTJ9MDNJFRGPWJXHB8BI4'
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
  }, {
    name: 'polygon-mumbai',
    chainId: 8001
  })
  const signer = await result.provider.getSigner()

  tape.ok(signer._isSigner, 'can sign')
  tape.ok(Object.keys(result).length === 3, 'can connect')
})

test('connects to polygon mumbai (using chainId)', async tape => {
  tape.plan(2)

  const result = await connect({
    mnemonic,
    rpcUrl: mumbaiRpcUrl
  }, 8001)
  const signer = await result.provider.getSigner()

  tape.ok(signer._isSigner, 'can sign')
  tape.ok(Object.keys(result).length === 3, 'can connect')
})

test('connects to polygon mumbai (using name)', async tape => {
  tape.plan(2)

  const result = await connect({
    mnemonic,
    rpcUrl: mumbaiRpcUrl
  }, 'polygon-mumbai')
  const signer = await result.provider.getSigner()

  tape.ok(signer._isSigner, 'can sign')
  tape.ok(Object.keys(result).length === 3, 'can connect')
})

test('connects to etherscan', async tape => {
  tape.plan(2)

  const result = await connect({
    mnemonic,
    rpcUrl: etherscanRpcUrl
  })
  const signer = await result.provider.getSigner()

  tape.ok(signer._isSigner, 'can sign')
  tape.ok(Object.keys(result).length === 3, 'can connect')
})

test('throws when rpcUrl is undefined', async tape => {
  tape.plan(1)

  try {
    const result = await connect({
      mnemonic,
      rpcUrl: undefined
    })
  } catch (e) {
    tape.ok(e, e)
  }
})

test('throws when name is invalid', async tape => {
  tape.plan(1)

  try {
    const result = await connect({
      mnemonic,
      rpcUrl
    }, {
      name: 'mumbai',
      chainId: 8001
    })
  } catch (e) {
    tape.ok(e, e)
  }
})

test('throws when chainId is invalid', async tape => {
  tape.plan(1)

  try {
    const result = await connect({
      mnemonic,
      rpcUrl
    }, {
      name: 'polygon-mumbai',
      chainId: 5
    })
  } catch (e) {
    tape.ok(e, e)
  }
})
