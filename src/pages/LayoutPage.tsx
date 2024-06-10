import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import { Navigation } from '../components/Navigation/Navigation';
import { Discover } from '../features/discovery/components/Discovery/Discovery';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/Store';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useEffect } from 'react';
import { getUserByToken, setToken } from '../redux/Slices/UserSlice';

import './LayoutPage.css';
import { updateDisplayEmojis, updateDisplayPostMore } from '../redux/Slices/ModalSlice';

export const LayoutPage:React.FC = () => {

    const state = useSelector((state:RootState) => state.user);
    const displayEmojis = useSelector((state:RootState) => state.modal.displayEmojis);
    const displayPostMore = useSelector((state:RootState) => state.modal.displayPostMore);
    const dispatch:AppDispatch = useDispatch();

    const navigate = useNavigate();

    const location = useLocation();

    const [jwt, setJwt, removeJwt] = useLocalStorage("token", "");

    useEffect(() => {
        if(jwt !== '' && state.token !== ''){
            dispatch(
                getUserByToken(state.token)
            );
        } else if (jwt === '' && state.token !== ''){
            setJwt(state.token);
        } else if(jwt !== '' && state.token === ''){
            dispatch(
                setToken(jwt)
            );
        } else {
            navigate("/");
        }
    },[state.token]);

    const closeOpenedModals = (e:React.MouseEvent) => {
        if(displayEmojis) dispatch(updateDisplayEmojis())
        if(displayPostMore) dispatch(updateDisplayPostMore())
    }

    return (
        <div className="layout-page" onClick={closeOpenedModals}>
            <div className="layout">
                <div className="layout-navigation-section">
                    <Navigation currentPage={location.pathname}/>
                </div>
                <div className="layout-content-section">
                    <Outlet />
                </div>
                <div className="layout-info-section">
                    <Discover />
                </div>
            </div>
        </div>
    )
}
