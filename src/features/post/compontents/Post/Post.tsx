import React, {createElement, useEffect, useMemo, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDisplayCreateReply } from '../../../../redux/Slices/ModalSlice';
import { FeedPost, Post as IPost, User } from '../../../../utils/GlobalInterfaces';
import { convertPostedDateToString } from '../../utils/PostUtils';

import pfp from '../../../../assets/default_pfp.webp';
import ReplyOutlineSVG from '../../../../components/SVGs/ReplyOutlineSVG';
import RepostOutlineSVG from '../../../../components/SVGs/RepostOutlineSVG';
import LikeOutlineSVG from '../../../../components/SVGs/LikeOutlineSVG';
import ViewsSVG from '../../../../components/SVGs/ViewsSVG';
import BookmarkOutlineSVG from '../../../../components/SVGs/BookmarkOutlineSVG';
import ShareSVG from '../../../../components/SVGs/ShareSVG';
import CircleIcon from '@mui/icons-material/Circle';
import VerifiedIcon from '@mui/icons-material/Verified';

import '../../../feed/components/FeedPostCreator/FeedPostCreator.css';
import './Post.css'
import { convertPostContentToElements } from '../../../../utils/EmojiUtils';
import { AppDispatch, RootState } from '../../../../redux/Store';
import { setCurrentPost, updatePost } from '../../../../redux/Slices/FeedSlice';
import { bookmarkPost, initializeCurrentReply, likePost, repostPost, viewPost } from '../../../../redux/Slices/PostSlice';
import { Reply } from '../Reply/Reply';
import { createImageContainer, createPostImageContainer } from '../../../feed/utils/FeedUtils';
import { Link, useNavigate } from 'react-router-dom';
import {PostMore} from '../PostMore/PostMore';

interface PostProps {
    feedPost:FeedPost
}

interface HoverColors {
    reply: string;
    repost: string;
    like: string;
    views: string;
    bookmark: string;
    share: string;
}

export const Post:React.FC<PostProps> = ({feedPost}) => {

    const postRef = useRef<HTMLDivElement>(null);

    const {post, replyTo, repost, repostUser} = feedPost;
    const token = useSelector((state:RootState) => state.user.token);
    const loggedIn = useSelector((state:RootState) => state.user.loggedIn);
    const navigate = useNavigate();

    const dispatch:AppDispatch = useDispatch();

    const postImageContainer = useMemo(() => createPostImageContainer(feedPost.post.images), [feedPost.post.postId]);

    const [colors, setColors] = useState<HoverColors>({
        reply: "#AAB8C2",
        repost: "#AAB8C2",
        like: "#AAB8C2",
        views: "#AAB8C2",
        bookmark: "#AAB8C2",
        share: "#AAB8C2"
    });

    const updateHoverColors = (e:React.MouseEvent<HTMLDivElement>) => {
        const id = e.currentTarget.id;

        switch(id){
            case 'reply':
                setColors({
                    ...colors,
                    reply: 'rgb(29, 155, 240)'
                })
                break
            case 'views':
                setColors({
                    ...colors,
                    views: 'rgb(29, 155, 240)'
                })
                break
            case 'bookmark':
                setColors({
                    ...colors,
                    bookmark: 'rgb(29, 155, 240)'
                })
                break
            case 'share':
                setColors({
                    ...colors,
                    share: 'rgb(29, 155, 240)'
                })
                break
            case 'repost':
                setColors({
                    ...colors,
                    repost: 'rgb(0, 230, 64)'
                })
                break
            case 'like':
                setColors({
                    ...colors,
                    like: 'rgb(242, 38, 19)'
                })
        }
    }

    const resetColors = () => {
        setColors({
            reply: "#AAB8C2",
            repost: "#AAB8C2",
            like: "#AAB8C2",
            views: "#AAB8C2",
            bookmark: "#AAB8C2",
            share: "#AAB8C2"
        })
    }

    const toggleReply = () => {
        console.log(post);
        dispatch(setCurrentPost(post));
        dispatch(updateDisplayCreateReply());
    }

    const convertCount = (count:number):string => {
        
        if(count >= 1000 && count < 10000){
            return `${(count/1000).toFixed(2)}K`
        }
        else if(count >= 10000 && count <100_000){
            return `${(count/1000).toFixed(1)}K`
        }
        else if(count >= 100000 && count < 1_000_000){
            return `${Math.floor(count/1000)}K`
        }

        return `${count}`;
    }

    const createRepost = () => {
        let updatedPost = JSON.parse(JSON.stringify(post));

        if(loggedIn && !post.reposts.some(user => user.userId === loggedIn.userId)){
            let reposts = [...post.reposts, loggedIn];
            updatedPost = {
                ...updatedPost,
                reposts
            }
            dispatch(updatePost(updatedPost));
        }
        if(loggedIn && post.reposts.some(user => user.userId === loggedIn.userId)) {
            let reposts = updatedPost.reposts.filter((user:User) => user.userId !== loggedIn.userId)
            updatedPost = {
                ...updatedPost,
                reposts
            }
            dispatch(updatePost(updatedPost));
        }

        dispatch(repostPost({
            postId: post.postId,
            token
        }))
    }

    const createLike = () => {

        let updatedPost = JSON.parse(JSON.stringify(post));

        if(loggedIn && !post.likes.some(user => user.userId === loggedIn.userId)){
            let likes = [...post.likes, loggedIn];
            updatedPost = {
                ...updatedPost,
                likes
            }
            dispatch(updatePost(updatedPost));
        }
        if(loggedIn && post.likes.some(user => user.userId === loggedIn.userId)) {
            let likes = updatedPost.likes.filter((user:User) => user.userId !== loggedIn.userId)
            updatedPost = {
                ...updatedPost,
                likes
            }
            dispatch(updatePost(updatedPost));
        }

        dispatch(likePost({
            postId: post.postId,
            token
        }))
    }

    const createView = (entries:any) => {
        entries.forEach((entry:any) => {
            if(entry.isIntersecting){
                let updatedPost = JSON.parse(JSON.stringify(post));
            }
        })
    }

    useEffect(() => {
        if(postRef && postRef.current){
            const observer = new IntersectionObserver(createView, {
                root: null,
                threshold: 1
            });

            const target = postRef.current;

            observer.observe(target);
        }
    }, [])

    return (
            <div className="post" ref={postRef}>
                <div className="post-body-wrapper">
                    <div className="post-left">
                        <img className="post-pfp" src={post.author.profilePicture ? post.author.profilePicture.imageURL : pfp} alt={`${post.author.nickname}'s pfp`}/>
                    </div>
                    <div className="post-right">
                        <div className="post-right-top">
                            <div className="post-user-info">
                                <p className="post-nickname">{post.author.nickname}</p>
                                {post.author.verifiedAccount && <VerifiedIcon sx={{
                                        color:"#1DA1F2",
                                        width: "20px",
                                        height: "20px"
                                    }}/>
                                }
                                {post.author.organization && <img className="post-organization" src={post.author.organization.imageURL} alt={`${post.author.username}'s organization`} />}
                                <p className="post-username">@{post.author.username}</p>
                                <CircleIcon sx={{height:'4px', width:'4px', color:'#657786'}} />
                                {post.postedDate && <p className="post-posted-at">{convertPostedDateToString(post.postedDate)}</p>}
                            </div>
                            <PostMore postId={post.postId} postAuthor={post.author}/>
                       </div>
                        <div className="post-content">
                            {convertPostContentToElements(post.content, "post").map((element:JSX.Element, index) => {
                                
                                let elementWithKey = createElement(
                                    element.type,
                                    {...element.props, key: index},
                                )

                                return elementWithKey;
                            })}
                        </div>
                        {feedPost.post.images.length > 0 && postImageContainer}
                        {replyTo && <Reply reply={replyTo} />}
                        <div className="post-action-bar">
                            <div className="post-action-bar-group">
                                <div className="post-action-bar-blue-wrapper" id="reply" onMouseOver={updateHoverColors} onMouseLeave={resetColors} onClick={toggleReply}>
                                    <ReplyOutlineSVG height={20} width={20} color={colors.reply} />
                                </div>
                                {post.replies.length > 0 && <p className="post-action-bar-count" style={{color: colors.reply}}>{convertCount(post.replies.length)}</p>}
                            </div>
                            <div className="post-action-bar-group">
                                <div className="post-action-bar-repost-wrapper" id="repost" onMouseOver={updateHoverColors} onMouseLeave={resetColors} onClick={createRepost}>
                                    <RepostOutlineSVG height={20} width={20} color={colors.repost} />
                                </div>
                                {post.reposts.length > 0 && <p className="post-action-bar-count" style={{color: colors.repost}}>{convertCount(post.reposts.length)}</p>}
                            </div>
                            <div className="post-action-bar-group">
                                <div className="post-action-bar-like-wrapper" id="like" onMouseOver={updateHoverColors} onMouseLeave={resetColors} onClick={createLike}>
                                    <LikeOutlineSVG height={20} width={20} color={colors.like} />
                                </div>
                                {post.likes.length > 0 && <p className="post-action-bar-count" style={{color: colors.like}}>{convertCount(post.likes.length)}</p>}
                            </div>
                            <div className="post-action-bar-group">
                                <div className="post-action-bar-blue-wrapper" id="views" onMouseOver={updateHoverColors} onMouseLeave={resetColors}>
                                    <ViewsSVG height={20} width={20} color={colors.views} />
                                </div>
                                
                            </div>
                            <div className="post-action-bar-right">
                                <div className="post-action-bar-group">
                                    <div className="post-action-bar-blue-wrapper" id="bookmark" onMouseOver={updateHoverColors} onMouseLeave={resetColors} onClick={()=>{}}>
                                        <BookmarkOutlineSVG height={20} width={20} color={colors.bookmark} />
                                        {1> 0 && <p className="post-action-bar-count" style={{color: colors.bookmark}}></p>}
                                    </div>
                                </div>
                                <div className="post-action-bar-blue-wrapper" id="share" onMouseOver={updateHoverColors} onMouseLeave={resetColors}>
                                    <ShareSVG height={20} width={20} color={colors.share} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
