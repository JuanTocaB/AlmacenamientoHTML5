/* HTML Player */
// Uses PodcastPlayer.js

// Global variable to store the podcast player
const podcastPlayer = new PodcastPlayer();

// When the user clicks a play button, play the podcast
function playPodcast(title, description, url) {
  // Get the podcast player DOM element
  const podcastPlayerDOM = document.getElementById("podcastPlayer");

  // Set the podcast title
  podcastPlayerDOM.querySelector(".title").textContent = title;
  // Set the podcast description
  podcastPlayerDOM.querySelector(".description").textContent = description;

  // Set the podcast URL
  podcastPlayer.setPodcast(url);

  // Play the podcast
  podcastPlayer.play();

  // Show the podcast player
  podcastPlayerDOM.classList.add("show");
}

// On page load, update the podcast player UI
window.addEventListener("load", () => {
  // Setup the podcast player UI
  // The podcast player UI is a progress bar that shows the current time and duration of the podcast
  // It also has a play/pause button and a volume slider

  const podcastPlayerDOM = document.getElementById("podcastPlayer");

  // Get the podcast player UI elements
  const podcastPlayerPlayPauseButton =
    podcastPlayerDOM.querySelector(".playPauseButton");
  const podcastPlayerVolumeSlider =
    podcastPlayerDOM.querySelector(".volumeSlider");
  const podcastPlayerProgressBar =
    podcastPlayerDOM.querySelector(".progressBar");
  const podcastPlayerCurrentTime =
    podcastPlayerDOM.querySelector(".currentTime");
  const podcastPlayerPlaybackSpeed =
    podcastPlayerDOM.querySelector(".playbackSpeed");

  // Update the podcast player UI every 250ms
  setInterval(() => {
    // Update the podcast player UI
    podcastPlayerPlayPauseButton.textContent = podcastPlayer.paused
      ? "Play"
      : "Pause";
    podcastPlayerVolumeSlider.value = podcastPlayer.volume;
    podcastPlayerProgressBar.value = podcastPlayer.currentTime;
    podcastPlayerProgressBar.max = podcastPlayer.duration;
    podcastPlayerCurrentTime.textContent = `
        ${Math.floor(podcastPlayer.currentTime / 60)
          .toString()
          .padStart(2, "0")}:${Math.floor(podcastPlayer.currentTime % 60)
      .toString()
      .padStart(2, "0")}
        /
        ${Math.floor(podcastPlayer.duration / 60)
          .toString()
          .padStart(2, "0")}:${Math.floor(podcastPlayer.duration % 60)
      .toString()
      .padStart(2, "0")}
        `;
    podcastPlayerPlaybackSpeed.value = podcastPlayer.audio.playbackRate;
  }, 250);

  // When the user clicks the play/pause button, play/pause the podcast
  podcastPlayerPlayPauseButton.addEventListener("click", () => {
    if (podcastPlayer.paused) {
      podcastPlayer.play();
    } else {
      podcastPlayer.pause();
    }
  });

  // When the user changes the volume, change the podcast volume
  podcastPlayerVolumeSlider.addEventListener("input", () => {
    podcastPlayer.volume = podcastPlayerVolumeSlider.value;
  });

  // When the user changes the progress bar, change the podcast current time
  podcastPlayerProgressBar.onclick = function(e) {
    // e = Mouse click event.
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; // x position within the element.
    podcastPlayer.currentTime = (x / podcastPlayerProgressBar.offsetWidth) * podcastPlayer.duration;
  }

  // When the user clicks the close button, close the podcast player
  podcastPlayerDOM
    .querySelector(".closeButton")
    .addEventListener("click", () => {
      podcastPlayerDOM.classList.remove("show");
      podcastPlayer.stop();
    });

  // When the user changes the playback rate, change the podcast playback rate
  podcastPlayerPlaybackSpeed.addEventListener("change", () => {
    podcastPlayer.audio.playbackRate =
      podcastPlayerDOM.querySelector(".playbackSpeed").value;
  });
});
