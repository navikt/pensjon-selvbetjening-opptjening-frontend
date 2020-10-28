import React, {useEffect} from "react";
import { useDispatch, useSelector, shallowEqual} from 'react-redux';
import {fetchUnleashStarted} from "../../redux/unleash/unleashActions";
import {getUnleashLoading, getUnleashError} from "../../redux/unleash/unleashSelectors"
import NavFrontendSpinner from "nav-frontend-spinner";

export const UnleashContainer = (props) => {
    const {children} = props;
    const unleashLoading = useSelector(getUnleashLoading, shallowEqual);
    const unleashError = useSelector(getUnleashError, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUnleashStarted());
    }, [dispatch]);

    if(unleashLoading){
        return (
            <div className="loadingSpinner" data-testid="unleash-loading"><NavFrontendSpinner/></div>
        )
    }

    if(unleashError){
        console.log(unleashError);
    }

    return <>{children}</>
};
