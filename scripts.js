window.onload = () => {
    document.getElementsByClassName("navbar")[0].innerHTML += `
        <a href="index.html">Home</a>
        <a href="font.html">Font Design</a>
        <a href="games.html">Games</a>
        <a href="#">Link1</a>
        <a href="#">Link1</a>
        <a href="#" id="nav">Click outside to hide</a>
        <a href="#" id="navigation">Navigation</a>
    `;
}