window.onload = () => {
    const sounds = [];
    fetch('./assets/data/sounds.json')
    .then(response => response.json())
    .then(data => {
        for(let i=0;i<Object.keys(data).length;i++)
        {
            sounds.push(data[i]);
        }
        
        //#region generate buttons
        let totalSounds = sounds.length;
        const soundBar = document.querySelector('#sound-bar');
        for(let i = 0; i < totalSounds; i++) {
            let btn = document.createElement('button');
    
            //<button type="button" class="btn btn-primary col-2" style="height:100px; margin: 10px;" id="funny-button"></button>
            btn.classList = 'btn btn-primary col-2 sound-button';
            btn.setAttribute('type', 'button');
            btn.textContent = `${sounds[i].emoji} ${sounds[i].name}`;
            btn.addEventListener('click', () => {
                //TODO: add sound
                alert(`button ${i+1} clicked`);
            })
    
            soundBar.appendChild(btn);
        }
        //#endregion

        //#region random button logic
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        document.querySelector('#random-button').addEventListener('click', () => {
            let listItems = document.querySelectorAll('.sound-button');
            listItems[getRandomInt(0, totalSounds)].click();
        })
        //#endregion
    
        //#region searchbar logic
        document.querySelector('#search-input').addEventListener('input', () => {
            const searchInput = document.querySelector('#search-input');
            const filter = searchInput.value.toLowerCase();
            const listItems = document.querySelectorAll('.sound-button');

            listItems.forEach((item) => {
                let text = item.textContent;
                if(text.toLowerCase().includes(filter))
                    item.style.display = '';
                else
                    item.style.display = 'none';
            })
        });
        //#endregion
    })
    .catch(error => {
        console.error('Error reading the JSON file:', error);
    });
    
}