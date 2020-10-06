import React, {useEffect} from "react";
import { useDispatch, useSelector, shallowEqual} from 'react-redux';
import {fetchOpptjeningStarted} from "../../redux/opptjening/opptjeningActions";
import {getOpptjeningLoading, getOpptjeningError} from "../../redux/opptjening/opptjeningSelectors"
import NavFrontendSpinner from "nav-frontend-spinner";
import {useTranslation} from "react-i18next";
import Alertstripe from "nav-frontend-alertstriper";

export const OpptjeningContainer = (props) => {
    const { t } = useTranslation();
    const {children} = props;
    const opptjeningLoading = useSelector(getOpptjeningLoading, shallowEqual);
    const opptjeningError = useSelector(getOpptjeningError, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOpptjeningStarted());
    }, [dispatch]);

    if(opptjeningLoading){
        return (
            <div className="loadingSpinner"><NavFrontendSpinner/></div>
        )
    }

    if(opptjeningError){
        return (
            <div className="contentWrapper">
                <Alertstripe type="feil">{t(opptjeningError.message)}</Alertstripe>
            </div>
        )
    }

    return <>{children}</>
};
