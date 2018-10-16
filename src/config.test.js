const config = require('./config');

test('confirm getData returns data', () =>{
    expect(config.getData()).toBeDefined();
})

test('confirm getData has models', () =>{
    expect(config.getData()).toContain('models');
})