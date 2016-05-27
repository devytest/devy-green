/* 
  game.js is the driver of the javascript application.
  It interacts with battle.js, which contains the game-world objects and gui.js, which controls the user's GUI
*/

/* 
  Main Function: launchGame()
  Global vars:
  - fsm
  - player
  - enemies
  - battle
  - gui
  - battleOutcomeMessage
*/
function launchGame() {
  setupBattle();
  gui = new GUI(battle);
  setupStateMachine();

  // Wait until DOM has loaded
  $(document).ready(function() {
    gui.setup()
    fsm.pageReady()
  })
}

launchGame()

function setupBattle() {
  // initialize enemies (global variable)
  battle = new Battle()

  // todo: let the player pick this
  battle.createPlayer('Bulbasaur')
  battle.createEnemies()
}