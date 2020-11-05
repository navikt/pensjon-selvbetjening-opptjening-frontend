import React from "react";
import {useSelector} from "react-redux";
import {getToggleStatus} from "../../../redux/unleash/unleashSelectors";

export const FeatureToggle = (props) => {
    const {children, featureName, enabled} = props;
    const feature = useSelector((state) => getToggleStatus(state, featureName));

    if(feature === enabled) return <>{children}</>;
    return null;
};
