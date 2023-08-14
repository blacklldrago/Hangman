import css from "./Keyboard.module.css";

const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

type KeyboardProps = {
  disable: boolean;
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetter: (key: string) => void;
};

export default function Keyboard({
  disable,
  activeLetters,
  inactiveLetters,
  addGuessedLetter,
}: KeyboardProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
        gap: ".5rem",
      }}
    >
      {KEYS.map((e) => {
        const isActive = activeLetters.includes(e);
        const isInactive = inactiveLetters.includes(e);
        return (
          <button
            onClick={() => addGuessedLetter(e)}
            className={`${css.btn} ${isActive ? css.active : ""} ${
              isInactive ? css.inactive : ""
            }`}
            disabled={isInactive || isActive || disable}
            key={e}
          >
            {e}
          </button>
        );
      })}
    </div>
  );
}
