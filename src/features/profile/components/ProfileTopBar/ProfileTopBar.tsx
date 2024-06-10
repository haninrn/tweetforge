import React from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { convertNumberOfPostsToString } from '../../utils/ProfileUtils';

import './ProfileTopBar.css';
import { ImageInfo } from '../../../../utils/GlobalInterfaces';

interface ProfileTopBarProps {
    nickname: string;
    isVerified: boolean;
    organization: ImageInfo | null;
    numberOfPosts: number;
}

export const ProfileTopBar:React.FC<ProfileTopBarProps> = ({nickname, isVerified, organization, numberOfPosts}) => {
    return (
        <div className="profile-top-bar">
            <div className="profile-top-bar-left">
                <ArrowBackIcon sx={{height: '20px', width: '20px'}} />
            </div>
            <div className="profile-top-bar-right">
                <div className="profile-top-bar-name-section">
                    <p className="profile-top-bar-name">{nickname}</p>
                    {isVerified && <VerifiedIcon sx={{
                        color:"#1DA1F2",
                        width: "20px",
                        height: "20px"
                    }}/>}
                    {organization && <img src={organization.imageURL} alt={`${nickname}'s organization`} height={20} width={20}/>}
                </div>
                <p className="profile-top-bar-posts">{convertNumberOfPostsToString(numberOfPosts)} posts</p>
            </div>
        </div>
    )
}