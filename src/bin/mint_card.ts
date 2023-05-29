#!/usr/bin/env ts-node

import { config } from 'dotenv'

config()

import DebitCard from '../'

import { DefaultProvider, bsv, TestWallet } from 'scrypt-ts'

export default async function main() {
    const appPrivateKey = process.env.app_wif || process.argv[2]

    const playerPrivateKey = process.env.player_wif || process.argv[3]

    const app = bsv.PrivateKey.fromWIF(appPrivateKey)

    const player = bsv.PrivateKey.fromWIF(playerPrivateKey)

    const playerSigner = new TestWallet(player, new DefaultProvider())

    const app_public_key = app.toPublicKey().toString()

    const player_public_key = player.toPublicKey().toString()

    const card = DebitCard.mint({
        app_public_key,

        player_public_key,
    })

    console.log(card)

    console.log(card.methods)

    console.log(playerSigner)

    await card.connect(playerSigner)

    //const result = await card.deploy(1000)

    //console.log(result)
}

main()
