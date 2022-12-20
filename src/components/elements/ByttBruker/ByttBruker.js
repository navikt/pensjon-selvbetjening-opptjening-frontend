import React from "react";
import {useTranslation} from "react-i18next";
import {Knapp} from "nav-frontend-knapper";
import {useHistory, useRouteMatch} from "react-router-dom";
import {ExpandableDescription} from "../ExpandableDescription/ExpandableDescription";

export const ByttBruker = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const match = useRouteMatch();
    //const fullmektigPid = useSelector(getFullmektigPid);
    const fullmektigPid = "00000000000";

    return (
        <div className="byttBrukerLinkContainer">
            {fullmektigPid && fullmektigPid !== "" &&
                <Knapp className="margin1remupdown displayBlock" onClick={() => history.push(match.url + "bytt-bruker/" + history.location.search)}>
                    {t("byttbruker:byttbruker-velg-en-annen-fullmaktsgiver-eller-deg-selv")}
                </Knapp>
            }
            {(!fullmektigPid || fullmektigPid === "") &&
                <ExpandableDescription title="byttbruker:byttbruker-soke-paa-vegne-av-andre">
                    <div>
                        {t("byttbruker:byttbruker-soke-paa-vegne-av-andre-text")}
                        {/* eslint-disable-next-line no-useless-concat */}
                        <Knapp className="margin1remupdown displayBlock" onClick={() => history.push(match.url + "bytt-bruker/" + history.location.search)}>
                            {t("byttbruker:byttbruker-sok-paa-vegne-av-en-annen")}
                        </Knapp>
                    </div>
                </ExpandableDescription>
            }
        </div>
    )
};
