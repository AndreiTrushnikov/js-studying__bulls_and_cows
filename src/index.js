// Styles, Scripts
import style from './assets/scss/index.scss'
import Game from './modules/Game';

const gameContainer = document.querySelector('#bulls_and_cows');
const game = new Game({gameContainer: gameContainer});
game.init();
