import React from 'react';

const Player = ({ player }) => {
  const { name, health } = player;

  return (
    <div>
      <p>
        I am {name} and my health is currently {health}
      </p>
    </div>
  );
};

export default Player;
