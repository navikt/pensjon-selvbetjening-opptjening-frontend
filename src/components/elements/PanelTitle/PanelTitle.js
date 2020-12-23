import React from "react";
import "./PanelTitle.less";

export const PanelTitle = (props) => {
    const {id, type, titleString, illustrationClass, illustration} = props;
    const titleClass = type === "lenkepanel" ? "lenkepanel__heading" : "";

    return(
        <div role="heading" aria-level="2" className="titleContainer">
            {illustration && <img src={illustration} className={illustrationClass} alt=""/>}
            <div id={id} className={titleClass + " typo-undertittel"}>{titleString}</div>
        </div>
    )
};
