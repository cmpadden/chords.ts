<div align="center">

![chords ts](https://user-images.githubusercontent.com/5807118/149641313-4e6abbb0-b49c-4645-8d50-67f7ced3b92c.png)

![License](https://img.shields.io/npm/l/chords.ts)
[![Test](https://github.com/cmpadden/chords.ts/workflows/Test/badge.svg)](https://github.com/cmpadden/chords.ts/actions)
[![npm](https://img.shields.io/npm/v/chords.ts)](https://www.npmjs.com/package/chords.ts)

_This software is in the alpha stage of development and is subject to change!_

</div>

## Objective

This library provides a way to identify chord names, and the associated root
note, given a sequence of MIDI notes or note intervals. The current
implementation can identify all 2- and 3-note permutations along with some
popular chords.

If you have a MIDI keyboard attached to your computer, you can interact with a
demo of this library at https://cmpadden.github.io/playground/chords

## Usage

```ts
import { identify } from "chords.ts";

// Identify a sequence of MIDI notes
identify([48, 52, 55]).name;
// => 'C Major'

// Identify a sequence note letters
identify(["E", "A", "C"]).name;
// => 'A Minor'
```

## References

- [MIDI Note Number Mappings](http://www.somascape.org/midi/basic/notes.html)
- [Wikipedia: Chord Examples](<https://en.wikipedia.org/wiki/Chord_(music)#Examples>)
- [Article: How Many Possible Chords Are There?](https://arthurfoxmusic.com/how-many-possible-chords/)

## Contributions

Contributions & collaboration are very much welcome. This is meant to be a fun
side-project that stemmed from an interest in how the chord-identifier works in
Logic Pro. This initial prototype is likely a naive solution, and
recommendations for alternative approaches are most definitely welcome!
