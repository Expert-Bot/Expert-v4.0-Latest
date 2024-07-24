const { ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");
const { musicCard } = require("musicard");
const fs = require("fs");
const client = require("../../index.js");

const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? "All Queue" : "This Song") : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

// Function to create and send the music card
async function sendMusicCard(queue, song) {
  // Create a music card
  const card = new musicCard()
    .setName(song.name)
    .setAuthor(`By ${song.user.username}`)
    .setColor("auto")
    .setTheme("classic")
    .setBrightness(50)
    .setThumbnail(song.thumbnail)
    .setProgress(10) // Initialize progress to 0
    .setStartTime("0:00") // Initialize start time to 0:00
    .setEndTime(song.formattedDuration);

  // Build the card and save it as musicard.png
  const cardBuffer = await card.build();
  fs.writeFileSync(`musicard.png`, cardBuffer);

  // Create the button components
  const pauseButton = new ButtonBuilder()
    .setCustomId("pause")
    .setLabel("Pause")
    .setEmoji("<:pause:1208762825414148096>")
    .setStyle(ButtonStyle.Secondary);

  const resumeButton = new ButtonBuilder()
    .setCustomId("resume")
    .setLabel("Resume")
    .setEmoji("<:play:1208762781738729512>")
    .setStyle(ButtonStyle.Secondary);

  const skipButton = new ButtonBuilder()
    .setCustomId("skip")
    .setLabel("Skip")
    .setEmoji("<:nextbutton:1208764201527549962>")
    .setStyle(ButtonStyle.Secondary);

  const stopButton = new ButtonBuilder()
    .setCustomId("stop")
    .setLabel("Stop")
    .setEmoji("<:stopbutton:1208764554566172742>")
    .setStyle(ButtonStyle.Danger);

  const volumeUpButton = new ButtonBuilder()
    .setCustomId("volumeUp")
    .setLabel("Up")
    .setEmoji("🔊")
    .setStyle(ButtonStyle.Secondary);

  const volumeDownButton = new ButtonBuilder()
    .setCustomId("volumeDown")
    .setLabel("Down")
    .setEmoji("🔉")
    .setStyle(ButtonStyle.Secondary);

  const repeatButton = new ButtonBuilder()
    .setCustomId("repeat")
    .setLabel("Repeat")
    .setEmoji("🔁")
    .setStyle(ButtonStyle.Secondary);

  const shuffleButton = new ButtonBuilder()
    .setCustomId("shuffle")
    .setLabel("Shuffle")
    .setEmoji("🔀")
    .setStyle(ButtonStyle.Secondary);

  const autoplayButton = new ButtonBuilder()
    .setCustomId("autoplay")
    .setLabel("Autoplay")
    .setEmoji("▶️")
    .setStyle(ButtonStyle.Secondary);

  const loopButton = new ButtonBuilder()
    .setCustomId("loop")
    .setLabel("Loop")
    .setEmoji("🔁")
    .setStyle(ButtonStyle.Secondary);

  const playlistButton = new ButtonBuilder()
    .setCustomId("playlist")
    .setLabel("Playlist")
    .setEmoji("📜")
    .setStyle(ButtonStyle.Secondary);

  // Create action row components
  const row1 = new ActionRowBuilder()
    .addComponents(pauseButton, resumeButton, skipButton, stopButton,autoplayButton);

  const row2 = new ActionRowBuilder()
    .addComponents(volumeUpButton, volumeDownButton, shuffleButton, playlistButton, loopButton);

  //const row3 = new ActionRowBuilder()
    //.addComponents( );

  // Send the music card along with the playSong event
  queue.textChannel.send({
    components: [row1, row2 ],
    files: [`musicard.png`], // Send the saved music card image as a file
  }).then((message) => {
    queue.currentMessage = message;
  });
}

client.distube.on('playSong', async (queue, song) => {
  if (queue.currentMessage) {
    queue.currentMessage.delete().catch(console.error);
    queue.currentMessage = undefined;
  }

  // Send the music card
  await sendMusicCard(queue, song);
})
.on('addSong', (queue, song) => {
  queue.textChannel.send(`🎶 Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`);
})
.on('addList', (queue, playlist) => {
  queue.textChannel.send(`🎶 Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`);
})
.on('error', (channel, e) => {
  console.error(e);
})
.on('empty', (channel) => {
  channel.send('⛔ Voice channel is empty! Leaving the channel...');
})
.on('searchNoResult', (message, query) => {
  message.channel.send(`⛔ No result found for \`${query}\`!`);
})
.on('finish', (queue) => {
  const qf = new EmbedBuilder()
    .setColor(`#4a9ffa`)
    .setDescription(`> :white_check_mark: The Song is Over!`)
  queue.textChannel.send({ embeds: [qf] }).then((message) => {
    queue.currentMessage = message; 
  });
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  const filter = (i) => [
    "pause", "resume", "skip", "stop", "volumeUp", "volumeDown",
    "shuffle", "repeat", "autoplay", "loop", "playlist"
  ].includes(i.customId) && i.user.id === interaction.user.id;

  if (filter(interaction)) {
    const queue = client.distube.getQueue(interaction.guildId);
    if (!queue) return;

    // Existing button actions
    if (interaction.customId === "pause") {
        client.distube.pause(interaction.guild);
        await interaction.update({ content: "⏸ Music paused." });
      } else if (interaction.customId === "resume") {
        if (!queue.pause) {
          await interaction.update({ content: "▶️ Music is not paused.", ephemeral: true });
        } else {
          client.distube.resume(interaction.guild);
          await interaction.update({ content: "▶️ Music resumed." });
        }
      } else if (interaction.customId === "skip") {
        if (queue.songs.length <= 1) {
          await interaction.update({ content: "⚠️ Not enough songs in the queue to skip.", ephemeral: true });
        } else {
          client.distube.skip(interaction.guild);
          await interaction.update({ content: "⏭️ Song skipped." });
        }
      } else if (interaction.customId === "stop") {
        client.distube.stop(interaction.guild);
        await interaction.update({ content: "⏹️ Music stopped." });
      } else if (interaction.customId === "volumeUp") {
        if (queue.volume >= 100) {
          await interaction.update({ content: "🔊 Volume is already at maximum (100%)" });
        } else {
          const newVolume = Math.min(queue.volume + 10, 100);
          client.distube.setVolume(interaction.guild, newVolume);
          await interaction.update({ content: `🔊 Volume increased to ${newVolume}%` });
        }
      } else if (interaction.customId === "volumeDown") {
        if (queue.volume <= 0) {
          await interaction.update({ content: "🔉 Volume is already at minimum (0%)" });
        } else {
          const newVolume = Math.max(queue.volume - 10, 0);
          client.distube.setVolume(interaction.guild, newVolume);
          await interaction.update({ content: `🔉 Volume decreased to ${newVolume}%` });
        }
      } else if (interaction.customId === "shuffle") {
        if (!queue.songs.length || queue.songs.length === 1) {
          await interaction.update({ content: "⚠️ Not enough songs in the queue to shuffle." });
        } else {
          client.distube.shuffle(interaction.guild);
          await interaction.update({ content: "🔀 Queue shuffled." });
        }
      } else if (interaction.customId === "repeat") {
        if (!queue.songs.length) {
          await interaction.update({ content: "⚠️ No songs in the queue to repeat." });
        } else {
          const repeatMode = queue.repeatMode;
          client.distube.setRepeatMode(interaction.guild, repeatMode === 0 ? 1 : 0);
          await interaction.update({ content: `🔁 Repeat mode set to ${repeatMode === 0 ? "queue" : "off"}` });
        }
      }
    // Autoplay button action
    else if (interaction.customId === "autoplay") {
      const newAutoplay = !queue.autoplay;
      client.distube.setAutoplay(interaction.guild, newAutoplay);
      await interaction.update({ content: `Autoplay ${newAutoplay ? "enabled" : "disabled"}` });
    }

    // Loop button action
    else if (interaction.customId === "loop") {
      const newLoopMode = queue.repeatMode === 0 ? 1 : 0;
      client.distube.setRepeatMode(interaction.guild, newLoopMode);
      await interaction.update({ content: `Loop ${newLoopMode === 0 ? "disabled" : "enabled"}` });
    }

    // Playlist button action
    else if (interaction.customId === "playlist") {
      const currentPlaylist = queue.songs.map(song => `• ${song.name}`).join('\n');
      await interaction.update({ content: `Current Playlist:\n${currentPlaylist}` });
    }
  }
});
