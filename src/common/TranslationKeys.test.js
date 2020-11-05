import {compareJsonKeys} from "./TranslationKeys";

it('Check all keys are same in all languages', () => {
     expect(compareJsonKeys()).toEqual(true);
});