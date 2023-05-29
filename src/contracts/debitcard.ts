import {
    assert,
    ByteString,
    toByteString,
    method,
    prop,
    sha256,
    Sha256,
    SmartContract,
} from 'scrypt-ts'

export class DebitCard extends SmartContract {
    @prop()
    hash: Sha256

    constructor(hash: Sha256) {
        super(...arguments)
        this.hash = hash
    }

    static fromSecretMessage(message: string): DebitCard {
        const hash = sha256(toByteString('dApp Swiss Bank Unlock Secret'))

        const card = new DebitCard(hash)

        return card
    }

    @method()
    public unlock(message: ByteString) {
        assert(sha256(message) == this.hash, 'Hash does not match')
    }
}
