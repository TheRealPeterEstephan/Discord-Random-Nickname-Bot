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
    console.log('I am ready to make people into MEMES!');
});

//Ran. Array Selection Value
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//newName & setname vars & functions
let newName = '', xname = '';
function setName(name) {
    console.log('setname', name);
    newName = name;
}

//Lookup similar words to the Discord username
function getName(name) {
    return datamuse.request('words?sl=' + name)
        .then((json) => {
            var rnd = json[getRndInteger(0, json.length)]["word"];
            console.log('then', rnd);
            setName(rnd);
            return json[getRndInteger(0, json.length)]["word"];
        });
}


//Check for messages in Channels and Respond
client.on('message', message => {
    // Ignore messages that aren't from a guild
    if (!message.guild) return;

    // Create an event listener for new guild members
    // If the message content starts with "!change"
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
                 * Change the Nickname for the member
                 * Make sure you run this on a member, not a user!
                 * There are differences between a user and a member
                 */
                console.log(user.tag, member.displayName);
                //Users' Display Name
                let dsn = member.displayName;
                //Users' username split and only selects their username. ie. TheBestNameEver#1234 = [TheBestNameEver,1234]
                let username = user.tag.split("#")[0];
                datamuse.request('words?sl=' + dsn)
                    .then((json) => {
                        var rnd = json[getRndInteger(0, json.length)]["word"];
                        member.setNickname(rnd).then(() => {
                            message.reply('Successfully changed the nickname of ' + dsn + 'to ' + rnd);
                        }).catch(err => {
                            // An error happened
                            // This is generally due to the bot not being able to change the nickname for the given member,
                            // either due to missing permissions or role hierarchy
                            message.reply('I was unable to change the nickname of the member.');
                            member.setNickname('4th Grad the third').then(() => {
                                message.reply('Successfully changed the nickname of 4th Grad the third');
                            }).catch(err => {
                                // An error happened
                                // This is generally due to the bot not being able to nickname for the given member,
                                // either due to missing permissions or role hierarchy
                                message.reply('I was unable to change the nickname of the member.');
                                // Log the error
                                console.error(err);
                            });
                            // Log the error
                            console.error(err);
                        });
                    }).catch(err => {
                        // An error happened
                        // This is generally due to the bot not being able to nickname for the given member,
                        // either due to missing permissions or role hierarchy
                        message.reply('I was unable to change the rnd nickname of the member.');
                        member.setNickname('2nd grad the second').then(() => {
                            message.reply('Successfully changed the nickname of 2nd grad the second');
                        }).catch(err => {
                            // An error happened
                            // This is generally due to the bot not being able to nickname for the given member,
                            // either due to missing permissions or role hierarchy
                            message.reply('I was unable to change the nickname of the member.');
                            // Log the error
                            console.error(err);
                        });
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

    if (message.content.startsWith('!help')) {
        // Assuming we mention someone in the message, this will return the user
        console.log("!help");
        const user = message.mentions.users.first();
        datamuse.request('words?sl=Brendon')
            .then((json) => {
                var rnd = json[getRndInteger(0, json.length)]["word"];
                message.reply('Hello, I am ' + rnd + '! Whats a Compuutterrr? \n' + '```You can try: !change @Brendon to see if it will make him a meme...```')
            }).catch(err => {
                // An error happened
                console.error(err);
            });
    }


});


//Connect Bot to Discord
var fs = require('fs');
var token_array = fs.readFileSync('./auth.json', 'utf-8');
var token_array_data = JSON.parse(token_array);
client.login(token_array_data["token"]);
