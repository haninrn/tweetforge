import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { DiscoveryContext } from '../../context/DiscoveryContext'
import { DiscoveryContextType } from '../../context/Models'
import SearchIcon from '@mui/icons-material/Search';

import './DiscoverySearchDropDown.css';
import { DiscoverySearchDropDownResult } from '../DiscoverySearchDropDownResult/DiscoverySearchDropDownResult';

interface DiscoveryDropDownProps {
    toggleDropDown: (value:boolean) => void
}

export const DiscoverySearchDropDown:React.FC<DiscoveryDropDownProps> = ({toggleDropDown}) => {

    const {searchContent, searchResultUsers, updateSearchContent} = useContext(DiscoveryContext) as DiscoveryContextType;
    const navigate = useNavigate();

    const navigateToUserProfile = (e:React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        toggleDropDown(false);
        updateSearchContent("");
        navigate(`/${e.currentTarget.id}`);
    }

    useEffect(() => {
        console.log("user list changed: ", searchResultUsers);
    }, [searchResultUsers])

    return(
        <div className="discovery-search-drop-down">
            <div className="discovery-search-drop-down-search-for">
                {
                    searchContent ?
                        <div className="discovery-search-drop-down-content-wrapper" onClick={() => {/* Navigate to the search page and do the search*/}}>
                            <SearchIcon sx={{
                                height: "30px",
                                width: "30px"
                            }}/>
                            <p className="discovery-search-drop-down-content">
                                {searchContent}
                            </p>
                        </div>
                    :
                            <div className="discovery-search-drop-down-empty-wrapper">
                                <p className="discovery-search-drop-down-empty">Try searching for people, lists, or keywords</p>
                            </div>
                }
            </div>
            {
                searchContent &&
                    <div className="discovery-search-drop-down-results">
                        <div>
                            {searchResultUsers.slice(0, 8).map((user) => {
                                return <div className="discovery-search-drop-down-result-wrapper" onClick={navigateToUserProfile} key={user.userId} id={user.username}>
                                            <DiscoverySearchDropDownResult pfp={user.profilePicture} nickname={user.nickname} verified={user.verifiedAccount} privateAccount={user.privateAccount} organization={user.organization} username={user.username} />
                                        </div>
                            })}
                        </div>
                        <div className="discovery-search-drop-down-go-to">
                            <p className="discovery-search-drop-down-go-to-text" onClick={navigateToUserProfile} id={searchContent}>
                                Go to @{searchContent}
                            </p>
                        </div>
                    </div>
                
            }
        </div>
    )
}