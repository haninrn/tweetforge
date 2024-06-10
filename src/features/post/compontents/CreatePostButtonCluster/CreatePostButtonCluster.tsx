import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/Store';

import './CreatePostButtonCluster.css'
import { createPoll, updateCurrentPostImages } from '../../../../redux/Slices/PostSlice';
import MediaSVG from '../../../../components/SVGs/MediaSVG';
import GIFSVG from '../../../../components/SVGs/GIFSVG';
import PollSVG from '../../../../components/SVGs/PollSVG';
import EmojiSVG from '../../../../components/SVGs/EmojiSVG';
import ScheduleSVG from '../../../../components/SVGs/ScheduleSVG';
import LocationSVG from '../../../../components/SVGs/LocationSVG';
import { updateDisplayEmojis, updateDisplayGif, updateDisplaySchedule } from '../../../../redux/Slices/ModalSlice';

export const CreatePostButtonCluster:React.FC = () => {

    const state = useSelector((state:RootState) => state);
    const dispatch:AppDispatch = useDispatch();

    const imageSelectorRef = useRef<HTMLInputElement>(null);

    const handleGetImages = (e:React.ChangeEvent<HTMLInputElement>) => {
        const imageList:File[] = state.post.currentPostImages;

        if(imageSelectorRef.current && e.target.files){
            if(e.target.files.length + imageList.length > 4){
                console.log("Selected too many files");
                imageSelectorRef.current.value = '';
                return;
            }

            if(imageList[0]?.type === 'image/gif'){
                console.log("only one gif and no other images allowed");
                imageSelectorRef.current.value = '';
                return;
            }

            let fileArr:File[] = [...imageList];
            for(let i=0; i<e.target.files.length; i++){
                let file = e.target.files.item(i);

                if(file?.type === 'image/gif' && fileArr.length >= 1 || file?.type === 'image/gif' && e.target.files.length > 1){
                    console.log("only one gif and no other images allowed");
                    imageSelectorRef.current.value = '';
                    return;
                }

                if(file) fileArr.push(file);
            }

            dispatch(updateCurrentPostImages(fileArr));
        }
    }

    const determineFull = ():boolean => {
        if(state.post.currentPostImages.length === 4) return true;

        if(state.post.currentPostImages[0]?.type === 'image/gif') return true;

        return false;
    }

    const displayGif = () => {
        dispatch(updateDisplayGif());
    }

    const generatePoll = (e:React.MouseEvent<HTMLDivElement>) => {

        if(state.post.currentPost || state.post.currentReply){
            dispatch(createPoll());
        }

    }

    const openScheduleModal = () => {
        dispatch(updateDisplaySchedule());
    }

    const openEmojiModal = () => {
        dispatch(updateDisplayEmojis());
    }
    
    return (
        <div className="create-post-button-cluster">
            <div>
                <input onChange={handleGetImages} type="file" id="images" accept="image/*" multiple={true} ref={imageSelectorRef} hidden disabled={determineFull()}/>
                <label htmlFor="images" className={determineFull() ? "create-post-button-clustor-icon-bg" : "create-post-button-clustor-icon-bg icon-active"}>
                    <MediaSVG height={20} width={20} color={determineFull() ? "rgba(29, 161, 242, .5)" : "#1DA1F2"} />
                </label>
            </div>
            <div className={state.post.currentPostImages.length > 0 ? "create-post-button-clustor-icon-bg" : "create-post-button-clustor-icon-bg icon-active"} onClick={displayGif}>
                <GIFSVG height={20} width={20} color={state.post.currentPostImages.length > 0 ? "rgba(29, 161, 242, .5)" : "#1DA1F2"} />
            </div>
            <div className={state.post.currentPostImages.length > 0 ? "create-post-button-clustor-icon-bg" : "create-post-button-clustor-icon-bg icon-active"} onClick={generatePoll}>
                <PollSVG height={20} width={20} color={state.post.currentPostImages.length > 0 ? "rgba(29, 161, 242, .5)" : "#1DA1F2"} />
            </div>
            <div className="create-post-button-clustor-icon-bg icon-active" onClick={openEmojiModal}>
                <EmojiSVG height={20} width={20} color={"#1DA1F2"} />
            </div>
            <div className="create-post-button-clustor-icon-bg icon-active" onClick={openScheduleModal}>
                <ScheduleSVG height={20} width={20} color={"#1DA1F2"} />
            </div>
            <div className="create-post-button-cluster-location">
                <LocationSVG height={20} width={20} color={"rgba(29, 161, 242, .5"} />
            </div>
        </div>
    )
}