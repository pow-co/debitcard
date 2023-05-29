import { DebitCard } from '../../src/contracts/debitcard'
import { getDefaultSigner, inputSatoshis } from '../utils/txHelper'
import { toByteString, sha256 } from 'scrypt-ts'

const message = 'hello world, sCrypt!'

async function main() {
    await DebitCard.compile()
    const instance = new DebitCard(sha256(toByteString(message, true)))

    // connect to a signer
    await instance.connect(getDefaultSigner())

    // contract deployment
    const deployTx = await instance.deploy(inputSatoshis)
    console.log('DebitCard contract deployed: ', deployTx.id)

    // contract call
    const { tx: callTx } = await instance.methods.unlock(
        toByteString(message, true)
    )
    console.log('DebitCard contract `unlock` called: ', callTx.id)
}

describe('Test SmartContract `DebitCard` on testnet', () => {
    it('should succeed', async () => {
        await main()
    })
})
