import React, { useState } from 'react';
import CurrentTurn from './components/CurrentTurn';
import Player from './components/Player';
import Winner from './components/Winner';
import './App.css';

const max = 6;
const defaultHealth = 20;

const dieRoll = () => Math.floor(Math.random() * max) + 1;

const playGame = (players, setWinner) => {
  const attackValue = dieRoll();
  const defenceValue = dieRoll();

  const currentPlayer = players.find(
    (player) => player.playerDetails.currentPlayer
  );

  const nextPlayer = players.find(
    (player) => !player.playerDetails.currentPlayer
  );

  const healthUpdate = nextPlayer.playerDetails.health - (attackValue - defenceValue);

  // not a massive fan of the below approach - would be nice to abstract
  // the player detail updates to a reusable function
  if (defenceValue >= attackValue) {
    nextPlayer.updatePlayer({
      ...nextPlayer.playerDetails,
      currentPlayer: true,
    });

    currentPlayer.updatePlayer({
      ...currentPlayer.playerDetails,
      currentPlayer: false,
    });
  } else {
    nextPlayer.updatePlayer({
      ...nextPlayer.playerDetails,
      currentPlayer: true,
      health: healthUpdate < 0 ? 0 : healthUpdate
      // ^ prevents minus health values being displayed
      // e.g. if health update is -1, returns 0
      // otherwise uses healthUpdate value
    });

    currentPlayer.updatePlayer({
      ...currentPlayer.playerDetails,
      currentPlayer: false,
    });
  }

  if (healthUpdate <= 0) setWinner(currentPlayer.playerDetails.name);
};

const App = () => {
  const [playerOne, setPlayerOne] = useState({
    name: 'player one',
    id: 1,
    health: defaultHealth,
    currentPlayer: true,
  });

  const [playerTwo, setPlayerTwo] = useState({
    name: 'player two',
    id: 2,
    health: defaultHealth,
    currentPlayer: false,
  });

  const [winner, setWinner] = useState(null);

  const playerList = [
    {
      playerDetails: {
        ...playerOne
      },
      updatePlayer: setPlayerOne
    },
    {
      playerDetails: {
        ...playerTwo
      },
      updatePlayer: setPlayerTwo
    }
  ];
  // found adding the player's details and setState function in an object
  // representing the user was the cleanest way to pass these around for use
  // in other components, e.g. an array of objects with all user details and
  // setState functions, rathering than passing in 4 arguments for playerOne,
  // playerTwo, and their respective setState functions

  const currentPlayer = playerList.find(
    (player) => player.playerDetails.currentPlayer
  );
  // would like to find a cleaner solution for this

  return (
    <div className="App">
      { winner && <Winner winner={winner}/> }
      <br />

      { !winner && <CurrentTurn name={currentPlayer.playerDetails.name}/> }
      <br />

      <Player player={playerOne} />
      <Player player={playerTwo}/>
      <br />

      <button
        onClick={() => {
          playGame(playerList, setWinner);
        }}
        disabled={winner}
      >
        ATTACK
      </button>
    </div>
  );
}

export default App;
