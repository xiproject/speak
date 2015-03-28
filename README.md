# Speak

This is the text to speech agent for [Zeus](http://xiproject.github.io/zeus).

## Installation

Clone the repo, `cd` into it and run `npm install`.

## Run

```sh
$ node index.js --logfile speak.log 2>&1 | bunyan
```
## Usage
- To change the TTS implementation, set `use` to true for that implementation in `config.json`.

## Caveats

- On OS X, `speak` uses the built in voices.
- On Linux, `speak` uses Festival if it is installed. If not, you can opt-in to using Google TTS which requires VLC to be installed.
