import React, {useEffect} from "react";
import { useDispatch, useSelector, shallowEqual} from 'react-redux';
import {fetchOpptjeningStarted} from "../../redux/opptjening/opptjeningActions";
import {getOpptjeningLoading, getOpptjeningError} from "../../redux/opptjening/opptjeningSelectors"
import NavFrontendSpinner from "nav-frontend-spinner";
import {useTranslation} from "react-i18next";
import Alertstripe from "nav-frontend-alertstriper";
import "./OpptjeningContainer.css"
import {LoginPanel} from "../../components/elements/LoginPanel/LoginPanel";

export const OpptjeningContainer = (props) => {
    const { t } = useTranslation();
    const {children} = props;
    const opptjeningLoading = useSelector(getOpptjeningLoading, shallowEqual);
    const opptjeningError = useSelector(getOpptjeningError, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOpptjeningStarted());
    }, [dispatch]);

    if(opptjeningError){
        if(opptjeningError.message === "error-status-401") {
            //401 - Unauthorized - Click to login
            return (
                <main className="contentWrapper">
                    <LoginPanel/>
                </main>
            )
        } else {
            return (
                <main className="contentWrapper">
                    <div data-testid="opptjening-error">
                        <Alertstripe type="feil">{t(opptjeningError.message)}</Alertstripe>
                    </div>
                </main>
            )
        }
    }

    if(opptjeningLoading){
        return (
            <div className="loadingSpinner" data-testid="opptjening-loading"><NavFrontendSpinner/></div>
        )
    }

    return <>{children}</>
};
