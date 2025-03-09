import { useState } from "react";


export function UIRadioSelector({ texts, onClicks, classesList = [], defaultActiveId = null, setIdToActive = null, unavailableIds = [], requireOneSelected=false}) {
    let [activeId, setActiveId] = useState(defaultActiveId);
    
    const getIsActive = (i, activeId) => {
        if(unavailableIds.includes(i))
            return false;
        if (setIdToActive !== null) 
            return setIdToActive === i 
        return i === activeId;
    }
    

    let toggleRadios = texts.map((text, i) => {
        let isActive = getIsActive(i, activeId);
        const onClick = () => {
            if (requireOneSelected && activeId === i)
                return
            onClicks[i](); 
            setActiveId((activeId === i) ? null : i);
        }

        return (
            <Radio 
                key={i} 
                className={(classesList.length > 0) ? classesList[i] : null}
                isActive={isActive} 
                onClick={onClick}
                isUnavailable={unavailableIds.includes(i)}
            >
                {text}
            </Radio>
        )
    });
    return ( <> { toggleRadios } </>)
}


function Radio({ children, className, isActive, isUnavailable, onClick }) {
    return (
        <a 
        className={className}
        href="#" 
        data-active={isActive} 
        data-unavailable={isUnavailable}
        onClick={(isUnavailable) ? null : onClick}
    >
        {children}
    </a>
    )
}