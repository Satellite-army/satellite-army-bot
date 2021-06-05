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
    // console.log({ M: ctx.message })
    // Explicit usage
    // ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx._user.first_name}`)
    if (ctx.message.text.includes('scam')) {
        await ctx.reply(`${ctx._user.first_name}, I'm not a scam!`)
        return next()
    }

    // Using context shortcut
    console.log({ u: ctx._user, m: ctx.message })
    await ctx.reply(`${ctx._user.first_name}, soon a lot of functions for you!`)
    next()
}, (ctx) => { console.log(ctx._name) })


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