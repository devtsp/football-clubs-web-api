const Club = require('../Club');

const fakeFields = {
  clubName: 'valid',
  clubTLA: 'TLA',
  clubCrestURL: 'http://crest.com/',
};

describe('>> Club', () => {
  test('Throws if not object passed as an argument', () => {
    expect(() => new Club(null)).toThrow(
      'Invalid value recieved. Type expected: Object'
    );

    expect(() => new Club(undefined)).toThrow(
      'Invalid value recieved. Type expected: Object'
    );

    expect(() => new Club([])).toThrow(
      'Invalid value recieved. Type expected: Object'
    );

    expect(() => new Club('')).toThrow(
      'Invalid value recieved. Type expected: Object'
    );

    expect(() => new Club(123)).toThrow(
      'Invalid value recieved. Type expected: Object'
    );
  });

  test('Throws if no valid prop found', () => {
    expect(() => new Club({ someRandomProp: 123 })).toThrow(
      'No valid property was found to start club creation'
    );
  });

  test('Throws if name, tla or crest not of type: String', () => {
    expect(() => new Club({ ...fakeFields, clubName: null })).toThrow(
      'Club name, tla and crest url must be of type: String'
    );

    expect(() => new Club({ ...fakeFields, clubTLA: undefined })).toThrow(
      'Club name, tla and crest url must be of type: String'
    );

    expect(() => new Club({ ...fakeFields, clubCrestURL: 123 })).toThrow(
      'Club name, tla and crest url must be of type: String'
    );
  });

  test('Throws if it founds empty strings', () => {
    expect(() => new Club({ ...fakeFields, clubName: '' })).toThrow(
      'Club must have a name'
    );

    expect(() => new Club({ ...fakeFields, clubTLA: '' })).toThrow(
      'Club must have a TLA'
    );

    expect(() => new Club({ ...fakeFields, clubCrestURL: '' })).toThrow(
      'Club must have a crest'
    );
  });

  test('Throws if invalid club name', () => {
    expect(() => new Club({ ...fakeFields, clubName: '!"# ' })).toThrow(
      'Invalid club name'
    );
  });

  test('Throws if invalid TLA', () => {
    expect(() => new Club({ ...fakeFields, clubTLA: 'asecsd' })).toThrow(
      'Club TLA must be 3 alphabetic characters'
    );

    expect(() => new Club({ ...fakeFields, clubTLA: '123' })).toThrow(
      'Club TLA must be 3 alphabetic characters'
    );
  });

  test('Throws if invalid crest URL', () => {
    expect(() => new Club({ ...fakeFields, clubCrestURL: 'asecsd' })).toThrow(
      'Club crest has to be a valid URL'
    );

    expect(() => new Club({ ...fakeFields, clubCrestURL: '123' })).toThrow(
      'Club crest has to be a valid URL'
    );
  });

  // HAPPY PATH
  test('Returns valid entity instance if valid data passed (autogenerate id and timestamps)', () => {
    const club = new Club(fakeFields);
    expect(club.getName()).toBe(fakeFields.clubName);
    expect(club.getTLA()).toBe(fakeFields.clubTLA);
    expect(club.getCrestURL()).toBe(fakeFields.clubCrestURL);
    expect(club.getId()).toBeDefined();
    expect(club.getCreatedAt()).toBeDefined();
    expect(club.getUpdatedAt()).toBeDefined();
  });
});
