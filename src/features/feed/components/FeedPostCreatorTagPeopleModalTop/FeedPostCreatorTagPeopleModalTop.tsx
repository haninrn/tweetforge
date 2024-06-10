import React from 'react';
import { AppDispatch } from '../../../../redux/Store';
import { useDispatch } from 'react-redux';
import { Close } from '@mui/icons-material';
import { updateDisplayTagPeople } from '../../../../redux/Slices/ModalSlice';

import './FeedPostCreatorTagPeopleModalTop.css';

export const FeedPostCreatorTagPeopleModalTop = () => {
    const dispatch:AppDispatch = useDispatch();

    const closeModal = () => {
        dispatch(updateDisplayTagPeople());
    }

    return(
        <div className="feed-post-creator-tag-people-modal-top">
            <div className="feed-post-creator-tag-people-modal-top-left">
                <div className="feed-post-creator-tag-people-modal-top-close" onClick={closeModal}>
                    <Close sx={{fontSize: "18px"}} />
                </div>               
                <p className="feed-post-creator-tag-people-modal-top-text">
                    Tag People
                </p>
            </div>
            <button className="feed-post-creator-tag-people-modal-done" disabled>Done</button>
        </div>
    )
}