class Pokemon {
  /*
    Pokemon Attributes:
    - owner
    - element
    - HP
    - baseHP
    - maxHP
    - AP
    - baseAP
    - XP
    - level
    - attacks
    - formNUmber
    - family 
      - name
      - forms
        - species
        - element
        - baseHP
        - baseAP
        - attacks
  */
  constructor(options) {
    this.owner = options.owner
    this.family = options.family
    this.XP = options.XP

    this.formNumber = 0

    // calculate pokemon attributes bases on XP and form
    this.updateLevel()
    this.updateAttributesForNewLevel()
  }

  /*
    bark() returns a string representing a pokemon's 'bark.'
    Each pokemon 'barks' the name of its species.
    For example, every Pikachu barks 'Pikachu!'
  */
  bark() {
    return `<p>${this.species}!</p>`
  }

  /*
    refillHP() sets the pokemon's HP to its maximum HP
  */
  refillHP() {
    this.HP = this.maxHP
  }

  /*
    subtractHP(...) updates the pokemon's HP by
    subtracting 'damage' from its current HP. It also
    ensures that the pokemon's HP is never less than 0.
  */
  subtractHP(damage) {
    this.HP -= damage
    
    // ensure that HP is never negative
    if (this.HP < 0) {
      this.HP = 0
    }
  }

  /*
    calcDamage(...) calculates and returns the amount of 
    damage generated by this pokemon using 'attack'
    against 'target.'

    Damage is calculated by:
      - First multiplying:
        - the pokemon's AP
        - times the attack's power
        - times the element multiplier 
      - And then rounding the result
    
    Note: the element multiplier is calculated by the
    calcElementMultiplier(...) method
  */
  calcDamage(attack, target) {
    var EM = this.calcElementMultiplier(target)
    var damage = this.AP * attack.power * EM
    return Math.round(damage)
  }

  /*
    checkIfAttackHit(...) returns a boolean value (true or false) 
    indicating whether the attack hit its target or not.
    Returns true if the attack hit and false if it missed.
  */
  determineIfAttackHitOrMissed(attack) {
    var rand = Math.random()

    if (rand < attack.accuracy) {
      return true
    } else {
      return false
    }
  }

  /* 
    calcElementMultiplier(...) calculates and returns the damage multiplier based on attacker's element and target's element.
    
    Element Relationships:
    'fire'  overpowers 'plant'
    'plant' overpowers 'water'
    'water' overpowers 'fire'
    
    If the attacker's element overpowers the target's element,
    then we return a multipler of 1.5 ('EXTRA_DAMAGE').

    If the attacker's element is overpowered by the target's element,
    then we return a multipler of 0.67 ('REDUCED_DAMAGE').

    If the attacker and targer have the same element, 
    we return a multiplier of 1.0 (NORMAL_DAMAGE).

    For example:
      If the attacker is 'water' and the target is 'fire',
      the multiplier will be 1.5 (3/2)
      because 'water' overpowers 'fire', 

      But if the attacker is 'fire' and the target is 'water',
      the multiplier will be 0.67 (2/3)
      because 'fire' is overpowered by 'water.' 
  */
  calcElementMultiplier(target) {
    var attackerElement = this.element
    var targetElement = target.element

    // value that will be calcualted and returned
    var multiplier = 1.0
    
    const EXTRA_DAMAGE   = 1.5
    const NORMAL_DAMAGE  = 1.0
    const REDUCED_DAMAGE = 0.67

    if (attackerElement === "fire") {

      if (targetElement === "water") {
        multiplier = REDUCED_DAMAGE
      } else if (targetElement === "plant") {
        multiplier = EXTRA_DAMAGE
      } else {
        multiplier = NORMAL_DAMAGE
      }

    } else if (attackerElement === "water") {

      if (targetElement === "plant") {
        multiplier = REDUCED_DAMAGE
      } else if (targetElement === "fire") {
        multiplier = EXTRA_DAMAGE
      } else {
        multiplier = NORMAL_DAMAGE
      }

    } else if (attackerElement === "plant") {

      if (targetElement === "fire") {
        multiplier = REDUCED_DAMAGE
      } else if (targetElement === "water") {
        multiplier = EXTRA_DAMAGE
      } else {
        multiplier = NORMAL_DAMAGE
      }

    }

    return multiplier
  }

  /*
    addXP(...) increases the pokemon's XP by 'newXP' points
  */
  addXP(newXP) {
    this.XP += newXP
  }
  
  /*
    giveUpXP() returns the amount of XP this pokemon gives up
    when it is killed by an opponent.

    This amount should equal:
      - the pokemon's current XP divided by 4
      - rounded to the nearest whole number (integer).
  */
  giveUpXP() {
    return Math.round(this.XP / 4.0)
  }
  
  /*
    updateMaxHP() calculates and updates the pokemon's
    maxHP. It does this by setting the pokemon's maxHP
    to its baseHP multiplied by its level.
  */
  updateMaxHP() {
    this.maxHP = this.baseHP * this.level
  }

  /*
    updateAP() calculates and updates the pokemon's
    AP. It does this by setting the pokemon's AP
    to its baseAP multiplied by its level.
  */
  updateAP() {
    this.AP = this.baseAP * this.level
  }

  /*
    updateXP() calculates the amount of XP the pokemon
    has earned after defeating 'enemies'. It then adds
    earnedXP to its current XP 
  */
  updateXP(enemies) {
    var earnedXP = this.calcEarnedXP(enemies)
    this.addXP(earnedXP)
  }
  
  /*
    calculateEarnedXP(...) is given an array of 'enemies' and it returns the total amount of XP earned by defeating all of
    them. To do this, it loops through all enemies, calling each enemy's giveUpXP() method. Each time it calls giveUpXP(), it adds the value to a running sum. This determines the total amount of XP our pokemon has earned by defeating all of the enemies. It returns this amount.
  */
  calcEarnedXP(enemies) {
    var earnedXP = 0
    for (var i = 0; i < enemies.length; i++) {
      earnedXP += enemies[i].giveUpXP()
    }
    return earnedXP
  }

  /*
    updateLevel() updates the pokemon's level by
    calling the calcLevel() method.
    
    returns true if level changed, false otherwise
  */
  updateLevel() {
    var levelChanged = false
    var oldLevel = this.level
    
    this.level = this.calcLevel()
    
    if (this.level != oldLevel) {
      levelChanged = true
    } else {
      levelChanged = false
    }

    return levelChanged
  }

  /*
    Calculates and returns this pokemn

    A pokemon's level is determined by:
      - dividing its XP by 100
      - rounding this value down

    For example:
      a pokemon with XP = 140 should be level 1
      a pokemon with XP = 670 should be level 6
      a pokemon with XP = 899 should be level 8

    Note: Pokemon start with XP = 100
  */
  calcLevel() {
    return Math.floor(this.XP/100.0)
  }

  /*
    updateAttributesAfterBattle(...)
  

    Based on the battle that just occurred,
    we increase the pokemon's XP.

    For each enemy that the pokemon defeated,
    we increase the pokemon's XP based on the XP of the enemy.

    Then we check to see if the pokemon earned enough XP
    to level-up.

    Returns true if pokemon evolved, false otherwise
  */
  updateAttributesAfterBattle(enemies) {
    var evolved = false

    this.updateXP(enemies)
    var levelChanged = this.updateLevel()
    if (levelChanged) {
      evolved = this.updateAttributesForNewLevel()
    }

    return evolved
  }
  /*
    updateAttributesForNewLevel() is called when the pokemon has gained enough XP
    to cross over to the next level. When this happens,
    the following should happen:
      - the pokemon should evolve if necessary
      - the pokemon's maximum HP should be updated
      - the pokemon's AP should be updated
      - the pokemon's HP should be refilled

    Returns true if pokemon evolved, false otherwise
  */
  updateAttributesForNewLevel() {
    var evolved = this.evolveIfNecessary()
    
    this.updateMaxHP()
    this.updateAP()
    this.refillHP()

    return evolved
  }

  /*
    evolveIfNecessary() checks if the pokemon should evolve
    and triggers the evolution if so. 
    It returns true if the pokemon evolved, false  otherwise.
  */
  evolveIfNecessary() {
    var evolved = false
    
    if (this.level <= 3) {
      if (this.formNumber != 1) {
        this.evolveToForm(1)
        evolved = false
      }
    } else if (this.level > 3 && this.level < 7) {
      if (this.formNumber != 2) {
        this.evolveToForm(2)
        evolved = true
      }
    } else if (this.level >= 7) {
      if (this.formNumber != 3) {
        this.evolveToForm(3)
        evolved = true
      }
    }

    return evolved
  }

  /*

  */
  evolveToForm(formNumber) {
    var newForm = this.family.forms[formNumber]

    this.formNumber = formNumber
    this.species = newForm.species
    this.element = newForm.element
    this.baseHP = newForm.baseHP
    this.baseAP = newForm.baseAP
    this.attacks = newForm.attacks
  }
  
  /*
    Used by enemy AI to choose one of its attacks

    Currently chooses randomly

    Alternatives:
    select strongest attack
    select weakest attack
    select most accurate attack
    round robin through attacks
    etc.
  */
  selectAttack() {
    return this.selectRandomAttack()
  }

  /*
    Alternative strategy for selectAttack()
  */
  selectRandomAttack() {
    var attacks = toArray(this.attacks)
    var attackIndex = Math.floor(
      Math.random() * attacks.length
    )

    return attacks[attackIndex]
  }

  /*
    selectMostPowerfulAttack() selects the attack with the highest
    power level. It is an alternative strategy for selectAttack().
  */
  selectMostPowerfulAttack() {
    var attacks = toArray(this.attacks)
    
    // will store the index of the strongest attack
    var strongestIndex = 0

    for (var i=0; i < attacks.length; i++) {
      if (attacks[i].power > attacks[strongestIndex].power) {
        strongestIndex = i
      }
    }

    return attacks[strongestIndex] 
  }

  /*
    Alternative strategy for selectAttack()
  */
  selectLeastPowerfulAttack() {
    var attacks = toArray(this.attacks)
    
    // will store the index of the weakest attack
    var weakestIndex = 0

    for (var i=0; i < attacks.length; i++) {
      if (attacks[i].power < attacks[weakestIndex].power) {
        weakestIndex = i
      }
    }

    return attacks[weakestIndex] 
  }

  /*
    Alternative strategy for selectAttack()
  */
  selectMostAccurateAttack() {
    var attacks = toArray(this.attacks)
    
    // will store the index of the most accurate attack
    var mostAcc = 0 

    for (var i=0; i < attacks.length; i++) {
      if (attacks[i].accuracy > attacks[mostAcc].accuracy) {
        mostAcc = i
      }
    }

    return attacks[mostAcc] 
  }
}