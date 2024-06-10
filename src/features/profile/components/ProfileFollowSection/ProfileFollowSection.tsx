import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/Store';
import { followUser } from '../../../../redux/Slices/UserSlice';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import pfp from '../../../../assets/default_pfp.webp';
import './ProfileFollowSection.css';
import { ImageInfo } from '../../../../utils/GlobalInterfaces';

interface ProfileFollowSectionProps{
    profilePicture: ImageInfo | null;
    username: string;
}

export const ProfileFollowSection:React.FC<ProfileFollowSectionProps> = ({profilePicture, username}) => {

    const dispatch:AppDispatch = useDispatch();
    const token = useSelector((state:RootState) => state.user.token);
    const followingList = useSelector((state:RootState) => state.user.following);
    const [hoveringOverUnfollow, setHoveringOverUnfollow] = useState<boolean>(false);

    const handleFollowUser = () => {
        if(token) dispatch(followUser({
            token,
            followee: username
        }));
    }

    return (
        <div className="profile-follow-section">
            <img className="profile-follow-section-pfp" src={profilePicture ? profilePicture.imageURL : pfp} alt={`${username}'s pfp`}/>
            <div className="profile-follow-section-left">
                <div className="profile-follow-section-more">
                    <MoreHorizIcon sx={{width: "20px", height: "20px"}}/>
                </div>
                {
                    followingList.find((person) => person.username === username) && 
                        <div className="profile-follow-section-more">
                            <NotificationAddIcon sx={{width: "20px", height: "20px"}}/>
                        </div>
                }
                {
                    followingList.find((person) => person.username === username) ? 
                        <button
                            className="profile-follow-section-unfollow-button"
                            onMouseEnter={() => setHoveringOverUnfollow(true)}
                            onMouseLeave={() => setHoveringOverUnfollow(false)}>
                                {hoveringOverUnfollow ? 'Unfollow' : 'Following'}
                        </button>
                        :
                        <button className="profile-follow-section-follow-button" onClick={handleFollowUser}>Follow</button>}
            </div>
        </div>
    )
}