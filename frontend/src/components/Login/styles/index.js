import styled from "styled-components";

export const Wrapper = styled.div`
    position: absolute;
    width: 400px;
    height: 400px;
    margin-top: -200px;
    margin-left: -200px;
    top: 50%;
    left: 50%;
    text-align: center;
`;

export const Input = styled.input`
    width: 200px;
    margin: 5px;
    padding: 3px;
    border: none;
    border-radius: 3px;
    &:focus {
        outline: none;
    }
`;

export const Button = styled.button`
    width: 200px;
    height: 35px;
    border-radius: 3px;
    color: white;
    background-color: #164773;
    &:active {
        outline: none;
    }
    &:focus {
        outline: none;
    }
`;
