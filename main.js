let api = "http://localhost:3000/data"
let tbody = document.querySelector(".tbody")
let searchInp = document.querySelector(".searchInp")

// Add
let Add = document.querySelector(".Add")
let addModal = document.querySelector(".addModal")
let formAdd = document.querySelector(".formadd")
Add.onclick = () => {
    addModal.showModal()
}
// post
async function postUser(user) {
    try {
        const { data } = await axios.post(api, user)
        getData()
    } catch (error) {
        console.log(error);
    }
}
formAdd.onsubmit = (e) => {
    e.preventDefault()
    let newUser = {
        text: formAdd["text"].value,
        status: false
    }
    postUser(newUser)
    formAdd.reset()
}

//sort
let btnSort = document.querySelector(".btn2")
btnSort.onclick = async()=>{
    try{
        const {data} = await axios.get(`${api}?_sort=text`)
        getData(data)
    }catch (error){
        console.log(error);
    }
}

//Remove Duptica
let btnRemove = document.querySelector(".btn1")
btnRemove.onclick=()=>{
    
}

//setInterval day
let day = document.querySelector(".day")
setInterval(() => {
    let date = new Date()
    let dayOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let days = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let dayName = dayOfWeek[date.getDay()]
    day.innerHTML = `${dayName}  ${months[month]} ${days} ${year}`
})

//steInterval clock
let clock = document.querySelector(".clock")
setInterval(() => {
    let date = new Date()
    clock.innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
})

async function getUser() {
    try {
        const { data } = await axios.get(api)
        console.log(data);
        getData(data)
    } catch (error) {
        console.log(error);
    }
}
getUser()

function getData(data) {
    tbody.innerHTML = ""
    data.forEach((el) => {
        let tr = document.createElement("tr")

        let tdText = document.createElement("td")
        tdText.innerHTML = el.text

        let tdId = document.createElement("td")
        tdId.innerHTML = el.id

        let div = document.createElement("div")
        div.classList.add("div1")

        let btnDel = document.createElement("button")
        btnDel.innerHTML = "Delete"
        btnDel.classList.add("btndel")
        btnDel.onclick = () => {
            deleteUser(el.id)
        }

        let btnEdit = document.createElement("button")
        btnEdit.innerHTML = "Edit"
        btnEdit.classList.add("btnedit")
        btnEdit.onclick = () => {
            putUser(el)
        }

        if (el.status) {
            tdText.classList.add("tdText")
        }
        let btnCap = document.createElement("button")
        btnCap.innerHTML = "Cap"
        btnCap.classList.add("btncap")
        btnCap.onclick = () => {
            el.status = !el.status
            statusUser(el.id, el)
        }

        searchInp.oninput = async () => {
            try {
                const response = await fetch(`${api}?q=${searchInp.value}`)
                const search = await response.json()
                getData(search)
            } catch (error) {
                console.log(error);
            }
        }

        div.append(btnDel, btnEdit, btnCap)
        tr.append(tdId, tdText, div)
        tbody.appendChild(tr)
    });
}

//function delete
async function deleteUser(id) {
    try {
        const { data } = await axios.delete(`${api}/${id}`)
        getUser()
    } catch (error) {
        console.log(error);
    }
}

let editModal = document.querySelector(".editModal")
let formEdit = document.querySelector(".formedit")
//function edit
function putUser(user) {
    editModal.showModal()
    formEdit["text"].value = user.text
    formEdit.onsubmit = async (e) => {
        e.preventDefault()
        let newObj = {
            ...user,
            text: formEdit["text"].value,
        }
        try {
            const { data } = await axios.put(`${api}/${user.id}`, newObj)
            getUser()
        } catch (error) {
            console.log(error);
        }
    }
}

//function cap
async function statusUser(id, user) {
    try {
        const { data } = await axios.put(`${api}/${id}`, user)
        getUser()
    } catch (error) {
        console.log(error);
    }
}