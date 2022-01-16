import { identify } from "./index";

describe("identify", () => {
  const combinations = [
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
    { notes: [50, 54, 60], name: "D Major 7" },
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

    ///////////////////////////////////////////////////////////////////////////
    //                             String Input                              //
    ///////////////////////////////////////////////////////////////////////////

    // letter-based chords
    { notes: ["C", "E", "G"], name: "C Major" },
    { notes: ["C", "D# / Eb", "G"], name: "C Minor" },
  ];
  test.each(combinations)("$notes should map to $name", ({ notes, name }) => {
    const chord = identify(notes);
    expect(chord.name).toEqual(name);
  });

  it("should throw an error if a negative number note is specified", () => {
    expect(() => {
      identify([-1, 52, 55]);
    }).toThrow();
  });

  it("should throw an error if an unsupported note letter is specified", () => {
    expect(() => {
      identify(["Z", "Z", "Z"]);
    }).toThrow();
  });
});

describe("identify all possible 3-note chord permutations", () => {
  // generate all possible 3-note chord permulations
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

  test.each(cases)("%p should be defined", (notes) => {
    expect(identify(notes).name).toBeDefined();
  });
});
