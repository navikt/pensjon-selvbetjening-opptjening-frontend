import React from "react";
import {useTranslation} from "react-i18next";
import {Knapp} from "nav-frontend-knapper";
import {useHistory, useRouteMatch} from "react-router-dom";
import {ExpandableDescription} from "../ExpandableDescription/ExpandableDescription";
import {useSelector} from "react-redux";
import {getFullmektigPid} from "../../../redux/opptjening/opptjeningSelectors";
import './ByttBruker.css';

export const ByttBruker = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const match = useRouteMatch();
    const fullmektigPid = useSelector(getFullmektigPid);

    return (
        <div className="byttBrukerLinkContainer">
            {fullmektigPid && fullmektigPid !== "" &&
                <Knapp className="margin1remupdown displayBlock" kompakt ={true} onClick={() => history.push(match.url + "bytt-bruker/" + history.location.search)}>
                    {t("byttbruker:byttbruker-velg-en-annen-fullmaktsgiver-eller-deg-selv")}
                </Knapp>
            }
            {(!fullmektigPid || fullmektigPid === "") &&
                <ExpandableDescription title="byttbruker:byttbruker-opptjening-paa-vegne-av-annen">
                    <div>
                        {t("byttbruker:byttbruker-opptjening-paa-vegne-av-annen-text")}
                        {/* eslint-disable-next-line no-useless-concat */}
                        <Knapp className="margin1remupdown displayBlock" kompakt={true} onClick={() => history.push(match.url + "bytt-bruker/" + history.location.search)}>
                            {t("byttbruker:byttbruker-opptjening-paa-vegne-av-en-annen")}
                        </Knapp>
                    </div>
                </ExpandableDescription>
            }
        </div>
    )
};
