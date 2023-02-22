/* Podcast player */

class PodcastPlayer {
    constructor() {
        this.audio = new Audio();
        this.audio.addEventListener('ended', () => {
            this.audio.currentTime = 0;
            this.audio.play();
        });
        // Store current playback data every 5 seconds to local storage
        this.audio.addEventListener('timeupdate', () => {
            if (Math.round(this.audio.currentTime) % 5 === 0) {
                localStorage.setItem('currentTime', this.audio.currentTime);
                localStorage.setItem('podcast', this.podcast);
                localStorage.setItem('volume', this.audio.volume);
                localStorage.setItem('playbackRate', this.audio.playbackRate);
            }
        });
    }

    setPodcast(podcast) {
        this.podcast = podcast;
        this.audio.src = podcast;

        // If the user has played a podcast before, load the last playback data
        if (localStorage.getItem('podcast') === this.podcast) {
            this.audio.currentTime = localStorage.getItem('currentTime');
            this.audio.volume = localStorage.getItem('volume');
            this.audio.playbackRate = localStorage.getItem('playbackRate');
        }
    }
    
    play() {
        this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    set volume(volume) {
        this.audio.volume = volume;
    }

    get volume() {
        return this.audio.volume;
    }

    get duration() {
        return this.audio.duration ? this.audio.duration : 0;
    }

    get currentTime() {
        return this.audio.currentTime;
    }

    set currentTime(time) {
        this.audio.currentTime = time;
    }

    get paused() {
        return this.audio.paused;
    }

    get playbackRate() {
        return this.audio.playbackRate;
    }

    set playbackRate(rate) {
        this.audio.playbackRate = rate;
    }
}   
