import { expect, use } from 'chai'
import { MethodCallOptions, sha256, toByteString } from 'scrypt-ts'
import { DebitCard } from '../../src/contracts/debitcard'
import { getDummySigner, getDummyUTXO } from '../utils/txHelper'
import chaiAsPromised from 'chai-as-promised'
use(chaiAsPromised)

describe('Test SmartContract `DebitCard`', () => {
    let instance: DebitCard

    before(async () => {
        await DebitCard.compile()
        instance = new DebitCard(sha256(toByteString('hello world', true)))
        await instance.connect(getDummySigner())
    })

    it('should pass the public method unit test successfully.', async () => {
        const { tx: callTx, atInputIndex } = await instance.methods.unlock(
            toByteString('hello world', true),
            {
                fromUTXO: getDummyUTXO(),
            } as MethodCallOptions<DebitCard>
        )

        const result = callTx.verifyScript(atInputIndex)
        expect(result.success, result.error).to.eq(true)
    })

    it('should throw with wrong message.', async () => {
        return expect(
            instance.methods.unlock(toByteString('wrong message', true), {
                fromUTXO: getDummyUTXO(),
            } as MethodCallOptions<DebitCard>)
        ).to.be.rejectedWith(/Hash does not match/)
    })
})
