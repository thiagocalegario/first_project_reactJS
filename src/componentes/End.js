import React from 'react';
import "./End.css"
const End = ({retryJogo, score}) => {
    return (
        <div>
            <h1>Você perdeu!</h1>
            <h2>A sua pontuação foi {score}</h2>
            <button onClick={retryJogo}>Recomecar o jogo</button>

        </div>
    );
};

export default End;