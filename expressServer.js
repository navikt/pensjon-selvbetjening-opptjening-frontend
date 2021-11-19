const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";
console.log("hosted directory: ",__dirname);

fs.readdirSync(__dirname+"/build").forEach(file => {
    console.log(file);
});

app.use(function (req, res, next) {
    console.log("The file " + req.url + " was requested.");
    next();
});

app.get('/ping', (req, res) => {
    console.log("request ping ");
    res.send('pong');
});

app.use("/pensjon/opptjening", express.static( 'build')); //handles static prefix from react "homepage"

app.get('/pensjon/opptjening/api/opptjening', (req, res) => {
    console.log('serves opptjening data')
    const opptjeningresponse = {
        "opptjeningData": {
            "1989": {
                "pensjonsgivendeInntekt": 0,
                "pensjonsbeholdning": null,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": 0,
                "merknader": [
                    "INGEN_OPPTJENING"
                ],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": null
            },
            "1990": {
                "pensjonsgivendeInntekt": 0,
                "pensjonsbeholdning": null,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": 0,
                "merknader": [
                    "INGEN_OPPTJENING"
                ],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": null
            },
            "1991": {
                "pensjonsgivendeInntekt": 0,
                "pensjonsbeholdning": null,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": 0,
                "merknader": [
                    "INGEN_OPPTJENING"
                ],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": null
            },
            "1992": {
                "pensjonsgivendeInntekt": 0,
                "pensjonsbeholdning": null,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": 0,
                "merknader": [
                    "INGEN_OPPTJENING"
                ],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": null
            },
            "1993": {
                "pensjonsgivendeInntekt": 0,
                "pensjonsbeholdning": null,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": 0,
                "merknader": [
                    "INGEN_OPPTJENING"
                ],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": null
            },
            "1994": {
                "pensjonsgivendeInntekt": 0,
                "pensjonsbeholdning": null,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": 0,
                "merknader": [
                    "INGEN_OPPTJENING"
                ],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": null
            },
            "1995": {
                "pensjonsgivendeInntekt": 0,
                "pensjonsbeholdning": null,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": 0,
                "merknader": [
                    "INGEN_OPPTJENING"
                ],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": null
            },
            "1996": {
                "pensjonsgivendeInntekt": 0,
                "pensjonsbeholdning": null,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [
                    "INGEN_OPPTJENING"
                ],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": null
            },
            "1997": {
                "pensjonsgivendeInntekt": 0,
                "pensjonsbeholdning": null,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [
                    "INGEN_OPPTJENING"
                ],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": null
            },
            "1998": {
                "pensjonsgivendeInntekt": 99700,
                "pensjonsbeholdning": 0,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": null
            },
            "1999": {
                "pensjonsgivendeInntekt": 80300,
                "pensjonsbeholdning": 0,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": null
            },
            "2000": {
                "pensjonsgivendeInntekt": 70300,
                "pensjonsbeholdning": 18862,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": null
            },
            "2001": {
                "pensjonsgivendeInntekt": 33300,
                "pensjonsbeholdning": 34802,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": null
            },
            "2002": {
                "pensjonsgivendeInntekt": 82800,
                "pensjonsbeholdning": 49714,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": null
            },
            "2003": {
                "pensjonsgivendeInntekt": 104600,
                "pensjonsbeholdning": 58638,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": null
            },
            "2004": {
                "pensjonsgivendeInntekt": 86860,
                "pensjonsbeholdning": 77402,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": null
            },
            "2005": {
                "pensjonsgivendeInntekt": 225147,
                "pensjonsbeholdning": 100078,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": null
            },
            "2006": {
                "pensjonsgivendeInntekt": 197329,
                "pensjonsbeholdning": 119624,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": null
            },
            "2007": {
                "pensjonsgivendeInntekt": 231258,
                "pensjonsbeholdning": 165989,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": null
            },
            "2008": {
                "pensjonsgivendeInntekt": 248212,
                "pensjonsbeholdning": 212556,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": null
            },
            "2009": {
                "pensjonsgivendeInntekt": 20989,
                "pensjonsbeholdning": 268408,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": null
            },
            "2010": {
                "pensjonsgivendeInntekt": 98780,
                "pensjonsbeholdning": 342955,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [
                    "REFORM"
                ],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": [
                    {
                        "dato": "2009-12-31",
                        "arsakType": "INNGAENDE",
                        "arsakDetails": [
                            "BEHOLDNING_2010"
                        ],
                        "endringBelop": null,
                        "grunnlag": null,
                        "grunnlagTypes": null,
                        "pensjonsbeholdningBelop": 268407.692140259,
                        "uttaksgrad": 0
                    },
                    {
                        "dato": "2010-01-01",
                        "arsakType": "INNGAENDE_2010",
                        "arsakDetails": [],
                        "endringBelop": 62033.0662177633,
                        "grunnlag": 248212,
                        "grunnlagTypes": [
                            "INNTEKT_GRUNNLAG"
                        ],
                        "pensjonsbeholdningBelop": 330440.7583580223,
                        "uttaksgrad": 0
                    },
                    {
                        "dato": "2010-05-01",
                        "arsakType": "REGULERING",
                        "arsakDetails": [
                            "REGULERING_2010"
                        ],
                        "endringBelop": 12513.775786119,
                        "grunnlag": null,
                        "grunnlagTypes": null,
                        "pensjonsbeholdningBelop": 342954.5341441413,
                        "uttaksgrad": 0
                    }
                ]
            },
            "2011": {
                "pensjonsgivendeInntekt": 126124,
                "pensjonsbeholdning": 363356,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [
                    "DAGPENGER"
                ],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": [
                    {
                        "dato": "2010-12-31",
                        "arsakType": "INNGAENDE",
                        "arsakDetails": null,
                        "endringBelop": null,
                        "grunnlag": null,
                        "grunnlagTypes": null,
                        "pensjonsbeholdningBelop": 342954.534144141,
                        "uttaksgrad": 0
                    },
                    {
                        "dato": "2011-01-01",
                        "arsakType": "OPPTJENING",
                        "arsakDetails": [
                            "OPPTJENING_2011"
                        ],
                        "endringBelop": 3990.79020871872,
                        "grunnlag": 20989,
                        "grunnlagTypes": [
                            "INNTEKT_GRUNNLAG"
                        ],
                        "pensjonsbeholdningBelop": 346945.32435285975,
                        "uttaksgrad": 0
                    },
                    {
                        "dato": "2011-05-01",
                        "arsakType": "REGULERING",
                        "arsakDetails": [
                            "REGULERING"
                        ],
                        "endringBelop": 16410.5138418903,
                        "grunnlag": null,
                        "grunnlagTypes": null,
                        "pensjonsbeholdningBelop": 363355.8381947501,
                        "uttaksgrad": 0
                    }
                ]
            },
            "2012": {
                "pensjonsgivendeInntekt": 29050,
                "pensjonsbeholdning": 406990,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [
                    "DAGPENGER"
                ],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": [
                    {
                        "dato": "2011-12-31",
                        "arsakType": "INNGAENDE",
                        "arsakDetails": null,
                        "endringBelop": null,
                        "grunnlag": null,
                        "grunnlagTypes": null,
                        "pensjonsbeholdningBelop": 363355.83819475,
                        "uttaksgrad": 0
                    },
                    {
                        "dato": "2012-01-01",
                        "arsakType": "OPPTJENING",
                        "arsakDetails": [
                            "OPPTJENING_2012"
                        ],
                        "endringBelop": 29226.0852216399,
                        "grunnlag": 152307.692307692,
                        "grunnlagTypes": [
                            "DAGPENGER_GRUNNLAG"
                        ],
                        "pensjonsbeholdningBelop": 392581.9234163899,
                        "uttaksgrad": 0
                    },
                    {
                        "dato": "2012-05-01",
                        "arsakType": "REGULERING",
                        "arsakDetails": [
                            "REGULERING"
                        ],
                        "endringBelop": 14407.7565893815,
                        "grunnlag": null,
                        "grunnlagTypes": null,
                        "pensjonsbeholdningBelop": 406989.6800057714,
                        "uttaksgrad": 0
                    }
                ]
            },
            "2013": {
                "pensjonsgivendeInntekt": 8420,
                "pensjonsbeholdning": 458050,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": [
                    {
                        "dato": "2012-12-31",
                        "arsakType": "INNGAENDE",
                        "arsakDetails": null,
                        "endringBelop": null,
                        "grunnlag": null,
                        "grunnlagTypes": null,
                        "pensjonsbeholdningBelop": 406989.680005772,
                        "uttaksgrad": 0
                    },
                    {
                        "dato": "2013-01-01",
                        "arsakType": "OPPTJENING",
                        "arsakDetails": [
                            "OPPTJENING_2012"
                        ],
                        "endringBelop": 34291.9368717766,
                        "grunnlag": 180000,
                        "grunnlagTypes": [
                            "DAGPENGER_GRUNNLAG"
                        ],
                        "pensjonsbeholdningBelop": 441281.6168775486,
                        "uttaksgrad": 0
                    },
                    {
                        "dato": "2013-05-01",
                        "arsakType": "REGULERING",
                        "arsakDetails": [
                            "REGULERING"
                        ],
                        "endringBelop": 16768.7014413468,
                        "grunnlag": null,
                        "grunnlagTypes": null,
                        "pensjonsbeholdningBelop": 458050.31831889536,
                        "uttaksgrad": 0
                    }
                ]
            },
            "2014": {
                "pensjonsgivendeInntekt": 23960,
                "pensjonsbeholdning": 480319,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": [
                    {
                        "dato": "2013-12-31",
                        "arsakType": "INNGAENDE",
                        "arsakDetails": null,
                        "endringBelop": null,
                        "grunnlag": null,
                        "grunnlagTypes": null,
                        "pensjonsbeholdningBelop": 458050.318318895,
                        "uttaksgrad": 0
                    },
                    {
                        "dato": "2014-01-01",
                        "arsakType": "OPPTJENING",
                        "arsakDetails": [
                            "OPPTJENING_2012"
                        ],
                        "endringBelop": 5264.90262370414,
                        "grunnlag": 27692.3076923077,
                        "grunnlagTypes": [
                            "DAGPENGER_GRUNNLAG"
                        ],
                        "pensjonsbeholdningBelop": 463315.2209425991,
                        "uttaksgrad": 0
                    },
                    {
                        "dato": "2014-05-01",
                        "arsakType": "REGULERING",
                        "arsakDetails": [
                            "REGULERING"
                        ],
                        "endringBelop": 17003.6686085933,
                        "grunnlag": null,
                        "grunnlagTypes": null,
                        "pensjonsbeholdningBelop": 480318.8895511924,
                        "uttaksgrad": 0
                    }
                ]
            },
            "2015": {
                "pensjonsgivendeInntekt": 13480,
                "pensjonsbeholdning": 491171,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": [
                    {
                        "dato": "2014-12-31",
                        "arsakType": "INNGAENDE",
                        "arsakDetails": null,
                        "endringBelop": null,
                        "grunnlag": null,
                        "grunnlagTypes": null,
                        "pensjonsbeholdningBelop": 480318.889551193,
                        "uttaksgrad": 0
                    },
                    {
                        "dato": "2015-01-01",
                        "arsakType": "OPPTJENING",
                        "arsakDetails": [
                            "OPPTJENING_2012"
                        ],
                        "endringBelop": 1599.46979092198,
                        "grunnlag": 8420,
                        "grunnlagTypes": [
                            "INNTEKT_GRUNNLAG"
                        ],
                        "pensjonsbeholdningBelop": 481918.35934211494,
                        "uttaksgrad": 0
                    },
                    {
                        "dato": "2015-05-01",
                        "arsakType": "REGULERING",
                        "arsakDetails": [
                            "REGULERING"
                        ],
                        "endringBelop": 9252.83249936864,
                        "grunnlag": null,
                        "grunnlagTypes": null,
                        "pensjonsbeholdningBelop": 491171.1918414836,
                        "uttaksgrad": 0
                    }
                ]
            },
            "2016": {
                "pensjonsgivendeInntekt": 0,
                "pensjonsbeholdning": 509423,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": [
                    {
                        "dato": "2015-12-31",
                        "arsakType": "INNGAENDE",
                        "arsakDetails": null,
                        "endringBelop": null,
                        "grunnlag": null,
                        "grunnlagTypes": null,
                        "pensjonsbeholdningBelop": 491171.191841483,
                        "uttaksgrad": 0
                    },
                    {
                        "dato": "2016-01-01",
                        "arsakType": "OPPTJENING",
                        "arsakDetails": [
                            "OPPTJENING_2012"
                        ],
                        "endringBelop": 4472.80608306735,
                        "grunnlag": 23960,
                        "grunnlagTypes": [
                            "INNTEKT_GRUNNLAG"
                        ],
                        "pensjonsbeholdningBelop": 495643.9979245504,
                        "uttaksgrad": 0
                    },
                    {
                        "dato": "2016-05-01",
                        "arsakType": "REGULERING",
                        "arsakDetails": [
                            "REGULERING"
                        ],
                        "endringBelop": 13778.9031423025,
                        "grunnlag": null,
                        "grunnlagTypes": null,
                        "pensjonsbeholdningBelop": 509422.90106685285,
                        "uttaksgrad": 0
                    }
                ]
            },
            "2017": {
                "pensjonsgivendeInntekt": 3000,
                "pensjonsbeholdning": 517783,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": [
                    {
                        "dato": "2016-12-31",
                        "arsakType": "INNGAENDE",
                        "arsakDetails": null,
                        "endringBelop": null,
                        "grunnlag": null,
                        "grunnlagTypes": null,
                        "pensjonsbeholdningBelop": 509422.901066853,
                        "uttaksgrad": 0
                    },
                    {
                        "dato": "2017-01-01",
                        "arsakType": "OPPTJENING",
                        "arsakDetails": [
                            "OPPTJENING_2012"
                        ],
                        "endringBelop": 2523.55516424645,
                        "grunnlag": 13480,
                        "grunnlagTypes": [
                            "INNTEKT_GRUNNLAG"
                        ],
                        "pensjonsbeholdningBelop": 511946.4562310995,
                        "uttaksgrad": 0
                    },
                    {
                        "dato": "2017-05-01",
                        "arsakType": "REGULERING",
                        "arsakDetails": [
                            "REGULERING"
                        ],
                        "endringBelop": 5836.18960103457,
                        "grunnlag": null,
                        "grunnlagTypes": null,
                        "pensjonsbeholdningBelop": 517782.64583213406,
                        "uttaksgrad": 0
                    }
                ]
            },
            "2018": {
                "pensjonsgivendeInntekt": 0,
                "pensjonsbeholdning": 535750,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": [
                    {
                        "dato": "2017-12-31",
                        "arsakType": "INNGAENDE",
                        "arsakDetails": null,
                        "endringBelop": null,
                        "grunnlag": null,
                        "grunnlagTypes": null,
                        "pensjonsbeholdningBelop": 517782.645832134,
                        "uttaksgrad": 0
                    },
                    {
                        "dato": "2018-01-01",
                        "arsakType": "OPPTJENING",
                        "arsakDetails": [
                            "OPPTJENING_2012"
                        ],
                        "endringBelop": 0,
                        "grunnlag": 0,
                        "grunnlagTypes": [
                            "NO_GRUNNLAG"
                        ],
                        "pensjonsbeholdningBelop": 517782.645832134,
                        "uttaksgrad": 0
                    },
                    {
                        "dato": "2018-05-01",
                        "arsakType": "REGULERING",
                        "arsakDetails": [
                            "REGULERING"
                        ],
                        "endringBelop": 17967.05781037506,
                        "grunnlag": null,
                        "grunnlagTypes": null,
                        "pensjonsbeholdningBelop": 535749.7036425091,
                        "uttaksgrad": 0
                    }
                ]
            },
            "2019": {
                "pensjonsgivendeInntekt": null,
                "pensjonsbeholdning": 552778,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": ["UFOREGRAD"],
                "restpensjon": null,
                "maksUforegrad": 50,
                "endringOpptjening": [
                    {
                        "dato": "2018-12-31",
                        "arsakType": "INNGAENDE",
                        "arsakDetails": null,
                        "endringBelop": null,
                        "grunnlag": null,
                        "grunnlagTypes": null,
                        "pensjonsbeholdningBelop": 535749.7036425091,
                        "uttaksgrad": 0
                    },
                    {
                        "dato": "2019-01-01",
                        "arsakType": "OPPTJENING",
                        "arsakDetails": [
                            "OPPTJENING_2012"
                        ],
                        "endringBelop": 563.9609963676063,
                        "grunnlag": 3000,
                        "grunnlagTypes": [
                            "INNTEKT_GRUNNLAG",
                            "DAGPENGER_GRUNNLAG",
                            "UFORE_GRUNNLAG",
                            "FORSTEGANGSTJENESTE_GRUNNLAG"
                        ],
                        "pensjonsbeholdningBelop": 536313.6646388767,
                        "uttaksgrad": 0,
                        "uforegrad": 50
                    },
                    {
                        "dato": "2019-05-01",
                        "arsakType": "REGULERING",
                        "arsakDetails": [
                            "REGULERING"
                        ],
                        "endringBelop": 16464.82950441353,
                        "grunnlag": null,
                        "grunnlagTypes": null,
                        "pensjonsbeholdningBelop": 552778.4941432902,
                        "uttaksgrad": 0
                    }
                ]
            },
            "2020": {
                "pensjonsgivendeInntekt": null,
                "pensjonsbeholdning": 552778,
                "omsorgspoeng": null,
                "omsorgspoengType": null,
                "pensjonspoeng": null,
                "merknader": [],
                "restpensjon": null,
                "maksUforegrad": 0,
                "endringOpptjening": [
                    {
                        "dato": "2019-12-31",
                        "arsakType": "INNGAENDE",
                        "arsakDetails": null,
                        "endringBelop": null,
                        "grunnlag": null,
                        "grunnlagTypes": null,
                        "pensjonsbeholdningBelop": 552778.4941432902,
                        "uttaksgrad": 0
                    },
                    {
                        "dato": "2020-01-01",
                        "arsakType": "OPPTJENING",
                        "arsakDetails": [
                            "OPPTJENING_2012"
                        ],
                        "endringBelop": 0,
                        "grunnlag": 0,
                        "grunnlagTypes": [
                            "NO_GRUNNLAG"
                        ],
                        "pensjonsbeholdningBelop": 552778.4941432902,
                        "uttaksgrad": 0
                    }
                ]
            }
        },
        "numberOfYearsWithPensjonspoeng": null,
        "fodselsaar": 1972,
        "fornavn": "Test",
        "mellomnavn": "TESTER",
        "etternavn": "TESTESEN",
        "andelPensjonBasertPaBeholdning": 10
    };

    res.json(opptjeningresponse);
});

app.get('/*', function (req, res, next) {
    if(req.url==="/pensjon/opptjening/api/opptjening") {
        console.log('double tap')
        next();
    }
    console.log('sends html from ', path.join(__dirname, 'build', 'index.html'))
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, HOST, () => console.log(`Server listening on port: ${PORT}`));