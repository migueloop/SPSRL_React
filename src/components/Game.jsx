import React, {Component} from 'react';
import OptionsList from './OptionsList.jsx';

const game = {
  weapons:	[
    {
      label: 'rock',
  	  wins: ['scissors']
    },
    {
      label: 'paper',
    	wins: ['rock']
  	},
    {
      label: 'scissors',
    	wins: ['paper']
  	},
    {
      label: 'lizard',
    	wins: ['spock']
  	},
    {
      label: 'spock',
      wins: ['rock']
    },
  ],
  initialState: {
    player1: {
  		weapon: null,
  		score: 0,
  	},
  	player2: {
  		weapon: null,
  		score: 0,
  	},
    seletedWeapon : '',
    roundWinner : ''
  }
};

class Game extends Component {
  constructor(props){
    super(props)
    this.state = game.initialState
    this.play = this.play.bind(this)
  }

  play(selectedWeapon) {
    const weapon1 = selectedWeapon || this._getRandomWeapon();
    const weapon2 = this._getRandomWeapon();
    const winner = this._getWinner(weapon1, weapon2)

    this.setState({
			player1: {
				...this.state.player1,
				weapon: weapon1,
			},

			player2: {
				...this.state.player2,
				weapon: weapon2,
			},

      roundWinner: winner
		});

    console.log("round winner is", this.state.roundWinner)

  }

  render() {
    const { selectedWeapon, player1, player2, roundWinner} = this.state;

    return (
      <div>
        <OptionsList options={game.weapons} onItemClick={(selectedWeapon) => this.play(selectedWeapon)} selected={selectedWeapon}/>
        <p>
           <strong>Player 1: </strong> {player1.weapon ? player1.weapon.label : 'Choose weapon... '}
            <p>vs</p>
           <strong> Player 2: </strong> {player2.weapon ? player2.weapon.label : 'Choose weapon... '}
         </p>
        {roundWinner ? <p> <strong> {(roundWinner != '0') ?  `Player: ${roundWinner} wins!` : 'Tie'} </strong> </p> : ''}
      </div>
      );
  }

  /* get a random weapon */
  _getRandomWeapon() {
    return game.weapons[Math.floor(Math.random()*game.weapons.length)];
  }

  /* get a winner based in 2 weapons */
  _getWinner(weapon1, weapon2) {
     let winner
	   if (weapon1 === weapon2) {
       winner = 0
     }
     else{
  	   let w1 = game.weapons.find(w => w === weapon1)
       winner = w1.wins.some(wins => wins === weapon2.label) ? 1 : 2
     }
     console.log(weapon1.label +  ' vs ' + weapon2.label + ' wins ' + winner)

     return winner;

  }

}

export default Game;
