import React, {useEffect} from "react";
import { useDispatch, useSelector, shallowEqual} from 'react-redux';
import {fetchOpptjeningStarted} from "../../redux/opptjening/opptjeningActions";
import {getOpptjeningLoading, getOpptjeningError} from "../../redux/opptjening/opptjeningSelectors"
import NavFrontendSpinner from "nav-frontend-spinner";

export const OpptjeningContainer = (props) => {
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
        console.log("Error: " + opptjeningError.message);
        return (
            <div></div>
        )
    }

    return <>{children}</>
};
