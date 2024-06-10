import React, {useEffect, useMemo, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/Store';
import TagPeopleSVG from '../../../../components/SVGs/TagPeopleSVG';
import ListsSVG from '../../../../components/SVGs/ListsSVG';
import './FeedPostCreatorImages.css';
import { FeedPostCreatorImage } from '../FeedPostCreatorImage/FeedPostCreatorImage';
import { createImageContainer, displayTagPeople } from '../../utils/FeedUtils';
import { updateDisplayEditPostImages, updateDisplayTagPeople } from '../../../../redux/Slices/ModalSlice';

export const FeedPostCreatorImages:React.FC = () => {

    const postState = useSelector((state:RootState) => state.post);

    const dispatch:AppDispatch = useDispatch();

    const postImageContainer = useMemo(() => createImageContainer(postState.currentPostImages), [postState.currentPostImages]);
    const replyImageContainer = useMemo(() => createImageContainer(postState.currentReplyImages), [postState.currentReplyImages]);

    const toggleTagPeopleModal = () => {
        dispatch(updateDisplayTagPeople());
    }

    const toggleDescriptionModal = () => {
        dispatch(updateDisplayEditPostImages());
    }

    return(
        <div className="feed-post-creator-images">
            {postState.currentPost && postState.currentPost.images.length === 0 &&
                postImageContainer
            }
            {postState.currentReply && postState.currentReply.images.length === 0 &&
                replyImageContainer
            }
            {(postState.currentPost?.images.length !== 0 && postState.currentReply?.images.length !== 0) &&
                <div className="feed-post-creator-images-container container-odd">
                    <FeedPostCreatorImage
                        image={postState.currentPost?.images[0].imageURL ? postState.currentPost.images[0].imageURL : (postState.currentReply?.images ? postState.currentReply.images[0].imageURL : '')}
                        name={postState.currentPost?.images[0].imageURL ? postState.currentPost.images[0].imageURL : (postState.currentReply?.images ? postState.currentReply.images[0].imageURL : '')}
                        type={'gif'}
                        displayCloseIcon={true}
                    />
                </div>
            }
            <div className="feed-post-creator-images-options">
                {displayTagPeople(postState, toggleTagPeopleModal)}
                <p className="feed-post-creator-images-option" onClick={toggleDescriptionModal}>
                    <ListsSVG width={16} height={16} color={"#536471"}/>
                    Add Description
                </p>
            </div>
        </div>
    )
}