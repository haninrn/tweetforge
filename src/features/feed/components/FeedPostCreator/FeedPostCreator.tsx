import { ExpandMore } from '@mui/icons-material';
import React, {useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import GlobeSVG from '../../../../components/SVGs/GlobeSVG';
import MediaSVG from '../../../../components/SVGs/MediaSVG';
import GIFSVG from '../../../../components/SVGs/GIFSVG';
import PollSVG from '../../../../components/SVGs/PollSVG';
import EmojiSVG from '../../../../components/SVGs/EmojiSVG';
import ScheduleSVG from '../../../../components/SVGs/ScheduleSVG';
import LocationSVG from '../../../../components/SVGs/LocationSVG';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/Store';
import { createPoll, createPost, createPostWithMedia, initializeCurrentPost, updateCurrentPost, updateCurrentPostImages } from '../../../../redux/Slices/PostSlice';
import { Post } from '../../../../utils/GlobalInterfaces';
import defaultPfp from '../../../../assets/default_pfp.webp';

import './FeedPostCreator.css';
import { FeedPostCreatorProgress } from '../FeedPostCreatorProgress/FeedPostCreatorProgress';
import { FeedPostAudienceDropDown } from '../FeedPostAudienceDropDown/FeedPostAudienceDropDown';
import { FeedPostReplyRestrictionDropDown } from '../FeedPostReplyRestrictionDropDown/FeedPostReplyRestrictionDropDown';
import { FeedPostCreatorImages } from '../FeedPostCreatorImages/FeedPostCreatorImages';
import { updateDisplayEmojis, updateDisplayGif, updateDisplaySchedule } from '../../../../redux/Slices/ModalSlice';
import { FeedPostCreatorPoll } from '../FeedPostCreatorPoll/FeedPostCreatorPoll';
import { EmojiDropDown } from '../../../../components/EmojiDropDown/EmojiDropDown';
import { convertPostContentToElements } from '../../../../utils/EmojiUtils';
import { CreatePostTextArea } from '../../../post/compontents/CreatePostTextArea/CreatePostTextArea';
import { CreatePostButtonCluster } from '../../../post/compontents/CreatePostButtonCluster/CreatePostButtonCluster';


export const FeedPostCreator:React.FC = () => {

    const state = useSelector((state:RootState) => state);
    const displayEmojis = useSelector((state:RootState) => state.modal.displayEmojis);
    const dispatch:AppDispatch = useDispatch();

    const activate = (e:React.MouseEvent<HTMLDivElement>) => {
        if(!state.post.currentPost && state.user.loggedIn){
            let p:Post = {
                postId: 0,
                content: "",
                author: state.user.loggedIn,
                likes: [],
                replies: [],
                images: [],
                reposts: [],
                views: [],
                bookmarks: [],
                scheduled: false,
                audience: 'EVERYONE',
                replyRestriction: 'EVERYONE'
            }

            dispatch(
                initializeCurrentPost(p)
            )
        } 
    }

    const submitPost = () => {
        if(state.post.currentPost && state.user.loggedIn){
            if(state.post.currentPostImages.length === 0){
                let poll = undefined;
                if(state.post.currentPost.poll !== undefined && state.post.currentPost.images.length < 1){
                    poll = JSON.parse(JSON.stringify(state.post.currentPost.poll));
                    console.log("there is a poll");
                    let timeString = state.post.currentPost.poll.endTime;
                    console.log(timeString);
                    let days = timeString.split(":")[0];
                    let hours = timeString.split(":")[1];
                    let minutes = timeString.split(":")[2];
                    let endTime = new Date();
                    endTime.setDate(endTime.getDate() + (+days));
                    endTime.setHours(endTime.getHours() + (+hours));
                    endTime.setMinutes(endTime.getMinutes() + (+minutes));
                    poll = {
                        ...poll,
                        endTime: `${endTime.getFullYear()}-${endTime.getMonth()}-${endTime.getDate()} ${endTime.getHours()}:${endTime.getMinutes()}`
                    }
                    
                }

                let body = {
                    content: state.post.currentPost.content,
                    author: state.post.currentPost.author,
                    images: state.post.currentPost.images,
                    poll,
                    replies: [],
                    scheduled: state.post.currentPost.scheduled,
                    scheduledDate: state.post.currentPost.scheduledDate,
                    audience: state.post.currentPost.audience,
                    replyRestriction: state.post.currentPost.replyRestriction,
                    token: state.user.token
                }

                console.log(body);

                dispatch(createPost(body));
            } else {

                let body = {
                    content: state.post.currentPost.content,
                    author: state.post.currentPost.author,
                    replies: [],
                    scheduled: state.post.currentPost.scheduled,
                    scheduledDate: state.post.currentPost.scheduledDate,
                    audience: state.post.currentPost.audience,
                    replyRestriction: state.post.currentPost.replyRestriction,
                    token: state.user.token,
                    images: [],
                    poll: undefined,
                    imageFiles: state.post.currentPostImages
                }
                dispatch(createPostWithMedia(body));
            }
            
        }
    }

    const generateButtonClass = ():string => {
        if(state.post.currentPost){
            let content:string = state.post.currentPost.content;
            return content !== '' || state.post.currentPostImages.length > 0 || (state.post.currentPost && state.post.currentPost.images.length >= 1) || (state.post.currentPost && state.post.currentPost.poll !== undefined) ? "feed-post-creator-post-button post-active" : "feed-post-creator-post-button";
            //return (state.post.currentPost && state.post.currentPost.content) !== '' || state.post.currentPostImages.length > 0 || (state.post.currentPost && state.post.currentPost.images.length >= 1) || (state.post.currentPost && state.post.currentPost.poll !== undefined)? "feed-post-creator-post-button post-active" : "feed-post-creator-post-button";
        }

        return "feed-post-creator-post-button";

    }

    const activateButton = ():boolean => {
        if(state.post.currentPost){
            let content:string = state.post.currentPost.content;
            return !(content !== '' || state.post.currentPostImages.length > 0 || (state.post.currentPost && state.post.currentPost.images.length >= 1) || (state.post.currentPost && state.post.currentPost.poll !== undefined));
        } 

        return false; 
    }

    return(
        <div className="feed-post-creator" onClick={activate}>
            <Link to="">
                <img className="feed-post-creator-pfp" src={state.user.loggedIn && state.user.loggedIn.profilePicture ? state.user.loggedIn.profilePicture.imageURL : defaultPfp} alt={'users pfp'}/>
            </Link>
            <div className="feed-post-creator-right">
                {state.post.currentPost ? <FeedPostAudienceDropDown /> : <></>}
                <CreatePostTextArea location='post'/>
                {(state.post.currentPostImages.length > 0 || (state.post.currentPost && state.post.currentPost.images.length > 0)) && <FeedPostCreatorImages />}
                {(state.post.currentPost && state.post.currentPost.poll) && <FeedPostCreatorPoll />}
                {state.post.currentPost ? <FeedPostReplyRestrictionDropDown /> : <></>}
                <div className={state.post.currentPost ? "feed-post-creator-bottom-icons icons-border" : "feed-post-creator-bottom-icons"}>
                    <CreatePostButtonCluster />
                    <div className="feed-post-creator-submit-cluster">
                        {
                            state.post.currentPost && (state.post.currentPost.content !== '') ? <div className="feed-post-creator-submit-cluster-left">
                                <FeedPostCreatorProgress percent={(state.post.currentPost ? state.post.currentPost.content.length/256 : 0) * 100} />
                                <span className="feed-post-creator-submit-cluster-divider"></span>
                                <div className="feed-post-creator-submit-cluster-add">
                                    +
                                </div>
                            </div>
                            : <></>
                        }
                        <button 
                            
                            className={generateButtonClass()}
                            disabled={activateButton()}
                            onClick={submitPost}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
            {displayEmojis && state.post.currentPost && <EmojiDropDown />}
        </div>
    )
}