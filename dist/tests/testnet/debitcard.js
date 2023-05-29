"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debitcard_1 = require("../../src/contracts/debitcard");
const txHelper_1 = require("../utils/txHelper");
const privateKey_1 = require("../utils/privateKey");
const scrypt_ts_1 = require("scrypt-ts");
async function main() {
    await debitcard_1.DebitCard.compile();
    const instance = new debitcard_1.DebitCard((0, scrypt_ts_1.PubKey)((0, scrypt_ts_1.toByteString)(privateKey_1.myPublicKey.toString(), true)), (0, scrypt_ts_1.PubKey)((0, scrypt_ts_1.toByteString)(privateKey_1.myPublicKey.toString(), true)), true, (0, scrypt_ts_1.toByteString)('0.0.1', true));
    // connect to a signer
    await instance.connect((0, txHelper_1.getDefaultSigner)());
    // contract deployment
    const deployTx = await instance.deploy(txHelper_1.inputSatoshis);
    console.log('DebitCard contract deployed: ', deployTx.id);
    // TODOcontract call
    /*const { tx: callTx } = await instance.methods.unlock(
        toByteString(message, true)
    )
    console.log('DebitCard contract `unlock` called: ', callTx.id)
*/
}
describe('Test SmartContract `DebitCard` on testnet', () => {
    it('should succeed', async () => {
        await main();
    });
});
//# sourceMappingURL=debitcard.js.map