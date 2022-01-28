export function Message({message}){
    return(
        <>
            {message &&
                <div id="message_box">
                    <h4>{message}</h4>
                </div>
            }
        </>
    );
}