// Styles, Scripts
import style from './assets/scss/index.scss'
import Game from './modules/Game';

const gameContainer = document.querySelector('#bulls_and_cows');
const game = new Game({gameContainer: gameContainer});
game.init();

// Модель (Model) предоставляет данные и реагирует на команды контроллера, изменяя своё состояние[1].
// Представление (View) отвечает за отображение данных модели пользователю, реагируя на изменения модели[1].
// Контроллер (Controller) интерпретирует действия пользователя, оповещая модель о необходимости изменений[1].