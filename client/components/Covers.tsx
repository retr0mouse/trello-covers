import React, { ReactElement } from "react";
import styled from "styled-components";

interface Props{
    selected: boolean;
    key: string;
}

const Cover = styled.div`
    background-color: ${props => props.selected ? "rgb(129, 179, 64)" : "none"};
    padding: ${props => props.selected ? "5px" : 0};
`;

const CoverContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export function Covers({items, selectedItem, onSelected}): ReactElement {
    return (
        <>
            <CoverContainer>
                {items?.map((item: string, index: number) => {
                    return(
                        <Cover
                            key={index} 
                            selected={selectedItem === item}
                        >
                            <img width="128px" src={item}></img><br />
                            <button onClick={() => onSelected(item)}>✅</button>
                        </Cover>
                    )
                })}
            </CoverContainer>
        </>
    );
}
