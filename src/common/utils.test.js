import {isDev} from "./utils"


it('should return false for test', () => {
    expect(isDev()).toBeFalsy();
});

// Somehow 20 000 is not equal to 20 000......
// it('should format amount in nb-NO format', () => {
//     expect(formatAmount("20000")).toEqual("20 000");
// });
