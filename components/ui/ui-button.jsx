import clsx from "clsx"

export function UIButton({text, onClick, marginBottom}){
    let styles = (marginBottom) ? {marginBottom: marginBottom} : null;
    return (
        <button 
            className="ui-button"
            onClick={onClick}
            style={styles}
        >
            {text}
        </button>
    )
}