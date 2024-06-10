import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/Store';
import { updateDisplayEditPostImages } from '../../../../redux/Slices/ModalSlice';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './FeedPostCreatorEditImageModalTop.css';

export const FeedPostCreatorEditImageModalTop:React.FC = () => {
    const dispatch:AppDispatch = useDispatch();

    const closeModal = () => {
        dispatch(updateDisplayEditPostImages());
    }

    return(
        <div className="feed-post-creator-edit-image-modal-top">
            <div className="feed-post-creator-edit-image-modal-top-left">
                <div className="feed-post-creator-edit-image-modal-top-back" onClick={closeModal}>
                    <ArrowBackIcon sx={{fontSize: "18px"}} />
                </div>
                <p className="feed-post-creator-edit-image-modal-top-text">Crop media</p>
            </div>
            <button className="feed-post-creator-edit-image-modal-save" onClick={closeModal}>Save</button>
        </div>
    )
}
