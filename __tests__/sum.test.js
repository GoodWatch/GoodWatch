import sum from '../client/sum'

xtest('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

xdescribe('Delay test', () => {

    afterEach(() => {
        const wait = async () => {
            await setTimeout(() => console.log("waited"), 2000)
        };
        wait();
    });

    it('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });

    it('adds 2+ 2 to equal 4', () => {
        expect(sum(2, 2)).toBe(4);
    });

    it('adds 3 + 2 to equal 5', () => {
        expect(sum(3, 2)).toBe(5);
    });
    
})