import React, {useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/Store';
import { convertPostContentToElements } from '../../../../utils/EmojiUtils';
import { updateCurrentPost } from '../../../../redux/Slices/PostSlice';

import './CreatePostTextArea.css';

interface CreatePostTextAreaProps {
    location: string;
}

export const CreatePostTextArea:React.FC<CreatePostTextAreaProps> = ({location}) => {

    const state = useSelector((state:RootState) => state);
    const dispatch:AppDispatch = useDispatch();

    const [content, setContent] = useState<string>("");

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const autoGrow = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        if(textAreaRef && textAreaRef.current){
            textAreaRef.current.style.height = "25px"
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        }

        if(location === "post"){
            dispatch(updateCurrentPost({
                name: "content",
                value: e.target.value
            }));
        }
        
        if(location === "reply"){
            dispatch(updateCurrentPost({
                name: "replyContent",
                value: e.target.value
            }))
        }

        setContent(e.target.value);
    }

    const activate = (e:React.MouseEvent<HTMLDivElement>) => {
        if(textAreaRef && textAreaRef.current) textAreaRef.current.focus();
    }

    const textContent = ():{elements: JSX.Element[], content:string} => {
        if(location === "post" && state.post.currentPost){
            return {
                elements: convertPostContentToElements(state.post.currentPost.content, "creator"),
                content: state.post.currentPost.content
            }
        }

        if(location === "reply" && state.post.currentReply){
            return {
                elements: convertPostContentToElements(state.post.currentReply.replyContent, "creator"),
                content: state.post.currentReply.replyContent
            }
        }

        return {
            elements: [],
            content: ""
        }
    }

    return (
        <div className="create-post-text-area" onClick={activate}>
            {content !== '' && 
                    <div className="create-post-text-area-content">
                        {textContent().elements}
                    </div>
                }
                <textarea
                    className={state.post.currentPost || state.post.currentReply ? "create-post-text-area-creator-input input-active" : "create-post-text-area-creator-input"}
                    placeholder='What is happening?!'
                    ref={textAreaRef}
                    onChange={autoGrow}
                    cols={50}
                    maxLength={256}
                    id={"post-text"}
                    value={textContent().content}
                />
        </div>
    )
}