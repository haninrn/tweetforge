import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalSliceState {
    displayEditPostImage: boolean;
    displayTagPeople: boolean;
    displayGif: boolean;
    displaySchedule: boolean;
    displayEmojis: boolean;
    displayCreateReply: boolean;
    displayPostMore: boolean;
}

const initialState:ModalSliceState = {
    displayEditPostImage: false,
    displayTagPeople: false,
    displayGif: false,
    displaySchedule: false,
    displayEmojis: false,
    displayCreateReply: false,
    displayPostMore: false
}

export const ModalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        updateDisplayEditPostImages(state){
            state = {
                ...state,
                displayEditPostImage: !state.displayEditPostImage
            }

            return state;
        },
        updateDisplayTagPeople(state){
            state = {
                ...state,
                displayTagPeople: !state.displayTagPeople
            }

            return state;
        },
        updateDisplayGif(state){
            state = {
                ...state,
                displayGif: !state.displayGif
            }

            return state;
        },
        updateDisplaySchedule(state){
            state = {
                ...state,
                displaySchedule: !state.displaySchedule
            };

            return state;
        },
        updateDisplayEmojis(state){
            state = {
                ...state,
                displayEmojis: !state.displayEmojis
            }

            return state;
        },
        updateDisplayCreateReply(state){
            state = {
                ...state,
                displayCreateReply: !state.displayCreateReply
            }

            return state;
        },
        updateDisplayPostMore(state){
            state = {
                ...state,
                displayPostMore: !state.displayPostMore
            }

            return state;
        }
    }
})

export const {updateDisplayEditPostImages, updateDisplayTagPeople, updateDisplayGif, updateDisplaySchedule, updateDisplayEmojis, updateDisplayCreateReply, updateDisplayPostMore} = ModalSlice.actions;

export default ModalSlice.reducer;
