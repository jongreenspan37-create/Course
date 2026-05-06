function changeText(){
    const myHeader = document.getElementById('heading')
    myHeader.innerText = "<strong>I changed the heading using Javascript using an onclick event</strong>";
}

function changeHeader(){
    const myHeader = document.getElementById('heading');
    myHeader.innerHTML = "<strong>I changed the heading using Javascript using an onclick event</strong>"

}