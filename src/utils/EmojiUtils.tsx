import { createElement } from 'react';

import emojis from '../assets/all-emojis.json';

export const EMOJIS:Emoji[] = emojis.emojis;

export const EMOJI_IMAGE_MAP:MappedEmoji[] = mapEmojisWithImages();

export interface EmojiData {
    name: string
    category: string
    emoji: string
    image: string
}

export interface Emoji {
    name: string
    category: string
    emoji: string
    images: string[]
    modifiers: string[]
}

interface MappedEmoji {
    emoji: string
    image: string
}

export function mapEmojisWithImages():MappedEmoji[]{
    let mappedEmojis:MappedEmoji[] = [];
    EMOJIS.forEach((emoji) => {
        if(emoji.images.length === 1){
            mappedEmojis.push({
                emoji: emoji.emoji,
                image: emoji.images[0]
            })
        } else {
            for(let i = 0; i<emoji.modifiers.length; i++){
                mappedEmojis.push({
                    emoji: emoji.modifiers[0],
                    image: emoji.images[i+1]
                })
            }
        }
    })

    return mappedEmojis;
}

export const generateEmojiCateogory = (category:string, modifier:string):EmojiData[] => {
    const categoryEmojis:EmojiData[] = EMOJIS.filter((emoji:Emoji) => emoji.category === category)
    .map((emoji:Emoji) => {
        let indexOfModifier = convertModifierToIndex(modifier);
        
        let emojiData:EmojiData = {
            name: emoji.name,
            category: emoji.category,
            image: "",
            emoji: ""
        }
        
        if(indexOfModifier > 0 && emoji.modifiers.length > 1){
            emojiData = {
                ...emojiData,
                image: emoji.images[indexOfModifier],
                emoji: emoji.modifiers[indexOfModifier-1]
            }
        } else {
            emojiData = {
                ...emojiData,
                image: emoji.images[0],
                emoji: emoji.emoji
            }
        }

        return emojiData
    });

    return categoryEmojis;

}


export const generateTopRow = () => {
    interface TopRowData {
        img: string,
        id: string
    }
    const data:TopRowData[] = [];
    for(let emoji of EMOJIS){
        let images:any = emoji.images;
        if(emoji.name === "Clock face two oclock"){
            data[0] = {
                img: images[0],
                id: "Recent"
            }
        }

        if(emoji.name === "Grinning face"){
            data[1] = {
                img: images[0],
                id: "Smileys & people"
            }
        }

        if(emoji.name === "Bear face"){
            data[2] = {
                img: images[0],
                id: "Animals & nature"
            }
        }

        if(emoji.name === "Hamburger"){
            data[3] = {
                img: images[0],
                id: "Food & drink"
            }
        }

        if(emoji.name === "Soccer ball"){
            data[4] = {
                img: images[0],
                id: "Activity"
            }
        }

        if(emoji.name === "Oncoming automobile"){
            data[5] = {
                img: images[0],
                id: "Travel & places"
            }
        }

        if(emoji.name === "Electric light bulb"){
            data[6] = {
                img: images[0],
                id: "Objects"
            }
        }

        if(emoji.name === "Input symbol for symbols"){
            data[7] = {
                img: images[0],
                id: "Symbols"
            }
        }


        if(emoji.name === "Triangular flag on post"){
            data[8] = {
                img: images[0],
                id: "Flags"
            }
        }
    }

    return data;
}

export const determineSkinToneColor = (currentSkinTone:string):string => {
    switch(currentSkinTone){
        case "light":
            return "rgb(247, 222, 206)";
        case "medium-light":
            return "rgb(243, 210, 162)";
        case "medium":
            return "rgb(213, 171, 136)";
        case "medium-dark":
            return "rgb(175, 126, 87)";
        case "dark":
            return "rgb(124, 83, 62)";
        default:
            return "rgb(255, 220, 93)";  
    }
}

export const convertModifierToIndex = (modifier:string):number => {
    switch(modifier){
        case "light":
            return 1;
        case "medium-light":
            return 2;
        case "medium":
            return 3;
        case "medium-dark":
            return 4;
        case "dark":
            return 5;
        default:
            return 0;  
    }
}

export const getEmojiCharacterByNameAndModifier = (name:string, modifier:string):string => {
    let emoji:Emoji | undefined;

    for(let e of EMOJIS){
        if(e.name === name) emoji = e;
    }
    
    if(emoji){
        if(emoji.modifiers.length === 0 || modifier === "none"){
            return emoji.emoji;
        } else {
            let modifierNumber = convertModifierToIndex(modifier) - 1;
            return emoji.modifiers[modifierNumber];
        }
    }

    return "";
    
}

export const convertPostContentToElements = (content:string, location:string):JSX.Element[] => {
    let tags:JSX.Element[] = [<span className={location === 'creator' ? "feed-post-creator-conent-paragraph" : "post-content-span"}></span>];

    let characters:string[] = Array.from(content);
    let currentWord = "";
    for(let char of characters){
        if(EMOJI_IMAGE_MAP.find(e => e.emoji === char)){
            let image = EMOJI_IMAGE_MAP.find(e => e.emoji === char)?.image || "";
            tags.push(<img className={location === 'creator' ? "feed-post-creator-post-content-emoji" : "post-content-emoji"} src={image} alt="Emoji" />)
            tags.push(<span className={location === 'creator' ? "feed-post-creator-conent-paragraph" : "post-content-span"}></span>)
        } else if(char === "\n" || char === "\r"){
            tags.push(<br/>)
            tags.push(<span className={location === 'creator' ? "feed-post-creator-conent-paragraph" : "post-content-span"}></span>)
            currentWord = ""
        }
        else if (char !== " ") {
            currentWord += char;
            tags.splice(tags.length - 1, 1, <span className="feed-post-creator-conent-paragraph">{currentWord}</span>)
        }
        else {
            tags.push(<span className={location === 'creator' ? "feed-post-creator-conent-paragraph" : "post-content-span"}>{" "}</span>)
            tags.push(<span className={location === 'creator' ? "feed-post-creator-conent-paragraph" : "post-content-span"}></span>)
            currentWord = ""
        }
    }

    return tags;
}

/*
export const convertPostContentToParagraph = (content:string):JSX.Element => {

    let characters:any = Array.from(content);
    let currentPTag = ['<span class="feed-post-creator-conent-paragraph">', '', '</span>'];
    let currentInnerHTML = [];
    let innerHTMLIndex = 0;

    for(let i = 0; i<characters.length; i++){
        if(EMOJI_IMAGE_MAP.find(e => e.emoji === characters[i])){
            if(currentInnerHTML[0] === undefined || currentPTag[1] === '') currentInnerHTML[innerHTMLIndex++] = currentPTag[0] + currentPTag[1] + currentPTag[2];
            currentPTag[1] = '';
            let image = EMOJI_IMAGE_MAP.find(e => e.emoji === characters[i])?.image || "";
            const imageTemplate = `<img class="feed-post-creator-post-content-emoji" src="${image}"/>`
            currentInnerHTML[innerHTMLIndex++] = imageTemplate;
        } else {
            currentPTag[1] = currentPTag[1] + characters[i];
            currentInnerHTML[innerHTMLIndex] = currentPTag[0] + currentPTag[1] + currentPTag[2]
        }
    }

    let dangerousHTML = '';
    for(let el of currentInnerHTML){
        dangerousHTML += el;
    }

    return <p className="feed-post-creator-post-content" dangerouslySetInnerHTML={{__html: dangerousHTML}}></p>;
}
*/