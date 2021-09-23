// Change localhost by hostName
// Anything that server send should be JSON 
let ws = new WebSocket('ws://localhost:8080');
ws.onmessage = message => {
    // message.data (string message send by the server)
    const response = JSON.parse(message.data);
    console.log(response);
}

// Gestion des avatars lors de la création du profil

let avatarTab = [
    'avatar-01',
    'avatar-02',
    'avatar-03',
    'avatar-04',
    'avatar-05',
    'avatar-06',
    'avatar-07',
    'avatar-08',
    'avatar-09',
    'avatar-10',
    'avatar-11',
    'avatar-12',
    'avatar-13',
    'avatar-14',
    'avatar-15',
    'avatar-16'
];

const avatarName = document.getElementById('avatar-id');
const avatarImg = document.getElementById('avatar-img');

const spanPrev = document.getElementById('previous');
const spanNext = document.getElementById('next');

let avatarSrc;

let compteurAvatar = 0;

const updateAvatar = function() {
    avatarName.value = avatarTab[compteurAvatar];
    avatarSrc = '/img/' + avatarName.value + '.png';
    avatarImg.src = avatarSrc;
};

updateAvatar();

spanNext.addEventListener('click', () => {
    if (compteurAvatar < avatarTab.length-1) {
        compteurAvatar++;
    } else {
        compteurAvatar = 0;
    }
    updateAvatar();
});

spanPrev.addEventListener('click', () => {
    if (compteurAvatar > 0) {
        compteurAvatar--;
    } else {
        compteurAvatar = avatarTab.length-1;
    }
    updateAvatar();
});


// "scss": "sass src/assets/scss/styles.scss src/assets/css/styles.css"