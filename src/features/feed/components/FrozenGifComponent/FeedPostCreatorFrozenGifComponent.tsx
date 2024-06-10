import React, {useRef} from 'react';
import {AppDispatch, RootState} from '../../../../redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGifsByTerm } from '../../../../redux/Slices/GifSlice';
import { PostImage } from '../../../../utils/GlobalInterfaces';
import { updateCurrentPost } from '../../../../redux/Slices/PostSlice';
import { updateDisplayGif } from '../../../../redux/Slices/ModalSlice';


interface FrozenGifProps {
    image: string;
    text: string;
}

export const FeedPostCreatorFrozeGif:React.FC<FrozenGifProps> = ({image, text}) => {

    const preview = useSelector((state:RootState) => state.gif.preview);
    const dispatch:AppDispatch = useDispatch();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const freezeGif = () => {
        if(canvasRef && canvasRef.current && imageRef && imageRef.current){
            let width;
            let height;

            if(preview){
                width=290;
                height=150
            } else {
                width=143;
                height=135;
            }

            canvasRef.current.width = width;
            canvasRef.current.height = height;

            const context = canvasRef.current.getContext("2d");

            if(context !== null && preview){
                context.font = "bold 32px Arial";
                context.textAlign = "left";
                context.fillStyle = "white";
                context.drawImage(imageRef.current, 0, 0, width, height);
                context.fillText(text, (12), (138));
            }

            if(context !== null && !preview){
                context.drawImage(imageRef.current, 0, 0, width, height);
            }
        }
    }

    const handleCanvasClicked = () => {
        //TODO once we have it setup
        if(preview){
            dispatch(fetchGifsByTerm(text));
        } else {
            let postImage:PostImage = {
                imageId: 0,
                imageName: `${text}-gif`,
                imageType: 'gif',
                imageURL: image
            };

            let imgs=[postImage];

            dispatch(updateCurrentPost({
                name: "images",
                value: imgs
            }));

            dispatch(updateDisplayGif())
        }
    }

    return(
        <>
            <img src={image} ref={imageRef} onLoad={freezeGif} hidden />
            <canvas ref={canvasRef} onClick={handleCanvasClicked}></canvas>
        </>
    )
}