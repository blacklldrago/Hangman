import { useState, useEffect, useCallback } from "react";
import { data } from "./data.ts";
import HangmanDrawing from "./components/HangmanDrawing/HangmanDrawing.tsx";
import HangmanWord from "./components/HangmanWord/HangmanWord.tsx";
import Keyboard from "./components/Keyboard/Keyboard.tsx";

function getWord() {
  return data[Math.floor(Math.random() * data.length)];
}

const App = () => {
  const [wordGuess, setWordGuess] = useState<string>(getWord());
  const [guessed, setGuessed] = useState<string[]>([]);

  const incorrectLetters = guessed.filter((e) => !wordGuess.includes(e));
  const correctLetters = guessed.filter((e) => wordGuess.includes(e));

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordGuess.split("").every((letter) => {
    return guessed.includes(letter);
  });

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessed.includes(letter) == true) {
        return;
      } else {
        setGuessed((prev) => [...prev, letter]);
      }
    },
    [guessed, isWinner, isLoser]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) {
        return;
      }

      e.preventDefault();
      addGuessedLetter(key);
    };
    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessed]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key != "Enter") {
        return;
      }
      e.preventDefault();
      setGuessed([]);
      setWordGuess(getWord());
    };
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessed]);

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "2rem",
          textAlign: "center",
        }}
      >
        {isWinner && "WINNER ! - Refresh to TRY AGAIN"}
        {isLoser && "Nice Try ! - Refresh to TRY AGAIN"}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessed}
        wordGuess={wordGuess}
      />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          disable={isLoser || isWinner}
          activeLetters={correctLetters}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
};

export default App;
