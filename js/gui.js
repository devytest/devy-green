class GUI {

  constructor(battle) {
    this.action = {}
    this.battle = battle
  }
  
  setup() {
    this.setupPlayerGUI()
    this.setupEnemiesGUI()
  }

  clearMessage() {
    $("#messageGUI").text('')
  }

  setMessage(messageHTML) {
    $('#messageGUI').html(messageHTML)
  }

  appendMessage(messageHTML) {
    $('#messageGUI').append(messageHTML)
  }

  setupEnemiesGUI() {
    var enemiesGUI = $("#enemiesGUI")
    enemiesGUI.on('click', '.enemy', handlePlayerChoosesTarget)
    var enemy = $(".enemy")
    for (var i=0; i < this.battle.enemies.length; i++) {
      this.updateStats(
        enemy.clone(), this.battle.enemies[i]
      ).removeClass('hidden').addClass('visible').attr('value', i).appendTo(enemiesGUI)
    }
  }

  updateEnemiesGUI() {
    var gui = this
    $(".enemy.visible").each(function() {
      index = parseInt($(this).attr('value'))
      gui.updateStats($(this), gui.battle.enemies[index])
    })
  }

  setupPlayerGUI() {
    $('#playerName').text(player.name)
    var playerTable = $('#playerGUI')
    this.updateStats(playerTable, player.pokemon)
    this.setupAttacksMenu()
    this.updateAttacksMenu()
    this.updateItemsMenu()
    this.setupGameControlButtons()
  }

  updatePlayerGUI() {
    var playerTable = $('#playerGUI')
    this.updateStats(playerTable, this.battle.player.pokemon)
  }

  setupGameControlButtons() {
    $('button#continue').click(handleContinue)
    $('button#quit').click(handleQuit) 
  }

  setupAttacksMenu() {
    $('#attacksMenu').on(
      'click', 'button', handlePlayerChoosesAttack
    )
  }

  updateAttacksMenu() {
    var attacksMenu = $("#attacksMenu")
    var attacks = player.pokemon.getArrayOfAttacks()
    for (var i=0; i < attacks.length; i++) {
      var attack = attacks[i]
      attacksMenu.append(
        $(`<li>
            <button class="attack" value=${attack.name}>
              ${attack.name}
            </button>
          </li>`)
      )
    }
  }

  updateStats(element, pokemon) {
    element.find('img').attr('src', `images/${pokemon.species}.png`)
    element.find('.species').text(pokemon.species)
    element.find('.element').text(pokemon.element)
    element.find('.HP').text(pokemon.HP)
    element.find('.maxHP').text(pokemon.maxHP)
    element.find('.XP').text(pokemon.XP)
    element.find('.level').text(pokemon.level)
    return element
  }
  
  updateItemsMenu() {
    // Todo
  }

  displayAttack(attackResult) {
    // print out description of the attack
    this.setMessage(this.battle.describeAttack(attackResult))
    this.appendMessage(this.battle.continueMessage())

    // select dom elements corresponding to attacker and target
    // based on the attackResult object
    if (attackResult.attacker.owner === 'player') {
      var enemyIndex = this.battle.locateEnemyPokemon(attackResult.target)
      var attackTarget = $(`.enemy[value="${enemyIndex}"]`)
      var attacker = $('.playerImage')
    } else { // enemy is attacking player
      var enemyIndex = this.battle.locateEnemy(attackResult.attacker)
      var attackTarget = $(`#playerPokemon`)
      var attacker = $(`.enemy[value="${enemyIndex}"] .enemyImage`)
    }
    attackTarget.addClass('attackTarget')

    var targetPos = attackTarget.get(0).getBoundingClientRect()
    var attackerPos = attacker.get(0).getBoundingClientRect()

    attacker.css('position', 'absolute').offset(attackerPos).animate(
      {
        left: targetPos.left,
        top: targetPos.top
      },
      {
        duration: 1000,
        complete: flashTarget
      }
    ).animate(
      {
        left: attackerPos.left,
        top: attackerPos.top
      },
      {
        duration: 1000,
      }
    )
  }

  flashTarget() {
    $('.attackTarget').animate(
      {opacity: 0},
      {duration: 100, queue: true}
    ).animate(
      {opacity: 100},
      {duration: 100, queue: true}
    ).animate(
      {opacity: 0},
      {duration: 100, queue: true}
    ).animate(
      {opacity: 100},
      {duration: 100, queue: true}
    ).removeClass('attackTarget')

    // update GUI with new game state post-attack  
    this.updateEnemiesGUI()
    this.updatePlayerGUI()
  }
}