//
// TODOs
// - determine if I want to go the OOP route, and create a `Chord` object with a constructor that takes in notes, and populates properties like `.name`
// - separate chord name and root note { name: 'Suspended 2', root: 'C' }

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
const CHORD_MAPPINGS = new Map<string, string>(
  Object.entries({
    "0 2 7": "Suspended 2",
    "0 3 6 10": "Half-diminished 7th",
    "0 3 6 9": "Diminished 7th",
    "0 3 6": "Diminished",
    "0 3 7 10": "Minor 7th",
    "0 3 7 11": "Minor-major 7th",
    "0 3 7 9": "Minor 6th",
    "0 3 7": "Minor",
    "0 4 11": "Major 7th",
    "0 4 5 7": "Add 11",
    "0 4 6": "Flat 5th",
    "0 4 7 10": "Dominant 7th",
    "0 4 7 11": "Major 7th",
    "0 4 7 9": "Major 6th",
    "0 4 7": "Major",
    "0 4 8 10": "Augmented 7th",
    "0 4 8": "Augmented",
    "0 5 7": "Suspended 4",

    // inverted chords
    "0 5 8": "2nd Inversion Minor",
    "0 5 9": "2nd Inversion Major",
    "0 4 9": "1st Inversion Minor",
    "0 3 8": "1st Inversion Major",
  })
);

export type Note = string | number;

export type Chord = {
  name: string | undefined;
  root: Note;
  notes: Note[];
};

/**
 * Normalize a list of notes relative to the lowest note in the list
 * @param notes array of note numbers
 * @returns Non-duplicate relative note numbers to lowest note
 */
export function relativeNotes(notes: number[]): number[] {
  const lowestNote: number = Math.min.apply(Math, notes);
  const dupedNotes: number[] = notes.map((n) => {
    const relativeNote = n - lowestNote;
    if (relativeNote >= 12) {
      return relativeNote % 12;
    } else {
      return relativeNote;
    }
  });
  // remove duplicates as we removed octaves with mod 12
  return [...new Set(dupedNotes)].sort((a, b) => a - b);
}

export function isFirstInversion(notes: number[]): boolean {
  const invMajor = notes.includes(0) && notes.includes(4) && notes.includes(9);
  const invMinor = notes.includes(0) && notes.includes(3) && notes.includes(8);
  return invMajor || invMinor;
}

export function isSecondInversion(notes: number[]): boolean {
  const invMajor = notes.includes(0) && notes.includes(5) && notes.includes(9);
  const invMinor = notes.includes(0) && notes.includes(5) && notes.includes(8);
  return invMajor || invMinor;
}

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

  // Normalize the index of the note to the lowest note in the sequence,
  // removing octave duplicates. For example, a C-major chord will have a bass
  // note of C, and a shape of [0, 4, 7]
  let normalizedNotes = relativeNotes(noteNumbers);

  // TODO: determine a better way of handling chord inversions
  let root = Math.min.apply(Math, noteNumbers) % 12;
  if (isFirstInversion(normalizedNotes)) {
    root = 9;
  } else if (isSecondInversion(normalizedNotes)) {
    root = 5;
  }
  const rootLetter: string = NOTE_MAPPINGS[root % 12];

  // Get the chord name from the mapping table
  const chord = CHORD_MAPPINGS.get(normalizedNotes.join(" "));

  return {
    name: chord ? `${rootLetter} ${chord}` : undefined,
    notes: normalizedNotes,
  } as Chord;
}
