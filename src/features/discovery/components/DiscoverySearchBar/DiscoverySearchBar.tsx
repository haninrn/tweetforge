import React, {useState, useRef, useContext} from 'react';

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import './DiscoverySearchBar.css';
import { DiscoveryContext } from '../../context/DiscoveryContext';
import { DiscoveryContextType } from '../../context/Models';

interface DiscoverySearchBarProps {
    toggleDropDown: (value:boolean) => void
}

export const DiscoverySearchBar:React.FC<DiscoverySearchBarProps> = ({toggleDropDown}) => {

    const {updateSearchContent, searchForUsers, searchContent} = useContext(DiscoveryContext) as DiscoveryContextType;

    const [active, setActive] = useState<boolean>(false);
    const [timer, setTimer] = useState<any>();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        updateSearchContent(e.target.value);
        clearTimeout(timer);
        let t = setTimeout(() => {
                searchForUsers(e.target.value);
            }, 500);
        setTimer(t);
    }

    const focusOnInput = () => {
        if(inputRef && inputRef.current) inputRef.current.focus();
        toggleDropDown(true);
        
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