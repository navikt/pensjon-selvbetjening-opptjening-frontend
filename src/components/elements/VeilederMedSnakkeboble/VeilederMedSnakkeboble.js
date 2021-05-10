import React from "react";
import veilederSvg from "../../../assets/veileder.svg";
import Veileder from "nav-frontend-veileder";
import './VeilederMedSnakkeboble.less';

export const VeilederMedSnakkeboble = (props) => {
    const { veilederText, type } = props;

    return (
        <div className="veilederContainer" data-testid="veilederContainer">
            <Veileder type={type} tekst={veilederText} posisjon="høyre">
                <img alt="" src={veilederSvg}/>
            </Veileder>
        </div>
    )
};
