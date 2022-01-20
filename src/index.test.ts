import { Note, identify } from "./index";

describe("identify", () => {
  const combinations = [
    // 3-note permutations

    // 0

    { notes: [0, 1, 2], name: "D No 3 7 Major 7" },
    { notes: [0, 1, 3], name: "C Minor Add Flat 9" },
    { notes: [0, 1, 4], name: "A Sharp 9" },
    { notes: [0, 1, 5], name: "C# / Db Major 7" },
    { notes: [0, 1, 6], name: "F# / Bb 5 Sharp 11" },
    { notes: [0, 1, 7], name: "C 5 Add Flat 9" },
    { notes: [0, 1, 8], name: "C# / Db 5 Major 7" },
    { notes: [0, 1, 9], name: "A Sharp 9" },
    { notes: [0, 1, 10], name: "A# / Bb Minor Add 9" },
    { notes: [0, 1, 11], name: "C# / Db No 3 7 Major 7" },

    { notes: [0, 2, 3], name: "C Minor Add 9" },
    { notes: [0, 2, 4], name: "C Add 9" },
    { notes: [0, 2, 5], name: "D Minor 7" },
    { notes: [0, 2, 6], name: "D Major 7" },
    { notes: [0, 2, 7], name: "C Suspended 2" },
    { notes: [0, 2, 8], name: "G# / Ab Flat 5" },
    { notes: [0, 2, 9], name: "D 5 7" },
    { notes: [0, 2, 10], name: "A# / Bb Add 9" },
    { notes: [0, 2, 11], name: "B Minor Add Flat 9" },

    { notes: [0, 3, 4], name: "C Sharp 9" },
    { notes: [0, 3, 5], name: "F 5 7" },
    { notes: [0, 3, 6], name: "C Diminished" },
    { notes: [0, 3, 7], name: "C Minor" },
    { notes: [0, 3, 8], name: "G# / Ab Major" },
    { notes: [0, 3, 9], name: "C Minor 6" },
    { notes: [0, 3, 10], name: "C Minor 7" },
    { notes: [0, 3, 11], name: "G# / Ab Sharp 9" },

    { notes: [0, 4, 5], name: "F 5 Major 7" },
    { notes: [0, 4, 6], name: "C Flat 5" },
    { notes: [0, 4, 7], name: "C Major" },
    { notes: [0, 4, 8], name: "C Augmented" },
    { notes: [0, 4, 9], name: "A Minor" },
    { notes: [0, 4, 10], name: "C 7" },
    { notes: [0, 4, 11], name: "C Major 7" },

    { notes: [0, 5, 6], name: "F 5 Add Flat 9" },
    { notes: [0, 5, 7], name: "C Suspended 4" },
    { notes: [0, 5, 8], name: "F Minor" },
    { notes: [0, 5, 9], name: "F Major" },
    { notes: [0, 5, 10], name: "A# / Bb Suspended 2" },
    { notes: [0, 5, 11], name: "F 5 Sharp 11" },

    { notes: [0, 6, 7], name: "C 5 Sharp 11" },
    { notes: [0, 6, 8], name: "G# / Ab 7" },
    { notes: [0, 6, 9], name: "A Minor 6" },
    { notes: [0, 6, 10], name: "F# / Bb Flat 5" },
    { notes: [0, 6, 11], name: "D 7/13" },

    { notes: [0, 7, 8], name: "G# / Ab Major 7" },
    { notes: [0, 7, 9], name: "A Minor 7" },
    { notes: [0, 7, 10], name: "C 5 7" },
    { notes: [0, 7, 11], name: "C 5 Major 7" },

    { notes: [0, 8, 9], name: "F Sharp 9" },
    { notes: [0, 8, 10], name: "G# / Ab Add 9" },
    { notes: [0, 8, 11], name: "G# / Ab Sharp 9" },

    { notes: [0, 9, 10], name: "A Minor Add Flat 9" },
    { notes: [0, 9, 11], name: "A Minor Add 9" },

    { notes: [0, 10, 11], name: "C No 3 7 Major 7" },

    // 1

    { notes: [1, 2, 3], name: "D# / Eb No 3 7 Major 7" },
    { notes: [1, 2, 4], name: "C# / Db Minor Add Flat 9" },
    { notes: [1, 2, 5], name: "A# / Bb Sharp 9" },
    { notes: [1, 2, 6], name: "D Major 7" },
    { notes: [1, 2, 7], name: "G 5 Sharp 11" },
    { notes: [1, 2, 8], name: "C# / Db 5 Add Flat 9" },
    { notes: [1, 2, 9], name: "D 5 Major 7" },
    { notes: [1, 2, 10], name: "A# / Bb Sharp 9" },
    { notes: [1, 2, 11], name: "B Minor Add 9" },

    { notes: [1, 3, 4], name: "C# / Db Minor Add 9" },
    { notes: [1, 3, 5], name: "C# / Db Add 9" },
    { notes: [1, 3, 6], name: "D# / Eb Minor 7" },
    { notes: [1, 3, 7], name: "D# / Eb Major 7" },
    { notes: [1, 3, 8], name: "C# / Db Suspended 2" },
    { notes: [1, 3, 9], name: "A Flat 5" },
    { notes: [1, 3, 10], name: "D# / Eb 5 7" },
    { notes: [1, 3, 11], name: "B Add 9" },

    { notes: [1, 4, 5], name: "C# / Db Sharp 9" },
    { notes: [1, 4, 6], name: "F# / Bb 5 7" },
    { notes: [1, 4, 7], name: "C# / Db Diminished" },
    { notes: [1, 4, 8], name: "C# / Db Minor" },
    { notes: [1, 4, 9], name: "A Major" },
    { notes: [1, 4, 10], name: "C# / Db Minor 6" },
    { notes: [1, 4, 11], name: "C# / Db Minor 7" },

    { notes: [1, 5, 6], name: "F# / Bb 5 Major 7" },
    { notes: [1, 5, 7], name: "C# / Db Flat 5" },
    { notes: [1, 5, 8], name: "C# / Db Major" },
    { notes: [1, 5, 9], name: "C# / Db Augmented" },
    { notes: [1, 5, 10], name: "A# / Bb Minor" },
    { notes: [1, 5, 11], name: "C# / Db 7" },

    { notes: [1, 6, 7], name: "F# / Bb 5 Add Flat 9" },
    { notes: [1, 6, 8], name: "C# / Db Suspended 4" },
    { notes: [1, 6, 9], name: "F# / Bb Minor" },
    { notes: [1, 6, 10], name: "F# / Bb Major" },
    { notes: [1, 6, 11], name: "B Suspended 2" },

    { notes: [1, 7, 8], name: "C# / Db 5 Sharp 11" },
    { notes: [1, 7, 9], name: "A 7" },
    { notes: [1, 7, 10], name: "A# / Bb Minor 6" },
    { notes: [1, 7, 11], name: "G Flat 5" },

    { notes: [1, 8, 9], name: "A Major 7" },
    { notes: [1, 8, 10], name: "A# / Bb Minor 7" },
    { notes: [1, 8, 11], name: "C# / Db 5 7" },

    { notes: [1, 9, 10], name: "F# / Bb Sharp 9" },
    { notes: [1, 9, 11], name: "A Add 9" },

    { notes: [1, 10, 11], name: "A# / Bb Minor Add Flat 9" },

    // 2

    { notes: [2, 3, 4], name: "E No 3 7 Major 7" },
    { notes: [2, 3, 5], name: "D Minor Add Flat 9" },
    { notes: [2, 3, 6], name: "B Sharp 9" },
    { notes: [2, 3, 7], name: "D# / Eb Major 7" },
    { notes: [2, 3, 8], name: "G# / Ab 5 Sharp 11" },
    { notes: [2, 3, 9], name: "D 5 Add Flat 9" },
    { notes: [2, 3, 10], name: "D# / Eb 5 Major 7" },
    { notes: [2, 3, 11], name: "B Sharp 9" },

    { notes: [2, 4, 5], name: "D Minor Add 9" },
    { notes: [2, 4, 6], name: "D Add 9" },
    { notes: [2, 4, 7], name: "E Minor 7" },
    { notes: [2, 4, 8], name: "E Major 7" },
    { notes: [2, 4, 9], name: "D Suspended 2" },
    { notes: [2, 4, 10], name: "A# / Bb Flat 5" },
    { notes: [2, 4, 11], name: "E 5 7" },

    { notes: [2, 5, 6], name: "D Sharp 9" },
    { notes: [2, 5, 7], name: "G 5 7" },
    { notes: [2, 5, 8], name: "D Diminished" },
    { notes: [2, 5, 9], name: "D Minor" },
    { notes: [2, 5, 10], name: "A# / Bb Major" },
    { notes: [2, 5, 11], name: "D Minor 6" },

    { notes: [2, 6, 7], name: "G 5 Major 7" },
    { notes: [2, 6, 8], name: "D Flat 5" },
    { notes: [2, 6, 9], name: "D Major" },
    { notes: [2, 6, 10], name: "D Augmented" },
    { notes: [2, 6, 11], name: "B Minor" },

    { notes: [2, 7, 8], name: "G 5 Add Flat 9" },
    { notes: [2, 7, 9], name: "D Suspended 4" },
    { notes: [2, 7, 10], name: "G Minor" },
    { notes: [2, 7, 11], name: "G Major" },

    { notes: [2, 8, 9], name: "D 5 Sharp 11" },
    { notes: [2, 8, 10], name: "A# / Bb 7" },
    { notes: [2, 8, 11], name: "B Minor 6" },

    { notes: [2, 9, 10], name: "A# / Bb Major 7" },
    { notes: [2, 9, 11], name: "B Minor 7" },

    { notes: [2, 10, 11], name: "G Sharp 9" },

    // 3

    { notes: [3, 4, 5], name: "F No 3 7 Major 7" },
    { notes: [3, 4, 6], name: "D# / Eb Minor Add Flat 9" },
    { notes: [3, 4, 7], name: "C Sharp 9" },
    { notes: [3, 4, 8], name: "E Major 7" },
    { notes: [3, 4, 9], name: "A 5 Sharp 11" },
    { notes: [3, 4, 10], name: "D# / Eb 5 Add Flat 9" },
    { notes: [3, 4, 11], name: "E 5 Major 7" },

    { notes: [3, 5, 6], name: "D# / Eb Minor Add 9" },
    { notes: [3, 5, 7], name: "D# / Eb Add 9" },
    { notes: [3, 5, 8], name: "F Minor 7" },
    { notes: [3, 5, 9], name: "F Major 7" },
    { notes: [3, 5, 10], name: "D# / Eb Suspended 2" },
    { notes: [3, 5, 11], name: "B Flat 5" },

    { notes: [3, 6, 7], name: "D# / Eb Sharp 9" },
    { notes: [3, 6, 8], name: "G# / Ab 5 7" },
    { notes: [3, 6, 9], name: "D# / Eb Diminished" },
    { notes: [3, 6, 10], name: "D# / Eb Minor" },
    { notes: [3, 6, 11], name: "B Major" },

    { notes: [3, 7, 8], name: "G# / Ab 5 Major 7" },
    { notes: [3, 7, 9], name: "D# / Eb Flat 5" },
    { notes: [3, 7, 10], name: "D# / Eb Major" },
    { notes: [3, 7, 11], name: "D# / Eb Augmented" },

    { notes: [3, 8, 9], name: "G# / Ab 5 Add Flat 9" },
    { notes: [3, 8, 10], name: "D# / Eb Suspended 4" },
    { notes: [3, 8, 11], name: "G# / Ab Minor" },

    { notes: [3, 9, 10], name: "D# / Eb 5 Sharp 11" },
    { notes: [3, 9, 11], name: "B 7" },

    { notes: [3, 10, 11], name: "B Major 7" },

    // 4

    { notes: [4, 5, 6], name: "F# / Bb No 3 7 Major 7" },
    { notes: [4, 5, 7], name: "E Minor Add Flat 9" },
    { notes: [4, 5, 8], name: "C# / Db Sharp 9" },
    { notes: [4, 5, 9], name: "F Major 7" },
    { notes: [4, 5, 10], name: "A# / Bb 5 Sharp 11" },
    { notes: [4, 5, 11], name: "E 5 Add Flat 9" },

    { notes: [4, 6, 7], name: "E Minor Add 9" },
    { notes: [4, 6, 8], name: "E Add 9" },
    { notes: [4, 6, 9], name: "F# / Bb Minor 7" },
    { notes: [4, 6, 10], name: "F# / Bb Major 7" },
    { notes: [4, 6, 11], name: "E Suspended 2" },

    { notes: [4, 7, 8], name: "E Sharp 9" },
    { notes: [4, 7, 9], name: "A 5 7" },
    { notes: [4, 7, 10], name: "E Diminished" },
    { notes: [4, 7, 11], name: "E Minor" },

    { notes: [4, 8, 9], name: "A 5 Major 7" },
    { notes: [4, 8, 10], name: "E Flat 5" },
    { notes: [4, 8, 11], name: "E Major" },

    { notes: [4, 9, 10], name: "A 5 Add Flat 9" },
    { notes: [4, 9, 11], name: "E Suspended 4" },

    { notes: [4, 10, 11], name: "E 5 Sharp 11" },

    // 5

    { notes: [5, 6, 7], name: "G No 3 7 Major 7" },
    { notes: [5, 6, 8], name: "F Minor Add Flat 9" },
    { notes: [5, 6, 9], name: "D Sharp 9" },
    { notes: [5, 6, 10], name: "F# / Bb Major 7" },
    { notes: [5, 6, 11], name: "B 5 Sharp 11" },

    { notes: [5, 7, 8], name: "F Minor Add 9" },
    { notes: [5, 7, 9], name: "F Add 9" },
    { notes: [5, 7, 10], name: "G Minor 7" },
    { notes: [5, 7, 11], name: "G Major 7" },

    { notes: [5, 8, 9], name: "F Sharp 9" },
    { notes: [5, 8, 10], name: "A# / Bb 5 7" },
    { notes: [5, 8, 11], name: "F Diminished" },

    { notes: [5, 9, 10], name: "A# / Bb 5 Major 7" },
    { notes: [5, 9, 11], name: "F Flat 5" },

    { notes: [5, 10, 11], name: "A# / Bb 5 Add Flat 9" },

    // 6

    { notes: [6, 7, 8], name: "G# / Ab No 3 7 Major 7" },
    { notes: [6, 7, 9], name: "F# / Bb Minor Add Flat 9" },
    { notes: [6, 7, 10], name: "D# / Eb Sharp 9" },
    { notes: [6, 7, 11], name: "G Major 7" },

    { notes: [6, 8, 9], name: "F# / Bb Minor Add 9" },
    { notes: [6, 8, 10], name: "F# / Bb Add 9" },
    { notes: [6, 8, 11], name: "G# / Ab Minor 7" },

    { notes: [6, 9, 10], name: "F# / Bb Sharp 9" },
    { notes: [6, 9, 11], name: "B 5 7" },

    { notes: [6, 10, 11], name: "B 5 Major 7" },

    // 7

    { notes: [7, 8, 9], name: "A No 3 7 Major 7" },
    { notes: [7, 8, 10], name: "G Minor Add Flat 9" },
    { notes: [7, 8, 11], name: "E Sharp 9" },

    { notes: [7, 9, 10], name: "G Minor Add 9" },
    { notes: [7, 9, 11], name: "G Add 9" },

    { notes: [7, 10, 11], name: "G Sharp 9" },

    // 8

    { notes: [8, 9, 10], name: "A# / Bb No 3 7 Major 7" },
    { notes: [8, 9, 11], name: "G# / Ab Minor Add Flat 9" },

    { notes: [8, 10, 11], name: "G# / Ab Minor Add 9" },

    // 9

    { notes: [9, 10, 11], name: "B No 3 7 Major 7" },

    ///////////////////////////////////////////////////////////////////////////
    //                           Common Chords                               //
    ///////////////////////////////////////////////////////////////////////////

    // 2-note C major/minor
    { notes: [48, 52], name: "C Major" },
    { notes: [48, 51], name: "C Minor" },

    // 2-note D major/minor
    { notes: [50, 54], name: "D Major" },
    { notes: [50, 53], name: "D Minor" },

    // C E <n>
    { notes: [48, 52, 53], name: "F 5 Major 7" },
    { notes: [48, 52, 54], name: "C Flat 5" },
    { notes: [48, 52, 55], name: "C Major" },
    { notes: [48, 52, 56], name: "C Augmented" },
    { notes: [48, 52, 57], name: "A Minor" },
    { notes: [48, 52, 58], name: "C 7" },
    { notes: [48, 52, 59], name: "C Major 7" },
    { notes: [48, 52, 60], name: "C Major" },

    /// C -
    { notes: [48, 51, 55], name: "C Minor" },
    { notes: [48, 50, 55], name: "C Suspended 2" },
    { notes: [48, 53, 55], name: "C Suspended 4" },
    { notes: [48, 51, 54], name: "C Diminished" },

    // D D# <n>
    { notes: [50, 54, 55], name: "G 5 Major 7" },
    { notes: [50, 54, 56], name: "D Flat 5" },
    { notes: [50, 54, 57], name: "D Major" },
    { notes: [50, 54, 58], name: "D Augmented" },
    { notes: [50, 54, 59], name: "B Minor" },
    { notes: [50, 54, 60], name: "D 7" },
    { notes: [50, 54, 61], name: "D Major 7" },
    { notes: [50, 54, 62], name: "D Major" },

    // D -
    { notes: [50, 53, 57], name: "D Minor" },
    { notes: [50, 52, 57], name: "D Suspended 2" },
    { notes: [50, 55, 57], name: "D Suspended 4" },
    { notes: [50, 53, 56], name: "D Diminished" },

    ///////////////////////////////////////////////////////////////////////////
    //                              Inversions                               //
    ///////////////////////////////////////////////////////////////////////////

    // C inversions
    { notes: [52, 55, 60], name: "C Major" },
    { notes: [55, 60, 64], name: "C Major" },

    // D inversions
    { notes: [54, 57, 62], name: "D Major" },
    { notes: [57, 62, 66], name: "D Major" },

    // A inversions
    { notes: [49, 52, 57], name: "A Major" }, // 1st inversion major
    { notes: [48, 52, 57], name: "A Minor" }, // 1st inversion minor

    // F inversions
    { notes: [48, 53, 57], name: "F Major" }, // 2nd inversion major
    { notes: [48, 53, 56], name: "F Minor" }, // 2nd inversion minor

    // B inversion
    { notes: [50, 54, 59], name: "B Minor" },

    // Intervals in which the root note is not contained within the interval
    { notes: [55, 56, 59], name: "E Sharp 9" },
    { notes: [55, 63, 64], name: "C Sharp 9" },
    { notes: [55, 58, 66], name: "D# / Eb Sharp 9" },
    { notes: [55, 61, 66], name: "A 7/13" },

    ///////////////////////////////////////////////////////////////////////////
    //                             String Input                              //
    ///////////////////////////////////////////////////////////////////////////

    // letter-based chords
    { notes: ["C", "E", "G"], name: "C Major" },
    { notes: ["C", "D# / Eb", "G"], name: "C Minor" },
  ];
  test.each(combinations)("$notes should map to $name", ({ notes, name }) => {
    const chord = identify(notes as Note[]);
    expect(chord.name).toEqual(name);
  });

  it("should identify a basic C-major chord with high C", () => {
    expect(identify([48, 52, 55, 60]).name).toEqual("C Major");
  });

  it("should throw an error if a negative number note is specified", () => {
    expect(() => {
      identify([-1, 52, 55]);
    }).toThrow();
  });
});

describe("identify all 2-note chord permutations", () => {
  // generate all possible 3-note chord permutations
  const cases = [];
  for (let i = 0; i <= 11 - 1; i++) {
    for (let j = i + 1; j <= 11 - 0; j++) {
      cases.push([[i, j]]);
    }
  }

  // 66 possible permutations for 12 elements (n=12), take 2 (k=2), given n! / k!(n - k)!
  expect(cases.length).toEqual(66);

  test.each(cases)("%p note permutation should be identified", (notes) => {
    expect(identify(notes).name).toBeDefined();
  });
});

describe("identify all 3-note chord permutations", () => {
  // generate all possible 3-note chord permutations
  const cases = [];
  for (let i = 0; i <= 11 - 2; i++) {
    for (let j = i + 1; j <= 11 - 1; j++) {
      for (let k = j + 1; k <= 11 - 0; k++) {
        cases.push([[i, j, k]]);
      }
    }
  }

  // 220 possible permutations for 12 elements (n=12), take 3 (k=3), given n! / k!(n - k)!
  expect(cases.length).toEqual(220);

  test.each(cases)("%p note permutation should be identified", (notes) => {
    expect(identify(notes).name).toBeDefined();
  });
});
