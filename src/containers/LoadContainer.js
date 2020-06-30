import React, {useEffect} from "react";
import { useDispatch } from 'react-redux'
import {connect} from "react-redux";
import {fetchOpptjeningStarted} from "../redux/opptjening/opptjeningActions";

const LoadContainer = (props) => {
    const {children, opptjeningLoading, opptjeningError} = props;
    console.log(opptjeningLoading);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchOpptjeningStarted());
    }, []);

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

const mapStateToProps = (state) => {
    return {
        opptjeningLoading: state.opptjening.opptjeningLoading,
        opptjeningError: state.opptjening.opptjeningError

    };
};

export default connect(mapStateToProps)(LoadContainer);
