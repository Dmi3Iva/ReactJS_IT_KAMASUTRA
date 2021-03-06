import React, {useEffect, useState} from 'react';
import Description from "./Description";
import {connect} from "react-redux";
import {getStatus, updateStatus} from "../../../redux/profile-reducer";

const DescriptionContainerWithHooks = (props) => {

    let [editMode, setStateEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(()=>{
        props.getStatus(props.profile.userId)
        setStatus(props.status);
    }, [props.status]);

    const onChangeStatus =(status) =>{
        setStatus(status)
    }

    const setAboutMe = () =>{
        props.updateStatus(status);
        setStateEditMode(false);
    }

    const setEditMode = (editModeState) =>
    {
        setStateEditMode(editModeState)
    }

        return (
            <Description
                profile={props.profile}
                status={status}
                editMode={editMode}
                onChangeStatus={onChangeStatus}
                setStatus={setAboutMe}
                setEditMode={setEditMode}
                isOwner={props.isOwner}
            />
        );
}

const mapStateToProps = (state)=>{
    return {
        profile: state.ProfilePage.profile,
        status: state.ProfilePage.status
    }
};
export default connect(mapStateToProps, {getStatus, updateStatus})(DescriptionContainerWithHooks);
