const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json"); // config from file

/* example config.json:
{
    "token": "abcdefghijklmnopqrstuvwxyz", // user or bot token,

    "listenTo": ["167423382697148416", "353615025589714946", "210321071511961600"], // list of channel OR guild id's
    "includeDMs": true, // whether or not to watch for deleted DMs

    "dumpChannel": "377697546459545602" // channel to dump deleted messages to
    "DMChannel": "379072715954585612" // optional: separate channel to send private messages to
}
 */

let dumpChannel = null;
let DMChannel = null;

let lastAuthor = null;
let lastChannel = null;
let lastServer = null;

client.on("ready", () => {
    dumpChannel = client.channels.get(config.dumpChannel);

    if ("DMChannel" in config) {
        DMChannel = client.channels.get(config.DMChannel);
    } else {
        DMChannel = dumpChannel;
    }

    console.log(`listening for deleted messages in ${config.listenTo}`);
});

client.on("messageDelete", (message) => {
    if (dumpChannel === null) return; // make sure channel is loaded

    if (message.channel.type === "dm") {
        if (!config.includeDMs) return;
    }
    else if (!(config.listenTo.includes(message.channel.id) || config.listenTo.includes(message.guild.id))) { // check if deleted message is in a listening channel/guild
        return;
    }

    let s = message.content;

    let is_private = message.channel.type === "dm";

    if (message.author !== lastAuthor) {
        s = `Author: ${message.author.tag}\n\n` + s;
        lastAuthor = message.author;
    }

    if (!is_private && message.channel !== lastChannel) {
        s = `Channel: ${message.channel.name}\n\n` + s;
        lastChannel = message.channel;
    }

    if (!is_private && message.guild !== lastServer) {
        s = `Server: ${message.guild.name}\n\n` + s;
        lastServer = message.guild;
    }

    if (is_private) {
        s = "Private Message\n\n" + s;
    }

    s = s.replace(/```/, "");

    s = "```" + s + "```\n";

    let attached = message.attachments.array();

    for (i=0; i < attached.length; i++) {
        let attachment = attached[i];
        let url = attachment.url;

        s += url + "\n\n";
    }

    if (is_private) {
        DMChannel.send(s);
    } else {
        dumpChannel.send(s);
    }

    console.log(s);
});

client.login(config.token);