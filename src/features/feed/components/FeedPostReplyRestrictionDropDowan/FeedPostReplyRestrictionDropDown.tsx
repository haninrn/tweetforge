import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/Store';
import { updateCurrentPost } from '../../../../redux/Slices/PostSlice';

import './FeedPostReplyRestrictionDropDown.css';
import GlobeSVG from '../../../../components/SVGs/GlobeSVG';
import { getReplyDropDownButton } from '../../utils/FeedUtils';
import Check from '@mui/icons-material/Check';

export const FeedPostReplyRestrictionDropDown:React.FC = () => {

    const state = useSelector((state:RootState) => state.post);
    const dispatch:AppDispatch = useDispatch();

    const [active, setActive] = useState<boolean>(false);
    const [selection, setSelection] = useState<string>("Everyone");

    const handleOpenModal = () => {

    }

    const handleChangeSelection = (e:React.MouseEvent<HTMLDivElement>) => {

    }

    return(
        <div className="feed-post-reply-restriction-drop-down">
            {getReplyDropDownButton(state, handleOpenModal)}
            <div className="feed-post-reply-restriction-drop-down-modal" style={{display: active ? "block" : "none"}}>
                <h2 className="feed-post-reply-restriction-dropdown-title">Who can reply?</h2>
                <p className="feed-post-reply-restriction-dropdown-sub-title">Choose who can reply to the post.</p>
                <p className="feed-post-reply-restriction-dropdown-sub-title">Any mentioned can always reply.</p>
                <div id="Everyone" className="feed-post-reply-restriction-dropdown-choice" onClick={handleChangeSelection}>
                    <div className="feed-post-reply-restriction-dropdown-choice-left">
                    <div className="feed-post-reply-restriction-dropdown-choice-bg">
                        <GlobeSVG height={20} width={20} color={"#FFF"} />
                         </div>
                         <p className="feed-post-creator-reply-restriction-dropdown-choice-text">Everyone</p>
                </div>
                {selection === 'Everyone' ? <Check sx={{
                    color: "#1DA1F2",
                    fontSize: "18px"
                }}/> : <></>}
                </div>
                <div id="Follow" className="feed-post-reply-restriction-dropdown-choice" onClick={handleChangeSelection}>
                    <div className="feed-post-reply-restriction-dropdown-choice-left">
                    <div className="feed-post-reply-restriction-dropdown-choice-bg">
                        <GlobeSVG height={20} width={20} color={"#FFF"} />
                         </div>
                         <p className="feed-post-reply-restriction-dropdown-choice-text">PeopleYouFollow</p>
                         </div>
                         {selection === 'Follow' ? <Check sx={{
                    color: "#1DA1F2",
                    fontSize: "18px"
                }}/> : <></>}
                </div>
                <div id="Mention" className="feed-post-reply-restriction-dropdown-choice" onClick={handleChangeSelection}>
                    <div className="feed-post-reply-restriction-dropdown-choice-left">
                    <div className="feed-post-reply-restriction-dropdown-choice-bg">
                        <GlobeSVG height={20} width={20} color={"#FFF"} />
                         </div>
                         <p className="feed-post-creator-reply-restriction-dropdown-choice-text">Only people you mention</p>
                </div>
                {selection === 'Mention' ? <Check sx={{
                    color: "#1DA1F2",
                    fontSize: "18px"
                }}/> : <></>}
                </div>
                </div>
        </div>
    )
}