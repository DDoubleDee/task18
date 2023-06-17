const circles = document.querySelectorAll('circle-container'),
      circle_drags = document.querySelectorAll('circle-dragger'),
      circle_elems = document.querySelectorAll('circle-element'),
      circle_temp = document.querySelector('#circle'),
      main = document.querySelector("main")

let dragging,
    drag_start,
    mouse_start

function hoverEnter(ev) {
        ev.target.lastElementChild.style.opacity = 1
        ev.target.lastElementChild.style.display = "block"
        $(ev.target.lastElementChild).animate({opacity: 0}, {duration: 100, complete: () => {
            ev.target.lastElementChild.style.opacity = 0
            ev.target.lastElementChild.style.display = "none"
        }})
}

function hoverLeave(ev) {
    ev.target.lastElementChild.style.opacity = 0
    ev.target.lastElementChild.style.display = "block"
    $(ev.target.lastElementChild).animate({opacity: 1}, {duration: 100, complete: () => {
        ev.target.lastElementChild.style.opacity = 1
        ev.target.lastElementChild.style.display = "block"
    }})
}

function startDrag(ev) {
    let target = ev.target
    while(!target.classList.contains("c")){target = target.parentElement}
    drag_start = target.getBoundingClientRect()
    mouse_start = {x: ev.clientX, y: ev.clientY}
    document.querySelectorAll(".dragging").forEach(element => {
        element.classList.remove("dragging")
    })
    dragging = target
    dragging.classList.add("dragging")
    window.addEventListener("mousemove", track)
}

function chooseLink(ev) {
    document.querySelectorAll(".dragging").forEach(element => {
        element.classList.remove("dragging")
    })
    ev.target.classList.add("dragging")
    window.localStorage.setItem("saved", main.innerHTML)
}

function addCircle(ev) {
    let target = ev.target
    if(!target.classList.contains("e")){target = target.parentElement}
    let dir = target
    if(!target.classList.contains("c")){target = target.parentElement}
    target = target.parentElement
    let circle = circle_temp.content.cloneNode(true),
        elem = circle.querySelector(".c")
    if(dir.classList.contains("top")){
        elem.style.top = target.getBoundingClientRect().y - 200 + "px"
        elem.style.left = target.getBoundingClientRect().x + "px"
    }else if(dir.classList.contains("right")){
        elem.style.top = target.getBoundingClientRect().y + "px"
        elem.style.left = target.getBoundingClientRect().x + 200 + "px"
    }else if(dir.classList.contains("left")){
        elem.style.top = target.getBoundingClientRect().y + "px"
        elem.style.left = target.getBoundingClientRect().x - 200 + "px"
    }else if(dir.classList.contains("bottom")){
        elem.style.top = target.getBoundingClientRect().y + 200 + "px"
        elem.style.left = target.getBoundingClientRect().x + "px"
    }
    main.append(circle)
    window.localStorage.setItem("saved", main.innerHTML)
}

function deleteCircle(ev) {
    let target = ev.target
    if(!target.classList.contains("c")){target = target.parentElement}
    console.log(target)
}

window.addEventListener("mouseup", () => {
    window.removeEventListener("mousemove", track)
    window.localStorage.setItem("saved", main.innerHTML)
})

window.addEventListener("keydown", (ev) => {
    if(["Backspace", "Delete"].includes(ev.key)){
        document.querySelector(".dragging").remove()
    }
})

function track(ev) {
    dragging.style.left = drag_start.x + ev.clientX - mouse_start.x + "px"
    dragging.style.top = drag_start.y + ev.clientY - mouse_start.y + "px"
}

if(window.localStorage.getItem("saved")){
    main.innerHTML = window.localStorage.getItem("saved")
}