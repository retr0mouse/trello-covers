import styled from "styled-components";

const MessageBox = styled.div`
    background-color: aquamarine;
    border-radius: 5px;
    padding: 5px;
    min-width: 100px;
    text-align: center;
    font-family: "Comic Sans MS", "Times New Roman";
    position: fixed;
    top: 20%;
    left: 70%;
    transform: translate(-50%, -50%);
`;

export function Message({message}){
    return(
        <>
            {message &&
                <MessageBox>
                    <h4>{message}</h4>
                </MessageBox>
            }
        </>
    );
}
