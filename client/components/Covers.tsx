import React, { ReactElement } from "react";
import styled from "styled-components";

const Cover = styled.div<CoverProps>`
    background-color: ${(props) => props.selected ? "rgb(129, 179, 64)" : "none"};
    padding: ${(props) => props.selected ? "5px" : 0};
`;

interface Props {
    items: string[];
    selectedThumbnail: string;
    onSelected(item: string): void;
}

interface CoverProps {
    selected: boolean;
}



const CoverContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export function Covers(props: Props): ReactElement {
    return (
        <>
            <CoverContainer>
                {props.items?.map((thumbnail, index) => {
                    return (
                        <Cover
                            key={index}
                            selected={props.selectedThumbnail === thumbnail}
                        >
                            <img width="128px" src={thumbnail}></img><br />
                            <button onClick={() => props.onSelected(thumbnail)}>✅</button>
                        </Cover>
                    )
                })}
            </CoverContainer>
        </>
    );
}
