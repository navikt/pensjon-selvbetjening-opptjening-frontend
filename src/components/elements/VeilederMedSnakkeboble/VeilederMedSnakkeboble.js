import React from "react";
import veilederSvg from "../../../assets/veileder.svg";
import Veileder from "nav-frontend-veileder";
import './VeilederMedSnakkeboble.css';

export const VeilederMedSnakkeboble = (props) => {
    const { veilederText } = props;

    return (
        <div className="veilederContainer" data-testid="veilederContainer">
            <Veileder tekst={veilederText} posisjon="høyre">
                <img alt="" src={veilederSvg}/>
            </Veileder>
        </div>
    )
};
