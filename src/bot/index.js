import { Telegraf } from 'telegraf'
import { getUserData } from './middleware'

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('quit', (ctx) => {
    // Explicit usage
    ctx.telegram.leaveChat(ctx.message.chat.id)

    // Using context shortcut
    ctx.leaveChat()
})

bot.start(getUserData, async (ctx) => {
    await ctx.reply(`${ctx._user.first_name}, Welcome to the new Galaxy of Satellite.army!`)
    await ctx.reply(`We are working on a DeFi wallet tracker to help you to manage your crypto investments into Solana world!`)
    await ctx.reply(`Stay tuned! We are partecipating to SOLANA Season Hackathon https://solana.com/solanaszn`)

})

bot.on('text', getUserData, async (ctx, next) => {
    if (ctx.message.text.toLowerCase().includes('scam')) {
        await ctx.reply(`${ctx._user.first_name}, I'm not a scam!`)
        return next()
    }

    if (ctx.message.text.toLowerCase().includes('positive price sample alert')) {
        await ctx.reply("SOL token has just passed 40$ value!")
        return next()
    }

    if (ctx.message.text.toLowerCase().includes('negative price sample alert')) {
        await ctx.reply("SOL token has just fallen below the 40$ value!")
        return next()
    }

    if (ctx.message.text.toLowerCase().includes('il sample alert')) {
        await ctx.reply("SOL/RAY pool currently has 1% of IL!")
        return next()
    }

    if (ctx.message.text.toLowerCase().includes('security sample alert')) {
        await ctx.reply("scam.xyz pool has been compromised! Withdraw your funds!")
        return next()
    }

    if (ctx.message.text.toLowerCase().includes('welcome sample')) {
        await ctx.reply("Welcome! This is the satellite.army bot.")
        await ctx.reply("You have setup 1 security alert.")
        return next()
    }

    // Using context shortcut
    console.log({ u: ctx._user, m: ctx.message })
    await ctx.reply(`${ctx._user.first_name}, soon a lot of functions for you!`)
    next()
})


bot.on('callback_query', (ctx) => {
    // Explicit usage
    ctx.telegram.answerCbQuery(ctx.callbackQuery.id)

    // Using context shortcut
    ctx.answerCbQuery()
})

bot.on('inline_query', (ctx) => {
    const result = []
    // Explicit usage
    ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)

    // Using context shortcut
    ctx.answerInlineQuery(result)
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))