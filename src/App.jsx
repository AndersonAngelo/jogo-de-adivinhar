import { useState } from 'react'
import './App.css'

import imgBall from './assets/ball.svg'

const min = 1;
const max = 100;

function App() {

  const [startGame, setStartGame] = useState(false);
  const [inputValue, setInputValue] = useState();
  const [secretNumber, SetSecretNumber] = useState();
  const [textResult, SetTextResult] = useState('');
  const [numberScreen, SetNumberScreen] = useState(false);
  const [counter, SetCounter] = useState(0);

  //Coletar o valor inserido no input.
  function handleChange(e) {
    setInputValue(e.target.value)
  }
  //Impedir que seja recarregado a página após a execução do evendo submit e chamar a função checkKick.
  function handleSubmit(e) {
    e.preventDefault()
    checkKick()
  }

  //Gera um número aleatório.
  function generateRadonNumber(min, max) {
    const secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    SetSecretNumber(secretNumber);
    
    setStartGame(true);
  }

  //Compara os número aleatório com o número do input. 
  function checkKick() {
    
    SetCounter(counter + 1)
    
    if(secretNumber == inputValue) {
        gameOver('Acertou')
    } else if (inputValue > secretNumber) {
        gameOver('Chute maior')
    } else if (inputValue < secretNumber) {
        gameOver('Chute menor')
    } else {
        console.log('Impossível verificar se acertou!')
    }

  }
  //Gerência as mensagem das etapas do jogo enviadas para o client e fluxo após fim de jogo.
  function gameOver(situationn) {
    switch (situationn) {

        case 'Acertou':
          SetNumberScreen(true)
          quickMessage('Acertou! O número secreto é ' + secretNumber)
          setTimeout(function() {
            const confirmation = confirm('Deseja jogar novamente?');
      
            if (confirmation) {
              setStartGame(false);
              setInputValue();
              SetSecretNumber();
              SetTextResult('');
              SetNumberScreen(false);
              SetCounter(0);
            } else {
              alert('Obrigado por jogar! ;D')
            }
          }, 3000)    
      
        break

        case 'Chute maior':
          SetNumberScreen(false)
          quickMessage('O número secreto é menor que ' + inputValue +'.')
        break

        case 'Chute menor':
          SetNumberScreen(false)
          quickMessage('O número secreto é maior que ' + inputValue +'.')
        break

        default:
          console.log('Informe a situação')

    } // fim do switch case
  }

  function quickMessage(message) {
    SetTextResult(message);
  }

    

  return (
    <>
      <div className='container'>
        <div className='content'>
          <div className='title'>
            <img src={imgBall} alt="Bola de cristal" />
            <h1>Jogo de adivinhar o número.</h1>
          </div>
          {!startGame ? (
            <div className='viewerInitial'>
              <h3>Para conseguir vencer o jogo, adivinhe qual o número foi gerado de forma aleatória de 1 a 100. Boa sorte!!</h3>
              <p>Clique em "Iniciar" para iniciar o jogo</p>
              <button onClick={() => generateRadonNumber(min, max)}>Iniciar</button>
            </div>
          ) : (
            <div className='content-gamer'>
              <div className='countKick'>
                <p>{'Nº Chutes: ' + counter}</p>
              </div>
              <div className='viewerCount'>
                {!numberScreen ? (
                  <p>?</p>
                ) : (
                  <p className='escreenResult'>{secretNumber}</p>
                )}
              </div>
                <form onSubmit={handleSubmit}>
                  <input min='1' max='100' type="number" onChange={handleChange} placeholder='Digite um número.'/>
                  <button type='submit'>Chutar</button>
                </form>
              <p className='textResult'>{textResult}</p>
            </div>
          )} 
        </div>
      </div>
    </>
  )
}

export default App
