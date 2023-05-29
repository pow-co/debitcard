"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const scrypt_ts_1 = require("scrypt-ts");
const debitcard_1 = require("../../src/contracts/debitcard");
const txHelper_1 = require("../utils/txHelper");
const privateKey_1 = require("../utils/privateKey");
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
const scrypt_ts_2 = require("scrypt-ts");
(0, chai_1.use)(chai_as_promised_1.default);
describe('Test SmartContract `DebitCard`', () => {
    let instance;
    before(async () => {
        await debitcard_1.DebitCard.compile();
        instance = new debitcard_1.DebitCard((0, scrypt_ts_2.PubKey)((0, scrypt_ts_1.toByteString)(privateKey_1.myPublicKey.toString(), true)), (0, scrypt_ts_2.PubKey)((0, scrypt_ts_1.toByteString)(privateKey_1.myPublicKey.toString(), true)), true, (0, scrypt_ts_1.toByteString)('0.0.1', true));
        await instance.connect((0, txHelper_1.getDummySigner)());
    });
    it('should pass the public method unit test successfully.', async () => {
        const { tx: callTx, atInputIndex } = await instance.methods.unlock((0, scrypt_ts_1.toByteString)('hello world', true), {
            fromUTXO: (0, txHelper_1.getDummyUTXO)(),
        });
        const result = callTx.verifyScript(atInputIndex);
        (0, chai_1.expect)(result.success, result.error).to.eq(true);
    });
    it('should throw with wrong message.', async () => {
        return (0, chai_1.expect)(instance.methods.unlock((0, scrypt_ts_1.toByteString)('wrong message', true), {
            fromUTXO: (0, txHelper_1.getDummyUTXO)(),
        })).to.be.rejectedWith(/Hash does not match/);
    });
    it('should allow the holder of the debit card to cancel the card', async () => {
        const debitCard = new debitcard_1.DebitCard((0, scrypt_ts_2.PubKey)((0, scrypt_ts_1.toByteString)(privateKey_1.myPublicKey.toString(), true)), (0, scrypt_ts_2.PubKey)((0, scrypt_ts_1.toByteString)(privateKey_1.myPublicKey.toString(), true)), true, (0, scrypt_ts_1.toByteString)('0.0.1', true));
        const result = await debitCard.methods.call('cancel');
        console.log(result);
    });
});
//# sourceMappingURL=debitcard.test.js.map