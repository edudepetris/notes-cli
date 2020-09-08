notes-cli
=========



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/notes-cli.svg)](https://npmjs.org/package/notes-cli)
[![CircleCI](https://circleci.com/gh/edudepetris/notes-cli/tree/master.svg?style=shield)](https://circleci.com/gh/edudepetris/notes-cli/tree/master)
[![Codecov](https://codecov.io/gh/edudepetris/notes-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/edudepetris/notes-cli)
[![Downloads/week](https://img.shields.io/npm/dw/notes-cli.svg)](https://npmjs.org/package/notes-cli)
[![License](https://img.shields.io/npm/l/notes-cli.svg)](https://github.com/edudepetris/notes-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g notes-cli
$ notes COMMAND
running command...
$ notes (-v|--version|version)
notes-cli/0.0.1 darwin-x64 node-v12.18.0
$ notes --help [COMMAND]
USAGE
  $ notes COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`notes help [COMMAND]`](#notes-help-command)
* [`notes init`](#notes-init)

## `notes help [COMMAND]`

display help for notes

```
USAGE
  $ notes help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `notes init`

Create an empty Notes repository or reinitialize an existing one.

```
USAGE
  $ notes init

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/init.ts](https://github.com/edudepetris/notes-cli/blob/v0.0.1/src/commands/init.ts)_
<!-- commandsstop -->
