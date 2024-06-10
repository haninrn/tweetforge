import React, {useState} from 'react';

import DiscoveryProvider from '../../context/DiscoveryContext';
import { DiscoverySearchBar } from '../DiscoverySearchBar/DiscoverySearchBar';
import { DiscoverySearchDropDown } from '../DiscoverSearchDropDown/DiscoverySearchDropDown';

import './Discovery.css';

export const Discover:React.FC = () => {

    const [showDropDown, setShowDropDown] = useState<boolean>(false);

    const updateShowDropDown = (value:boolean) => {
        setShowDropDown(value)
    }

    return(
        <DiscoveryProvider>
            <div className="discover">
                <div className="discovery-sticky">
                    <DiscoverySearchBar toggleDropDown={updateShowDropDown}/>
                    { showDropDown && <DiscoverySearchDropDown toggleDropDown={updateShowDropDown}/> }
                </div>
            </div>
        </DiscoveryProvider>
    ) 
}