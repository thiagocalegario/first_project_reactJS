///CSS
import './App.css';
//REACT
import {useCallback, useEffect, useState} from "react";
//COMPONENTES
import TelaInicial from "./componentes/TelaInicial";
import End from "./componentes/End";
import Game from "./componentes/Game";

//DADOS
import {wordList} from "./data/words";



const stages = [
    {id: 1, name: "start"},
    {id: 2, name: "game"},
    {id: 3, name: "end"}
]
function App() {
    const [gameStage, setGameStage] = useState(stages[0].name)
    const [words] = useState(wordList)
    const [pickedWord, setPickedWord] = useState("")
    const [pickedCategory, setPickCategory] = useState("")
    const [letters, setLetters] = useState([])
    const [guessedLetters, setGuessedLetters] = useState([])
    const [wrongLetters, setWrongLetters] = useState([])
    const [guesses, setGuesses] = useState(3)
    const [score, setScore] = useState(0)

    const pickWordAndCategory = () => {
        //PICK A CATEGORY
        const categories = Object.keys(words)
        const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
        //PICK A RANDOM WORD
        const word = words[category][Math.floor(Math.random() * words[category].length)]
        return {category, word}
    }

    //Dar inicio ao jogo
    const startGame = useCallback(() => {
        clearLetterStates()
        const {category, word} = pickWordAndCategory()
        let wordLetters = word.split("");
        wordLetters = wordLetters.map((l) => l.toLowerCase());
        setPickedWord(word);
        setPickCategory(category)
        setLetters(wordLetters)



        setGameStage(stages[1].name)
    })
    //process a letra
    const verifyLetter = (letter) => {
       const normalizedLetter = letter.toLowerCase()
        if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)
        ) {
            return
        }
        if(letters.includes(normalizedLetter)){
            setGuessedLetters((actualGuessedLetters) => [
                ...actualGuessedLetters,
                    normalizedLetter
            ])
        }
        else {
            setWrongLetters((actualWrongLetters) => [
                ...actualWrongLetters,
                normalizedLetter
            ])
            setGuesses(actualGuesses => actualGuesses - 1)
        }
        console.log(wrongLetters)
    }

    const clearLetterStates = () => {
        setGuessedLetters([])
        setWrongLetters([])
    }
    useEffect(() => {
        if (guesses <=0){
            clearLetterStates()
            setGameStage(stages[2].name);

        }
    }, [guesses])
    useEffect(() => {
            const uniqueLetters = [...new Set(letters)]
            if(guessedLetters.length === uniqueLetters.length){
                setScore((actualScore) => actualScore += 100)
                startGame()
            }
    }, [guessedLetters, letters, startGame]);
    
    //Dar reinicio ao jogo
    const retryJogo = () => {
        setScore(0)
        setGuesses(3)
        setGameStage(stages[0].name)
    }
  return (
    <div className="App">
        {gameStage === "start" && <TelaInicial startGame = {startGame}/>}
        {gameStage === "game" && (
            <Game
                verifyLetter={verifyLetter}
                pickedWord={pickedWord}
                pickedCategory={pickedCategory}
                letters={letters}
                guessedLetters={guessedLetters}
                wrongLetters={wrongLetters}
                guesses={guesses}
                score={score}
            />
        )}
        {gameStage === "end" && <End retryJogo = {retryJogo} score = {score}/>}
    </div>
  );
}

export default App;
