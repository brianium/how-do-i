#How Do I?

Yell at a computer until it shows you something maybe useful.

How Do I? uses the SpeechRecognition API available in current versions of chrome
to query the YouTube API.

Simply login and ask:

```
How do I <insert something here>
```

Currently supports 1 match and is suuuuuuper slow, but computers are fun.

## Setup

```
$ npm i
```

## Tests

Tests are written using [Jest](https://facebook.github.io/jest/).

```
$ npm test
```

## Running the app

The app uses browser-sync in dev. Just issue the following to commence yelling at a computer:

```
$ npm start
```

## Motivation

I wanted an excuse to apply some functional programming using ES6 features. Wanted to keep things
to native APIs with the exception of lodash and cookies-js. It also sounded like a lot of fun to ask a browser "how do I bake cookies?", and get something useful out of that endeavor.
