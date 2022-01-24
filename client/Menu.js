import React from "react";

export function Menu(props){
    return (<ul>
                <li><a href="#" onClick={() => props.onClicked("Home")}>home</a></li>
                <li><a href="#" onClick={() => props.onClicked("About")}>about</a></li>
            </ul>);
}
