window.onload = () => {
    let sounds =
    [
        {"name":"Airhorn", "emoji":"📯", "fn":"airhorn.mp3"},
        {"name":"Ba dum tss", "emoji":"🥁", "fn":"ba-dum-tss.mp3"},
        {"name":"Quack", "emoji":"🦆", "fn":"quack.mp3"},
        {"name":"Clap", "emoji":"👏", "fn":"clap.mp3"},
        {"name":"Cricket", "emoji": "🦗", "fn":"cricket.mp3"},
        {"name":"Fart", "emoji":"💨", "fn":"fart.mp3"},
        {"name":"Thud", "emoji":"🗿", "fn":"thud.mp3"},
        {"name":"Bruh", "emoji":"😐", "fn":"bruh.mp3"},
        {"name":"Amogus", "emoji":"📮", "fn":"amogus.mp3"},
        {"name":"Laugh", "emoji":"🤣", "fn":"laugh.mp3"},
        {"name":"Metal Pipe", "emoji":"🤘", "fn":"metal-pipe.mp3"},
        {"name":"Wut da hell", "emoji":"🤯", "fn":"wut-da-hell.mp3"},
        {"name":"Siren Prowler", "emoji":"❗", "fn":"prowler.mp3"},
        {"name":"Nuclear Bomb", "emoji":"☢️", "fn":"legalize-nuclear.mp3"},
        {"name":"Oh My God", "emoji":"😨", "fn":"oh-my-god.mp3"},
        {"name":"Villager", "emoji":"👨", "fn":"villager.mp3"},
        {"name":"Goofy Ahh Run", "emoji":"🏃‍♂️", "fn":"goofy-ahh-run.mp3"},
        {"name":"Alarm", "emoji":"⏰", "fn":"alarm.mp3"},
        {"name":"Ah hell naw", "emoji":"😒", "fn":"ah-hell-naw.mp3"},
        {"name":"Wow", "emoji":"😲", "fn":"wow.mp3"},
        {"name":"Pan", "emoji":"🍳", "fn":"pan.mp3"},
        {"name":"PvZ", "emoji":"🧟", "fn":"pvz.mp3"},
        {"name":"Bonk", "emoji":"🔨", "fn":"bonk.mp3"},
        {"name":"Huh", "emoji":"❓", "fn":"huh.mp3"},
  ]
  

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
        
        let audio = new Audio('./sounds/' + sounds[i].fn);
        btn.appendChild(audio);
        
        btn.addEventListener('click', () => {
            audio.volume = getVolume();
            audio.currentTime = 0;
            audio.play();
            
            if(timeoutID !== null) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
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
                    { transform: `translateY(${-randomY}px)`, 
                    opacity: 0}
                ], {
                    duration: 1000,
                    iterations: 1,
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
        ctx.globalAlpha = 0.5;
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.globalAlpha = 1;
        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.font = '30px Arial';
        ctx.lineWidth = 3;
        let text = soundEmoji + '!! ' + soundName + ' !!' + soundEmoji;
        ctx.strokeText(text, c.width / 2, c.height / 2 + 10);
        ctx.fillText(text, c.width / 2, c.height / 2 + 10);
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
            }, 1500); 
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
    const navbar = document.getElementById('navbar-container');
    const volumeLabel = document.getElementById('volume-label')
    const vibeLabel = document.getElementById('vibe-label');
    const navbarToggler = document.getElementById('navbar-toggler');

    let darkTheme = false;
    themeBtn.addEventListener('click', e => {
        if (!darkTheme) {
            document.body.classList = 'dark-theme';
            navbar.style.backgroundColor = 'rgb(46, 46, 67)';
            volumeLabel.style.color = 'white';
            vibeLabel.style.color = 'white';
            darkTheme = !darkTheme;
            navbarToggler.style.border = '1px solid white';
        }
        else {
            document.body.classList = 'light-theme';
            navbar.style.backgroundColor = '#CCF';
            volumeLabel.style.color = 'black';
            vibeLabel.style.color = 'black';
            darkTheme = !darkTheme;
            navbarToggler.style.border = '1px solid black';
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