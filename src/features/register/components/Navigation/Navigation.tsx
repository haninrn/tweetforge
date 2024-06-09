import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/Store';
import { Link } from 'react-router-dom'

import './Navigation.css';
import blueLogo from '../../../../assets/fwitter-logo-large-blue.png';
import HomeSVG from '../../../../components/SVGs/HomeSVG';
import ExploreSVG from '../../../../components/SVGs/ExploreSVG';
import NotificationSVG from '../../../../components/SVGs/NotificationSVG';
import MessageSVG from '../../../../components/SVGs/MessagesSVG';
import ListsSVG from '../../../../components/SVGs/ListsSVG';
import CommunitiesSVG from '../../../../components/SVGs/CommunitiesSVG';
import VerifiedSVG from '../../../../components/SVGs/VerifiedSVG';
import ProfileSVG from '../../../../components/SVGs/ProfileSVG';
import MoreSVG from '../../../../components/SVGs/MoreSVG';

export const Navigation:React.FC = () => {

const state = useSelector((state:RootState) => state.user);

    return(
        <div className="navigation">
            <nav className="navigation-container">
                <Link to="/home" className="navigation-logo-bg">
                <img className="navigation-logo" src={blueLogo} />

                </Link>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                    <HomeSVG height={26} width={26} />
                    <p className="navigation-text navigation-active">Home</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                    <ExploreSVG height={26} width={26} />
                    <p className="navigation-text navigation-active">Explore</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                    <NotificationSVG height={26} width={26} />
                    <p className="navigation-text navigation-active">Notificaation</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                    <MessageSVG height={26} width={26} />
                    <p className="navigation-text navigation-active">Messages</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                    <ListsSVG height={26} width={26} />
                    <p className="navigation-text navigation-active">Lists</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                    <CommunitiesSVG height={26} width={26} />
                    <p className="navigation-text navigation-active">Communities</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                    <VerifiedSVG height={26} width={26} />
                    <p className="navigation-text navigation-active">Verified</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                    <ProfileSVG height={26} width={26} />
                    <p className="navigation-text navigation-active">Profile</p>
                    </Link>
                </div>
                <div className="navigation-item">
                    <Link to="" className="navigation-link">
                    <MoreSVG height={26} width={26} />
                    <p className="navigation-text navigation-active">More</p>
                    </Link>
                </div>
                <button className="navigation-post-button">
                    Post
                </button>
            </nav>
            <div className="navigation-options">
                <img className="navigation-options-pfp" src ="https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg
"/>
                <div className="navigation-options-info">
                    <p className="navigation-options-info-display-name">
                        {state.loggedIn && state.loggedIn.nickname ? state.loggedIn.nickname : state.username}
                    </p>
                    <p className="navigation-options-info-handle">
                        @[state.username ? state.username : ""]
                    </p>
                </div>
                <p className="navigation-options-dotdotdot">...</p>
            </div>
        </div>
    )

}