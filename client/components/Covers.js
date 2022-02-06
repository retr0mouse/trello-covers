import styled from "styled-components";


const Cover = styled.div`
    background-color: ${props => props.selected ? "rgb(129, 179, 64)" : "none"};
    padding: ${props => props.selected ? "5px" : 0};
`;

const CoverContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export function Covers({items, selectedItem, onSelected}) {
    return (
        <>
            <CoverContainer>
                {items?.map((item, index) => {
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
