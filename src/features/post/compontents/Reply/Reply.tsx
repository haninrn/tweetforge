import React, {useRef, useState, useEffect, useMemo} from 'react';
import { Post } from '../../../../utils/GlobalInterfaces';
import pfp from '../../../../assets/default_pfp.webp';
import VerifiedIcon from '@mui/icons-material/Verified';
import CircleIcon from '@mui/icons-material/Circle';
import { convertPostedDateToString } from '../../utils/PostUtils';
import { convertPostContentToElements } from '../../../../utils/EmojiUtils';

import './Reply.css';
import { createPostImageContainer } from '../../../feed/utils/FeedUtils';

interface ReplyProps {
    reply:Post;
}

export const Reply:React.FC<ReplyProps> = ({reply}) => {

    const overflowRef = useRef<HTMLDivElement>(null);
    const [overflowing, setOverflowing] = useState<boolean>(false);
    const replyImageContainer = useMemo(() => createPostImageContainer(reply.images), [reply.postId]);

    useEffect(() => {
        if(reply.content && overflowRef && overflowRef.current){
           if(overflowRef.current.clientHeight < overflowRef.current.scrollHeight) setOverflowing(true);
        }
    }, [reply.content])

    return(
        <div className="reply">
            <div className="reply-left">
                <img className="reply-pfp" src={reply.author.profilePicture ? reply.author.profilePicture.imageURL : pfp} alt={`${reply.author.nickname}'s pfp`}/>
            </div>
            <div className="reply-right">
                <div className="post-right-top">
                    <div className="post-user-info">
                    <p className="post-nickname">{reply.author.nickname}</p>
                        {reply.author.verifiedAccount && <VerifiedIcon sx={{
                                color:"#1DA1F2",
                                width: "20px",
                                height: "20px"
                            }}/>
                        }
                        {reply.author.organization && <img className="post-organization" src={reply.author.organization.imageURL} alt={`${reply.author.username}'s organization`} />}
                        <p className="post-username">@{reply.author.username}</p>
                        <CircleIcon sx={{height:'4px', width:'4px', color:'#657786'}} />
                        {reply.postedDate && <p className="post-posted-at">{convertPostedDateToString(reply.postedDate)}</p>}
                    </div>
                </div>
                <div className="reply-content" ref={overflowRef}>
                    {convertPostContentToElements(reply.content, "post")}
                </div>
                {overflowing && <p className="reply-show-more">Show more</p>}
                {reply.images.length > 0 && replyImageContainer}
            </div>
        </div>
    )
}