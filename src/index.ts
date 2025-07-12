import { GatewayIntentBits, Client, Message, Events } from "discord.js";
import { startHealthCheckCron } from "./cron";

const { token } = require("../config.json");

// 権限を指定してクライアントを作成
const client = new Client({
    intents: [
        // メッセージの読み取り
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// 起動確認
client.once(Events.ClientReady, () => {
    console.log("Ready!");
    if (client.user) {
        console.log(client.user.tag);
    }
});

// メッセージ応答
client.on(Events.MessageCreate, async (message: Message) => {
    // botのメッセージには反応しない
    if (message.author.bot) return;

    if (message.content === "すみそー！") {
        message.reply("すみそー！");
    }
});

// discord接続
client.login(token);

// koyeb用のWebサーバー
const port = process.env.PORT || 3000
console.log(`Launching Bun HTTP server on port: ${port}, url: http://0.0.0.0:${port} 🚀`)
Bun.serve({
  port: port,
  fetch(_request) {
    return new Response('Hello from Koyeb')
  },
})

// スリープ防止ヘルスチェック
startHealthCheckCron();
