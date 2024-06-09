import { ExpandMore } from '@mui/icons-material';
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GlobeSVG from '../../../../components/SVGs/GlobeSVG';
import MediaSVG from '../../../../components/SVGs/MediaSVG';
import GIFSVG from '../../../../components/SVGs/GIFSVG';
import PollSVG from '../../../../components/SVGs/PollSVG';
import EmojiSVG from '../../../../components/SVGs/EmojiSVG';
import ScheduleSVG from '../../../../components/SVGs/ScheduleSVG';
import LocationSVG from '../../../../components/SVGs/LocationSVG';
import { FeedPostCreatorProgress } from '../FeedPostCreatorProgress/FeedPostCreatorProgress';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/Store';
import { createPost, initializeCurrentPost, updateCurrentPost } from '../../../../redux/Slices/PostSlice';
import { Post } from '../../../register/utils/GlobalInterfaces';
import { FeedPostAudienceDropDown } from '../FeedPostAudienceDropDown/FeedPostAudienceDropDown';
import { FeedPostReplyRestrictionDropDown } from '../FeedPostReplyRestrictionDropDowan/FeedPostReplyRestrictionDropDown';

export const FeedPostCreator: React.FC = () => {
    const state = useSelector((state: RootState) => state);
     const dispatch = useDispatch<AppDispatch>();

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const [active, setActive] = useState<boolean>(false);
    const [postContent, setPostContent] = useState<string>('');

    const activate = () => {
        if (!active) {
            setActive(true);
            if (state.user.loggedIn) {
                const post: Post = {
                    postId: 0,
                    content: "",
                    author: state.user.loggedIn,
                    likes: 0,
                    images: [],
                    reposts: 0,
                    views: 0,
                    scheduled: false,
                    audience: 'EVERYONE',
                    replyRestriction: 'EVERYONE'
                };
                dispatch(initializeCurrentPost(post));
            }
            if (textAreaRef.current) {
                textAreaRef.current.focus();
            }
        }
    };

    const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(e.target.value);
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "25px";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }

        dispatch(updateCurrentPost({
            name: "content",
            value: e.target.value
        }));
    }

    const submitPost = () => {
        if (state.post.currentPost && state.user.loggedIn) {
            const body = {
                content: state.post.currentPost.content,
                author: state.post.currentPost.author,
                replies: [],
                scheduled: state.post.currentPost.scheduled,
                scheduledDate: state.post.currentPost.scheduledDate,
                audience: state.post.currentPost.audience,
                replyRestriction: state.post.currentPost.replyRestriction,
                token: state.user.token
            };
            dispatch(createPost(body));
        }
        setActive(false);
       if(textAreaRef && textAreaRef.current){
        textAreaRef.current.blur();
        textAreaRef.current.value = ""
       } 
    }

    useEffect(() => {
        if (!state.post.currentPost) {
            setPostContent("");
        }
        console.log(postContent);
    }, [state.post.currentPost, postContent, activate])

    return (
        <div className="feed-post-creator" onClick={activate}>
            <Link to="">
                <img className="feed-post-creator-pfp" src="https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg
" alt="Profile" />
            </Link>
            <div className="feed-post-creator-right">
                <FeedPostAudienceDropDown/>
                <textarea
                    className="feed-post-creator-input"
                    placeholder="What is happening?!"
                    ref={textAreaRef}
                    onChange={autoGrow}
                    value={postContent}
                    cols={50}
                    maxLength={256}
                />
                <FeedPostReplyRestrictionDropDown />
                <div className={active ? "feed-post-creator-bottom-icons icons-border" : "feed-post-creator-bottom-icons"}>
                    <div className="feed-post-creator-icons-left">
                        <div className="feed-post-creator-icon-bg">
                            <MediaSVG height={20} width={20} color={"#1DA1F2"} />
                        </div>
                        <div className="feed-post-creator-icon-bg">
                            <GIFSVG height={20} width={20} color={"#1DA1F2"} />
                        </div>
                        <div className="feed-post-creator-icon-bg">
                            <PollSVG height={20} width={20} color={"#1DA1F2"} />
                        </div>
                        <div className="feed-post-creator-icon-bg">
                            <EmojiSVG height={20} width={20} color={"#1DA1F2"} />
                        </div>
                        <div className="feed-post-creator-icon-bg">
                            <ScheduleSVG height={20} width={20} color={"#1DA1F2"} />
                        </div>
                        <div className="feed-post-creator-icon-bg">
                            <LocationSVG height={20} width={20} color={"#1DA1F2"} />
                        </div>
                    </div>
                    <div className="feed-post-creator-submit-cluster">
                        {postContent !== '' && (
                            <div className="feed-post-creator-submit-cluster-left">
                                <FeedPostCreatorProgress percent={(postContent.length / 256) * 100} />
                                <span className="feed-post-creator-submit-cluster-divider"></span>
                                <div className="feed-post-creator-submit-cluster-add">
                                    +
                                </div>
                            </div>
                        )}
                        <button
                            className={postContent === '' ? "feed-post-creator-post-button" : "feed-post-creator-post-button post-active"}
                            disabled={postContent === ''}
                            onClick={submitPost}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
