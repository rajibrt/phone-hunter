const loadPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data);
}

const displayPhone = phones => {
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.textContent = '';
    // display 20 phones only
    phones = phones.slice(0, 20);

    // display phone found
    const noPhone = document.getElementById('no-found-message')
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }
    // display all phone
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Model: ${phone.phone_name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
            </div>
        </div>
            `;
        phoneContainer.appendChild(phoneDiv);
    });
    // stop spinner or loader
    toggleSpinner(false);
}




// handle search button click
document.getElementById('btn-search').addEventListener('click', function () {
    // star loader
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText)
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

// loadPhones();