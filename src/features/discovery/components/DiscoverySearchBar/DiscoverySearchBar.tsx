import React, {useState, useRef, useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/Store';

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import './DiscoverySearchBar.css';
import { DiscoveryContext } from '../../context/DiscoveryContext';
import { DiscoveryContextType } from '../../context/Models';
import { loadSearchedFeedPage } from '../../../../redux/Slices/FeedSlice';

interface DiscoverySearchBarProps {
    toggleDropDown: (value:boolean) => void
}

export const DiscoverySearchBar:React.FC<DiscoverySearchBarProps> = ({toggleDropDown}) => {

    const {updateSearchContent, searchForUsers, searchContent} = useContext(DiscoveryContext) as DiscoveryContextType;

    const [active, setActive] = useState<boolean>(false);
    const [timer, setTimer] = useState<any>();
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch:AppDispatch = useDispatch();
    const sessionStart = useSelector((state:RootState) => state.feed.sessionStart);
    const userState = useSelector((state:RootState) => state.user);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        updateSearchContent(e.target.value);
        clearTimeout(timer);
    }

    const focusOnInput = () => {
        if (sessionStart != undefined) {
            dispatch(loadSearchedFeedPage({
                token: userState.token,
                userId: userState?.loggedIn?.userId ?? 0,
                sessionStart,
                searchTerm: searchContent
            }))
            console.log("Entered")
        }
    }

    const handleFocus = () => {
        setActive(true)
        toggleDropDown(true);
    }

    const handleBlur = () => {
        setActive(false)
        if(searchContent === ''){
            toggleDropDown(false);
        }
    }

    const clearInput = () => {
        updateSearchContent("");
    }

    return(
        <div className={active ? "discovery-search-bar-active" : "discovery-search-bar-inactive"}>
            <div className="discovery-search-bar-icon-wrapper" onClick={focusOnInput}>
                <SearchIcon sx={{color: `${active ? '#1DA1F2' : '#657786'}`, cursor:"pointer"}}/>
            </div>
            <input className="discovery-search-bar-input" onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} placeholder='Search' ref={inputRef} value={searchContent}/>
            {
                searchContent && 
                    <div className="discovery-search-bar-clear" onClick={clearInput}>
                        <CloseIcon sx={{fontSize: "16px", color: "black", width: "16px", height: "16px"}} />
                    </div>
            }
        </div>
    )
}