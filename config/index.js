/** @type {import('@types/ConfigType')} */
module.exports = {
  OwnerID: [],
  SupportServer: '',
  checkUpdates: true,
  PrefixCommand: {
    enabled: true,
    defaultPrefix: '!',
  },
  Interaction: {
    SlashCommands: true,
    ContextMenu: true,
    GlobalRegister: true,
    GuildRegister: [],
  },
  Presence: {
    enabled: true,
    activity: '',
    type: '',
    status: '',
    name: '',
    url: '',
  },
};
