const IdService = require('../../../helpers/generate-id.helper');

module.exports = class Player {
  constructor(playerFieldsRecieved) {
    const playerProps = [
      'playerFirstName',
      'playerLastName',
      'playerAge',
      'playerPosition',
    ];

    // TO RECIEVE: OBJECT
    if (
      typeof playerFieldsRecieved == 'undefined' ||
      playerFieldsRecieved?.constructor?.name != 'Object'
    ) {
      throw new Error('Must provide a valid object to initialize entity');
    }

    const validFields = Object.keys(playerFieldsRecieved).filter(
      (fieldRecieved) => playerProps.includes(fieldRecieved)
    );

    // RECIEVED HAS AT LEAST ONE VALID PROP
    if (!validFields.length) {
      throw new Error('No valid property was found to start player creation');
    }

    const {
      playerFirstName,
      playerLastName,
      playerAge,
      playerPosition,
      clubId,
    } = playerFieldsRecieved;

    // NAME AND LASTNAME: STRING NOT EMPTY
    if (
      typeof playerFirstName != 'string' ||
      typeof playerLastName != 'string'
    ) {
      throw new Error('Player firstname and lastname must be of type: string');
    }
    if (!playerFirstName.trim() || !playerLastName.trim()) {
      throw new Error('Player must have firstname and lastname');
    }

    // NAME AND LASTNAME: VALID
    if (/[^A-Za-z]/.test(playerFirstName)) {
      throw new Error('Invalid firstname');
    }
    if (/[^A-Za-z]/.test(playerLastName)) {
      throw new Error('Invalid lastname');
    }

    // AGE AND POSITION: NUMBERS
    if (typeof playerAge != 'number' || typeof playerPosition != 'number') {
      throw new Error('Player age and position must be of type: number');
    }

    // AGE AND POSITION: VALID
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
  getPClubId = () => this.clubId;
  getCreatedAt = () => this.timeStamp;
  getUpdatedAt = () => this.timeStamp;
};
