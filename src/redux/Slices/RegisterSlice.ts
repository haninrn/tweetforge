import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Dob } from '../../utils/GlobalInterfaces';
import axios from 'axios';

interface RegisterSliceState {
    loading: boolean;
    error: boolean;
    firstName: string;
    firstNameValid: boolean;
    lastName: string;
    lastNameValid:boolean;
    email: string;
    emailValid: boolean;
    dob: Dob;
    dobValid: boolean;
    step: number;
    username:string;
    phoneNumber:string;
    phoneNumberValid: boolean;
    code: string;
    password: string;
    login: boolean
}

interface UpdatePayload {
    name: string;
    value: string | number | boolean;
}

interface RegisterUser {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
}

interface UpdatePhone {
    username: string;
    phone: string;
}

interface VerifyCode {
    username: string;
    code: string;
}

interface UpdatePassword {
    username: string;
    password: string;
}

const initialState:RegisterSliceState = {
    loading: false,
    error: false,
    firstName: '',
    firstNameValid: false,
    lastName: '',
    lastNameValid: false,
    email: '',
    emailValid: false,
    dob: {
        month: 0,
        day: 0,
        year: 0
    },
    dobValid: false,
    step: 1,
    username:"",
    phoneNumber: "",
    phoneNumberValid: false,
    code: "",
    password: "",
    login: false
}

export const registerUser = createAsyncThunk(
    'register/register',
    async (user:RegisterUser, thunkAPI) => {
        try{
            const req = await axios.post('http://localhost:8000/auth/register', user);
            return await req.data;
        } catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const updateUserPhone = createAsyncThunk(
    'register/phone',
    async (body:UpdatePhone, thunkAPI) => {
        try{
            const req = await axios.put('http://localhost:8000/auth/update/phone', body);
            const email = await axios.post('http://localhost:8000/auth/email/code', {username:body.username});
        } catch (e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const resendEmail = createAsyncThunk(
    'register/resend',
    async (username:string, thunkAPI) => {
        try{
            const req = await axios.post('http://localhost:8000/auth/email/code', {username});
        }catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const sendVerification = createAsyncThunk(
    'register/verify',
    async (body:VerifyCode, thunkAPI) => {
        try{
            const req = await axios.post('http://localhost:8000/auth/email/verify', body);
            return req.data;
        } catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const updateUserPassword = createAsyncThunk(
    'register/password',
    async (body:UpdatePassword, thunkAPI) => {
        try{
            const req = await axios.put('http://localhost:8000/auth/update/password', body);
        } catch(e){
            return thunkAPI.rejectWithValue(e);
        }
    }
)

export const RegisterSlice = createSlice({
    name:"register",
    initialState,
    reducers: {
        updateRegister(state, action:PayloadAction<UpdatePayload>){
            let {name, value} = action.payload;

            if(name === 'month' || name === 'day' || name === 'year'){
                let dob = state.dob;

                dob = {
                    ...dob,
                    [name]:value
                }

                state = {
                    ...state,
                    dob
                };
            } else {
                state = {
                    ...state,
                    [name]: value
                }
            }

            console.log('Updating the global register state: ', state);

            return state;
        },

        incrementStep(state){
            state.step++;
            state.error = false;
            return state;
        },

        decrementStep(state){
            if(state.step === 1 || state.step === 4 || state.step >= 6){
                return state;
            } else {
                state.step--;
                return state;
            }
        },

        cleanRegisterState(state){
            state = initialState;
            return state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action)=> {
            state.loading = true;
            return state;
        });

        builder.addCase(updateUserPhone.pending, (state, action) => {
            state = {
                ...state,
                loading: true
            }
            return state;
        });

        builder.addCase(resendEmail.pending, (state, action) => {
            state = {
                ...state,
                loading: true
            };
            return state;
        });

        builder.addCase(sendVerification.pending, (state, action) => {
            state = {
                ...state,
                loading: true
            };
            return state;
        });

        builder.addCase(updateUserPassword.pending, (state, action) => {
            state = {
                ...state,
                loading: true
            };
            return state;
        })

        builder.addCase(registerUser.fulfilled, (state, action) => {
            let nextStep = state.step + 1;
            state = {
                ...state,
                username:action.payload.username,
                loading: false,
                error: false,
                step: nextStep
            }
            return state;
        });

        builder.addCase(updateUserPhone.fulfilled, (state, action) => {
            let nextStep = state.step + 1;
            state = {
                ...state,
                loading: false,
                error: false,
                step: nextStep
            }
            return state;
        });

        builder.addCase(resendEmail.fulfilled, (state, action) => {
            state= {
                ...state,
                loading: false,
                error: false
            };
            return state;
        }
        );

        builder.addCase(sendVerification.fulfilled, (state, action) => {
            let nextStep = state.step + 1;
            state = {
                ...state,
                loading: false,
                error: false,
                step: nextStep
            };
            return state;
        });

        builder.addCase(updateUserPassword.fulfilled, (state, action) => {
            state = {
                ...state,
                loading: false,
                error: false,
                login: true
            };

            return state;
        });

        builder.addCase(registerUser.rejected, (state, action)=> {
            state.error = true;
            state.loading = false;
            return state;
        });

        builder.addCase(updateUserPhone.rejected, (state, action) => {
            state = {
                ...state,
                loading: false,
                error: true
            }

            return state;
        });

        builder.addCase(resendEmail.rejected, (state, action) => {
            state = {
                ...state,
                loading: false,
                error: true
            };
            return state;
        });

        builder.addCase(sendVerification.rejected, (state, action) => {
            state = {
                ...state,
                loading: false,
                error: true
            }
            return state;
        });

        builder.addCase(updateUserPassword.rejected, (state, action) => {
            state = {
                ...state,
                loading: false,
                error: true
            };

            return state;
        });
    }
});

export const {updateRegister, incrementStep, decrementStep, cleanRegisterState} = RegisterSlice.actions;

export default RegisterSlice.reducer;