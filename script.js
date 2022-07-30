const user = {}
let arr = []
let modal = document.getElementById('modal');
let table = document.querySelector("table");
const form = document.getElementById('form');
const fields = ['First Name', 'Middle Name', 'Last Name', 'Email', 'Phone Number', 'Address'];
let messageContainer = document.querySelector('.message-container');
const message = (msg, cssClass) => {
    return `<div class=${cssClass}>${msg}<button onclick="hideMessage(event)" class="cancel-btn">&times;</button></div>`
}
const hideMessage = (event) => {
    event.target.parentNode.style.display = 'none';
}
const showTable = () => {
    let tbody = document.querySelector("tbody")
    tbody.innerHTML = ''
    const users = JSON.parse(localStorage.getItem('data'))
    if (users == null) {
        messageContainer.innerHTML = '<div class="msg">No Record Found</div>';
        table.style.display = 'none';
        return;
    }
    users.map((val, index) => {
        tbody.innerHTML += `<tr><td>${val.firstName}</td>
                    <td>${val.middleName}</td>
                    <td>${val.lastName}</td>
                    <td>${val.email}</td>
                    <td>${val.phone}</td>
                    <td>${val.address}</td>
                    <td><button onclick='deleteData(${index})' class='btn delete-btn'>Delete</button>
                    <button onclick="updateData(${index},'Update User Data','Update')" class='btn update-btn'>Edit</button></td>
                    </tr>`;
    }
    )
}


const addData = (e) => {
    e.preventDefault();
    let i = 0;
        messageContainer.innerHTML = '';

    let arrayIndex = document.getElementById('array-index').value;
    let err = false;
    new FormData(form).forEach((value, key) => {
        user[key] = value;
    })
    for (let key in user) {
        if (user[key] == '') {
            messageContainer.innerHTML = message(`Please Enter ${fields[i]}`, 'error')
            err = true;
            break;
        }
        i++;
    }
    //if any field is empty stop the function and dont add to localstorage
    if (err) {
        return;
    }
    console.log(arrayIndex)
    if (arrayIndex != '' && arrayIndex != null) {
        const storageData = JSON.parse(localStorage.getItem('data'));
        storageData[arrayIndex] = user;
        localStorage.setItem('data', JSON.stringify(storageData));
        messageContainer.innerHTML = message('Updated Successfully', 'success');
        // table.style.display = 'block';
        showTable()
        hideForm()
        return;
    }
    if (localStorage.getItem('data') != null) {
        const storageData = JSON.parse(localStorage.getItem('data'));
        arr = [...storageData, user]
    }
    else {
        arr = [user]
    }
    localStorage.setItem('data', JSON.stringify(arr));
    messageContainer.innerHTML = message('Added Successfully', 'success');
    table.style.display = 'block';
    showTable()
    hideForm()
}

const deleteData = (index) => {
    const users = JSON.parse(localStorage.getItem('data'))
    if (users.length == 1) {
        localStorage.removeItem('data');
        showTable()
        return;
    }
    users.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(users));
    messageContainer.innerHTML = message('Deleted Successfully', 'success')
    showTable()

}
const updateData = (index, title, btnText) => {
    showForm(title, btnText);
    document.getElementById('array-index').value = index;
    const users = JSON.parse(localStorage.getItem('data'));
    const updateData = users[index];
    for (let key in updateData) {
        document.querySelector(`input[name='${key}']`).value = updateData[key];
    }
    showTable()
    console.log("updated Successfully")
}

const showForm = (title, btnText) => {
    document.getElementById('modal-title').innerHTML = title;
    document.getElementById("add").value = btnText;
    modal.style.display = 'block';
    form.reset();
}
const hideForm = () => {
    modal.style.display = 'none';
}
window.onclick = (e) => {
    if (e.target == modal) {
        hideForm();
    }
}
showTable();
document.getElementById("add").addEventListener('click', addData) 
