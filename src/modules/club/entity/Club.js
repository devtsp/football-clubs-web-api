const IdService = require('../../../helpers/generate-id.helper');

module.exports = class Club {
  constructor(clubData) {
    // expected keys in incoming data
    const expectedKeys = ['clubName', 'clubTLA', 'clubCrestURL'];

    // recieve object
    if (
      typeof clubData == 'undefined' ||
      clubData?.constructor?.name != 'Object'
    ) {
      throw new Error('Invalid value recieved. Type expected: Object');
    }

    // at least one valid key
    const incomingKeys = Object.keys(clubData);
    const validKeys = incomingKeys.filter((key) => expectedKeys.includes(key));
    if (!validKeys.length) {
      throw new Error('No valid property was found to start club creation');
    }

    const { clubName, clubTLA, clubCrestURL } = clubData;

    // name tla and crest of type string
    if (
      typeof clubName != 'string' ||
      typeof clubTLA != 'string' ||
      typeof clubCrestURL != 'string'
    ) {
      throw new Error('Club name, tla and crest url must be of type: String');
    }

    // not empty strings
    if (!clubName.trim()) {
      throw new Error('Club must have a name');
    }
    if (!clubTLA.trim()) {
      throw new Error('Club must have a TLA');
    }
    if (!clubCrestURL.trim()) {
      throw new Error('Club must have a crest');
    }

    // valid name
    if (/[^A-Za-z ']/.test(clubName)) {
      throw new Error('Invalid club name');
    }

    // valid tla
    if (/[\d\W]/.test(clubTLA) || clubTLA.length !== 3) {
      throw new Error('Club TLA must be 3 alphabetic characters');
    }

    // valid crest url
    if (
      !/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/.test(
        clubCrestURL
      )
    ) {
      throw new Error('Club crest has to be a valid URL');
    }

    this.clubName = clubName;
    this.clubTLA = clubTLA;
    this.clubCrestURL = clubCrestURL;
    this.clubId = IdService.generateId();
    this.timeStamp = Date.now();
  }

  getId = () => this.clubId;
  getName = () => this.clubName;
  getTLA = () => this.clubTLA;
  getCrestURL = () => this.clubCrestURL;
  getCreatedAt = () => this.timeStamp;
  getUpdatedAt = () => this.timeStamp;
};
