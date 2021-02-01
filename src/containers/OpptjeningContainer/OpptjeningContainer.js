import React, {useEffect} from "react";
import { useDispatch, useSelector, shallowEqual} from 'react-redux';
import {fetchOpptjeningStarted} from "../../redux/opptjening/opptjeningActions";
import {getOpptjeningLoading, getOpptjeningError} from "../../redux/opptjening/opptjeningSelectors"
import NavFrontendSpinner from "nav-frontend-spinner";
import {useTranslation} from "react-i18next";
import Alertstripe from "nav-frontend-alertstriper";
import * as urlHelper from "../../common/urlHelper";
import "./OpptjeningContainer.less"
import Lenke from "nav-frontend-lenker";

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
            <div className="loadingSpinner" data-testid="opptjening-loading"><NavFrontendSpinner/></div>
        )
    }

    if(opptjeningError){
        if(opptjeningError.message === "error-status-401") {
            //401 - Unauthorized - go directly to login - no error message - no "blink"
            return <></>
        } else if (opptjeningError.message === "error-status-418"){
            // 418 - I'm a teapot - to be removed - temporarily redirect to old solution for some users we are missing functionality for (i.e. uttak)
            return (
                <div className="contentWrapper" data-testid="opptjening-error">
                    <Alertstripe type="advarsel">
                        {t(opptjeningError.message)}
                        <br/>
                        <Lenke href={urlHelper.DINEPENSJONSPOENG_URL}>Dine pensjonspoeng</Lenke>
                    </Alertstripe>
                </div>
            )
        } else {
            return (
                <div className="contentWrapper" data-testid="opptjening-error">
                    <Alertstripe type="feil">{t(opptjeningError.message)}</Alertstripe>
                </div>
            )
        }
    }

    return <>{children}</>
};
