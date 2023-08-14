type HangmanWordProps = {
  guessedLetters: string[];
  wordGuess: string;
  reveal?: boolean;
};

export default function HangmanWord({
  guessedLetters,
  wordGuess,
  reveal = false,
}: HangmanWordProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: ".25em",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {wordGuess.split("").map((e, i) => {
        return (
          <span key={i} style={{ borderBottom: ".1em solid black" }}>
            <span
              style={{
                visibility:
                  guessedLetters.includes(e) || reveal ? "visible" : "hidden",
                color:
                  !guessedLetters.includes(e) && reveal == true
                    ? "red"
                    : "hidden",
              }}
            >
              {e}
            </span>
          </span>
        );
      })}
    </div>
  );
}
