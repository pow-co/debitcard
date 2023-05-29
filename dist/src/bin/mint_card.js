#!/usr/bin/env ts-node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const __1 = __importDefault(require("../"));
const scrypt_ts_1 = require("scrypt-ts");
async function main() {
    const appPrivateKey = process.env.app_wif || process.argv[2];
    const playerPrivateKey = process.env.player_wif || process.argv[3];
    const app = scrypt_ts_1.bsv.PrivateKey.fromWIF(appPrivateKey);
    const player = scrypt_ts_1.bsv.PrivateKey.fromWIF(playerPrivateKey);
    const playerSigner = new scrypt_ts_1.TestWallet(player, new scrypt_ts_1.DefaultProvider());
    const app_public_key = app.toPublicKey().toString();
    const player_public_key = player.toPublicKey().toString();
    const card = __1.default.mint({
        app_public_key,
        player_public_key,
    });
    console.log(card);
    console.log(card.methods);
    console.log(playerSigner);
    await card.connect(playerSigner);
    //const result = await card.deploy(1000)
    //console.log(result)
}
exports.default = main;
main();
//# sourceMappingURL=mint_card.js.map