import styled, { keyframes } from "styled-components";

const spinnerAnimation = keyframes`
    0% {
        transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    100% {
         transform: translate3d(-50%, -50%, 0) rotate(360deg);
    }
`;

export const Spinner = styled.div`
    height: 100px;
    width: 100px;  
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -50px;
    
    &::before {
        animation: 2s linear infinite ${spinnerAnimation};
        border: solid 3px #eee;
        border-bottom-color: #A63232;
        border-radius: 50%;
        content: "";
        height: 40px;
        left: 50%;
        opacity: inherit;
        position: absolute;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        transform-origin: center;
        width: 40px;
        will-change: transform;
    }
`;
