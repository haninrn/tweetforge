import { SVGProps } from "../../utils/GlobalInterfaces";

export default function NotInterestedSVG(props: SVGProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      height={props.height}
      width={props.width}
    >
      <g>
        <path fill = {props.color ? props.color : "#000"} d="M15 10H9V8h6v2zm-2 4H9v-2h4v2zm-.847 8.99c4.215-.652 8.988-5.523 9.097-11.469l-2-.037c-.083 4.574-3.395 8.102-6.25 9.211v-2.292l-1.786-.191C7.528 17.815 4.75 14.714 4.75 11c0-3.998 3.252-7.25 7.25-7.25v-2c-5.101 0-9.25 4.149-9.25 9.25 0 4.738 3.546 8.693 8.25 9.2v2.969l1.153-.179zm4.39-16.95l1.414 1.42L20 5.41l2.043 2.05 1.414-1.42L21.414 4l2.043-2.04L22.043.54 20 2.59 17.957.54l-1.414 1.42L18.586 4l-2.043 2.04z"></path>
      </g>
    </svg>
  );
}
