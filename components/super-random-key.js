export function superRandomKey(){
    let num = (Math.random() * 999 * Math.random() * 999 * Math.random() * 999)*99;

    return "idHz" + num.toFixed() + "idHz";
}