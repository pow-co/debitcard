"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebitCard = void 0;
const VERSION = '0.2.2';
const scrypt_ts_1 = require("scrypt-ts");
class DebitCard extends scrypt_ts_1.SmartContract {
    constructor(app, player, active, version) {
        super(...arguments);
        this.app = app;
        this.player = player;
        this.active = active;
        this.version = version;
    }
    static mint({ app_public_key, player_public_key, }) {
        const app = (0, scrypt_ts_1.PubKey)((0, scrypt_ts_1.toByteString)(app_public_key));
        const player = (0, scrypt_ts_1.PubKey)((0, scrypt_ts_1.toByteString)(player_public_key));
        const version = (0, scrypt_ts_1.toByteString)(VERSION, true);
        return new DebitCard(app, player, true, version);
    }
    charge(value, reason, signature) {
        const outputs = this.buildStateOutput(this.ctx.utxo.value - value);
        (0, scrypt_ts_1.assert)(this.active);
        (0, scrypt_ts_1.assert)(this.ctx.hashOutputs === (0, scrypt_ts_1.hash256)(outputs));
        (0, scrypt_ts_1.assert)(this.checkSig(signature, this.app));
    }
    freeze(signature) {
        this.active = false;
        const outputs = this.buildStateOutput(this.ctx.utxo.value);
        (0, scrypt_ts_1.assert)(this.ctx.hashOutputs === (0, scrypt_ts_1.hash256)(outputs));
        (0, scrypt_ts_1.assert)(this.checkSig(signature, this.player));
    }
    activate(signature) {
        this.active = true;
        const outputs = this.buildStateOutput(this.ctx.utxo.value);
        (0, scrypt_ts_1.assert)(this.ctx.hashOutputs === (0, scrypt_ts_1.hash256)(outputs));
        (0, scrypt_ts_1.assert)(this.checkSig(signature, this.player));
    }
    deposit(value, reason) {
        console.log('deposit', { value, reason });
        const outputs = this.buildStateOutput(this.ctx.utxo.value + value);
        (0, scrypt_ts_1.assert)(this.ctx.hashOutputs === (0, scrypt_ts_1.hash256)(outputs));
    }
    withdraw(value, reason, signature) {
        console.log('withdraw', { value, reason, signature });
        const outputs = this.buildStateOutput(this.ctx.utxo.value - value);
        (0, scrypt_ts_1.assert)(this.ctx.hashOutputs === (0, scrypt_ts_1.hash256)(outputs));
        (0, scrypt_ts_1.assert)(this.checkSig(signature, this.player));
    }
    cancel(reason, signature) {
        if (!this.checkSig(signature, this.player)) {
            (0, scrypt_ts_1.assert)(this.checkSig(signature, this.app));
            const outputs = scrypt_ts_1.Utils.buildPublicKeyHashOutput((0, scrypt_ts_1.hash160)(this.player), this.ctx.utxo.value);
            (0, scrypt_ts_1.assert)(this.ctx.hashOutputs === (0, scrypt_ts_1.hash256)(outputs));
        }
        (0, scrypt_ts_1.assert)(true);
    }
}
__decorate([
    (0, scrypt_ts_1.prop)()
], DebitCard.prototype, "app", void 0);
__decorate([
    (0, scrypt_ts_1.prop)()
], DebitCard.prototype, "player", void 0);
__decorate([
    (0, scrypt_ts_1.prop)()
], DebitCard.prototype, "version", void 0);
__decorate([
    (0, scrypt_ts_1.prop)(true)
], DebitCard.prototype, "active", void 0);
__decorate([
    (0, scrypt_ts_1.method)()
], DebitCard.prototype, "charge", null);
__decorate([
    (0, scrypt_ts_1.method)()
], DebitCard.prototype, "freeze", null);
__decorate([
    (0, scrypt_ts_1.method)()
], DebitCard.prototype, "activate", null);
__decorate([
    (0, scrypt_ts_1.method)()
], DebitCard.prototype, "deposit", null);
__decorate([
    (0, scrypt_ts_1.method)()
], DebitCard.prototype, "withdraw", null);
__decorate([
    (0, scrypt_ts_1.method)()
], DebitCard.prototype, "cancel", null);
exports.DebitCard = DebitCard;
//# sourceMappingURL=debitcard.js.map