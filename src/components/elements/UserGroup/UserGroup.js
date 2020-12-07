import React from "react";
import {useSelector} from "react-redux";
import {getUserGroup} from "../../../redux/opptjening/opptjeningSelectors";

export const UserGroup = (props) => {
    const {children, userGroups, include} = props;
    const userGroup = useSelector(getUserGroup);

    if(include && userGroups.includes(userGroup)) return <>{children}</>;
    if(!include && !userGroups.includes(userGroup)) return <>{children}</>;
    return null;
};
