const closeModalButton = document.getElementById("close-button");
const openModalButton = document.getElementById("open-button");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
openModalButton.onclick = () => {
    modal.classList.add("active");
    overlay.classList.add("active");
}
const removeOverLay = () => {
    modal.classList.remove("active");
    overlay.classList.remove("active");
}
closeModalButton.onclick = () => {
    removeOverLay();
}

overlay.onclick = () => {
    removeOverLay();
}