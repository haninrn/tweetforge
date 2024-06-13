import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import { FeedPost, Post } from '../../utils/GlobalInterfaces';

interface FeedSliceState {
    posts: FeedPost[],
    currentPost: Post | undefined,
    currentPageNumber: number,
    sessionStart: Date | undefined,
    loading: boolean,
    error: boolean
}

interface LoadFeedPagePayload {
    token: string;
    userId: number;
    sessionStart: Date
}

interface FetchNextPagePayload {
    token: string;
    userId: number;
    page: number;
    sessionStart: Date;
}

const initialState:FeedSliceState = {
    posts: [],
    currentPageNumber: 0,
    sessionStart: undefined,
    currentPost: undefined,
    loading: false,
    error: false
}

export const loadFeedPage = createAsyncThunk(
    'feed/feedPage',
    async (payload:LoadFeedPagePayload, thunkAPI) => {
        try{
            let req = await axios.post(`http://localhost:8000/feed`, {
                userId: payload.userId,
                page: 0,
                sessionStart: payload.sessionStart
            },
            {
                headers: {
                    "Authorization": `Bearer ${payload.token}`
                }
            })

            let posts = req.data;
            
            return posts;
        } catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const fetchNextFeedPage = createAsyncThunk(
    'feed/nextPage',
    async (payload:FetchNextPagePayload, thunkAPI) => {
        try{
            let req = await axios.post(`http://localhost:8000/feed`, {
                userId: payload.userId,
                page: payload.page,
                sessionStart: payload.sessionStart
            },
            {
                headers: {
                    "Authorization": `Bearer ${payload.token}`
                }
            })

            let posts = req.data;
            
            return posts;
        } catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const FeedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        setCurrentPost(state, action:PayloadAction<Post | undefined>){
            state = {
                ...state,
                currentPost: action.payload
            }

            return state;
        },
        setSessionTime(state, action:PayloadAction<Date | undefined>){
            state = {
                ...state, 
                sessionStart : action.payload
            }

            return state;
        },
        setCurrentPageNumber(state /*action:PayloadAction<number>*/){
            state = {
                ...state,
                currentPageNumber: state.posts.length / 100
            }

            return state;
        },
        updatePost(state, action:PayloadAction<Post>){
            let updatedPosts:FeedPost[] = state.posts.map((post) => {
                if(action.payload.postId === post.post.postId){
                    return {
                        post: action.payload,
                        replyTo: post.replyTo,
                        repost: post.repost,
                        repostUser: post.repostUser
                    }
                }

                return post;
            })

            state = {
                ...state,
                posts: updatedPosts
            }

            return state;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(loadFeedPage.pending, (state, action) => {
            state = {
                ...state, 
                loading: true,
                error: false
            }
            return state;
        });

        builder.addCase(loadFeedPage.fulfilled, (state, action) => {
            state = {
                ...state,
                posts: action.payload.posts,
                sessionStart: action.payload.sessionStart,
                loading: false,
                error: false
            }

            return state;
        });

        builder.addCase(fetchNextFeedPage.fulfilled, (state, action) => {
            if(state.posts.length > 0 && state.posts[0].post.postId === action.payload.posts[0].post.postId) return state;

            state = {
                ...state,
                posts: [...state.posts, ...action.payload.posts],
                sessionStart: action.payload.sessionStart,
                loading: false,
                error: false
            }

            return state;
        })

        builder.addCase(loadFeedPage.rejected, (state, action) => {
            state = {
                ...state,
                loading: false,
                error: true
            }

            return state;
        })
    }
})

export const {setCurrentPost, setSessionTime, setCurrentPageNumber, updatePost} = FeedSlice.actions;
export default FeedSlice.reducer;