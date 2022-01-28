export function Covers({items, selectedItem, onSelected}) {
    return (
        <>
            <div className="cover-container">
                {items?.map((item, index) => {
                    return(
                        <div 
                            key={index} 
                            className={selectedItem === item ? "selected-cover" : ""}
                        >
                            <img width="128px" src={item}></img><br />
                            <button onClick={() => onSelected(item)}>✅</button>
                        </div>
                    )
                })}
            </div>
        </>
    );
}