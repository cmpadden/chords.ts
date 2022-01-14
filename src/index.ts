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
  })
);

type Note = string | number;

type Chord = {
  notes: Note[];
  name: string | undefined;
};

// TODO: determine if I want to go the OOP route, and create a `Chord` object
// with a constructor that takes in notes, and populates properties like
// `.name`

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

/**
 * Identify if a chord interval is a first inversion
 */
function isFirstInversion(notes: Note[]): boolean {
  return notes.includes(0) && notes.includes(4) && notes.includes(9);
}

/**
 * Identify if a chord interval is a second inversion
 */
function isSecondInversion(notes: Note[]): boolean {
  return notes.includes(0) && notes.includes(5) && notes.includes(9);
}

/**
 * Given a sequence of notes, determine the chord name
 *
 * @param ns array of note numbers
 * @returns string representation of chord name
 */
export function identify(ns: Note[]): Chord {
  // convert note letters to numbers if `string[]` is provided
  let notes = ns.map((v) =>
    typeof v === "number" ? v : NOTE_MAPPINGS.indexOf(v)
  );

  // do not allow negative numbers
  if (notes.some((n) => n < 0)) {
    throw new Error("Unsupported note letter or number provided");
  }

  // starting with the bass note of the chord, determine the chord shape.
  // For example, a C-major chord will have a bass note of C, and a shape
  // of [0, 4, 7].

  let normalizedNotes = relativeNotes(notes);

  // bass note will be used to determine the non-relative letter of the
  // chord, and will be modified if the chord is an inversion
  let bassNote: number = Math.min.apply(Math, notes);

  // Re-arrange the chord-inversion and update the bass note if notes include 0, 4, and 9
  if (isFirstInversion(normalizedNotes)) {
    normalizedNotes[normalizedNotes.indexOf(0)] = 0 + 12;
    normalizedNotes[normalizedNotes.indexOf(4)] = 4 + 12;
    normalizedNotes = relativeNotes(normalizedNotes); // re-normalize notes

    // update bass note
    bassNote = bassNote + 9;
  }

  // Re-arrange the chord-inversion and update the bass note if notes include 0, 5, and 9
  // IMPORTANT: Need to also include 0, 5, 8 for minor inversions, but this breaks sus4
  if (isSecondInversion(normalizedNotes)) {
    normalizedNotes[normalizedNotes.indexOf(0)] = 0 + 12;
    normalizedNotes = relativeNotes(normalizedNotes); // re-normalize notes

    // update bass note
    bassNote = bassNote + 5;
  }

  const bassNoteLetter: string = NOTE_MAPPINGS[bassNote % 12];

  const chord = CHORD_MAPPINGS.get(normalizedNotes.join(" "));

  return {
    name: chord ? `${bassNoteLetter} ${chord}` : undefined,
    notes: normalizedNotes,
  } as Chord;
}
