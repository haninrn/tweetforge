import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/Store';
import VerifiedIcon from '@mui/icons-material/Verified';
import { convertPostContentToElements } from '../../../../utils/EmojiUtils';

import CircleIcon from '@mui/icons-material/Circle';
import defaultPfp from '../../../../assets/default_pfp.webp';
import './CreateReplyBody.css'
import { convertPostedDateToString } from '../../utils/PostUtils';
import { CreatePostTextArea } from '../CreatePostTextArea/CreatePostTextArea';
import { initializeCurrentReply } from '../../../../redux/Slices/PostSlice';
import { FeedPostCreatorImages } from '../../../feed/components/FeedPostCreatorImages/FeedPostCreatorImages';
import { FeedPostCreatorPoll } from '../../../feed/components/FeedPostCreatorPoll/FeedPostCreatorPoll';
import { EmojiDropDown } from '../../../../components/EmojiDropDown/EmojiDropDown';

export const CreateReplyBody:React.FC = () => {

    const feedPost = useSelector((state:RootState) => state.feed.currentPost);
    const postState = useSelector((state:RootState) => state.post);
    const user = useSelector((state:RootState) => state.user.loggedIn);
    const displayEmojis = useSelector((state:RootState) => state.modal.displayEmojis);

    const dispatch:AppDispatch = useDispatch();

    useEffect(() => {
        if(feedPost && user && !postState.currentPost){
            console.log(feedPost);
            dispatch(initializeCurrentReply({
                post: feedPost,
                user
            }))
        }

        console.log(postState.currentPost);
    }, [feedPost?.postId, user?.userId, postState.currentPost?.images])

    return (
        <div className="create-reply-body">
            {feedPost && 
                <div className="create-reply-body-post">
                    <div className="create-reply-body-post-left">
                        <img className="create-reply-body-post-pfp" src={feedPost.author.profilePicture ? feedPost.author.profilePicture.imageURL : defaultPfp}
                            alt={`${feedPost.author.nickname}'s pfp`} />
                        <div className="create-reply-body-post-divider"></div>
                    </div>
                    <div className="create-reply-body-post-right">
                        <div className="create-reply-body-post-top-right">
                            <p className="create-reply-body-post-nickname">{feedPost.author.nickname}</p>
                            {feedPost.author.verifiedAccount && <VerifiedIcon sx={{
                                color:"#1DA1F2",
                                width: "20px",
                                height: "20px"
                            }}/>
                            }
                            {feedPost.author.organization && <img className="post-organization" src={feedPost.author.organization.imageURL} alt={`${feedPost.author.username}'s organization`} />}
                            <p className="create-reply-body-post-username">@{feedPost.author.username}</p>
                            <CircleIcon sx={{height:'2px', width:'2px', color:'#657786'}} />
                            {feedPost.postedDate && <p className="create-reply-body-posted-date">{convertPostedDateToString(feedPost.postedDate)}</p>}
                        </div>
                        <div className="create-reply-body-post-bottom-right">
                            <div className="create-reply-body-post-content">
                                {convertPostContentToElements(feedPost.content, "post")}
                            </div>
                            <p className="create-reply-body-post-replying-to">
                                Replying to <span className="create-reply-body-post-replying-to-user">@{feedPost.author.username}</span>
                            </p>
                        </div>
                    </div>
                </div>
            }
            <div className="create-reply-body-reply">
                {   postState.currentReply ? 
                    <>
                        <div className="create-reply-body-reply-content-group">
                            <img className="create-reply-body-post-pfp" style={{marginTop:'8px'}} src={user && user.profilePicture ? user.profilePicture.imageURL : defaultPfp} alt={user ? `${user.username}'s pfp` : 'users pfp'} />
                            <div className="create-reply-body-post-reply">
                                <CreatePostTextArea location='reply'/>
                            </div>
                        </div>
                        
                        {(postState.currentReplyImages.length > 0 || (postState.currentReply.images.length > 0)) && <FeedPostCreatorImages />}
                        {(postState.currentReply.poll) && <FeedPostCreatorPoll />}
                    </>
                    : <></>
                }
            </div>
        </div>
    )
}