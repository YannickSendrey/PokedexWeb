console.log('oui');

const root = document.querySelector('#root');


const getUrl = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/test/1');
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            const img = document.createElement('img');
            img.src = jsonResponse.picture;
            img.style = 'width: 50%';
            root.appendChild(img);
        }
    } catch (error) {
        console.log(error);
    }
}

getUrl();
