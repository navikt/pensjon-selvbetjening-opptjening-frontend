import React, {useEffect} from "react";
import { useDispatch, useSelector, shallowEqual} from 'react-redux';
import {fetchOpptjeningStarted} from "../redux/opptjening/opptjeningActions";
import {getOpptjeningLoading, getOpptjeningError} from "../redux/opptjening/opptjeningSelectors"

export const LoadContainer = (props) => {
    const {children} = props;
    const opptjeningLoading = useSelector(getOpptjeningLoading, shallowEqual);
    const opptjeningError = useSelector(getOpptjeningError, shallowEqual);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchOpptjeningStarted());
    }, [dispatch]);

    if(opptjeningLoading){
        return (
            <div>LASTER</div>
        )
    }

    if(opptjeningError){
        console.log("Error: " + opptjeningError.message);
        return (
            <div>FEIL</div>
        )
    }

    return <>{children}</>
};
