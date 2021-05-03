import * as selectors from '../opptjeningSelectors'
import {
    constructOpptjening,
    mockBasicSuccessState,
    mockStateFromOpptjeningData
} from "../../../__mocks__/mockDataGenerator";

const mockedState = mockBasicSuccessState(32, 1971)
const mockOpptjeningData = mockedState.opptjening.opptjening.opptjeningData
const keys = Object.keys(mockOpptjeningData)

it('should return selector values for the initial state', () => {
    expect(selectors.getOpptjening()).toEqual(null);
    expect(selectors.getOpptjeningLoading()).toEqual(true);
    expect(selectors.getOpptjeningError()).toEqual(undefined);
    expect(selectors.getOpptjeningData()).toEqual({});
    expect(selectors.getOpptjeningDataWithoutNullYears()).toEqual({});
    expect(selectors.getPensjonsBeholdningArray()).toEqual([]);
    expect(selectors.getYearArray()).toEqual([]);
    expect(selectors.getOpptjeningByYear()).toEqual(null);
    expect(selectors.getLatestPensjonsBeholdning()).toEqual({
        year: undefined,
        beholdning: null
    });
    expect(selectors.getInntekter()).toEqual([]);
    expect(selectors.getFornavn()).toEqual(null);
    expect(selectors.getMellomnavn()).toEqual(null);
    expect(selectors.getEtternavn()).toEqual(null);

});

it('should return opptjening', () => {
    const opptjening = selectors.getOpptjening(mockedState);
    const loading = selectors.getOpptjeningLoading(mockedState);
    const error = selectors.getOpptjeningError(mockedState);

    expect(loading).toEqual(false);
    expect(error).toEqual(undefined);

    expect(opptjening).toHaveProperty("opptjeningData");
    expect(opptjening.opptjeningData).toHaveProperty("1989");
    expect(opptjening.opptjeningData).toHaveProperty("2020");
});

it('should return opptjeningData', () => {
    const opptjeningData = selectors.getOpptjeningData(mockedState);
    expect(opptjeningData).toHaveProperty("1989");
    expect(opptjeningData).toHaveProperty("2020");
});

it('should return opptjeningData without first years with null pensjonsbeholdning', () => {
    const mockStateWithSeveralBeholdningNull = mockStateFromOpptjeningData(2000, [
        constructOpptjening({pensjonsbeholdning: null}),
        constructOpptjening({pensjonsbeholdning: null}),
        constructOpptjening({pensjonsbeholdning: 2}),
        constructOpptjening({pensjonsbeholdning: 3})
    ])

    const opptjeningData = selectors.getOpptjeningDataWithoutNullYears(mockStateWithSeveralBeholdningNull);

    expect(Object.keys(opptjeningData).length).toBe(2);
    expect(Object.keys(opptjeningData)[0]).toEqual("2002")
    expect(Object.keys(opptjeningData)[1]).toEqual("2003")
});


it('should return array of beholdning and first item should not have null beholdning', () => {
    const expectedFirstBeholdning = 552778
    const mockStateWithFirstBeholdningNull = mockStateFromOpptjeningData(2000, [
        constructOpptjening({pensjonsbeholdning: null}),
        constructOpptjening({pensjonsbeholdning: expectedFirstBeholdning})
    ])


    const beholdningArray = selectors.getPensjonsBeholdningArray(mockStateWithFirstBeholdningNull);

    expect(beholdningArray.length).toBe(1);
    expect((beholdningArray)[0]).toEqual(expectedFirstBeholdning);
});


it('should return array of years, where first year has not null Pensjonsbeholdning', () => {
    const expectedFirstYear = keys[0]
    const expectedLastYear = keys[keys.length - 1]

    const yearArray = selectors.getYearArray(mockedState);

    expect(yearArray.length).not.toBe(0);
    expect((yearArray)[0]).toEqual(expectedFirstYear);
    expect((yearArray)[yearArray.length - 1]).toEqual(expectedLastYear);
});

it('should return inntekt for year 2017', () => {
    const expectedInntektIn2017 = mockOpptjeningData[2017].pensjonsgivendeInntekt
    const expectedEndringIn2017 = mockOpptjeningData[2017].endringOpptjening.length

    const opptjening2017 = selectors.getOpptjeningByYear(mockedState, 2017);

    expect(opptjening2017.pensjonsgivendeInntekt).toBe(expectedInntektIn2017);
    expect(opptjening2017.endringOpptjening.length).toBe(expectedEndringIn2017);
});

it('should return the pensjonsbeholdning from latest year', () => {
    const expectedLatestYear = keys[keys.length - 1]
    const expectedLatestPensjonsbeholdning = mockOpptjeningData[keys[keys.length - 1]].pensjonsbeholdning

    const latestPensjonsBeholdning = selectors.getLatestPensjonsBeholdning(mockedState);

    expect(latestPensjonsBeholdning.year).toBe(expectedLatestYear);
    expect(latestPensjonsBeholdning.beholdning).toBe(expectedLatestPensjonsbeholdning);
});

it('should return array of inntekter for all years', () => {
    const expectedYear = keys[keys.length - 3]
    const expectedPensjonsgivendeInntekt = mockOpptjeningData[expectedYear].pensjonsgivendeInntekt

    const inntekter = selectors.getInntekter(mockedState);
    const totalInntekter = inntekter.length;

    expect(totalInntekter).not.toBe(0);
    expect(inntekter[totalInntekter - 3].year).toBe(expectedYear);
    expect(inntekter[totalInntekter - 3].pensjonsgivendeInntekt).toBe(expectedPensjonsgivendeInntekt);
});

it('should return hasOverforeOmsorgsOpptjeningLink = true when OVERFORE_OMSORGSOPPTJENING exists', () => {
    const mockStateWithOverforeOmsorgsOpptjeningsLink = mockStateFromOpptjeningData(2000, [
        constructOpptjening({merknader: ["OVERFORE_OMSORGSOPPTJENING"]}),
    ]);

    const hasOverforeOmsorgsOpptjeningLink = selectors.hasOverforeOmsorgsOpptjeningLink(mockStateWithOverforeOmsorgsOpptjeningsLink);

    expect(hasOverforeOmsorgsOpptjeningLink).toBeTruthy();
});

it('should return hasOverforeOmsorgsOpptjeningLink = false when OVERFORE_OMSORGSOPPTJENING does not exists', () => {
    const mockStateWithOmsorgsOpptjening = mockStateFromOpptjeningData(2000, [
        constructOpptjening({merknader: ["OMSORGSOPPTJENING"]}),
    ]);

    const hasOverforeOmsorgsOpptjeningLink = selectors.hasOverforeOmsorgsOpptjeningLink(mockStateWithOmsorgsOpptjening);

    expect(hasOverforeOmsorgsOpptjeningLink).toBeFalsy();
});

it('should return hasOverforeOmsorgsOpptjeningLink = true when OVERFORE_OMSORGSOPPTJENING and OMSORGSOPPTJENING exists', () => {
    const mockStateWithOmsorgsOpptjening = mockStateFromOpptjeningData(2000, [
        constructOpptjening({merknader: ["OMSORGSOPPTJENING", "OVERFORE_OMSORGSOPPTJENING"]}),
    ]);

    const hasOverforeOmsorgsOpptjeningLink = selectors.hasOverforeOmsorgsOpptjeningLink(mockStateWithOmsorgsOpptjening);

    expect(hasOverforeOmsorgsOpptjeningLink).toBeTruthy();
});

it('should return hasOmsorgsOpptjening = true for all years ', () => {
    const mockStateWithOmsorgsOpptjening = mockStateFromOpptjeningData(2000, [
        constructOpptjening({merknader: ["OVERFORE_OMSORGSOPPTJENING"]}),
        constructOpptjening({merknader: ["OMSORGSOPPTJENING"]}),
        constructOpptjening({merknader: ["OMSORGSOPPTJENING", "OVERFORE_OMSORGSOPPTJENING"]}),
    ]);

    const omsorgsOpptjeningMap = selectors.getOmsorgsOpptjeningMap(mockStateWithOmsorgsOpptjening);
    expect(omsorgsOpptjeningMap[2000].hasOmsorgsOpptjening).toBeTruthy();
    expect(omsorgsOpptjeningMap[2001].hasOmsorgsOpptjening).toBeTruthy();
    expect(omsorgsOpptjeningMap[2002].hasOmsorgsOpptjening).toBeTruthy();
});

it('should return hasOmsorgsOpptjening = true for all years, except last year', () => {
    const mockStateWithOmsorgsOpptjening = mockStateFromOpptjeningData(2000, [
        constructOpptjening({merknader: ["OVERFORE_OMSORGSOPPTJENING"]}),
        constructOpptjening({merknader: ["OMSORGSOPPTJENING"]}),
        constructOpptjening({merknader: ["OMSORGSOPPTJENING", "OVERFORE_OMSORGSOPPTJENING"]}),
        constructOpptjening({merknader: ["UFORE"]}),
    ]);

    const omsorgsOpptjeningMap = selectors.getOmsorgsOpptjeningMap(mockStateWithOmsorgsOpptjening);
    expect(omsorgsOpptjeningMap[2000].hasOmsorgsOpptjening).toBeTruthy();
    expect(omsorgsOpptjeningMap[2001].hasOmsorgsOpptjening).toBeTruthy();
    expect(omsorgsOpptjeningMap[2002].hasOmsorgsOpptjening).toBeTruthy();
    expect(omsorgsOpptjeningMap[2003].hasOmsorgsOpptjening).toBeFalsy();
});

it('should return fornavn', () => {
    const fornavn = selectors.getFornavn(mockedState);
    expect(fornavn).toEqual("Test");
});
it('should return mellomnavn', () => {
    const mellomnavn = selectors.getMellomnavn(mockedState);
    expect(mellomnavn).toEqual("Tester");
});
it('should return etternavn', () => {
    const etternavn = selectors.getEtternavn(mockedState);
    expect(etternavn).toEqual("Testesen");
});

it('should return user name', () => {
    const name = selectors.getName(mockedState);
    expect(name).toEqual("Test Tester Testesen");
});

it('should return user fornavn and etternavn', () => {
    const mockState = mockStateFromOpptjeningData(2000, [], 1972, "Test", null, "Testesen");
    const name = selectors.getName(mockState);
    expect(name).toEqual("Test Testesen");
});

it('should return user mellomnavn and etternavn', () => {
    const mockState = mockStateFromOpptjeningData(2000, [], 1972, null, "Tester", "Testesen");
    const name = selectors.getName(mockState);
    expect(name).toEqual("Tester Testesen");
});

it('should return user fornavn', () => {
    const mockState = mockStateFromOpptjeningData(2000, [], 1972, "Test", null, null);
    const name = selectors.getName(mockState);
    expect(name).toEqual("Test");
});

it('should return user fornavn and mellomnavn', () => {
    const mockState = mockStateFromOpptjeningData(2000, [], 1972, "Test", "Tester", null);
    const name = selectors.getName(mockState);
    expect(name).toEqual("Test Tester");
});



it('should not return name', () => {
    const mockState = mockStateFromOpptjeningData(2000, [], 1972);
    const name = selectors.getName(mockState);
    expect(name).toEqual(null)
});





