import React from 'react';
import { useDispatch } from 'react-redux';
import { updateDisplayCreateReply } from '../../../../redux/Slices/ModalSlice';
import { AppDispatch } from '../../../../redux/Store';

import CloseIcon from '@mui/icons-material/Close';
import './CreateReplyTop.css'
import { setCurrentPost } from '../../../../redux/Slices/FeedSlice';

export const CreateReplyTop:React.FC = () => {

    const dispatch:AppDispatch = useDispatch();
    const toggleReply = () => {
        dispatch(setCurrentPost(undefined));
        dispatch(updateDisplayCreateReply());
    }

    return (
        <div className="create-reply-top">
            <div className="create-reply-top-bottom-bg" onClick={toggleReply}>
                <CloseIcon sx={{height: '20px', width: '20px'}}/>
            </div>
            <div className="create-reply-top-drafts-bg">
                Drafts
            </div>
        </div>
    )
}