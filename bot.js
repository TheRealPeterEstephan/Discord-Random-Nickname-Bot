// Import the discord.js module
const Discord = require('discord.js');

// Import DataMuse Module
const datamuse = require('datamuse');

// Create an instance of a Discord client
const client = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log('I am ready!');
});

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getName(name) {
    datamuse.request('words?sl=' + name);
    .then((json) => {
           json[getRndInteger(0, json.length)]["word"];
        });
    return




    //console.log(new_name);
    //return new_name;
    //return new_name
}

let newName = getName("Brendon");

console.log(getName("Brendon"));

client.on('message', message => {
    // Ignore messages that aren't from a guild
    if (!message.guild) return;

    // If the message content starts with "!kick"
    if (message.content.startsWith('!change')) {
        // Assuming we mention someone in the message, this will return the user
        // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
        const user = message.mentions.users.first();
        // If we have a user mentioned
        if (user) {
            // Now we get the member from the user
            const member = message.guild.member(user);
            // If the member is in the guild
            if (member) {
                /**
                 * Kick the member
                 * Make sure you run this on a member, not a user!
                 * There are big differences between a user and a member
                 */
                /**member.kick('Optional reason that will display in the audit logs').then(() => {
                    // We let the message author know we were able to kick the person
                    message.reply(`Successfully kicked ${user.tag}`); **/
                member.setNickname('Banana Bread').then(() => {
                    message.reply('Successfully changed the nickname of the user.');
                }).catch(err => {
                    // An error happened
                    // This is generally due to the bot not being able to kick the member,
                    // either due to missing permissions or role hierarchy
                    message.reply('I was unable to change the nickname of the member.');
                    // Log the error
                    console.error(err);
                });
            } else {
                // The mentioned user isn't in this guild
                message.reply('That user isn\'t in this guild!');
            }
            // Otherwise, if no user was mentioned
        } else {
            message.reply('You didn\'t mention the user for me to change the name to!');
        }
    }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login('[HIDDEN]');
