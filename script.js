import sounds from './assets/data/sounds.json' assert { type: 'json' };

window.onload = () => {
    
    //#region generate buttons
    let totalSounds = sounds.length;
    const soundBar = document.querySelector('#sound-bar');
    for (let i = 0; i < totalSounds; i++) {
        let btn = document.createElement('div');
        btn.classList = 'btn btn-primary col-sm-4 col-md-5 col-lg-3 col-xl-2 col-4';
        btn.id = 'sound-button';
        btn.setAttribute('type', 'button');
        
        let emoji = document.createElement('div');
        emoji.classList = 'emoji';
        emoji.textContent = `${sounds[i].emoji}`;
        btn.appendChild(emoji);
        
        let text = document.createElement('div');
        text.classList = 'text d-none d-sm-none d-md-block';
        text.textContent = `${sounds[i].name}`;
        btn.appendChild(text);
        
        let audio = new Audio('./assets/sounds/' + sounds[i].fn);
        btn.appendChild(audio);
        
        btn.addEventListener('click', () => {
            audio.volume = getVolume();
            audio.play();
            
            changeBackground(sounds[i].name, sounds[i].emoji); // change canvas background on click
            
            // add emojis at bottom
            const emojiContainer = document.getElementById('emojiContainer');
            let maxEmojis = getRandomInt(10, 50);
            for(let j = 0; j < maxEmojis; j++) {
                let emojiElement = document.createElement('div');
                
                let emojiElement2 = document.createElement('div');
                emojiElement2.textContent = sounds[i].emoji;
                let randomRot = getRandomInt(0, 360);
                emojiElement2.style.rotate = `${randomRot}deg`;
                emojiElement.appendChild(emojiElement2);
                
                emojiElement.classList.add('emoji-bouncer');
                
                let randomX = window.innerWidth/maxEmojis * j;
                emojiElement.style.left = `${randomX}px`;

                let randomY = getRandomInt(200,500);
                emojiElement.animate([
                    { transform: 'translateY(100px)' },
                    { transform: `translateY(${-randomY}px)`, opacity: 0 }
                ], {
                    duration: 1500,
                    iterations: 1
                }).addEventListener('finish', () => {
                    emojiContainer.removeChild(emojiElement);
                })
                
                emojiContainer.appendChild(emojiElement);
            }
        })
        soundBar.appendChild(btn);
    }
    
    //#region canvas logic
    let c = document.getElementById('canvas');
    let ctx = c.getContext('2d');
    let isCanvasVisible = false; // Track if the canvas is visible
    
    function changeBackground(soundName, soundEmoji) {
        ctx.beginPath();
        const randomColor = getRandomColor();
        ctx.fillStyle = randomColor;
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font = '30px Arial';
        ctx.lineWidth = 3;
        let text = soundEmoji + soundName + '!!' + soundEmoji;
        ctx.strokeText(text, c.width / 2, c.height / 2);
        ctx.fillText(text, c.width / 2, c.height / 2);
        ctx.stroke();
        isCanvasVisible = true;
        animateCanvasAppearance();
    }
    
    let timeoutID = undefined;
    function animateCanvasAppearance() {
        if (isCanvasVisible) {
            if(timeoutID !== null)
            clearTimeout(timeoutID);
            
            c.style.display = 'block';
            timeoutID = setTimeout(() => {
                c.style.display = 'none';
                isCanvasVisible = false; 
            }, 3000); 
        }
    }
    
    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
    }
    //#endregion
    
    //#region random button logic
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
    document.querySelector('#random-button').addEventListener('click', () => {
        let listItems = document.querySelectorAll('#sound-button');
        listItems[getRandomInt(0, totalSounds)].click();
    })
    //#endregion
    
    //#region searchbar logic
    document.querySelector('#search-input').addEventListener('input', () => {
        const searchInput = document.querySelector('#search-input');
        const filter = searchInput.value.toLowerCase();
        const listItems = document.querySelectorAll('#sound-button');
        
        listItems.forEach((item) => {
            let text = item.querySelector('.text').textContent;
            if (text.toLowerCase().includes(filter)) {
                console.log(item);
                item.style.display = '';
            }
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
        if (!darkTheme) {
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
    
    //#region volume slider
    const slider = document.getElementById('slider');
    
    let isDragging = false;
    
    slider.addEventListener('mousedown', () => {
        isDragging = true;
    });
    
    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const sliderRect = slider.getBoundingClientRect();
            const sliderWidth = sliderRect.width;
            const sliderX = sliderRect.left;
            let newValue = ((e.clientX - sliderX) / sliderWidth) * 100;
            
            if (newValue < 0) {
                newValue = 0;
            } else if (newValue > 100) {
                newValue = 100;
            }

            slider.value = newValue;
        }
    });
    
    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    function getVolume() {
        return slider.value / 100;
    }
    //#endregion
}