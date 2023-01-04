import React, {useState} from "react";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import {Normaltekst} from "nav-frontend-typografi";
import "./ExpandableDescription.css"
import {useTranslation} from "react-i18next";

export const ExpandableDescription = (props) => {
    const { children, title} = props;
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="expandableDescription">
            <Ekspanderbartpanel
                apen={isOpen}
                border={false}
                onClick={
                    () => {
                        setIsOpen(!isOpen)
                    }
                }
                tittel={<Normaltekst>{t(title)}</Normaltekst>}>
                {children}
            </Ekspanderbartpanel>
        </div>
    )
}
