import React, {useEffect, useState} from 'react';
import { ValidatedTextInput } from '../../../../components/ValidatedInput/ValidatedTextInput';
import AddIcon from '@mui/icons-material/Add';
import { ValidatedDateSelector } from '../../../../components/ValidatedInput/ValidatedDateSelector';
import { useDispatch } from 'react-redux';

import './FeedPostCreatorPoll.css';
import { generatePollDaysSelections, generatePollHoursSelections, generatePollMinutesSelections } from '../../utils/FeedUtils';
import { AppDispatch } from '../../../../redux/Store';
import { removePoll, setPollDate, updatePoll } from '../../../../redux/Slices/PostSlice';
import { JSDocTemplateTag, idText } from 'typescript';

export const FeedPostCreatorPoll:React.FC = () => {

    const dispatch:AppDispatch = useDispatch();

    const [labels, setLabels] = useState<string[]>(['Choice 1', 'Choice 2']);
    const [time, setTime] = useState<{days: string, hours: string, minutes:string}>({
        days: "1",
        hours: "0",
        minutes: "0"
    });

    const addNewChoice = () => {
        
        if(labels.length < 4){
            setLabels([...labels, `Choice ${labels.length + 1} (optional)`]);
        }
    }

    const updateChoiceText = (e:React.ChangeEvent<HTMLInputElement>) => {
        //choice:${index}
        const index = e.target.name.split(":")[1];
        dispatch(updatePoll({
            index: +index,
            choiceText: e.target.value
        }))
    }

    const updateTime = (name:string, value:string | number | boolean) => {
        console.log({name, value});
        setTime({
            ...time,
            [name]: value
        })

        let date = JSON.parse(JSON.stringify(time));
        console.log("date", date);

        date = {
            ...date,
            [name]: value
        }

        dispatch(setPollDate(`${date.days}:${date.hours}:${date.minutes}`));
    }

    const deletePoll = () => {
        dispatch(removePoll());
    }

    useEffect(() => {
        console.log("adding a new choice");
    }, [labels.length])

    return(
        <div className="feed-post-creator-poll" style={{zIndex: 5}}>
            <div className="feed-post-creator-poll-choices">
                {
                    labels.map((label, index) => {
                        return (
                            <div className="feed-post-creator-poll-choice" key={label}>
                                <div className={labels.length < 4 ? "feed-post-creator-poll-choice-wrapper-min" : "feed-post-creator-poll-choice-wrapper-max"}>
                                    <ValidatedTextInput valid={true} name={`choice:${index}`} label={label} changeValue={updateChoiceText} attributes={{maxLength: 25}}/>
                                </div>
                                {
                                    (index === labels.length -1 && labels.length < 4) &&
                                        <div className="feed-post-creator-poll-choice-add">
                                            <div className="feed-post-creator-poll-choice-add-hover" onClick={addNewChoice}>
                                                <AddIcon sx={{color: 'rgb(29, 161, 242);'}}/>
                                            </div>
                                        </div>
                                }
                            </div>
                        )
                    })
                
                }
            </div>
            <div className="feed-post-creator-poll-length">
                <p className="feed-post-creator-poll-length-text">Poll Length</p>
                <div className="feed-post-creator-poll-length-wrapper">
                    <ValidatedDateSelector style="" valid={true} name="Days" dropDown={generatePollDaysSelections} dispatcher={updateTime} data={+time.days}/>
                    <ValidatedDateSelector style="" valid={true} name="Hours" dropDown={generatePollHoursSelections} dispatcher={updateTime} data={+time.hours}/>
                    <ValidatedDateSelector style="" valid={true} name="Minutes" dropDown={generatePollMinutesSelections} dispatcher={updateTime} data={+time.minutes}/>
                </div>
            </div>
            <div className="feed-post-creator-poll-button" onClick={deletePoll}>
                Remove poll
            </div>
        </div>
    )
}