import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const playerEl = document.getElementById('vimeo-player');

const player = new Player(playerEl);
const videoSavedTime = localStorage.getItem('videoplayer-current-time');

if (videoSavedTime) {
  player.setCurrentTime(videoSavedTime);
}

const throttledVideoProgress = throttle(({ seconds }) => {
  localStorage.setItem('videoplayer-current-time', seconds);
  console.log(localStorage);
}, 1000);

player.on('timeupdate', throttledVideoProgress);
