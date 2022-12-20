import React, {useState} from "react";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import {Normaltekst} from "nav-frontend-typografi";
import "./ExpandableDescription.css"
import {useTranslation} from "react-i18next";

export const ExpandableDescription = (props) => {
    const { children, title} = props;
    const { t } = useTranslation();
    const expandedInSession = sessionStorage.getItem(title);
    const [isOpen, setIsOpen] = useState(!!expandedInSession);

    return(
        <div className="expandableDescription">
            <Ekspanderbartpanel
                apen={isOpen}
                border={false}
                onClick={
                    (event) => {
                        setIsOpen(!isOpen)
                        sessionStorage.setItem(title, isOpen ? 'false' : 'true');
                    }
                }
                tittel={<Normaltekst>{t(title)}</Normaltekst>}>
                {children}
            </Ekspanderbartpanel>
        </div>
    )
}
