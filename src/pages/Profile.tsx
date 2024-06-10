import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/Store';
import { useParams } from 'react-router-dom';
import { ProfileTopBar } from '../features/profile';
import axios from 'axios';

import './Profile.css';
import { Post, User } from '../utils/GlobalInterfaces';
import { ProfileFollowSection } from '../features/profile/components/ProfileFollowSection/ProfileFollowSection';

export const Profile:React.FC = () => {

    const token = useSelector((state:RootState) => state.user.token);
    const {username} = useParams();
    const [profileUser, setProfileUser] = useState<User | undefined>();
    const [posts, setPosts] = useState<Post[]>([]);

    const fetchProfileUser = async () => {
        let user;
        try{
            let req = await axios.get(`http://localhost:8000/user/${username}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            user = req.data;

            console.log(user);

            setProfileUser(user);
        } catch(e){
            console.log("user does not exist, or issue loading ");
        } finally {
            await fetchUserPosts(user);
        }
        
    }

    const fetchUserPosts = async (user:User) => {
        try{
            let req = await axios.get(`http://localhost:8000/posts/author/${user.userId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            setPosts(req.data)
        } catch(e){
            console.log("unable to fetch posts");
        }
    }

    useEffect(() => {
        if(token){
            fetchProfileUser();
        }
    }, [username, token]);

    return (
        <div className="profile">
            {profileUser ?
                <>
                    <ProfileTopBar nickname={profileUser.nickname} isVerified={profileUser.verifiedAccount} organization={profileUser.organization} numberOfPosts={posts.length} />
                    <div className="profile-banner-picture" style={profileUser.bannerPicture ? {backgroundImage: `url("${profileUser.bannerPicture}")`} : {backgroundColor: '#AAB8C2'}} />
                    <ProfileFollowSection profilePicture={profileUser.profilePicture} username={profileUser.username} />
                </>
                :
                <></>
            }
        </div>
    )
}