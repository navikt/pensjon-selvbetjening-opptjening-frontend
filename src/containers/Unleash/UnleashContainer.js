import React, {useEffect} from "react";
import { useDispatch, useSelector, shallowEqual} from 'react-redux';
import {fetchUnleashStarted} from "../../redux/unleash/unleashActions";
import {getUnleashLoading, getUnleashError} from "../../redux/unleash/unleashSelectors"
import NavFrontendSpinner from "nav-frontend-spinner";
import {useTranslation} from "react-i18next";
import Alertstripe from "nav-frontend-alertstriper";

export const UnleashContainer = (props) => {
    const { t } = useTranslation();
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
        return (
            <div className="contentWrapper" data-testid="unleash-error">
                <Alertstripe type="feil">{t(unleashError.message)}</Alertstripe>
            </div>
        )
    }

    return <>{children}</>
};
