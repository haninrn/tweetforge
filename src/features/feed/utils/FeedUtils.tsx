import GlobeSVG from "../../../components/SVGs/GlobeSVG";
import LockSVG from "../../../components/SVGs/LockSVG";
import MentionedSVG from "../../../components/SVGs/MentionedSVG";
import PeopleYouFollowSVG from "../../../components/SVGs/PeopleYouFollowSVG";
import { PostSliceState } from "../../../redux/Slices/PostSlice";

export function getReplyDropDownButton(state:PostSliceState, callback:()=>void):JSX.Element{
    switch(state.currentPost?.replyRestriction){
        case 'EVERYONE':
            return(
                <div className="feed-post-reply-restriction-drop-down-button" onClick={callback}>
                    <GlobeSVG height={14} width={14} color={"#1DA1F2"} />
                    Everyone can reply
                </div>
            )
            case 'FOLLOW':
                return(
                    <div className="feed-post-reply-restriction-drop-down-button" onClick={callback}>
                    <PeopleYouFollowSVG height={14} width={14} color={"#1DA1F2"} />
                    People you follow can reply
                </div>
                    
                )
                case 'CIRCLE':
                    return(
                        <div className="feed-post-reply-restriction-drop-down-button" onClick={callback}>
                        <LockSVG height={14} width={14} color={"rgba(29, 161, 242, .5"} />
                        Only your Fwitter Circle can reply
                    </div>
                    )
                    case 'MENTION':
                        return(
                            <div className="feed-post-reply-restriction-drop-down-button" onClick={callback}>
                            <MentionedSVG height={14} width={14} color={"#1DA1F2"} />
                            Only people you mentioned can reply
                        </div>
                        )
                        default:
                            return<></>


    }
    
}