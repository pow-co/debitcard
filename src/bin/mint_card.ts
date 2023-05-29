#!/usr/bin/env ts-node

import DebitCard from '../'

export default async function main() {
    const message = process.argv[2] || 'dApp Swiss Bank Unlock Secret'

    const card = DebitCard.fromSecretMessage(message)

    console.log(card)
}

main()
