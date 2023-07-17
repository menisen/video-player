import { ref, onMounted, onUnmounted } from 'vue'


export const videoPlay = (video) => {
  video?.play()
}

export const videoPause = (video) => {
  video?.pause()
}

export const toggleVideo = (video) => {
  if (video.paused) {
    videoPlay(video)
    // isVideoPlayed = true
  } else {
    videoPause(video)
    // isVideoPlayed = false
  }
}
