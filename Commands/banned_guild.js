const BLOCKED_GUILD_IDS = [
  '991720990096773191',
];

if (BLOCKED_GUILD_IDS.includes(context.params.event.guild.id)) {
  //Direct to leave guild here.
}
