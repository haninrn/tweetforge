import React from 'react';
import VerifiedSVG from '../../../../components/SVGs/VerifiedSVG';
import LockSVG from '../../../../components/SVGs/LockSVG';
import DefaultPfp from '../../../../assets/default_pfp.webp';

import './DiscoverySearchDropDownResult.css';
import { ImageInfo } from '../../../../utils/GlobalInterfaces';

interface DiscoverySearchDropDownResultProps {
    pfp: ImageInfo | null;
    nickname: string;
    verified: boolean;
    privateAccount: boolean;
    organization: ImageInfo | null;
    username:string
}

export const DiscoverySearchDropDownResult:React.FC<DiscoverySearchDropDownResultProps> = ({pfp, nickname, verified, privateAccount, organization, username}) => {
    return (
        <div className="discovery-search-drop-down-result">
            <img className="discovery-search-drop-down-result-pfp" src={pfp ? pfp.imageURL : DefaultPfp} alt={`${username}'s pfp`}/>
            <div className="discovery-search-drop-down-name-section">
                <div className="discovery-search-drop-down-nickname-section">
                    <p className="discovery-search-drop-down-nickname">{nickname}</p>
                    {verified && <VerifiedSVG color={"#1DA1F2"} width={12} height={12} />}
                    {privateAccount && <LockSVG color="#1DA1F2" width={12} height={12} /> }
                    {organization && <img className="discovery-search-drop-down-oranization" src={organization.imageURL} alt={`${username}'s organization`}/>}
                </div>
                <p className="discovery-search-drop-down-username">
                    @{username}
                </p>
            </div>
        </div>
    )
}