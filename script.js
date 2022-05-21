const barContainers = document.getElementsByClassName("barContainer");


const main = async () => {
    const reponse = await fetch('./data.json');
    const datas = await reponse.json();

    for (let i = 0; i < barContainers.length; i++) {
        barContainers[i].children[1].style.height = `${datas[i].amount}%`;
        barContainers[i].children[1].setAttribute('data', datas[i].amount);

        barContainers[i].children[2].innerText = `${datas[i].day}`;
        barContainers[i].addEventListener('click', (e) => {
            toggleActiveDay(e.target)
        })
        barContainers[i].children[1].addEventListener('mouseenter', e => {
            elementHoveredOn(e.target)
            showDetails(e.target)
        })
        barContainers[i].children[1].addEventListener('mouseleave', e => {
            elementHoveredOff(e.target)
            hideDetails(e.target)
        })
    }
}

const toggleActiveDay = (target) => {
    for (let i = 0; i < barContainers.length; i++) {

        if (target === barContainers[i].children[0]) {
            barContainers[i].children[0].classList.add("bar--active");
        } else {
            barContainers[i].children[0].classList.remove("bar--active");
        }
    }
}

const elementHoveredOn = (target) => {
    target.classList.add("bar--lighten");
}

const elementHoveredOff = (target) => {
    target.classList.remove("bar--lighten");
}

const showDetails = (target) => {
    const detailsElement = target.previousElementSibling
    const value = target.getAttribute('data');
    detailsElement.children[0].innerText = `$${value}`;
    detailsElement.children[0].style.display = "flex";
}

const hideDetails = (target) => {
    const detailsElement = target.previousElementSibling

    const detailsEl = target.children[0];
    detailsElement.children[0].innerText = "";
    detailsElement.children[0].style.display = "none"
}
main();