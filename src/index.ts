// TODOs
// - determine if I want to go the OOP route, and create a `Chord` object with a constructor that takes in notes, and populates properties like `.name`
// - separate chord name and root note { name: 'Suspended 2', root: 'C' }
//

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                      Types                                                     //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type Note = string | number;

export type Chord = {
  name: string | undefined;
  root: Note;
  bass: Note;
  interval: Note[];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                   Constants                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Mapping of number to note (via array index)
 */
const NOTE_MAPPINGS = [
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
const RELATIVE_INTERVALS = new Map<string, { name: string; root: number }>(
  Object.entries({
    "0 3": { name: "Minor", root: 0 },
    "0 4": { name: "Major", root: 0 },

    "0 2 7": { name: "Suspended 2", root: 0 },
    "0 3 6 10": { name: "Half-diminished 7", root: 0 },
    "0 3 6 9": { name: "Diminished 7", root: 0 },
    "0 3 6": { name: "Diminished", root: 0 },
    "0 3 7 10": { name: "Minor 7", root: 0 },
    "0 3 7 11": { name: "Minor-major 7", root: 0 },
    "0 3 7 9": { name: "Minor 6", root: 0 },
    "0 3 7": { name: "Minor", root: 0 },
    "0 4 10": { name: "7", root: 0 },
    "0 4 11": { name: "Major 7", root: 0 },
    "0 4 5 7": { name: "Add 11", root: 0 },
    "0 4 6": { name: "Flat 5", root: 0 },
    "0 4 7 10": { name: "Dominant 7", root: 0 },
    "0 4 7 11": { name: "Major 7", root: 0 },
    "0 4 7 9": { name: "Major 6", root: 0 },
    "0 4 7": { name: "Major", root: 0 },
    "0 4 8 10": { name: "Augmented 7", root: 0 },
    "0 4 8": { name: "Augmented", root: 0 },
    "0 5 7": { name: "Suspended 4", root: 0 },

    // 2nd inversions
    "0 5 8": { name: "Minor", root: 5 },
    "0 5 9": { name: "Major", root: 5 },

    // 1st inversions
    "0 4 9": { name: "Minor", root: 9 },
    "0 3 8": { name: "Major", root: 8 },

    // NOTE: these 7th chord match because we are normalizing notes to a single octave
    "0 1 5": { name: "Major 7", root: 1 },
    "0 2 6": { name: "Major 7", root: 2 },
    "0 4 5": { name: "5 Major 7", root: 5 },
  })
);

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
  const noteNumbers = notes.map((v) =>
    typeof v === "number" ? v : NOTE_MAPPINGS.indexOf(v)
  );

  // Throw an error if any negative numbers exist
  if (noteNumbers.some((n) => n < 0)) {
    throw new Error("Unsupported note letter or number provided");
  }

  // Notes relative to a single octave sorted and with duplicates removed (C major would be 0, 4, 7, and D Major would be 2, 6, 9)
  const singleOctaveNotes = [
    ...new Set(noteNumbers.map((n) => n % 12).sort((a, b) => a - b)),
  ];

  // Relative note interval (C Major and a D Major would both be 0, 4, 7)
  const relativeNotes = singleOctaveNotes.map(
    (n) => n - Math.min.apply(Math, singleOctaveNotes)
  );

  // Get the chord name from the mapping table
  const chord = RELATIVE_INTERVALS.get(relativeNotes.join(" "));

  let rootIndex = 0;
  if (chord) {
    // TODO - better describe how the mamping of relative note root is used to get the octave note
    rootIndex = singleOctaveNotes[relativeNotes.indexOf(chord.root)];
  }

  const rootLetter: string = NOTE_MAPPINGS[rootIndex];

  return {
    name: chord ? `${rootLetter} ${chord.name}` : undefined,
    interval: relativeNotes,
    root: rootIndex,
  } as Chord;
}
