const content = require('./populate-content');

test('Test that prepare content adequately prepares the card array', () =>{
    expect(content.prepareContent('models')[0]).toBeDefined();
})

test('Test that prepareContent returns null if passed bad keyword', () => {
    expect(content.prepareContent('banana').length).toBeLessThanOrEqual(0);
})

test('test new populate content', () => {
    console.dir(content.prepareContent('models')[0].innerHTML);
})