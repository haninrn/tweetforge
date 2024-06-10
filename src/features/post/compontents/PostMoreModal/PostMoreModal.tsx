import React from "react";
import BlockSVG from "../../../../components/SVGs/BlockSVG";
import EmbedSVG from "../../../../components/SVGs/EmbedSVG";
import FollowSVG from "../../../../components/SVGs/FollowSVG";
import ListsAddSVG from "../../../../components/SVGs/ListsAddSVG";
import MuteSVG from "../../../../components/SVGs/MuteSVG";
import NotInterestedSVG from "../../../../components/SVGs/NotInterestedSVG";
import ReportSVG from "../../../../components/SVGs/ReportSVG";
import SubscribeSVG from "../../../../components/SVGs/SubscribeSVG";
import UnfollowSVG from "../../../../components/SVGs/UnfollowSVG";
import ViewsSVG from "../../../../components/SVGs/ViewsSVG";
import { User } from "../../../../utils/GlobalInterfaces";

import './PostMoreModal.css';

interface PostMoreModalProps {
  author: User;
  followingList: User[];
}

export const PostMoreModal: React.FC<PostMoreModalProps> = ({
  author,
  followingList,
}) => {
  const following = () => {
    return followingList.some((user) => user.userId === author.userId);
  };

  return (
    <div className="post-more-modal">
      <div className="post-more-modal-option">
        <NotInterestedSVG width={18} height={18} /> 
        <p className="post-more-modal-option-text">
          Not Interested in this post
        </p>
      </div>
      {!following && (
        <div className="post-more-modal-option">
            <SubscribeSVG width={18} height={18}/>
          <p className="post-more-modal-option-text">
            Subscrive to @{author.username}
          </p>
        </div>
      )}
      <div className="post-more-modal-option">
        {following() ? <UnfollowSVG width={18} height={18}/> : <FollowSVG width={18} height={18} />}
        <p className="post-more-modal-option-text">
          {following() ? "Unfollow" : "Follow"} @{author.username}
        </p>
      </div>
      <div className="post-more-modal-option">
        <ListsAddSVG width={18} height={18} />
        <p className="post-more-modal-option-text">
          Add/remove @{author.username} from Lists
        </p>
      </div>
      <div className="post-more-modal-option">
        <MuteSVG width={18} height={18} /> 
        <p className="post-more-modal-option-text">Mute @{author.username}</p>
      </div>
      <div className="post-more-modal-option">
        <BlockSVG width={18} height={18} /> 
        <p className="post-more-modal-option-text">Block @{author.username}</p>
      </div>
      <div className="post-more-modal-option">
        <ViewsSVG width={18} height={18} />
        <p className="post-more-modal-option-text">View post engagements</p>
      </div>
      <div className="post-more-modal-option">
        <EmbedSVG width={18} height={18} />
        <p className="post-more-modal-option-text">Embed post</p>
      </div>
      <div className="post-more-modal-option">
        <ReportSVG width={18} height={18} />
        <p className="post-more-modal-option-text">
          Report post
        </p>
      </div>
    </div>
  );
};
