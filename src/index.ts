////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                      Types                                                     //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// A note can either be representation by its string notation, or by an index between 0 and 11
export type Note = StringNote | number;

export type Chord = {
  name: string | undefined;
  root: Note;
  bass: Note;
  interval: Note[];
};

type StringNote =
  | "C"
  | "C# / Db"
  | "D"
  | "D# / Eb"
  | "E"
  | "F"
  | "F# / Bb"
  | "G"
  | "G# / Ab"
  | "A"
  | "A# / Bb"
  | "B";

type NoteMapping = StringNote[];

// Chord intervals are a mapping of strings (eg. '0 4 7') and its corresponding chord `name` and `root` note in the chord
type IntervalMapping = {
  [k: string]: {
    name: string;
    rootOffset: number;
  };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                   Constants                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Mapping of number to note (via array index)
 */
const NOTE_MAPPINGS: NoteMapping = [
  "C",
  "C# / Db",
  "D",
  "D# / Eb",
  "E",
  "F",
  "F# / Bb",
  "G",
  "G# / Ab",
  "A",
  "A# / Bb",
  "B",
];

/**
 * Mapping of interval to chord name
 */
const RELATIVE_INTERVALS: IntervalMapping = {
  "0 3": { name: "Minor", rootOffset: 0 },
  "0 4": { name: "Major", rootOffset: 0 },

  "0 2 7": { name: "Suspended 2", rootOffset: 0 },
  "0 3 6 10": { name: "Half-diminished 7", rootOffset: 0 },
  "0 3 6 9": { name: "Diminished 7", rootOffset: 0 },
  "0 3 6": { name: "Diminished", rootOffset: 0 },
  "0 3 7 10": { name: "Minor 7", rootOffset: 0 },
  "0 3 7 11": { name: "Minor-major 7", rootOffset: 0 },
  "0 3 7 9": { name: "Minor 6", rootOffset: 0 },
  "0 3 7": { name: "Minor", rootOffset: 0 },
  "0 4 10": { name: "7", rootOffset: 0 },
  "0 4 11": { name: "Major 7", rootOffset: 0 },
  "0 4 5 7": { name: "Add 11", rootOffset: 0 },
  "0 4 6": { name: "Flat 5", rootOffset: 0 },
  "0 4 7 10": { name: "Dominant 7", rootOffset: 0 },
  "0 4 7 11": { name: "Major 7", rootOffset: 0 },
  "0 4 7 9": { name: "Major 6", rootOffset: 0 },
  "0 4 7": { name: "Major", rootOffset: 0 },
  "0 4 8 10": { name: "Augmented 7", rootOffset: 0 },
  "0 4 8": { name: "Augmented", rootOffset: 0 },
  "0 5 7": { name: "Suspended 4", rootOffset: 0 },

  // 2nd inversions
  "0 5 8": { name: "Minor", rootOffset: 5 },
  "0 5 9": { name: "Major", rootOffset: 5 },

  // 1st inversions
  "0 4 9": { name: "Minor", rootOffset: 9 },
  "0 3 8": { name: "Major", rootOffset: 8 },

  // NOTE: these 7th chord match because we are normalizing notes to a single octave
  "0 1 5": { name: "Major 7", rootOffset: 1 },
  "0 2 6": { name: "Major 7", rootOffset: 2 },
  "0 4 5": { name: "5 Major 7", rootOffset: 5 },

  // chords identified during permutation tests
  "0 1 2": { name: "No 3 7/Maj7", rootOffset: 2 },
  "0 1 3": { name: "Minor Add Flat 9", rootOffset: 0 },
  "0 1 6": { name: "Sharp 5 Sharp 11", rootOffset: 6 },
  "0 1 7": { name: "5 Add Flat 9", rootOffset: 0 },
  "0 1 8": { name: "5 Major 7", rootOffset: 1 },
  "0 1 9": { name: "Sharp 9", rootOffset: 9 },
  "0 2 3": { name: "Minor Add 9", rootOffset: 2 },
  "0 2 4": { name: "Add 9", rootOffset: 0 },
  "0 2 5": { name: "Minor 7", rootOffset: 2 },
  "0 2 8": { name: "Flat 5", rootOffset: 9 },
  "0 2 9": { name: "5 7", rootOffset: 2 },
  "0 3 10": { name: "Minor 7", rootOffset: 0 },
  "0 3 4": { name: "Sharp 9", rootOffset: 0 },
  "0 3 5": { name: "5 7", rootOffset: 5 },
  "0 3 9": { name: "Minor 6", rootOffset: 0 },
  "0 5 10": { name: "Sus 2", rootOffset: 10 },
  "0 5 6": { name: "5 Add Flat 9", rootOffset: 5 },
  "0 6 10": { name: "Flat 5", rootOffset: 6 },
  "0 6 7": { name: "5 Sharp 11", rootOffset: 0 },
  "0 6 8": { name: "7", rootOffset: 8 },
  "0 6 9": { name: "Minor 6", rootOffset: 9 },
  "0 7 10": { name: "5 7", rootOffset: 0 },
  "0 7 8": { name: "Major 7", rootOffset: 8 },
  "0 7 9": { name: "Minor 7", rootOffset: 9 },
  "0 8 10": { name: "Add 9", rootOffset: 8 },
  "0 9 10": { name: "Minor Add Flat 9", rootOffset: 9 },
  "0 2 10": { name: "Add 9", rootOffset: 10 },
  "0 1 10": { name: "Minor Add 9", rootOffset: 10 },
  "0 10 11": { name: "No 3 7/Maj7", rootOffset: 0 },
  "0 9 11": { name: "Minor Add 9", rootOffset: 9 },
  "0 8 11": { name: "Sharp 9", rootOffset: 8 },
  "0 7 11": { name: "5 Major 7", rootOffset: 0 },
  "0 5 11": { name: "5 Sharp 11", rootOffset: 5 },
  "0 2 11": { name: "Minor Add Flat 9", rootOffset: 11 },
  "0 1 11": { name: "No 3 7/Maj7", rootOffset: 1 },

  // Some chords have a rootOffset note that isn't actually included in the relative note sequence. For example, 0 1 4 has a
  // relative note that is 9 half-steps greater than the note at index 0
  "0 1 4": { name: "Sharp 9", rootOffset: 9 },
  "0 8 9": { name: "Sharp 9", rootOffset: 5 },
  "0 6 11": { name: "7/13", rootOffset: 2 },
  "0 3 11": { name: "Sharp 9", rootOffset: 8 },
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                   Functions                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Given a sequence of notes, determine the chord name
 *
 * @param ns array of note numbers
 * @returns string representation of chord name
 */
export function identify(notes: Note[]): Chord {
  // Convert note letters to numbers if `string[]` is provided
  const numbers = notes.map((v) =>
    typeof v === "number" ? v : NOTE_MAPPINGS.indexOf(v as StringNote)
  );

  // Throw an error if any negative numbers exist
  if (numbers.some((n) => n < 0)) {
    throw new Error("Unsupported note letter or number provided");
  }

  // The lowest note in the octave is used to calculate the root note of the chord using the `chord.rootOffset`
  const bassNote = numbers.sort((a, b) => a - b)[0] % 12;

  // Compute the non-duplicate notes relative to the lowest note being played. If D, F, A, D is played, then the
  // relative note sequence would be 0, 3, 7, and the octave notes would be 2, 5, 9
  const relativeNotes = [
    ...new Set(numbers.map((n) => (n - bassNote) % 12).sort((a, b) => a - b)),
  ];

  // Get the chord name from the mapping table
  const chord = RELATIVE_INTERVALS[relativeNotes.join(" ")];

  if (!chord) {
    return {
      name: undefined,
    } as Chord;
  } else {
    // Determine the root note name. For example, in the 2nd-inversion interval 0, 5, 8, the root note is the 5th note
    // in the inverval. We need to determine which note in the octave exists at index 0, and then add 5 to that. So if
    // the note interval is E, A, C, then E + 5 half steps is A, making the chord A Minor. This logic would be more
    // simple, but there exist chord intervals in which the root note does not exist within the interval. For example,
    // interval 0, 1, 4 has a root note at index 9. Where, E, F, Ab has a root note of Db; making the chord Db #9.
    const rootIndex = (bassNote + chord.rootOffset) % 12;
    const rootLetter: string = NOTE_MAPPINGS[rootIndex];

    return {
      name: `${rootLetter} ${chord.name}`,
      interval: relativeNotes,
      root: rootIndex,
    } as Chord;
  }
}
