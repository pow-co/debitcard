import { DebitCard } from './contracts/debitcard'

import artifact from '../artifacts/src/contracts/debitcard.json'

DebitCard.loadArtifact(artifact)

export default DebitCard

module.exports = DebitCard
