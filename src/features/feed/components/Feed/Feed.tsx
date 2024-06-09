import React from 'react';

import './Feed.css';
import { FeedTopBar } from '../FeedTopBar/FeedTopBar';
import { FeedPostCreator } from '../FeedPostCreator/FeedPostCreator';

export const Feed:React.FC = () => {
    return (
        <div className="Feed">
            <FeedTopBar />
            <FeedPostCreator />
        </div>
    )

}