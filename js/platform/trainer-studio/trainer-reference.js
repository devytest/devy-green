/* trainer.js */

// declare your trainer class here
class Trainer {

  /*
    constructor [constructor]:

    - parameters: none

    - action: creates a new Pokemon Trainer

    - return value: a new Pokemon Trainer

  */
  constructor() {
    this.firstName = 'Shdave'
    this.lastName = 'D'
    this.age = 30
    this.energy = 80
    this.happiness = 50
    this.slogan = 'Happiness only with success'
    this.energy = 75
    this.happiness = 75
    this.confidence = 75
    this.intelligence = 75
    this.strength = 75
  }

  /*
    Note: For all of the specs below, assume the trainer has
    firstName: `Ash` and lastName: `Ketchum`
  */

  /*
  getFullName [method]:

  - Parameters: none

  - Action: constructs the trainer's full name from
    the trainer's {firstName} and {lastName}

  - Return Value: full name [string]

  - Example: `Ash Ketchum` [string]
  */
  getFullName() {
    return `${this.firstName} ${this.lastName}`
  }

  /*
  getReverseName [method]:

  - Parameters: none

  - Action: constructs the trainer's 'reverse' name from
    the trainer's {lastName} and {firstName}
  
  - Return Value: reverse name [string]

  - Example: `Ketchum, Ash` [string]
  */
  getReverseName() {
    return `${this.lastName}, ${this.firstName}`
  }

  /*
  getDoubleFullName [method]:

  - Parameters: none

  - Action: constructs the trainer's 'double full name' from
    the trainer's {firstName} and {lastName}

  - Return Value: double full name [string]

  - Example: `Ash Ash Ketchum Ketchum` [string]
  */
  getDoubleFullName() {
    return `${this.firstName} ${this.firstName} ` +
     `${this.lastName} ${this.lastName}`
  }


  /*
  getDoubleReverseName [method]:

  - Parameters: none

  - Action: constructs the trainer's 'double reverse name' from
    the trainer's {firstName} and {lastName}

  - Return Value: double reverse name [string]

  - Example: `Ketchum Ketchum, Ash Ash` [string]
  */
  getDoubleReverseFullName() {
    return `${this.lastName} ${this.lastName}, ${this.firstName} ${this.firstName} `
  }

  /*
  getFirstNameLastInitial [method]:

  - Parameters: none

  - Action: constructs a string containing the trainer's {firstName}
    and the first letter of the the trainer's {lastName} followed by
    a period

  - Return Value: first name last initial [string]

  - Example: `Ash K.` [string]
  */
  getFirstNameLastInitial() {
    return `${this.firstName} ${this.lastName[0]}.`
  }

  /*
  getFirstInitialLastName [method]:

  - Parameters: none

  - Action: constructs a string containing the first letter of the
    trainer's {firstName} followed by a period and the trainer's
    {lastName}

  - Example: `A. Ketchum` [string]

  - Return Value: first initial last name [string]
  */
  getFirstInitialLastName() {
    return `${this.firstName[0]}. ${this.lastName}`
  }  
  
  /*
  getElementWeakestAgainst [method]:

  - Parameters: none

  - Action: constructs a string indicating what element this trainer
    is weakest against based on the trainer's favorite element.

      The rules are:
        * Water is weakest against Plant
        * Plant is weakest against Fire
        * Fire is weakest against Water
    
    (We're assuming the trainer's favorite element is 'Water', 'Fire', or 'Plant' only)

  - Return Value: element weakest against [string]
  
  - Example: 
    For a trainer whose favorite element is 'Water',
    this method should return `Plant` [string].

  - Extra Credit:
    If the trainer's element is not 'Water', 'Fire', or 'Plant',
    the method should return 'Error! Element not recognized'
  */
  getElementWeakestAgainst() {
    if (this.favoriteElement === 'Water') {
      return 'Plant'
    } else if (this.favoriteElement === 'Fire') {
      return 'Water'
    } else if (this.favoriteElement === 'Plant') {
      return 'Fire'
    } else {
      return 'Error! Element not recognized'
    }
  }

  /*
  getElementStrongestAgainst [method]:

  - Parameters: none

  - Action: constructs a string indicating what element this trainer
    is strongest against based on the trainer's favorite element.

      The rules are:
        * Water is strongest against Fire
        * Plant is strongest against Water
        * Fire is strongest against Plant
    
    (We're assuming the trainer's favorite element is 'Water', 'Fire', or 'Plant' only)

  - Return Value: element weakest against [string]
  
  - Example: 
    For a trainer whose favorite element is 'Water',
    this method should return `Fire` [string].

  - Extra Credit:
    If the trainer's element is not 'Water', 'Fire', or 'Plant',
    the method should return 'Error! Element not recognized'
  */
  getElementStrongestAgainst() {
    if (this.favoriteElement === 'Water') {
      return 'Fire'
    } else if (this.favoriteElement === 'Fire') {
      return 'Plant'
    } else if (this.favoriteElement === 'Plant') {
      return 'Water'
    } else {
      return 'Error! Element not recognized'
    }
  }

  /*
  writeHi [method]:

  - Parameters: none

  - Action: creates a chat bubble near the trainer's picture
    that prints out 'Hi'. 

  - Return Value: none

  - Hint: Look for a function in the API docs that can create
    a chat bubble with the string you give it.
  */  
  writeHi() {
    createChatBubble("Hi")
  }

  /*
  writeSlogan [method]:

  - Parameters: none

  - Action: creates a chat bubble near the trainer's picture
    that prints out the trainer's slogan

  - Return Value: none
  */
  writeSlogan() {
    createChatBubble(this.slogan)
  }

  /*
  write [method]:

  - Parameters: message [string]

  - Action: creates a chat bubble near the trainer's picture
    that prints out the {message} given

  - Return Value: none
  */
  write(message) {
    createChatBubble(message)
  }

  /*
  sayHi [method]:

  - Parameters: none

  - Action: speaks the word 'Hi' out loud on your computer's speakers.

  - Return Value: none

  - Hint: Look for a function in the API docs that can speak
    words out loud by converting text to speech. 
  */
  sayHi() {
    textToSpeech("Hi!")
  }
  
  /*
  saySlogan [method]:

  - Parameters: none

  - Action: speaks your trainer's slogan out loud on your
    computer's speakers.

  - Return Value: none
  */
  saySlogan() {
    textToSpeech(this.slogan)
  }

  /*
  say [method]:

  - Parameters: message [string]

  - Action: speaks out loud whatever {message} is given, using
    your computer's speakers.

  - Return Value: none
  */
  say(message) {
    textToSpeech(message)
  }

  getAgeInMonths() {
    return this.age * 12
  }

  getAgeInWeeks() {
    return this.age * 52
  }

  getAgeInDays() {
    return this.age * 365
  }

  getAgeInHours() {
    return getAgeInDays() * 24
  }

  getAgeInMinutes() {
    return getAgeInHours() * 60
  }
  
  getAgeInSeconds() {
    return getAgeInHours() * 60
  }

  work() {
    this.coins += 50
    this.energy -= 20
    this.happiness -= 10
    this.confidence += 5
  }

  rest() {
    this.energy += 20
    this.intelligence += 10
  }

  eat() {

  }

  exercise() {

  }

    /*
    Returns the name of the Pokemon's image file.
    The image changes based on the Pokemon's species and
    whether it is alive or not.
    For example:
      a Charmander pokemon's image file should be:
        'Charmander.png' if it is alive
        and 'Charmander-Dead.png' if it is dead.
      a Blastoise pokemon's image file should be:
        'Blastoise.png' if it is alive
        and 'Blastoise-Dead.png' if it is dead.
  */
  getImageFileName() {
    return this.getFullName() + '.png'
  }

  getAgeDescription() {
    var description = ''
    if (this.age < 10) {
      description = 'kid'
    } else if (this.age < 13) {
      description = 'pre-teen'
    } else if (this.age < 20) {
      description = 'teenager'
    } else {
      description = 'adult'
    }
    return description
  }

  getHappinessDescription() {
    var description = ''
    if (this.happiness <= 20) {
      description = 'very sad'
    } else if (this.happiness <= 40) {
      description = 'sad'
    } else if (this.happiness <= 60) {
      description = 'neutral'
    } else if (this.happiness <= 80) {
      description = 'happy'
    } else if (this.happiness <= 100) {
      description = 'very happy'
    }
    return description
  }

  getConfidenceDescription() {
    var description = ''
    if (this.confidence <= 34) {
      description = 'not confident'
    } else if (this.confidence <= 67) {
      description = 'modestly confident'
    } else if (this.confidence <= 100) {
      description = 'very confident'
    }
    return description
  }


}