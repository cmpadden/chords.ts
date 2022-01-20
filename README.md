<div align="center">

![chords ts](https://user-images.githubusercontent.com/5807118/149641313-4e6abbb0-b49c-4645-8d50-67f7ced3b92c.png)

![License](https://img.shields.io/npm/l/chords.ts)
[![Test](https://github.com/cmpadden/chords.ts/workflows/Test/badge.svg)](https://github.com/cmpadden/chords.ts/actions)
[![npm](https://img.shields.io/npm/v/chords.ts)](https://www.npmjs.com/package/chords.ts)

_This software is in the alpha stage of development and is subject to change!_

</div>

## Goal

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
identify(["E", "F# / Gb", "A"]).name;
// => 'F# / Gb Minor 7'
```

## How It Works

Note intervals are determined relative to the lowest note being played. For
example, the notes `E, G#, and B` have the note interval `0, 4, 7`. This
interval is used to find the associated chord name in a lookup table. In this
case, the interval maps to a Major chord, with a root note at 0, identified as
the chord _E Major_. To reduce the number of possible note-permutations,
duplicates are removed in other octaves: `E, G#, B, E` is identical to `E, G#,
B` and is also identified as an _E Major_ chord.

The repeating pattern of note intervals allows us to drastically reduce the
number of possible note permutations. If it weren't for this pattern, there
would be 220 possible permutations of 3-note chords within a 12 note scale: for
12 elements (`n=12`), take 3 (`k=3`), using the equation `n! / k!(n - k)!`.

## Improvements

- Instead of saying a chord is `G# / Ab` it would be better to differentiate
  between the two. See [this link](https://music.stackexchange.com/a/52209) on
  StackExchange for more context.

## Contributions

Contributions & collaboration are very much welcome. This is meant to be a fun
side-project that stemmed from an interest in how the chord-identifier works in
Logic Pro. This initial prototype is likely a naive solution, and
recommendations for alternative approaches are most definitely welcome!
