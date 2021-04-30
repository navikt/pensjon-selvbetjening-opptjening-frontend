export const constructOpptjening = (props) => {
    return {
        merknader: props.merknader != null ? props.merknader : [],
        pensjonsgivendeInntekt: props.pensjonsgivendeInntekt,
        pensjonsbeholdning: props.pensjonsbeholdning,
        omsorgspoeng: props.omsorgspoeng,
        omsorgspoengType: props.omsorgspoengType,
        pensjonspoeng: props.pensjonspoeng,
        restpensjon: props.restpensjon,
        maksUforegrad: props.maksUforegrad,
        endringOpptjening: props.endringOpptjening != null ? props.endringOpptjening : []
    }
}

export const constructInntekt = (props) => {
    return {
        year: props.year,
        pensjonsgivendeInntekt: props.pensjonsgivendeInntekt
    }
}

export const constructEndringOpptjening = (props) => {
    return {
        dato: props.dato,
        arsakType: props.arsakType,
        endringBelop: props.endringBelop,
        grunnlag: props.grunnlag,
        grunnlagTypes: props.grunnlagTypes,
        pensjonsbeholdningBelop: props.pensjonsbeholdningBelop,
        uttaksgrad: props.uttaksgrad,
    }
}

export const mockBasicInntektState = (count, startYear) => {
    const inntekter = []
    for (let year = startYear; year < startYear + count; year++) {
        inntekter.push(constructInntekt({
            year: year,
            pensjonsgivendeInntekt: Math.random() * 100000
        }))
    }
    return {inntekter: inntekter}
}

export const mockBasicEndringOpptjeningList = (year) => {
    const endringList = []
    const arsakTypes = ["INNGAENDE", "OPPTJENING", "REGULERING", "UTTAK"]
    arsakTypes.forEach(arsakType => {
        endringList.push(constructEndringOpptjening({
                dato: year + "-03-05",
                arsakType: arsakType,
                endringBelop: Math.random() * 1000,
                grunnlag: arsakType === "OPPTJENING" ? Math.random() * 1000 : null,
                grunnlagTypes: arsakType === "OPPTJENING" ? ["INNTEKT_GRUNNLAG"] : [],
                pensjonsbeholdningBelop: Math.random() * 100000,
                uttaksgrad: 0
            }
        ))
    })

    return endringList
}

export const mockErrorState = () => {
    return {
        opptjening: {
            opptjeningLoading: false,
            opptjeningError: {
                message: "ERROR"
            }
        }
    }
}

export const mockLoadingState = () => {
    return {
        opptjening: {
            opptjeningLoading: true
        }
    }
}

export const mockBasicSuccessState = (opptjeningCount, fodselsaar) => {
    const opptjeningData = {};
    const startYear = fodselsaar + 18;
    for (let year = startYear; year < startYear + opptjeningCount; year++) {
        opptjeningData[year] = constructOpptjening({
            merknader: [],
            pensjonsgivendeInntekt: Math.random() * 10000,
            pensjonsbeholdning: Math.random() * 100000,
            omsorgspoeng: null,
            omsorgspoengType: null,
            pensjonspoeng: Math.random() * 10,
            restpensjon: Math.random() * 1000,
            maksUforegrad: 0,
            endringOpptjening: mockBasicEndringOpptjeningList(year)
        })
    }

    return {
        opptjening: {
            opptjening: {
                opptjeningData: opptjeningData,
                numberOfYearsWithPensjonspoeng: null,
                fodselsaar: fodselsaar,
                fornavn: "Test",
                mellomnavn: "Tester",
                etternavn: "Testesen"
            },
            opptjeningLoading: false
        }
    }
}
export const mockStateFromOpptjeningData = (startYear, opptjeningList, fodselsaar = 1972) =>{
    const opptjeningData ={}
    opptjeningList.forEach(opptjening =>{
        opptjeningData[startYear] = opptjening
        startYear++
    })
    return {
        opptjening: {
            opptjening: {
                opptjeningData: opptjeningData,
                fodselsaar: fodselsaar
            }
        }

    }
}
