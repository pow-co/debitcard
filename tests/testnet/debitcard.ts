import { DebitCard } from '../../src/contracts/debitcard'
import { getDefaultSigner, inputSatoshis } from '../utils/txHelper'
import { myPublicKey } from '../utils/privateKey'
import { toByteString, PubKey } from 'scrypt-ts'

async function main() {
    await DebitCard.compile()

    const instance = new DebitCard(
        PubKey(toByteString(myPublicKey.toString(), true)),
        PubKey(toByteString(myPublicKey.toString(), true)),
        true,
        toByteString('0.0.1', true)
    )

    // connect to a signer
    await instance.connect(getDefaultSigner())

    // contract deployment
    const deployTx = await instance.deploy(inputSatoshis)
    console.log('DebitCard contract deployed: ', deployTx.id)

    // TODOcontract call
    /*const { tx: callTx } = await instance.methods.unlock(
        toByteString(message, true)
    )
    console.log('DebitCard contract `unlock` called: ', callTx.id)
*/
}

describe('Test SmartContract `DebitCard` on testnet', () => {
    it('should succeed', async () => {
        await main()
    })
})
