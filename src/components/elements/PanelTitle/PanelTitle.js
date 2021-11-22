import React from "react";
import "./PanelTitle.less";

export const PanelTitle = (props) => {
    const {id, type, titleString, illustrationClass, illustration, animationFinished} = props;
    const titleClass = type === "lenkepanel" ? "lenkepanel__heading" : "";

    return(
        <div className="titleContainer">
            {illustration && <img src={illustration} className={illustrationClass} alt=""/>}
            <h2 animation-finished={animationFinished} id={id} className={titleClass + " typo-undertittel"}>{titleString}</h2>
        </div>
    )
};
