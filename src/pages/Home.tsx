import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { RootState, AppDispatch} from '../redux/Store';
import  {setToken} from '../redux/Slices/UserSlice';
import { useNavigate } from 'react-router-dom';
import { getUserByToken } from '../redux/Slices/UserSlice';

import './Home.css';
import { Navigation } from '../components/Navigation/Navigation';
import { Feed } from '../features/feed/components/Feed/Feed';
import { FeedPostCreatorEditImageModalTop } from '../features/feed/components/FeedPostCreatorEditImageModalTop/FeedPostCreatorEditImageModalTop';
import { FeedPostCreatorEditImageModal } from '../features/feed/components/FeedPostCreatorEditImageModal/FeedPostCreatorEditImageModal';
import { FeedPostCreatorTagPeopleModal } from '../features/feed/components/FeedPostCreatorTagPeopleModal/FeedPostCreatorTagPeopleModal';
import { FeedPostCreatorGifModal } from '../features/feed/components/FeedPostCreatorGifModal/FeedPostCreatorGifModal';
import { SchedulePostModal } from '../features/schedulepost/SchedulePostModal/SchedulePostModal';
import { EmojiDropDown } from '../components/EmojiDropDown/EmojiDropDown';
import { updateDisplayEmojis } from '../redux/Slices/ModalSlice';
import { Discover } from '../features/discovery';

export const Home:React.FC = () => {
    const displayEditImageModal = useSelector((state:RootState) => state.modal.displayEditPostImage);
    const displayTagPeopleModal = useSelector((state:RootState) => state.modal.displayTagPeople);
    const displayGifModal = useSelector((state:RootState) => state.modal.displayGif);
    const displaySchedule = useSelector((state:RootState) => state.modal.displaySchedule);
    const displayEmojis = useSelector((state:RootState) => state.modal.displayEmojis);
    const dispatch:AppDispatch = useDispatch();


    const closeOpenedModals = (e:React.MouseEvent) => {
        if(displayEmojis) dispatch(updateDisplayEmojis())
    }

    return(
        <div className="home" onClick={closeOpenedModals}>
            {displayEditImageModal && <FeedPostCreatorEditImageModal />}
            {displayTagPeopleModal && <FeedPostCreatorTagPeopleModal />}
            {displayGifModal && <FeedPostCreatorGifModal />}
            {displaySchedule && <SchedulePostModal />}
            {displayEmojis && <EmojiDropDown />}
            <Feed />
        </div>
    )
};