import * as selectors from '../opptjeningSelectors'
import mock from '../../../__mocks__/mock'

const mockedState = {
    opptjening:{
        ...mock,
        opptjeningLoading: false
    }
};

it('should return selector values for the initial state', () => {
    expect(selectors.getOpptjening()).toEqual(null);
    expect(selectors.getOpptjeningLoading()).toEqual(true);
    expect(selectors.getOpptjeningError()).toEqual(undefined);
    expect(selectors.getOpptjeningData()).toEqual({});
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

it('should return array of beholdning', () => {
    const beholdningArray = selectors.getPensjonsBeholdningArray(mockedState);
    expect(beholdningArray.length).not.toBe(0);
    expect((beholdningArray)[0]).toEqual(null);
    expect((beholdningArray)[beholdningArray.length-1]).toEqual(552778);
});


it('should return array of years', () => {
    const yearArray = selectors.getYearArray(mockedState);
    expect(yearArray.length).not.toBe(0);
    expect((yearArray)[0]).toEqual("1989");
    expect((yearArray)[yearArray.length-1]).toEqual("2020");
});

it('should return inntekt for year 2016', () => {
    const opptjening2018 = selectors.getOpptjeningByYear(mockedState, 2017);
    expect(opptjening2018.pensjonsgivendeInntekt).toBe(3000);
    expect(opptjening2018.endringOpptjening.length).toBe(3);
});

it('should return the pensjonsbeholdning from latest year', () => {
    const latestPensjonsBeholdning = selectors.getLatestPensjonsBeholdning(mockedState);
    expect(latestPensjonsBeholdning.year).toBe("2020");
    expect(latestPensjonsBeholdning.beholdning).toBe(552778);
});

it('should return array of inntekter for all years', () => {
    const inntekter = selectors.getInntekter(mockedState);
    const totalInntekter = inntekter.length;
    expect(totalInntekter).not.toBe(0);
    expect(inntekter[totalInntekter-3].year).toBe("2018");
    expect(inntekter[totalInntekter-3].pensjonsgivendeInntekt).toBe(0);
});







