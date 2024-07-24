const fs = require('fs');

module.exports = (client) => {
    let allbuttons = fs.readdirSync('./src/buttons')
    for(const folder of allbuttons) {
        if (!fs.lstatSync(`./src/buttons/${folder}`).isDirectory()) continue;
        const buttonFiles = fs.readdirSync(`./src/buttons/${folder}`).filter(f => f.endsWith('.js'));
        for (file of buttonFiles) {
            const button = require(`../buttons/${folder}/${file}`);
            client.buttons.set(button.customId, button)
        }
    }
}