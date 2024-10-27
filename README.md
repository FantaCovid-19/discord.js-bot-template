# Discord Bot Template - README.md

<div align="center">

[![GitHub Version](https://img.shields.io/github/package-json/v/FantaCovid-19/discord.js-bot-template?style=for-the-badge)](https://github.com/FantaCovid-19/discord.js-bot-template/releases)
[![wakatime](https://wakatime.com/badge/user/2ff52a7b-bf60-45e7-b004-0a240c2318ea/project/4e209049-e623-4390-b542-3d4ab8f8c5fe.svg?style=for-the-badge)](#table-of-contents)

[![GitHub License](https://img.shields.io/github/license/FantaCovid-19/discord.js-bot-template?style=for-the-badge)](https://github.com/FantaCovid-19/discord.js-bot-template/blob/main/LICENSE)
[![GitHub Issues](https://img.shields.io/github/issues/FantaCovid-19/discord.js-bot-template?style=for-the-badge)](https://github.com/FantaCovid-19/discord.js-bot-template/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/FantaCovid-19/discord.js-bot-template?style=for-the-badge)](https://github.com/FantaCovid-19/discord.js-bot-template/pulls)

</div>

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [Authors](#authors)

## Description

This is a template for a Discord bot. It is written in Javascript and uses the discord.js library. This template is designed to be a starting point for creating a new Discord bot. It includes a basic command handler and example commands.

## Installation

1. Clone the repository

  ```bash
  git clone https://github.com/FantaCovid-19/discord.js-bot-template.git
  ```

2. Install the dependencies

  ```bash
  npm install
  ```

  or

  ```bash
  yarn install
  ```

3. Create a `.env` file in the root directory of the project and add your bot token and any other configuration variables.

  ```environment
  # Discord Configuration
  DISCORD_TOKEN="your-bot-token"

  # Github Configuration
  GITHUB_TOKEN="your-github-token"
  GITHUB_REPO="your-github-repo"
  ```

4. Start the bot

  ```bash
  npm start
  ```

  or

  ```bash
  yarn start
  ```

## Usage

The default command prefix is `!`. You can change this in the `config.json` file.

To create a new command, create a new file in the `commands` directory with the following template:

```javascript
/** @type {import('@types/CommandType')} */
module.exports = {
  name: '',
  description: '',
  cooldown: 0,
  category: '',
  botPermissions: [],
  userPermissions: [],
  command: {
    enabled: true,
    aliases: [],
    usage: '',
    minArgsCount: 0,
    subCommands: [],
  },
  slashCommand: {
    enabled: true,
    ephemeral: false,
    options: [],
  },
  messageExecute: (_message, _args, _data) => {
    throw new Error('messageExecute function not implemented');
  },
  interactionExecute: (_interaction, _data) => {
    throw new Error('interactionExecute function not implemented');
  },
};
```

To create a new context menu, create a new file in the `contexts` directory with the following template:

```javascript
/** @type {import('@types/ContextType')} */
module.exports = {
  name: '',
  description: '',
  type: '',
  enabled: true,
  ephemeral: false,
  userPermissions: [],
  cooldown: 0,
  execute: (_interaction) => {
    throw new Error('execute function not implemented');
  },
};
```

To create a new event, create a new file in the `events` directory with the following template:

```javascript
/** @type {import('@types/EventType')} */
module.exports = {
  name: '',
  enabled: true,
  once: false,
  execute: async (_client, ..._args) => {
    throw new Error('execute function not implemented');
  },
};
```

## Acknowledgements

- [discord.js](https://discord.js.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)

## Authors

- [FantaCovid-19](https://github.com/FantaCovid-19)

## Contributing

If you would like to contribute to this project, please open an issue or a pull request.
