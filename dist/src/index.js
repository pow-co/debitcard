"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debitcard_1 = require("./contracts/debitcard");
const debitcard_json_1 = __importDefault(require("../artifacts/src/contracts/debitcard.json"));
debitcard_1.DebitCard.loadArtifact(debitcard_json_1.default);
exports.default = debitcard_1.DebitCard;
module.exports = debitcard_1.DebitCard;
//# sourceMappingURL=index.js.map