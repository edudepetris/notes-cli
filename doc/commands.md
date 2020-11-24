Usage and Commands
=========

### Usage
```sh-session
$ npm install -g devnotes-cli
```

### Commands
* [`notes help [COMMAND]`](#notes-help-command)
* [`notes init`](#notes-init)
* [`notes login`](#notes-login)
* [`notes logout`](#notes-logout)
* [`notes push`](#notes-push)

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

_See code: [src/commands/init.ts](https://github.com/edudepetris/notes-cli/blob/v0.0.2/src/commands/init.ts)_

## `notes login`

login with yours Devnotes credentials

```
USAGE
  $ notes login

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/login.ts](https://github.com/edudepetris/notes-cli/blob/v0.0.2/src/commands/login.ts)_

## `notes logout`

clears local login credentials and invalidates API session

```
USAGE
  $ notes logout

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/logout.ts](https://github.com/edudepetris/notes-cli/blob/v0.0.2/src/commands/logout.ts)_

## `notes push`

describe the command here

```
USAGE
  $ notes push

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/push.ts](https://github.com/edudepetris/notes-cli/blob/v0.0.2/src/commands/push.ts)_
<!-- commandsstop -->
