import { PayloadAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { Post, User } from "../../features/register/utils/GlobalInterfaces";
import axios from "axios";
import FormData from "form-data";

export interface PostSliceState {
    loading: boolean;
    error: boolean;
    currentPost: Post | undefined;
    posts: Post[],
    currentPostImages: File[]
}

interface updatePostPayload{
    name: string;
    value: string | number | boolean
}

interface CreatePostBody {
    content: string;
    author: User;
    replies: Post[];
    scheduled: boolean;
    scheduledDate: Date | undefined;
    audience: 'EVERYONE' | 'CIRCLE';
    replyRestriction: 'EVERYONE' | 'FOLLOW' | 'CIRCLE' | 'MENTION';
    token: string;
    
}

interface CreatePostWithMediaBody extends CreatePostBody {
    images: File[]
}

const initialState:PostSliceState = {
    loading: false,
    error: false,
    currentPost: undefined,
    posts:[],
    currentPostImages: []

}

export const createPost = createAsyncThunk(
    'post/create',
    async(body:CreatePostBody, thunkAPI) => {
        try {
            let post = {
                content: body.content,
                author: body.author, 
                replies: [],
                scheduled: body.scheduled,
                scheduledDate: body.scheduledDate,
                audience: body.audience,
                replyRestriction: body.replyRestriction
            }

            const req = await axios.post('http://localhost:8000/posts', post, {
                headers: {
                    "Authorization" : `Bearer ${body.token}`
                }
            });

            return req.data;

        } catch(e){
            thunkAPI.rejectWithValue(e);
        }
    }
)

export const createPostWithMedia = createAsyncThunk(
    'post/create-media',
    async (body:CreatePostWithMediaBody, thunkAPI) => {
        try{

            const images = body.images;

            let data = new FormData();

            let post = {
                content: body.content,
                author: body.author,
                replies: body.replies,
                scheduled: body.scheduled,
                scheduledDate: body.scheduledDate,
                audience: body.audience,
                replyRestriction: body.replyRestriction
            }

            data.append('post', JSON.stringify(post));

            images.forEach((image) => {
                data.append('media', image);
            })

            let config = {
                method:'post',
                url: 'http://localhost:8000/posts/media',
                headers: {
                    'Authorization': `Bearer ${body}`,
                    'Content-Type': 'multipart/form-data'
                },
                data
            }

            let res = await axios(config);

            return res.data;

        } catch(e){
            thunkAPI.rejectWithValue(e);
        }
    }
)

export const PostSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        initializeCurrentPost(state, action:PayloadAction<Post>){
            if(!state.currentPost){
                state.currentPost = action.payload;
            } else {
                state = {
                    ...state,
                    currentPost: action.payload
                }
            }
            return state;
            },
            updateCurrentPost(state, action:PayloadAction<updatePostPayload>){
                if(state.currentPost){
                    state.currentPost = {
                        ...state.currentPost,
                        [action.payload.name]: action.payload.value
                    }
                }
                return state;
            },
            
            updateCurrentPostImages(state, action:PayloadAction<File[]>){
                state = {
                    ...state,
                    currentPostImages: action.payload
                }
                return state;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(createPost.pending, (state, action) => {
                state = {
                    ...state,
                    loading: true
                }
                return state;
            });

            builder.addCase(createPostWithMedia.pending, (state, action) => {
                state = {
                    ...state,
                    loading:true
                };

                return state;
            })

            builder.addCase(createPost.fulfilled, (state, action) => {
                let post:Post = action.payload;

                state = {
                    ...state,
                    posts: [post, ...state.posts],
                    loading: false,
                    error: false,
                    currentPost: undefined
                }

                return state;
            });

            builder.addCase(createPostWithMedia.fulfilled, (state,action) => {
                let post:Post = action.payload;

                state = {
                    ...state,
                    posts: [post, ...state.posts],
                    loading:false,
                    error: false,
                    currentPost:undefined,
                    currentPostImages: []
                };

                return state;
            })

            builder.addCase(createPost.rejected, (state, action) => {
                state = {
                    ...state,
                    error: true
                }
                return state;
            })

            builder.addCase(createPostWithMedia.rejected, (state, action) => {
                state = {
                    ...state,
                    error:true
                }

                return state;
            });
        }
    }
)

export const {initializeCurrentPost, updateCurrentPost, updateCurrentPostImages} = PostSlice.actions;

export default PostSlice.reducer;