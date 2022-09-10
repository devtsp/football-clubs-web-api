const IdService = require('../../../helpers/generate-id.helper');

module.exports = class Player {
  constructor(playerData) {
    // expected keys in incoming data
    const expectedKeys = [
      'playerFirstName',
      'playerLastName',
      'playerAge',
      'playerPosition',
    ];

    // recieve object
    if (
      typeof playerData == 'undefined' ||
      playerData?.constructor?.name != 'Object'
    ) {
      throw new Error('Must provide a valid object to initialize entity');
    }

    // at least one valid prop
    const incomingKeys = Object.keys(playerData);
    const validKeys = incomingKeys.filter((key) => expectedKeys.includes(key));
    if (!validKeys.length) {
      throw new Error('No valid property was found to start player creation');
    }

    const {
      playerFirstName,
      playerLastName,
      playerAge,
      playerPosition,
      clubId,
    } = playerData;

    // name and lastname strings
    if (
      typeof playerFirstName != 'string' ||
      typeof playerLastName != 'string'
    ) {
      throw new Error('Player firstname and lastname must be of type: string');
    }
    if (!playerFirstName.trim() || !playerLastName.trim()) {
      throw new Error('Player must have firstname and lastname');
    }

    // age and position numbers
    if (typeof playerAge != 'number' || typeof playerPosition != 'number') {
      throw new Error('Player age and position must be of type: number');
    }

    // name and lastname valid
    if (/[^A-Za-z]/.test(playerFirstName)) {
      throw new Error('Invalid firstname');
    }
    if (/[^A-Za-z]/.test(playerLastName)) {
      throw new Error('Invalid lastname');
    }

    // age and position vaid
    if (playerAge < 16 || playerAge > 45) {
      throw new Error('Player must be between 16 and 45 years old ');
    }
    if (playerPosition < 1 || playerPosition > 11) {
      throw new Error('Positions available for a player go between 1 and 11');
    }

    this.playerFirstName = playerFirstName;
    this.playerLastName = playerLastName;
    this.playerAge = playerAge;
    this.playerPosition = playerPosition;
    this.clubId = clubId || null;
    this.playerId = IdService.generateId();
    this.timeStamp = Date.now();
  }

  getId = () => this.playerId;
  getFirstName = () => this.playerFirstName;
  getLastName = () => this.playerLastName;
  getAge = () => this.playerAge;
  getPosition = () => this.playerPosition;
  getClubId = () => this.clubId;
  getCreatedAt = () => this.timeStamp;
  getUpdatedAt = () => this.timeStamp;
};
