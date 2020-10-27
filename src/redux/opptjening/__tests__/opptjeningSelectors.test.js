import * as selectors from '../opptjeningSelectors'
import {mockBasicSuccessState} from "../../../__mocks__/mockDataGenerator";

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

it('should return opptjeningData without years with null pensjonsbeholdning', () => {
    const opptjeningData = selectors.getOpptjeningDataWithoutNullYears(mockedState);
    expect(opptjeningData).toHaveProperty("1998");
    expect(opptjeningData).toHaveProperty("2020");
});



it('should return array of beholdning and first item should not have null beholdning', () => {
    const beholdningArray = selectors.getPensjonsBeholdningArray(mockedState);
    expect(beholdningArray.length).not.toBe(0);
    expect((beholdningArray)[0]).not.toEqual(null);
    expect((beholdningArray)[beholdningArray.length-1]).toEqual(552778);
});


it('should return array of years, where first year has not null Pensjonsbeholdning', () => {
    const yearArray = selectors.getYearArray(mockedState);

    expect(yearArray.length).not.toBe(0);
    expect((yearArray)[0]).toEqual("1998");
    expect((yearArray)[yearArray.length-1]).toEqual("2020");
});

it('should return inntekt for year 2017', () => {
    const expectedInntektIn2017 = mockOpptjeningData[2017].pensjonsgivendeInntekt
    const expectedEndringIn2017 = mockOpptjeningData[2017].endringOpptjening.length

    const opptjening2017 = selectors.getOpptjeningByYear(mockedState, 2017);

    expect(opptjening2017.pensjonsgivendeInntekt).toBe(expectedInntektIn2017);
    expect(opptjening2017.endringOpptjening.length).toBe(expectedEndringIn2017);
});

it('should return the pensjonsbeholdning from latest year', () => {
    const expectedLatestYear = keys[keys.length-1]
    const expectedLatestPensjonsbeholdning = mockOpptjeningData[keys[keys.length-1]].pensjonsbeholdning

    const latestPensjonsBeholdning = selectors.getLatestPensjonsBeholdning(mockedState);

    expect(latestPensjonsBeholdning.year).toBe(expectedLatestYear);
    expect(latestPensjonsBeholdning.beholdning).toBe(expectedLatestPensjonsbeholdning);
});

it('should return array of inntekter for all years', () => {
    const expectedYear = keys[keys.length-3]
    const expectedPensjonsgivendeInntekt = mockOpptjeningData[expectedYear].pensjonsgivendeInntekt

    const inntekter = selectors.getInntekter(mockedState);
    const totalInntekter = inntekter.length;

    expect(totalInntekter).not.toBe(0);
    expect(inntekter[totalInntekter-3].year).toBe(expectedYear);
    expect(inntekter[totalInntekter-3].pensjonsgivendeInntekt).toBe(expectedPensjonsgivendeInntekt);
});







