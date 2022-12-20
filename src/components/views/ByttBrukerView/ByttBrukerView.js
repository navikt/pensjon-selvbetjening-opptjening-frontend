import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Input, Label} from "nav-frontend-skjema";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";

import {useHistory, useRouteMatch} from "react-router-dom";

import Alertstripe from "nav-frontend-alertstriper";
import {useTranslation} from "react-i18next";
import "./ByttBrukerView.css"
import {Systemtittel} from "nav-frontend-typografi";
import {isIntegerNumber} from "../../../common/utils";
import {
    getByttBrukerError,
    getByttBrukerLoading,
    getByttBrukerSuccess, getEtternavn, getFornavn, getFullmektigPid, getPid
} from "../../../redux/opptjening/opptjeningSelectors";
import {byttBrukerStarted, resetByttBruker} from "../../../redux/opptjening/opptjeningActions";

export const ByttBrukerView = () => {
    const { t } = useTranslation(['byttbruker']);
    const byttBrukerSuccess = useSelector(getByttBrukerSuccess);
    const byttBrukerError = useSelector(getByttBrukerError);
    const byttBrukerLoading = useSelector(getByttBrukerLoading);
    const pid = useSelector(getPid);
    const fornavn = useSelector(getFornavn);
    const etternavn = useSelector(getEtternavn);

    const fullmektigPid = useSelector(getFullmektigPid);

    const isLoggedInOnBehalf = !!(fullmektigPid && fullmektigPid !== "");
    const dispatch = useDispatch();
    const history = useHistory();
    const match = useRouteMatch();

    const [fnr, setFnr] = useState("");
    const [inputError, setInputError] = useState(null);

    const byttBruker = (event, data, navigateToForside) => {
        const dataWithoutSpace = {
            ...data,
            fullmaktsgiverPid: data.fullmaktsgiverPid.replace(/\s/g, ''),
        };
        if(isFodselsnummerValid(dataWithoutSpace.fullmaktsgiverPid)) {
            if(!byttBrukerLoading)
                dispatch(byttBrukerStarted(dataWithoutSpace, navigateToForside));
        }
    };

    const handleEnterKeyPress = (event) => {
        if(event.key === "Enter"){
            byttBruker(event, {
                "fullmaktsgiverPid": fnr,
                "fullmektigPid": fullmektigPid && fullmektigPid !== "" ? fullmektigPid : pid
            })
        }
    };
    
    const isFodselsnummerValid = (pid) => {
        if(pid===""){
            setInputError(t("byttbruker-input-error-obligatorisk-felt"));
            return false;
        } else if(!isIntegerNumber(pid)){
            setInputError(t("byttbruker-input-error-kan-bare-inneholde-tall"));
            return false
        } else if(pid.length !== 11){
            setInputError(t("byttbruker-input-error-feil-antall-siffer"));
            return false
        }
        setInputError(null);
        return true;
    }

    const navigateToForside = () => {
        dispatch(resetByttBruker());
        const forside = "/" + match.params.lng + "/" + history.location.search;
        history.push(forside);
    }

    return (
        <>
            <Systemtittel className="byttBrukerTitle">
                {t("byttbruker-title")}
            </Systemtittel>
            {t("byttbruker-intro-text")}
                <div className="byttBrukerContent">
                    <Label htmlFor="fnr">{t("byttbruker-fodselsnummer")}</Label>
                    <div className="byttBrukerContainer">
                        <div className="byttBrukerInputContainer">
                            <Input
                                id="fnr"
                                name="fnr"
                                value={fnr}
                                onChange={(event) => setFnr(event.target.value)}
                                onKeyUp={handleEnterKeyPress}
                                feil={inputError ? inputError : null}
                                bredde="fullbredde"
                            />
                        </div>
                        <div className="byttBrukerButtonContainer">
                            <Hovedknapp
                                bredde="L"
                                onClick={(event) => byttBruker(event, {
                                    "fullmaktsgiverPid": fnr,
                                    "fullmektigPid": fullmektigPid && fullmektigPid !== "" ? fullmektigPid : pid
                                }, navigateToForside)}
                            >
                                {t("byttbruker-bytt-bruker")}
                            </Hovedknapp>
                        </div>
                    </div>
                    { !byttBrukerSuccess && isLoggedInOnBehalf &&
                        <>
                            <div className="elementWrapper">
                                <Hovedknapp bredde="L" onClick={navigateToForside}>
                                    {t("byttbruker-sok-paa-vegne-av", {"name": fornavn + " " + etternavn})}
                                </Hovedknapp>
                            </div>
                            <div className="elementWrapper">
                                <Knapp
                                    bredde="L"
                                    onClick={(event) => {
                                        byttBruker(event, {
                                            "fullmaktsgiverPid": fullmektigPid,
                                            "fullmektigPid": fullmektigPid
                                        }, navigateToForside);
                                        }
                                    }
                                >
                                    {t("byttbruker-sok-som-deg-selv")}
                                </Knapp>
                            </div>
                        </>
                    }
                    { !byttBrukerSuccess && !isLoggedInOnBehalf &&
                        <div className="elementWrapper">
                            <Hovedknapp bredde="L" onClick={navigateToForside}>
                                {t("byttbruker-sok-som-deg-selv")}
                            </Hovedknapp>
                        </div>
                    }
                    { !inputError && byttBrukerError &&
                        <div className="elementWrapper">
                            <div id="soknad-alder-error">
                                <Alertstripe type="feil">
                                    {t(byttBrukerError.message)}
                                </Alertstripe>
                            </div>
                        </div>
                    }
                </div>
        </>
    )
}
