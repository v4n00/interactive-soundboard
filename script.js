import sounds from './assets/data/sounds.json' assert { type: 'json' };

window.onload = () => {
    //#region upload logic
    
    //opening the file exlorer
    const uploadbtn = document.querySelector('#sound-picker')
    const uploadBtnName = document.getElementById('sound-picker-name');
    uploadbtn.addEventListener('click',()=>{
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => { 
            let file = e.target.files[0]; 
            uploadBtnName.innerText = `File: ${file.name}`
            
            let reader = new FileReader();
            reader.addEventListener('load', function(e) {
                // audio.src = e.target.result;  //Might be useless: to be deleted later
                // audio.play();
                console.log("uploaded")
            });
            reader.readAsDataURL(file);
        }
        input.click();
    })
    
    //saving the sound into the sound list
    const saveNewSoundBtn = document.getElementById('save-new-sound');
    const newSoundName = document.getElementById('inputSoundName');
    const newSoundEmoji = document.getElementById('inputSoundEmoji');

    function download(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(content, null, 2)], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }
    
    saveNewSoundBtn.addEventListener('click',()=>{
        let newSound = {
            "name":newSoundName.value,
             "emoji":newSoundEmoji.value
        };
        sounds.push(newSound);
        let btn = document.createElement('div');
        btn.classList = 'btn btn-primary col-2 sound-button';
        btn.setAttribute('type', 'button');

        let emoji = document.createElement('div');
        emoji.classList = 'emoji';
        emoji.textContent = `${sounds[sounds.length-1].emoji}`;
        btn.appendChild(emoji);

        let text = document.createElement('div');
        text.classList = 'text';
        text.textContent = `${sounds[sounds.length-1].name}`;
        btn.appendChild(text);

        soundBar.appendChild(btn)
    })
    
    const saveSounds = document.getElementById('save-button')
    saveSounds.addEventListener('click', ()=>{
        download(sounds, 'sounds.json', "application/json");
    })
    
    //#region text matching logic
    const soundNameBoxRegex = RegExp('^[A-Za-z0-9-\ ]');
    const inputSoundNameBox = document.getElementById('inputSoundName');
    inputSoundNameBox.addEventListener('keydown', (event) => {
        if(event.ctrlKey || event.altKey || typeof event.key !== 'string' || event.key.length !== 1)
        return;
        if(!soundNameBoxRegex.test(event.key))
        event.preventDefault();
    });
    
    const soundEmojiBoxRegex = RegExp('/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g');
    const inputEmojiBox = document.getElementById('inputSoundEmoji');
    inputEmojiBox.addEventListener('keydown', (event) => {
        if(event.ctrlKey || event.altKey || typeof event.key !== 'string' || event.key.length !== 1)
        return;
        if(!soundEmojiBoxRegex.test(event.key) || inputEmojiBox.value.length != 1)
        event.preventDefault();
    })
    //#endregion
    
    //#region generate buttons
    let totalSounds = sounds.length;
    const soundBar = document.querySelector('#sound-bar');
    for(let i = 0; i < totalSounds; i++) {
        let btn = document.createElement('div');
        btn.classList = 'btn btn-primary col-sm-3 col-md-3 col-lg-2 col-xl-2 col-4 sound-button';
        btn.setAttribute('type', 'button');

        let emoji = document.createElement('div');
        emoji.classList = 'emoji';
        emoji.textContent = `${sounds[i].emoji}`;
        btn.appendChild(emoji);

        let text = document.createElement('div');
        text.classList = 'text d-none d-sm-block';
        text.textContent = `${sounds[i].name}`;
        btn.appendChild(text);

        btn.addEventListener('click', () => {
            //TODO: add sound API
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

    //#region theme button
    const themeBtn = document.getElementById('theme-button');
    const navbar = document.getElementById('navbar');

    let darkTheme = false;
    themeBtn.addEventListener('click', e => {
        if(!darkTheme) {
            document.body.classList = 'dark-theme';
            navbar.classList = 'navbar navbar-expand-lg dark-theme';
            darkTheme = !darkTheme;
        }
        else {
            document.body.classList = 'light-theme';
            navbar.classList = 'navbar navbar-expand-lg light-theme';
            darkTheme = !darkTheme;
        }
    });
    //#endregion
}