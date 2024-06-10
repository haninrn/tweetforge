import React, { ReducerAction, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/Store';
import {updateCurrentPost} from '../../redux/Slices/PostSlice';
import data from '../../assets/list.with.images.json';

import {generateEmojiCateogory, determineSkinToneColor, generateTopRow, getEmojiCharacterByNameAndModifier, EmojiData, Emoji, EMOJIS, convertModifierToIndex} from '../../utils/EmojiUtils';
import SearchIcon from '@mui/icons-material/Search';
import DoneIcon from '@mui/icons-material/Done';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import './EmojiDropDown.css';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const EmojiDropDown:React.FC = () => {

    const [activeCategory, setActiveCategory] = useState<number>(0);
    const [currentEmoji, setCurrentEmoji] = useState<string>("url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAwFBMVEVHcExdrez/3F3/3F1drexdrez/3F3/3F3/3F3/3F3/3F1drexdrexdrexdrez/3F1drez/3F3/3F1drez/3F3/3F1drez/3F1drexdrexdrez/3F1drez/3F3wm0ZdrezvlkXvlkXvlkXvlkX2tU/+11tvstz90lr5wlTvlkXvlkXvlkX4u1L4vVLvlkVdrez/3F3wmkf+2Fz7y1fyo0rxn0j2tVD5wlT3uVH6xlb0rE3zqEv4vVP8z1n901r1sE7Bu7vOAAAALnRSTlMAQK9ggBBAEO+Az5/PYDAgv99Q779wjzBQ33Cfr4+AIDC/cCDXz4/fgJ9Az++Pgf5MAQAAA8ZJREFUeNqlmFt32joQhcdgY2ODMT7mGkh6TntuvchDzCUhSfv//1UXyPJIHsldod9LeGDtaM8ejSTgVvyyLEfJOIDfJCglf8yD3xZSUkvoJo8R70JwMS8b5tBFHy/EIa9Mucr8FCD1lv7o10oTlPQchlb+tTaelFp2LkiSMyFVGx8uJNfPvOLhMMJpH+AT1kQTZk0xShsln+nEeGH7cY+KAgw8b5ys1KLGAAAj25KGKPkmnlExA8YyKyUXJU9+MPlXGdrtHjVzHG+llOSSEjD4q8KaZ3HWzXGCRLpL690CBn++ouKsmRuyTi0WAGtZcYDl5W9L6NAYetTM4QKIfuN3fFVag8eF/hdHVFTiBRUxEFHdqdRDKRf6LESFiqN4tZgbYE1Yl7lcX/adb7Zi9FXsyNxh9x0VAybUV8mvrK14EmeruWmovof6Lrz2U9pqRZ7Wk3hCxRZqpro3T3rT+duW1l68MXM93Rtc+nIDGh+oFTVDb2LPzA0Nb/N2ke6fWmlxcz2qNnkbt6O/Z2lxczlV28zN2GWOtL7vqNmj0Kx2zyb0UYhnq7lXcWyZ6+neAtbV98KR1ouozNE0NLz5bDx+EWeWFjM3MapdgI0PgqVlH00hNvCRN7krik/Ckda5NXenplV++Jz0VtzZR1O00Ksdt9fjTIubi1W1aeIRM/Wv9zt7WscTKh7vISehOzAYutNSkGXxX4Ro9CiRW9M6iR9Mp9qRYxoBxNSVFl/PCQ2mYDDQvrpnaek6tGD7kraOtEwfe4vZgk1sW1qmjydhK/8ADBbutMipqJDT4/cQbq61oBfk8A0Xm2lxaEGs3NwcpcU4UbN2e4OZsbcYP+RG5ETQpiBzFhcH1aqMkA2lqDH3wrw9CoEOBsDNcfjR4haia0nvFiG689BFKYxuFzIPufwWoZkhlAKZu7VGAb1L3ObexOHXxdafSgN0wOPnfTTSLzlb5NB46e7sRPMG4RQdm//YvdfUbSmjufu+IvXb77kxH02tQfvsLJG6lmzMZ2CMDDrRuTNKTHYSvXAWriVV1vBJyAP5kEu6zVW20VaAIZSWpNRh7lDxBelC6+bVOwpoNDG6s8/qq3tG7102mjj8EiHfgQFAMColmezMO2R0D8cHVZsgK2tW82VKZy/DdRJtmmb0S51/4vfpQEqlSTNdKYzfoUMLSR6uM25DQhB21inKoU1SXtmsPQ8gGCej5rec3N0FxQTApUS/lgSeJ0eva1HTHDhmmflVPuIyfXBBZQZG2O/pWvF2AV08rDOyxljkwyuzQQh2fgLrB1woYWK5YwAAAABJRU5ErkJggg==)");
    const [currentEmojiName, setCurrentEmojiName] = useState<string>("")
    const [skinToneSelectorActive, setSkinToneSelectorActive] = useState<boolean>(false);
    const [currentSkinTone, setCurrentSkinTone] = useState<string>("none");
    const [emojiSearchContent, setEmojiSearchContent] = useState<string>("");
    const [searchEmojis, setSearchEmojis] = useState<EmojiData[]>([]);
    const [recentEmojis, setRecentEmojis, removeRemoveRecentEmojis] = useLocalStorage("recentEmojis", "");

    let currentPost = useSelector((state:RootState) => state.post.currentPost);
    let currentReply = useSelector((state:RootState) => state.post.currentReply);
    let dispatch:AppDispatch = useDispatch();

    let options = {
        root: document.querySelector("#emoji-scroll-area"),
        rootMargin: "0px",
        threshold: 0,
    };
      
    let observer = new IntersectionObserver(calculateCategory, options);
    let headers = document.querySelectorAll(".emoji-drop-down-selector-section-title");
    let recentHeader = document.querySelector(".emoji-drop-down-selector-recent-title");
    headers.forEach((element) => {
        if(element !== null) observer.observe(element);
    })
    if(recentHeader !== null) observer.observe(recentHeader);
    
    const navigateToSection = (e:React.MouseEvent<HTMLDivElement>) => {
        switch(e.currentTarget.id){
            case "0":
                setActiveCategory(0);

                let recent = document.getElementById("Recent");
                if(recent) recent.scrollIntoView();
                break;
            case "1":
                setActiveCategory(1);
                let smileys = document.getElementById("Smileys & people");

                if(smileys) smileys.scrollIntoView();
                break;
            case "2":
                setActiveCategory(2);

                const animals = document.getElementById("Animals & nature");

                if(animals) animals.scrollIntoView();
                break;
            case "3":
                setActiveCategory(3);

                const food = document.getElementById("Food & drink");
                if(food) food.scrollIntoView();
                break;
            case "4":
                setActiveCategory(4);

                const activity = document.getElementById("Activity");
                if(activity) activity.scrollIntoView();
                break;
            case "5":
                setActiveCategory(5);

                const travel = document.getElementById("Travel & places");
                if(travel) travel.scrollIntoView();
                break;
            case "6":
                setActiveCategory(6);

                const objects = document.getElementById("Objects");
                if(objects) objects.scrollIntoView();
                break;
            case "7":
                setActiveCategory(7);

                const symbols = document.getElementById("Symbols");
                if(symbols) symbols.scrollIntoView();
                break;
            default:
                setActiveCategory(8);

                const flags = document.getElementById("Flags");
                if(flags) flags.scrollIntoView();
        }

    }

    function calculateCategory(entries:any, observer:any){
        let intersecting:boolean[] = [];
        entries.forEach((entry:any) => {
            if (entry.isIntersecting) {
                let elem = entry.target;
                let id = elem.id;
                if(id === "recentHeader")intersecting[0] = true;
                if(id === "smileysAndPeopleHeader")intersecting[1] = true;
                if(id === "animalsAndNatureHeader")intersecting[2] = true;
                if(id === "foodAndDrinkHeader") intersecting[3] = true;
                if(id === "activityHeader") intersecting[4] = true;
                if(id === "travelAndPlacesHeader") intersecting[5] = true;
                if(id === "objectsHeader") intersecting[6] = true;
                if(id === "symbolsHeader") intersecting[7] = true;
                if(id === "flagsHeader") intersecting[8] = true;
            }
          });
          let findFirstTrue = ():number => {
            for(let i =0; i<intersecting.length; i++){
                if(intersecting[i] === true) return i 
            }

            return 0;
          }

          setActiveCategory(findFirstTrue);
    }

    const getCurrentEmoji = (e:React.MouseEvent<HTMLDivElement>) => {
        const element:any = e.target;
        if(element.id){
            setCurrentEmoji(element.style.backgroundImage);
            
            if(!skinToneSelectorActive) setCurrentEmojiName(element.id);
        }
    }

    const resetCurrentEmoji = (e:React.MouseEvent<HTMLDivElement>) => {
        setCurrentEmoji("url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAwFBMVEVHcExdrez/3F3/3F1drexdrez/3F3/3F3/3F3/3F3/3F1drexdrexdrexdrez/3F1drez/3F3/3F1drez/3F3/3F1drez/3F1drexdrexdrez/3F1drez/3F3wm0ZdrezvlkXvlkXvlkXvlkX2tU/+11tvstz90lr5wlTvlkXvlkXvlkX4u1L4vVLvlkVdrez/3F3wmkf+2Fz7y1fyo0rxn0j2tVD5wlT3uVH6xlb0rE3zqEv4vVP8z1n901r1sE7Bu7vOAAAALnRSTlMAQK9ggBBAEO+Az5/PYDAgv99Q779wjzBQ33Cfr4+AIDC/cCDXz4/fgJ9Az++Pgf5MAQAAA8ZJREFUeNqlmFt32joQhcdgY2ODMT7mGkh6TntuvchDzCUhSfv//1UXyPJIHsldod9LeGDtaM8ejSTgVvyyLEfJOIDfJCglf8yD3xZSUkvoJo8R70JwMS8b5tBFHy/EIa9Mucr8FCD1lv7o10oTlPQchlb+tTaelFp2LkiSMyFVGx8uJNfPvOLhMMJpH+AT1kQTZk0xShsln+nEeGH7cY+KAgw8b5ys1KLGAAAj25KGKPkmnlExA8YyKyUXJU9+MPlXGdrtHjVzHG+llOSSEjD4q8KaZ3HWzXGCRLpL690CBn++ouKsmRuyTi0WAGtZcYDl5W9L6NAYetTM4QKIfuN3fFVag8eF/hdHVFTiBRUxEFHdqdRDKRf6LESFiqN4tZgbYE1Yl7lcX/adb7Zi9FXsyNxh9x0VAybUV8mvrK14EmeruWmovof6Lrz2U9pqRZ7Wk3hCxRZqpro3T3rT+duW1l68MXM93Rtc+nIDGh+oFTVDb2LPzA0Nb/N2ke6fWmlxcz2qNnkbt6O/Z2lxczlV28zN2GWOtL7vqNmj0Kx2zyb0UYhnq7lXcWyZ6+neAtbV98KR1ouozNE0NLz5bDx+EWeWFjM3MapdgI0PgqVlH00hNvCRN7krik/Ckda5NXenplV++Jz0VtzZR1O00Ksdt9fjTIubi1W1aeIRM/Wv9zt7WscTKh7vISehOzAYutNSkGXxX4Ro9CiRW9M6iR9Mp9qRYxoBxNSVFl/PCQ2mYDDQvrpnaek6tGD7kraOtEwfe4vZgk1sW1qmjydhK/8ADBbutMipqJDT4/cQbq61oBfk8A0Xm2lxaEGs3NwcpcU4UbN2e4OZsbcYP+RG5ETQpiBzFhcH1aqMkA2lqDH3wrw9CoEOBsDNcfjR4haia0nvFiG689BFKYxuFzIPufwWoZkhlAKZu7VGAb1L3ObexOHXxdafSgN0wOPnfTTSLzlb5NB46e7sRPMG4RQdm//YvdfUbSmjufu+IvXb77kxH02tQfvsLJG6lmzMZ2CMDDrRuTNKTHYSvXAWriVV1vBJyAP5kEu6zVW20VaAIZSWpNRh7lDxBelC6+bVOwpoNDG6s8/qq3tG7102mjj8EiHfgQFAMColmezMO2R0D8cHVZsgK2tW82VKZy/DdRJtmmb0S51/4vfpQEqlSTNdKYzfoUMLSR6uM25DQhB21inKoU1SXtmsPQ8gGCej5rec3N0FxQTApUS/lgSeJ0eva1HTHDhmmflVPuIyfXBBZQZG2O/pWvF2AV08rDOyxljkwyuzQQh2fgLrB1woYWK5YwAAAABJRU5ErkJggg==)");
        setCurrentEmojiName("");
    }

    const selectSkinTone = (e:React.MouseEvent<HTMLDivElement>) => {
        setCurrentSkinTone(e.currentTarget.id);
        setSkinToneSelectorActive(false);
    }

    const appendEmojiToPost = (e:React.MouseEvent<HTMLDivElement>) => {
        let name = e.currentTarget.id;
        let emoji = getEmojiCharacterByNameAndModifier(name, currentSkinTone);
        if(currentPost){
            let postContent = currentPost.content;
            let updatedContent = postContent + emoji;
            dispatch(updateCurrentPost({
                name: "content",
                value: updatedContent
            }))
        }
        if(currentReply){
            let replyContent = currentReply.replyContent;
            let updatedContent = replyContent + emoji;
            dispatch(updateCurrentPost({
                name: "replyContent",
                value: updatedContent
            }))
        }

        let emojis:EmojiData[] = JSON.parse(recentEmojis);
        let emojiData = EMOJIS.find(e => e.name === name);
        if(!emojis.find(e => e.name === name)){
            console.log("the emoji has not recently been used, add it to the list");
            emojis.unshift({
                name,
                category: emojiData?.category || '',
                emoji,
                image: emojiData?.images[convertModifierToIndex(currentSkinTone)] || ''
            });
        } else {
            for(let i = 0; i<emojis.length; i++){
                if(emojis[i].name === name){
                    emojis.splice(i, 1);
                }
            }
            emojis.unshift({
                name,
                category: emojiData?.category || '',
                emoji,
                image: emojiData?.images[convertModifierToIndex(currentSkinTone)] || ''
            })
        }

        setRecentEmojis(JSON.stringify(emojis.slice(0,9)));

    }

    const updateEmojiSearchContent = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmojiSearchContent(e.target.value);
        setSearchEmojis(() => {
            return EMOJIS.filter((emoji:Emoji) => emoji.name.toLowerCase().includes(e.target.value.toLowerCase())).map((emoji) => {return {
                name: emoji.name,
                category: emoji.category,
                emoji: emoji.emoji,
                image: emoji.images[convertModifierToIndex(currentSkinTone)]
            }});
        });
    }

    useEffect(() => {
        if(currentPost) console.log(currentPost?.content)
        
        if(!recentEmojis) setRecentEmojis(JSON.stringify([]));
    }, [currentPost, currentPost?.content, searchEmojis.length])

    return (
        <div className="emoji-drop-down" onClick={(e) => e.stopPropagation()}>
            <div className="emoji-drop-down-top">
                <div className="emoji-drop-down-search-border">
                    <SearchIcon sx={{
                        fontSize: "20px",
                        position: "absolute",
                        top: "14px",
                        left: "16px"
                    }}/>
                    <input className="emoji-drop-down-search" id="emoji-search" placeholder="Search emojis" onChange={updateEmojiSearchContent} value={emojiSearchContent}/>
                    {emojiSearchContent ? <div className="emoji-drop-down-search-clear" onClick={() => setEmojiSearchContent("")}>
                        <CloseRoundedIcon sx={{
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '800',
                            height: '12px',
                            width: '12px'
                        }}/>
                    </div> : <></>}
                </div>
                <>
                    {
                        !emojiSearchContent ?
                            <div className="emoji-drop-down-categories">
                                {generateTopRow().map((data, index) => {
                                    if(activeCategory === index){
                                        return <div className="emoji-drop-down-category-wrapper">
                                            <div className="emoji-drop-down-category emoji-active" id={`${index}`} style={{
                                            backgroundImage: `url("${data.img}")`}}></div>
                                            <div className="emoji-drop-down-category-underline-active"></div>
                                        </div>
                                    }else{
                                        return <div className="emoji-drop-down-category-wrapper">
                                            <div className="emoji-drop-down-category emoji-inactive" id={`${index}`} style={{
                                            backgroundImage: `url("${data.img}")`,}} onClick={navigateToSection}></div>
                                            <div className="emoji-drop-down-category-underline-inactive"></div>
                                        </div>
                                    }
                                    
                                })}
                            </div>
                        :
                            <div className="emoji-drop-down-categories">
                                {generateTopRow().map((data, index) => {
                                    return <div className="emoji-drop-down-category-wrapper">
                                                <div className="emoji-drop-down-category emoji-inactive-search" style={{
                                                backgroundImage: `url("${data.img}")`}}></div>
                                                <div className="emoji-drop-down-category-underline-inactive"></div>
                                            </div>

                                })}
                            </div>
                    }
                </>
            </div>
            <div className="emoji-drop-down-selector" onMouseOver={!emojiSearchContent ? getCurrentEmoji : () => {}} onMouseLeave={!emojiSearchContent ? resetCurrentEmoji : () => {}} id="emoji-scroll-area">
                {
                    !emojiSearchContent  && recentEmojis ?
                    <>
                        {   JSON.parse(recentEmojis).length > 0 ?
                            <div className="emoji-drop-down-selector-section" id="Recent">
                                <div className="emoji-drop-down-selector-recent-section">
                                    <h2 className="emoji-drop-down-selector-recent-title" id="recentHeader">Recent</h2>
                                    <h3 className="emoji-drop-down-selector-clear-recent" onClick={() => setRecentEmojis(JSON.stringify([]))}>Clear all</h3>
                                </div>
                            
                                <div className="emoji-drop-down-selector-emoji-wrapper">
                                    {JSON.parse(recentEmojis).map((emoji:EmojiData) => <div onClick={appendEmojiToPost} aria-label={emoji.name} id={emoji.name} className="emoji-drop-down-emoji" style={{
                                        backgroundImage: `url(${emoji.image})`
                                    }}></div>)}
                                </div>
                            </div> : <></>
                        }
                        <div className="emoji-drop-down-selector-section" id="Smileys & people">
                            <h2 className="emoji-drop-down-selector-section-title" id="smileysAndPeopleHeader">Smileys & people</h2>
                            <div className="emoji-drop-down-selector-emoji-wrapper">
                                {generateEmojiCateogory('Smileys & people', currentSkinTone).map((emoji) => <div onClick={appendEmojiToPost} aria-label={emoji.name} id={emoji.name} className="emoji-drop-down-emoji" style={{
                                    backgroundImage: `url(${emoji.image})`
                                }}></div>)}
                            </div>
                        </div>
                        <div className="emoji-drop-down-selector-section" id="Animals & nature">
                            <h2 className="emoji-drop-down-selector-section-title" id="animalsAndNatureHeader">Animals & nature</h2>
                            <div className="emoji-drop-down-selector-emoji-wrapper">
                                {generateEmojiCateogory('Animals & nature', currentSkinTone).map((emoji) => <div onClick={appendEmojiToPost} aria-label={emoji.name} id={emoji.name} className="emoji-drop-down-emoji" style={{
                                    backgroundImage: `url(${emoji.image})`
                                }}></div>)}
                            </div>
                        </div>
                        <div className="emoji-drop-down-selector-section" id="Food & drink">
                            <h2 className="emoji-drop-down-selector-section-title" id="foodAndDrinkHeader">Food & drink</h2>
                            <div className="emoji-drop-down-selector-emoji-wrapper">
                                {generateEmojiCateogory('Food & drink', currentSkinTone).map((emoji) => <div onClick={appendEmojiToPost} aria-label={emoji.name} id={emoji.name} className="emoji-drop-down-emoji" style={{
                                    backgroundImage: `url(${emoji.image})`
                                }}></div>)}
                            </div>
                        </div>
                        <div className="emoji-drop-down-selector-section" id="Activity">
                            <h2 className="emoji-drop-down-selector-section-title" id="activityHeader">Activity</h2>
                            <div className="emoji-drop-down-selector-emoji-wrapper">
                                {generateEmojiCateogory('Activity', currentSkinTone).map((emoji) => <div onClick={appendEmojiToPost} aria-label={emoji.name} id={emoji.name} className="emoji-drop-down-emoji" style={{
                                    backgroundImage: `url(${emoji.image})`
                                }}></div>)}
                            </div>
                        </div>
                        <div className="emoji-drop-down-selector-section" id="Travel & places">
                            <h2 className="emoji-drop-down-selector-section-title" id="travelAndPlacesHeader">Travel & places</h2>
                            <div className="emoji-drop-down-selector-emoji-wrapper">
                                {generateEmojiCateogory('Travel & places', currentSkinTone).map((emoji) => <div onClick={appendEmojiToPost} aria-label={emoji.name} id={emoji.name} className="emoji-drop-down-emoji" style={{
                                    backgroundImage: `url(${emoji.image})`
                                }}></div>)}
                            </div> 
                        </div>
                        <div className="emoji-drop-down-selector-section" id="Objects">
                            <h2 className="emoji-drop-down-selector-section-title" id="objectsHeader">Objects</h2>
                            <div className="emoji-drop-down-selector-emoji-wrapper">
                                {generateEmojiCateogory('Objects', currentSkinTone).map((emoji) => <div onClick={appendEmojiToPost} aria-label={emoji.name} id={emoji.name} className="emoji-drop-down-emoji" style={{
                                    backgroundImage: `url(${emoji.image})`
                                }}></div>)}
                            </div> 
                        </div>
                        <div className="emoji-drop-down-selector-section" id="Symbols">
                            <h2 className="emoji-drop-down-selector-section-title" id="symbolsHeader">Symbols</h2>
                            <div className="emoji-drop-down-selector-emoji-wrapper">
                                {generateEmojiCateogory('Symbols', currentSkinTone).map((emoji) => <div onClick={appendEmojiToPost} aria-label={emoji.name} id={emoji.name} className="emoji-drop-down-emoji" style={{
                                    backgroundImage: `url(${emoji.image})`
                                }}></div>)}
                            </div> 
                        </div>
                        <div className="emoji-drop-down-selector-section" id="Flags">
                            <h2 className="emoji-drop-down-selector-section-title" id="flagsHeader">Flags</h2>
                            <div className="emoji-drop-down-selector-emoji-wrapper">
                                {generateEmojiCateogory('Flags', currentSkinTone).map((emoji) => <div onClick={appendEmojiToPost} aria-label={emoji.name} id={emoji.name} className="emoji-drop-down-emoji" style={{
                                    backgroundImage: `url(${emoji.image})`
                                }}></div>)}
                            </div> 
                        </div>
                    </>
                    :
                    <div className="emoji-drop-down-selector-section" id="Search">
                        <h2 className="emoji-drop-down-selector-section-title">Search results</h2>
                        {   searchEmojis.length > 1 ?
                            <div className="emoji-drop-down-selector-emoji-wrapper">
                                {searchEmojis.map((emoji) => <div onClick={appendEmojiToPost} aria-label={emoji.name} id={emoji.name} className="emoji-drop-down-emoji" style={{
                                    backgroundImage: `url(${emoji.image})`
                                }}></div>)}
                            </div>
                            :
                            <div className="emoji-drop-down-search-no-results">
                                <h1 className="emoji-drop-down-search-no-results-header">No Emojis found</h1>
                                <p className="emoji-drop-down-search-no-results-message">Try searching for something else instead.</p>
                            </div>
                        }
                    </div>
                }
            </div>
            <div className="emoji-drop-down-bottom">
                <div className="emoji-drop-down-current-emoji" style={{backgroundImage: `${currentEmoji}`}}></div>
                <p className={currentEmojiName ? "emoji-drop-down-current-emoji-name" : ""} >{currentEmojiName}</p>
                <div className="emoji-drop-down-skin-tone-selector">
                    {
                        skinToneSelectorActive ?
                        <div className="emoji-drop-down-skin-tone-selector-wrapper">
                            <div className="no-modifier-wrapper"><div className="emoji-drop-down-skin-tone-option" id="none" onClick={selectSkinTone}></div></div>
                            <div className="light-wrapper"><div className="emoji-drop-down-skin-tone-option" id="light" onClick={selectSkinTone}></div></div>
                            <div className="medium-light-wrapper"><div className="emoji-drop-down-skin-tone-option" id="medium-light" onClick={selectSkinTone}></div></div>
                            <div className="medium-wrapper"><div className="emoji-drop-down-skin-tone-option" id="medium" onClick={selectSkinTone}></div></div>
                            <div className="medium-dark-wrapper"><div className="emoji-drop-down-skin-tone-option" id="medium-dark" onClick={selectSkinTone}></div></div>
                            <div className="dark-wrapper"><div className="emoji-drop-down-skin-tone-option" id="dark" onClick={selectSkinTone}></div></div>
                        </div>
                        :
                        <div className="emoji-drop-down-skin-tone-selector-wrapper">
                            <div className="emoji-drop-down-skin-tone-selected" style={{
                                backgroundColor: `${determineSkinToneColor(currentSkinTone)}`
                            }} onClick={() => setSkinToneSelectorActive(true)}>
                                <DoneIcon sx={{
                                    fontSize: "12px"
                                }}/>
                            </div>
                        </div>
                        
                    }
                </div>
            </div>
        </div>
    )
}