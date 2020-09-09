import * as selectors from '../opptjeningSelectors'
import mock from '../../../__mocks__/mock'

const initialState = selectors.initialState;
const mockedState = {
    opptjening:{
        ...mock,
        opptjeningLoading: false
    }
};

it('should return selector values for the initial state', (state = initialState) => {
    expect(selectors.getOpptjening(state)).toEqual(null);
    expect(selectors.getOpptjeningLoading(state)).toEqual(true);
    expect(selectors.getOpptjeningError(state)).toEqual(undefined);
    expect(selectors.getOpptjeningData(state)).toEqual({});
    expect(selectors.getYearArray(state)).toEqual([]);
    expect(selectors.getOpptjeningByYear(state)).toEqual(null);
    expect(selectors.getLatestPensjonsBeholdning(state)).toEqual({
        year: undefined,
        beholdning: null
    });
    expect(selectors.getInntekter(state)).toEqual([]);
});

it('should return opptjening', () => {
    const opptjening = selectors.getOpptjening(mockedState);
    const loading = selectors.getOpptjeningLoading(mockedState);
    const error = selectors.getOpptjeningError(mockedState);

    expect(loading).toEqual(false);
    expect(error).toEqual(undefined);

    expect(opptjening).toHaveProperty("opptjeningData");
    expect(opptjening.opptjeningData).toHaveProperty("1971");
    expect(opptjening.opptjeningData).toHaveProperty("2020");
});

it('should return opptjeningData', () => {
    const opptjeningData = selectors.getOpptjeningData(mockedState);
    expect(opptjeningData).toHaveProperty("1971");
    expect(opptjeningData).toHaveProperty("2020");
});


it('should return array of years', () => {
    const yearArray = selectors.getYearArray(mockedState);
    expect(yearArray.length).not.toBe(0);
    expect((yearArray)[0]).toEqual("1971");
    expect((yearArray)[yearArray.length-1]).toEqual("2020");
});

it('should return opptjening for year 2018', () => {
    const opptjening2018 = selectors.getOpptjeningByYear(mockedState, 2018);
    expect(opptjening2018.pensjonsgivendeInntekt).toBe(543827);
    expect(opptjening2018.endringOpptjening.length).toBe(4);
});

it('should return the pensjonsbeholdning from latest year', () => {
    const latestPensjonsBeholdning = selectors.getLatestPensjonsBeholdning(mockedState);
    expect(latestPensjonsBeholdning.year).toBe("2020");
    expect(latestPensjonsBeholdning.beholdning).toBe(0);
});

it('should return array of inntekter for all years', () => {
    const inntekter = selectors.getInntekter(mockedState);
    const totalInntekter = inntekter.length;
    expect(totalInntekter).not.toBe(0);
    expect(inntekter[totalInntekter-3].year).toBe("2018");
    expect(inntekter[totalInntekter-3].pensjonsgivendeInntekt).toBe(543827);
});







