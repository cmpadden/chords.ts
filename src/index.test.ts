import { relativeNotes, identify } from "./index";

describe("relativeNotes", () => {
  it("should normalize notes relative to the lowest note", () => {
    expect(relativeNotes([48, 52, 55])).toEqual([0, 4, 7]);
  });
  it("should order notes from lowest to highest", () => {
    expect(relativeNotes([52, 55, 62, 48])).toEqual([0, 2, 4, 7]);
  });
  it("should convert notes in other octave to the same octave", () => {
    expect(relativeNotes([48, 52, 55, 62])).toEqual([0, 2, 4, 7]);
  });
  it("should should remove duplicate notes in different octaves", () => {
    expect(relativeNotes([48, 52, 55, 64])).toEqual([0, 4, 7]);
  });
});

describe("identify", () => {
  const chords = [
    /// number-based chords
    { notes: [48, 52, 55], name: "C Major" },
    { notes: [48, 51, 55], name: "C Minor" },
    { notes: [48, 50, 55], name: "C Suspended 2" },
    { notes: [48, 53, 55], name: "C Suspended 4" },
    { notes: [48, 51, 54], name: "C Diminished" },

    // chord-inversions
    { notes: [48, 52, 57], name: "A Minor" },
    { notes: [48, 53, 57], name: "F Major" },

    // letter-based chords
    { notes: ["C", "E", "G"], name: "C Major" },
    { notes: ["C", "D# / Eb", "G"], name: "C Minor" },
  ];

  test.each(chords)(
    "given $notes expect chord name $name",
    ({ notes, name }) => {
      expect(identify(notes).name).toEqual(name);
    }
  );

  it("should identify a basic C-major chord with high C", () => {
    expect(identify([48, 52, 55, 60]).name).toEqual("C Major");
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
