import React, { ReactElement } from "react";
import styled from "styled-components";

interface Props{
    items: string[];
    selectedItem: string;
    onSelected(item: string): void;
}

interface CoverProps{
    selected: boolean;
}

const Cover = styled.div<CoverProps>`
    background-color: ${(props) => props.selected ? "rgb(129, 179, 64)" : "none"};
    padding: ${(props) => props.selected ? "5px" : 0};
`;

const CoverContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export function Covers(props: Props): ReactElement {
    return (
        <>
            <CoverContainer>
                {props.items?.map((item, index) => {
                    return(
                        <Cover
                            key={index}
                            selected={props.selectedItem === item}
                        >
                            <img width="128px" src={item}></img><br />
                            <button onClick={() => props.onSelected(item)}>✅</button>
                        </Cover>
                    )
                })}
            </CoverContainer>
        </>
    );
}

// class Animal {
//     lol() {

//     }
// }

// class Dog extends Animal { bark() {}}
// class Cat extends Animal {}

// let animal: Animal;

// animal = new Cat();
// animal = new Dog();

// animal.lol();
// animal.bark(); // error

// if (animal instanceof Dog) {
//     animal.bark();
// }

interface Loler {
    lol(): void;
}

class Keker implements Loler {
    lol(): void {
        // Connect to database ...
    }
}

function lolkek(loler: Loler) {
    loler.lol();
}

// APPLICATION
lolkek(new Keker());


// AUTOMATED TEST
class TestKeker implements Loler {
    lol(): void {
        // notning just test
    }
}
lolkek(new TestKeker());