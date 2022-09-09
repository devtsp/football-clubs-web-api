const Player = require('../entity/Player');

const fakeFields = {
  playerFirstName: 'Connor',
  playerLastName: 'McGregor',
  playerAge: 28,
  playerPosition: 9,
};

describe('>> Player', () => {
  test('Throws if not object passed as an argument', () => {
    expect(() => new Player(null)).toThrow(
      'Must provide a valid object to initialize entity'
    );

    expect(() => new Player(undefined)).toThrow(
      'Must provide a valid object to initialize entity'
    );

    expect(() => new Player([])).toThrow(
      'Must provide a valid object to initialize entity'
    );

    expect(() => new Player(123)).toThrow(
      'Must provide a valid object to initialize entity'
    );

    expect(() => new Player('')).toThrow(
      'Must provide a valid object to initialize entity'
    );

    expect(() => new Player(true)).toThrow(
      'Must provide a valid object to initialize entity'
    );
  });

  test('Throws if not valid key present ', () => {
    expect(
      () => new Player({ someRandomProp: false, anotherNotRequiredProp: [] })
    ).toThrow('No valid property was found to start player creation');
  });

  test('Autogenerates an Id', () => {
    expect(new Player(fakeFields).getId()).toBeDefined();
  });

  test('firstname and lastname must be of type "string"', () => {
    expect(() => new Player({ ...fakeFields, playerFirstName: null })).toThrow(
      'Player firstname and lastname must be of type: string'
    );

    expect(
      () => new Player({ ...fakeFields, playerFirstName: undefined })
    ).toThrow('Player firstname and lastname must be of type: string');

    expect(() => new Player({ ...fakeFields, playerFirstName: 123 })).toThrow(
      'Player firstname and lastname must be of type: string'
    );

    expect(() => new Player({ ...fakeFields, playerLastName: null })).toThrow(
      'Player firstname and lastname must be of type: string'
    );

    expect(
      () => new Player({ ...fakeFields, playerLastName: undefined })
    ).toThrow('Player firstname and lastname must be of type: string');

    expect(() => new Player({ ...fakeFields, playerLastName: 123 })).toThrow(
      'Player firstname and lastname must be of type: string'
    );
  });

  test('Must have a first name and lastname (no empty strings)', () => {
    expect(() => new Player({ ...fakeFields, playerFirstName: '' })).toThrow(
      'Player must have firstname and lastname'
    );

    expect(() => new Player({ ...fakeFields, playerLastName: '' })).toThrow(
      'Player must have firstname and lastname'
    );
  });

  test('Must have a valid first name and lastname (only alphabetic chars)', () => {
    expect(() => new Player({ ...fakeFields, playerFirstName: '123' })).toThrow(
      'Invalid firstname'
    );
    expect(
      () => new Player({ ...fakeFields, playerLastName: '23523' })
    ).toThrow('Invalid lastname');
  });
});
