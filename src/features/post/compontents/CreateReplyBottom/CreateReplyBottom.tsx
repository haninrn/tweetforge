import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/Store';
import { createReply, createReplyWithMedia } from '../../../../redux/Slices/PostSlice';

import './CreateReplyBottom.css';
import { CreatePostButtonCluster } from '../CreatePostButtonCluster/CreatePostButtonCluster';
import { EmojiDropDown } from '../../../../components/EmojiDropDown/EmojiDropDown';
import { FeedPostCreatorProgress } from '../../../feed/components/FeedPostCreatorProgress/FeedPostCreatorProgress';
import { updateDisplayCreateReply } from '../../../../redux/Slices/ModalSlice';

export const CreateReplyBottom:React.FC = () => {

    const displayEmojis = useSelector((state:RootState) => state.modal.displayEmojis);
    const postState = useSelector((state:RootState) => state.post);
    const token = useSelector((state:RootState) => state.user.token);
    const dispatch:AppDispatch = useDispatch();

    const generateButtonClass = ():string => {
        if(postState.currentReply){
            let content:string = postState.currentReply.replyContent;
            return content !== '' || postState.currentReplyImages.length > 0 || (postState.currentReply.images.length >= 1)  ? "submit-reply-button reply-button-active" : "submit-reply-button reply-button-inactive";
            //return (state.post.currentPost && state.post.currentPost.content) !== '' || state.post.currentPostImages.length > 0 || (state.post.currentPost && state.post.currentPost.images.length >= 1) || (state.post.currentPost && state.post.currentPost.poll !== undefined)? "feed-post-creator-post-button post-active" : "feed-post-creator-post-button";
        }

        return "submit-reply-button reply-button-inactive";

    }

    const activateButton = ():boolean => {
        if(postState.currentReply){
            let content:string = postState.currentReply.replyContent;
            return !(content !== '' || postState.currentReplyImages.length > 0 || (postState.currentReply.images.length >= 1));
        } 

        return false; 
    }

    const postReply = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(postState.currentReply && postState.currentReplyImages.length === 0){
            dispatch(createReply({
                reply: postState.currentReply,
                token
            }));
            dispatch(updateDisplayCreateReply())
        } else if(postState.currentReply && postState.currentReplyImages.length > 0) {
            /*
                { "author" : { "userId": 1 }, "originalPost": 1, "replyContent": "test reply with media", "images" : [], "scheduled": false, "scheduledDate" : null, "poll" : null }
            */
            dispatch(createReplyWithMedia({
                author: postState.currentReply.author,
                originalPost: postState.currentReply.originalPost.postId,
                replyContent: postState.currentReply.replyContent,
                images: postState.currentReplyImages,
                // scheduled: postState.currentReply.scheduled,
                // scheduledDate: postState.currentReply.scheduledDate,
                // poll: postState.currentReply.poll,
                token
            }))
            dispatch(updateDisplayCreateReply());
        }
    } 

    return (
        <div className="create-reply-bottom">
            <CreatePostButtonCluster />
            <div className="create-reply-submit-group">
                {postState.currentReply && postState.currentReply.replyContent !== "" && 
                    <FeedPostCreatorProgress percent={(postState.currentReply ? postState.currentReply.replyContent.length/256 : 0) * 100} />
                }
                <button className={generateButtonClass()} disabled={activateButton()} onClick={postReply}>Reply</button>
            </div>
            {displayEmojis && postState.currentReply && <EmojiDropDown />}
        </div>
    )
}