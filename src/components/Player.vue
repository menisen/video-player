<template>
  <div
    :class="{fullvision: fullscreenIcons,'video-paused': video && video.paused}"
    class="video-block"
  >
    <div
      id="video-container"
      ref="videoContainer"
      class="video-container"
      @fullscreenchange="updateFullscreenButton()"
    >
      <div ref="playbackAnimation" class="playback-animation" id="playback-animation">
        <svg :class="{hidden: playbackIcons}" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 7.00002C12.0003 7.17263 11.9557 7.34235 11.8707 7.49258C11.7857 7.6428 11.6631 7.76838 11.515 7.85702L1.515 13.857C1.36305 13.9479 1.18977 13.9969 1.01275 13.9992C0.835726 14.0015 0.661245 13.9569 0.507 13.87C0.353161 13.7827 0.225199 13.6562 0.136141 13.5034C0.0470824 13.3506 0.000108134 13.1769 0 13V1.00002C0.000345377 0.823148 0.0475504 0.649523 0.13681 0.496823C0.226069 0.344123 0.354196 0.2178 0.508146 0.130715C0.662096 0.0436287 0.836372 -0.00111052 1.01323 0.00105136C1.19009 0.00321323 1.36322 0.0521988 1.515 0.143022L11.515 6.14302C11.816 6.32302 12 6.64802 12 7.00002Z" fill="white" fill-opacity="0.9"/>
        </svg>
        <svg :class="{hidden: !playbackIcons}" width="12" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 0C1.26522 0 1.51957 0.105357 1.70711 0.292893C1.89464 0.48043 2 0.734784 2 1V17C2 17.2652 1.89464 17.5196 1.70711 17.7071C1.51957 17.8946 1.26522 18 1 18C0.734784 18 0.48043 17.8946 0.292893 17.7071C0.105357 17.5196 0 17.2652 0 17V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0ZM10.002 0C10.1333 0 10.2634 0.0258658 10.3847 0.0761205C10.506 0.126375 10.6162 0.200035 10.7091 0.292893C10.802 0.385752 10.8756 0.495991 10.9259 0.617317C10.9761 0.738642 11.002 0.868678 11.002 1V17C11.002 17.2652 10.8966 17.5196 10.7091 17.7071C10.5216 17.8946 10.2672 18 10.002 18C9.73678 18 9.48243 17.8946 9.29489 17.7071C9.10736 17.5196 9.002 17.2652 9.002 17V1C9.002 0.734784 9.10736 0.48043 9.29489 0.292893C9.48243 0.105357 9.73678 0 10.002 0Z" fill="white" fill-opacity="0.9"/>
        </svg>
      </div>
      <!--      <div v-if="video.ended && !cancelNextVideo && watch.nextVideo" class="timer">-->
      <!--        <p>-->
      <!--          Следующее видео {{watch.nextVideo.name}} <br>-->
      <!--          Будет через {{timer}}-->
      <!--        </p>-->
      <!--        <div @click="$emit('next')" :class="{hidden: playbackIcons}" class="play">-->
      <!--          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--            <path d="M12 7.00002C12.0003 7.17263 11.9557 7.34235 11.8707 7.49258C11.7857 7.6428 11.6631 7.76838 11.515 7.85702L1.515 13.857C1.36305 13.9479 1.18977 13.9969 1.01275 13.9992C0.835726 14.0015 0.661245 13.9569 0.507 13.87C0.353161 13.7827 0.225199 13.6562 0.136141 13.5034C0.0470824 13.3506 0.000108134 13.1769 0 13V1.00002C0.000345377 0.823148 0.0475504 0.649523 0.13681 0.496823C0.226069 0.344123 0.354196 0.2178 0.508146 0.130715C0.662096 0.0436287 0.836372 -0.00111052 1.01323 0.00105136C1.19009 0.00321323 1.36322 0.0521988 1.515 0.143022L11.515 6.14302C11.816 6.32302 12 6.64802 12 7.00002Z" fill="white" fill-opacity="0.9"/>-->
      <!--          </svg>-->
      <!--        </div>-->
      <!--        <button @click="cancelNextVideo = true">Отмена</button>-->
      <!--      </div>-->

      <video
        controls
        @play="updatePlayButton()"
        @pause="updatePlayButton()"
        @loadedmetadata="initializeVideo()"
        @timeupdate="updateTimeElapsed(), updateProgress()"
        @volumechange="updateVolumeIcon()"
        @click="animatePlayback(), togglePlay()"
        @mousemove="mousemove()"
        @playing="playing()"
        @error="movieError()"
        @waiting="movieWaiting()"
        @canplay="canplay()"
        @ended="ended()"
        class="video"
        ref="video"
        id="video"
        preload="metadata"
        autoplay="true"
        :class="{'no-cursor': hideClass}"
        :src="props.src"
      >
      </video>

      <div v-show="loader" class="loader">
        <svg width="50" height="50" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
          <g fill="none" fill-rule="evenodd">
            <g transform="translate(1 1)" stroke-width="2">
              <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="1s"
                  repeatCount="indefinite"/>
              </path>
            </g>
          </g>
        </svg>
      </div>

      <div
        v-if="video"
        ref="videoControls"
        :class="{hide: hideClass}"
        class="video-controls "
        id="video-controls">
        <div class="time">
          <time id="time-elapsed">{{ timeElapsed || '00:00' }}</time>
          <time id="duration">{{ duration || '00:00' }}</time>
        </div>
        <div class="video-progress">
          <div ref="progressBar" class="progress">
            <div :style="{width: `${progressBarValue}%`}" class="progress__value"></div>
          </div>
          <!-- <progress style="opacity: 0"></progress> -->
          <input @input="skipAhead" @mousemove="updateSeekTooltip" ref="seek" class="seek" id="seek" value="0" min="0" type="range" step="0.1">
          <div ref="seekTooltip" class="seek-tooltip" id="seek-tooltip">00:00</div>
        </div>

        <div class="bottom-controls">
          <div class="left-controls">
            <button v-if="!video.ended" @click="togglePlay()" ref="playButton" data-title="Смотреть (k)" id="play">
              <svg :class="{hidden: playbackIcons}" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 7.00002C12.0003 7.17263 11.9557 7.34235 11.8707 7.49258C11.7857 7.6428 11.6631 7.76838 11.515 7.85702L1.515 13.857C1.36305 13.9479 1.18977 13.9969 1.01275 13.9992C0.835726 14.0015 0.661245 13.9569 0.507 13.87C0.353161 13.7827 0.225199 13.6562 0.136141 13.5034C0.0470824 13.3506 0.000108134 13.1769 0 13V1.00002C0.000345377 0.823148 0.0475504 0.649523 0.13681 0.496823C0.226069 0.344123 0.354196 0.2178 0.508146 0.130715C0.662096 0.0436287 0.836372 -0.00111052 1.01323 0.00105136C1.19009 0.00321323 1.36322 0.0521988 1.515 0.143022L11.515 6.14302C11.816 6.32302 12 6.64802 12 7.00002Z" fill="white" fill-opacity="0.9"/>
              </svg>
              <svg :class="{hidden: !playbackIcons}" width="12" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 0C1.26522 0 1.51957 0.105357 1.70711 0.292893C1.89464 0.48043 2 0.734784 2 1V17C2 17.2652 1.89464 17.5196 1.70711 17.7071C1.51957 17.8946 1.26522 18 1 18C0.734784 18 0.48043 17.8946 0.292893 17.7071C0.105357 17.5196 0 17.2652 0 17V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0ZM10.002 0C10.1333 0 10.2634 0.0258658 10.3847 0.0761205C10.506 0.126375 10.6162 0.200035 10.7091 0.292893C10.802 0.385752 10.8756 0.495991 10.9259 0.617317C10.9761 0.738642 11.002 0.868678 11.002 1V17C11.002 17.2652 10.8966 17.5196 10.7091 17.7071C10.5216 17.8946 10.2672 18 10.002 18C9.73678 18 9.48243 17.8946 9.29489 17.7071C9.10736 17.5196 9.002 17.2652 9.002 17V1C9.002 0.734784 9.10736 0.48043 9.29489 0.292893C9.48243 0.105357 9.73678 0 10.002 0Z" fill="white" fill-opacity="0.9"/>
              </svg>
            </button>
            <button v-if="video.ended" @click="rePlay()" ref="playButton" data-title="Смотреть снова" id="replay">
              <svg :class="{hidden: playbackIcons}" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="18" height="18" x="0" y="0" viewBox="0 0 64 64" style="enable-background:new 0 0 512 512" xml:space="preserve" class="">
                <g>
                  <path d="M56.79 16.09C43.34-2.32 14.39 3.71 9 25.46l-3.23-6.19a2 2 0 0 0-3.54 1.87l6.22 11.79A2.07 2.07 0 0 0 10.26 34a2.35 2.35 0 0 0 .9-.23L23 27.55A2 2 0 0 0 21.08 24l-8.6 4.54c3-19.93 29-26.54 41.08-10.09 11.11 14.82.09 36.59-18.45 36.43a22.73 22.73 0 0 1-13.54-4.44 2 2 0 1 0-2.37 3.22 26.62 26.62 0 0 0 15.91 5.22c21.78.19 34.73-25.38 21.68-42.79z" data-name="Layer 14" fill="#FFFFFF" data-original="#000000" class=""></path>
                </g>
              </svg>
            </button>
            <button @click="$emit('next')" data-title="Следующий" id="next-btn">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.0003 -6.98188e-05C9.26551 -6.98188e-05 9.51987 0.105287 9.7074 0.292824C9.89494 0.48036 10.0003 0.734714 10.0003 0.99993V10.9999C10.0003 11.2651 9.89494 11.5195 9.7074 11.707C9.51987 11.8946 9.26551 11.9999 9.0003 11.9999C8.73508 11.9999 8.48073 11.8946 8.29319 11.707C8.10565 11.5195 8.0003 11.2651 8.0003 10.9999V0.99993C8.0003 0.734714 8.10565 0.48036 8.29319 0.292824C8.48073 0.105287 8.73508 -6.98188e-05 9.0003 -6.98188e-05ZM1.7813 0.37593L5.7813 5.37593C5.92305 5.55321 6.00027 5.77344 6.00027 6.00043C6.00027 6.22742 5.92305 6.44765 5.7813 6.62493L1.7813 11.6249C1.61554 11.8321 1.37428 11.9649 1.11061 11.9941C0.846929 12.0234 0.58243 11.9467 0.375296 11.7809C0.168162 11.6152 0.0353599 11.3739 0.00610427 11.1102C-0.0231514 10.8466 0.053536 10.5821 0.219296 10.3749L3.7193 6.00093L0.219296 1.62493C0.13722 1.52237 0.0761487 1.40464 0.0395692 1.27848C0.00298961 1.15231 -0.00838167 1.02018 0.00610427 0.889622C0.0205902 0.759062 0.06065 0.632635 0.123996 0.517557C0.187342 0.40248 0.272734 0.301006 0.375296 0.21893C0.58243 0.0531697 0.846929 -0.0235176 1.11061 0.00573806C1.37428 0.0349937 1.61554 0.167796 1.7813 0.37493V0.37593Z" fill="#F8F8F8" fill-opacity="0.9"/>
              </svg>
            </button>

            <div class="volume-controls">
              <button
                id="volume-button"
                :data-title="volume > 0 ? 'Отключить звук' : 'Включить звук'"
                ref="volumeButton"
                class="volume-button"
                @click="toggleMute()"
              >
                <svg v-show="volume > 0.6" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.8384 2.31362C10.7441 2.26649 10.66 2.20119 10.591 2.12146C10.522 2.04172 10.4695 1.94914 10.4364 1.84903C10.4033 1.74892 10.3903 1.64325 10.3982 1.53811C10.4061 1.43297 10.4347 1.33042 10.4824 1.23637C10.53 1.14232 10.5958 1.05861 10.6759 0.99007C10.756 0.921529 10.8489 0.869501 10.9492 0.836979C11.0495 0.804458 11.1552 0.792083 11.2603 0.800568C11.3654 0.809053 11.4678 0.838229 11.5616 0.886419C14.204 2.22562 15.864 4.92642 15.864 8.00002C15.864 11.0656 14.2 13.7696 11.5632 15.1128C11.4696 15.1607 11.3674 15.1897 11.2626 15.1981C11.1577 15.2065 11.0523 15.1941 10.9522 15.1617C10.8522 15.1293 10.7595 15.0775 10.6795 15.0092C10.5995 14.9409 10.5337 14.8576 10.486 14.7639C10.4382 14.6701 10.4094 14.5679 10.4012 14.4631C10.393 14.3582 10.4055 14.2528 10.4381 14.1528C10.4707 14.0528 10.5227 13.9602 10.5911 13.8803C10.6595 13.8004 10.743 13.7348 10.8368 13.6872C12.9392 12.6168 14.264 10.4632 14.264 8.00002C14.264 5.53042 12.9432 3.38082 10.8384 2.31362ZM9.8672 5.63682C9.70892 5.49551 9.61325 5.29712 9.60125 5.08527C9.58925 4.87343 9.66189 4.6655 9.8032 4.50722C9.94451 4.34894 10.1429 4.25327 10.3547 4.24127C10.5666 4.22927 10.7745 4.30191 10.9328 4.44322C11.96 5.36002 12.5384 6.61442 12.5384 8.00002C12.5384 9.38642 11.96 10.64 10.9328 11.5568C10.8544 11.6268 10.763 11.6806 10.6639 11.7153C10.5647 11.7499 10.4596 11.7647 10.3547 11.7588C10.1429 11.7468 9.94451 11.6511 9.8032 11.4928C9.66189 11.3345 9.58925 11.1266 9.60125 10.9148C9.61325 10.7029 9.70892 10.5045 9.8672 10.3632C10.5592 9.74642 10.9384 8.92322 10.9384 8.00002C10.9384 7.07682 10.5592 6.25442 9.8672 5.63682ZM1.6 11.2C0.7232 11.2 0 10.4768 0 9.60002V6.40002C0 5.52322 0.7232 4.80002 1.6 4.80002H2.92L6.7 1.77602C6.81762 1.68185 6.95945 1.62281 7.10915 1.60569C7.25885 1.58858 7.41035 1.6141 7.54619 1.6793C7.68202 1.7445 7.79669 1.84674 7.87697 1.97425C7.95726 2.10175 7.99991 2.24934 8 2.40002V13.6C8.00006 13.7508 7.95752 13.8985 7.87729 14.0261C7.79707 14.1537 7.68241 14.2561 7.54655 14.3214C7.41068 14.3867 7.25913 14.4122 7.10935 14.3952C6.95958 14.3781 6.81768 14.319 6.7 14.2248L2.9192 11.2008H1.6V11.2ZM3.7 6.22482C3.55818 6.3386 3.38182 6.40068 3.2 6.40082H1.6V9.60082H3.2C3.38163 9.60051 3.55796 9.66201 3.7 9.77522L6.4 11.936V4.06562L3.7 6.22562V6.22482Z" fill="#F8F8F8" fill-opacity="0.9"/>
                </svg>
                <svg v-show="volume < 0.6 && volume > 0.2" width="16" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.8672 4.6368C9.70892 4.49549 9.61325 4.29709 9.60125 4.08525C9.58925 3.87341 9.66189 3.66548 9.8032 3.5072C9.94451 3.34891 10.1429 3.25325 10.3547 3.24125C10.5666 3.22925 10.7745 3.30189 10.9328 3.4432C11.96 4.36 12.5384 5.6144 12.5384 7C12.5384 8.3864 11.96 9.64 10.9328 10.5568C10.8544 10.6268 10.763 10.6806 10.6639 10.7153C10.5647 10.7499 10.4596 10.7647 10.3547 10.7587C10.1429 10.7467 9.94451 10.6511 9.8032 10.4928C9.66189 10.3345 9.58925 10.1266 9.60125 9.91474C9.61325 9.7029 9.70892 9.5045 9.8672 9.3632C10.5592 8.7464 10.9384 7.9232 10.9384 7C10.9384 6.0768 10.5592 5.2544 9.8672 4.6368ZM1.6 10.2C0.7232 10.2 0 9.47679 0 8.59999V5.4C0 4.5232 0.7232 3.8 1.6 3.8H2.92L6.7 0.775995C6.81762 0.681822 6.95945 0.622781 7.10915 0.60567C7.25885 0.588559 7.41035 0.614074 7.54619 0.679277C7.68202 0.744479 7.79669 0.846719 7.87697 0.974225C7.95726 1.10173 7.99991 1.24932 8 1.4V12.6C8.00006 12.7507 7.95752 12.8984 7.87729 13.0261C7.79707 13.1537 7.68241 13.256 7.54655 13.3213C7.41068 13.3866 7.25913 13.4122 7.10935 13.3951C6.95958 13.3781 6.81768 13.319 6.7 13.2248L2.9192 10.2008L1.6 10.2ZM3.7 5.2248C3.55818 5.33858 3.38182 5.40065 3.2 5.4008H1.6V8.6008H3.2C3.38163 8.60048 3.55796 8.66199 3.7 8.7752L6.4 10.936V3.0656L3.7 5.2248Z" fill="#F8F8F8" fill-opacity="0.9"/>
                </svg>
                <svg v-show="volume <= 0.2 && volume" width="16" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.6 10.2C0.7232 10.2 0 9.47679 0 8.59999V5.4C0 4.5232 0.7232 3.8 1.6 3.8H2.92L6.7 0.775995C6.81762 0.681822 6.95945 0.622781 7.10915 0.60567C7.25885 0.588559 7.41035 0.614074 7.54619 0.679277C7.68202 0.744479 7.79669 0.846719 7.87697 0.974225C7.95726 1.10173 7.99991 1.24932 8 1.4V12.6C8.00006 12.7507 7.95752 12.8984 7.87729 13.0261C7.79707 13.1537 7.68241 13.256 7.54655 13.3213C7.41068 13.3866 7.25913 13.4122 7.10935 13.3951C6.95958 13.3781 6.81768 13.319 6.7 13.2248L2.9192 10.2008L1.6 10.2ZM3.7 5.2248C3.55818 5.33858 3.38182 5.40065 3.2 5.4008H1.6V8.6008H3.2C3.38163 8.60048 3.55796 8.66199 3.7 8.7752L6.4 10.936V3.0656L3.7 5.2248Z" fill="#F8F8F8" fill-opacity="0.9"/>
                </svg>
                <svg v-show="volume === 0" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.8384 2.31359C10.7441 2.26646 10.66 2.20116 10.591 2.12143C10.522 2.04169 10.4695 1.94911 10.4364 1.849C10.4033 1.74889 10.3903 1.64322 10.3982 1.53808C10.4061 1.43294 10.4347 1.33039 10.4824 1.23634C10.53 1.14228 10.5958 1.05858 10.6759 0.99004C10.756 0.921498 10.8489 0.869471 10.9492 0.836949C11.0495 0.804427 11.1552 0.792053 11.2603 0.800538C11.3654 0.809022 11.4678 0.838199 11.5616 0.886389C14.204 2.22559 15.864 4.92639 15.864 7.99999C15.864 11.0656 14.2 13.7696 11.5632 15.1128C11.4696 15.1607 11.3674 15.1897 11.2626 15.1981C11.1577 15.2065 11.0523 15.1941 10.9522 15.1617C10.8522 15.1293 10.7595 15.0774 10.6795 15.0092C10.5995 14.9409 10.5337 14.8575 10.486 14.7638C10.4382 14.6701 10.4094 14.5679 10.4012 14.4631C10.393 14.3582 10.4055 14.2528 10.4381 14.1528C10.4707 14.0528 10.5227 13.9602 10.5911 13.8803C10.6595 13.8004 10.743 13.7348 10.8368 13.6872C12.9392 12.6168 14.264 10.4632 14.264 7.99999C14.264 5.53039 12.9432 3.38079 10.8384 2.31359ZM9.8672 5.63679C9.70892 5.49548 9.61325 5.29709 9.60125 5.08524C9.58925 4.8734 9.66189 4.66547 9.8032 4.50719C9.94451 4.34891 10.1429 4.25324 10.3547 4.24124C10.5666 4.22924 10.7745 4.30188 10.9328 4.44319C11.96 5.35999 12.5384 6.61439 12.5384 7.99999C12.5384 9.38639 11.96 10.64 10.9328 11.5568C10.8544 11.6268 10.763 11.6806 10.6639 11.7153C10.5647 11.7499 10.4596 11.7647 10.3547 11.7587C10.1429 11.7467 9.94451 11.6511 9.8032 11.4928C9.66189 11.3345 9.58925 11.1266 9.60125 10.9147C9.61325 10.7029 9.70892 10.5045 9.8672 10.3632C10.5592 9.74639 10.9384 8.92319 10.9384 7.99999C10.9384 7.07679 10.5592 6.25439 9.8672 5.63679ZM1.6 11.2C0.7232 11.2 0 10.4768 0 9.59999V6.39999C0 5.52319 0.7232 4.79999 1.6 4.79999H2.92L6.7 1.77599C6.81762 1.68182 6.95945 1.62277 7.10915 1.60566C7.25885 1.58855 7.41035 1.61407 7.54619 1.67927C7.68202 1.74447 7.79669 1.84671 7.87697 1.97422C7.95726 2.10172 7.99991 2.24931 8 2.39999V13.6C8.00006 13.7507 7.95752 13.8984 7.87729 14.0261C7.79707 14.1537 7.68241 14.256 7.54655 14.3213C7.41068 14.3866 7.25913 14.4122 7.10935 14.3951C6.95958 14.3781 6.81768 14.319 6.7 14.2248L2.9192 11.2008L1.6 11.2ZM3.7 6.22479C3.55818 6.33857 3.38182 6.40065 3.2 6.40079H1.6V9.60079H3.2C3.38163 9.60048 3.55796 9.66198 3.7 9.77519L6.4 11.936V4.06559L3.7 6.22479Z" fill="#F8F8F8" fill-opacity="0.9"/>
                  <path d="M1 1L15 15" stroke="#E2E2E2" stroke-width="1.3"/>
                </svg>
              </button>

              <input @input="updateVolume()" v-model="volume" class="volume" id="volume" data-mute="0.5" type="range" max="1" min="0" step="0.01">
            </div>
          </div>

          <div class="right-controls">
            <button @click="togglePip()" ref="pipButton" data-title="PIP (p)" class="pip-button" id="pip-button">
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.39961 7.79998H1.39961C1.18744 7.79998 0.983953 7.88426 0.833924 8.03429C0.683895 8.18432 0.599609 8.3878 0.599609 8.59998V12.6C0.599609 12.8121 0.683895 13.0156 0.833924 13.1657C0.983953 13.3157 1.18744 13.4 1.39961 13.4H5.39961C5.61178 13.4 5.81527 13.3157 5.96529 13.1657C6.11532 13.0156 6.19961 12.8121 6.19961 12.6V8.59998C6.19961 8.3878 6.11532 8.18432 5.96529 8.03429C5.81527 7.88426 5.61178 7.79998 5.39961 7.79998ZM12.5996 6.19998C12.5996 5.9878 12.5153 5.78432 12.3653 5.63429C12.2153 5.48426 12.0118 5.39998 11.7996 5.39998H9.73081L13.1652 1.96558C13.3152 1.81557 13.3995 1.61212 13.3995 1.39998C13.3995 1.18783 13.3152 0.984382 13.1652 0.834376C13.0152 0.684369 12.8117 0.600096 12.5996 0.600096C12.3875 0.600096 12.184 0.684369 12.034 0.834376L8.59961 4.26878V2.19998C8.59961 1.9878 8.51532 1.78432 8.36529 1.63429C8.21527 1.48426 8.01178 1.39998 7.79961 1.39998C7.58744 1.39998 7.38395 1.48426 7.23392 1.63429C7.08389 1.78432 6.99961 1.9878 6.99961 2.19998V6.19998C6.99961 6.41215 7.08389 6.61563 7.23392 6.76566C7.38395 6.91569 7.58744 6.99998 7.79961 6.99998H11.7996C12.0118 6.99998 12.2153 6.91569 12.3653 6.76566C12.5153 6.61563 12.5996 6.41215 12.5996 6.19998ZM12.5996 9.39997C12.3874 9.39997 12.184 9.48426 12.0339 9.63429C11.8839 9.78432 11.7996 9.9878 11.7996 10.2V11.8H10.1996C9.98744 11.8 9.78395 11.8843 9.63392 12.0343C9.48389 12.1843 9.39961 12.3878 9.39961 12.6C9.39961 12.8121 9.48389 13.0156 9.63392 13.1657C9.78395 13.3157 9.98744 13.4 10.1996 13.4H12.5996C12.8118 13.4 13.0153 13.3157 13.1653 13.1657C13.3153 13.0156 13.3996 12.8121 13.3996 12.6V10.2C13.3996 9.9878 13.3153 9.78432 13.1653 9.63429C13.0153 9.48426 12.8118 9.39997 12.5996 9.39997ZM2.19961 11.8H4.59961V9.39997H2.19961V11.8ZM1.39961 4.59998C1.61178 4.59998 1.81527 4.51569 1.96529 4.36566C2.11532 4.21563 2.19961 4.01215 2.19961 3.79998V2.19998H3.79961C4.01178 2.19998 4.21527 2.11569 4.36529 1.96566C4.51532 1.81563 4.59961 1.61215 4.59961 1.39998C4.59961 1.1878 4.51532 0.984319 4.36529 0.83429C4.21527 0.684261 4.01178 0.599976 3.79961 0.599976H1.39961C1.18744 0.599976 0.983953 0.684261 0.833924 0.83429C0.683895 0.984319 0.599609 1.1878 0.599609 1.39998V3.79998C0.599609 4.01215 0.683895 4.21563 0.833924 4.36566C0.983953 4.51569 1.18744 4.59998 1.39961 4.59998Z" fill="#F8F8F8" fill-opacity="0.9"/>
              </svg>
            </button>
            <button
              @click="toggleSettings()"
              data-title="Настройки"
              class="setting-button"
              id="setting-button"
            >
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5931 9.5198L14.3451 8.8158C14.4162 8.27546 14.4162 7.72814 14.3451 7.1878L15.5931 6.4846C15.6858 6.43226 15.7671 6.36199 15.8323 6.27787C15.8975 6.19376 15.9452 6.0975 15.9728 5.99471C16.0004 5.89192 16.0072 5.78467 15.9928 5.67923C15.9784 5.57379 15.9432 5.47227 15.8891 5.3806L14.2515 2.6102C14.1448 2.42996 13.9718 2.2987 13.7694 2.24457C13.5671 2.19043 13.3516 2.21773 13.1691 2.3206L11.9763 2.9934C11.4971 2.61282 10.9662 2.30225 10.3995 2.071V0.802197C10.3995 0.590024 10.3153 0.386541 10.1652 0.236512C10.0152 0.0864828 9.81172 0.00219727 9.59954 0.00219727L6.39954 0.00219727C6.18737 0.00219727 5.98389 0.0864828 5.83386 0.236512C5.68383 0.386541 5.59954 0.590024 5.59954 0.802197V2.071C5.03312 2.30183 4.50246 2.61214 4.02354 2.9926L2.82994 2.3206C2.64771 2.2177 2.43241 2.1903 2.23021 2.24429C2.02802 2.29828 1.85503 2.42935 1.74834 2.6094L0.110741 5.3806C0.0566917 5.47227 0.021455 5.57379 0.00709045 5.67923C-0.00727412 5.78467 -0.000478494 5.89192 0.0270802 5.99471C0.0546389 6.0975 0.102408 6.19376 0.167596 6.27787C0.232783 6.36199 0.314082 6.43226 0.406741 6.4846L1.65394 7.1886C1.61815 7.45833 1.59998 7.7301 1.59954 8.0022C1.59954 8.2702 1.61794 8.5422 1.65394 8.8158L0.405941 9.5198C0.313041 9.57189 0.231503 9.64205 0.166129 9.72614C0.100755 9.81022 0.0528667 9.90654 0.0252839 10.0094C-0.00229897 10.1123 -0.00901875 10.2197 0.00552025 10.3252C0.0200593 10.4307 0.0555631 10.5322 0.109941 10.6238L1.74834 13.395C1.85475 13.5753 2.02768 13.7067 2.22995 13.7609C2.43222 13.815 2.64766 13.7876 2.82994 13.6846L4.02354 13.011C4.50207 13.392 5.03282 13.7024 5.59954 13.9326V15.2022C5.59954 15.4144 5.68383 15.6179 5.83386 15.7679C5.98389 15.9179 6.18737 16.0022 6.39954 16.0022H9.59954C9.81172 16.0022 10.0152 15.9179 10.1652 15.7679C10.3153 15.6179 10.3995 15.4144 10.3995 15.2022V13.9326C10.9661 13.7022 11.4969 13.3918 11.9755 13.011L13.1691 13.6846C13.3515 13.7877 13.5671 13.8151 13.7695 13.7609C13.9719 13.7068 14.145 13.5754 14.2515 13.395L15.8891 10.6238C15.9431 10.5321 15.9782 10.4306 15.9925 10.3252C16.0068 10.2197 16 10.1125 15.9725 10.0098C15.9449 9.90702 15.8972 9.81077 15.8321 9.72665C15.7669 9.64253 15.6857 9.57221 15.5931 9.5198ZM12.6787 6.9446C12.7587 7.303 12.7987 7.659 12.7987 8.0022C12.7974 8.35805 12.7572 8.71269 12.6787 9.0598C12.6411 9.22745 12.6584 9.40279 12.7281 9.55984C12.7979 9.71689 12.9163 9.84731 13.0659 9.9318L14.0955 10.5118L13.2715 11.9054L12.2699 11.3398C12.1202 11.2555 11.9473 11.2217 11.7769 11.2433C11.6065 11.2649 11.4475 11.3408 11.3235 11.4598C10.7725 11.9892 10.1034 12.38 9.37154 12.5998C9.20612 12.649 9.06103 12.7503 8.95794 12.8888C8.85485 13.0272 8.79929 13.1952 8.79954 13.3678V14.4022H7.19954V13.367C7.19968 13.1947 7.14415 13.0269 7.04122 12.8886C6.9383 12.7504 6.79349 12.6491 6.62834 12.5998C5.89632 12.3803 5.22716 11.9895 4.67634 11.4598C4.55227 11.3408 4.39317 11.2648 4.22258 11.2432C4.052 11.2216 3.87898 11.2555 3.72914 11.3398L2.72754 11.9054L1.90354 10.5118L2.93314 9.931C3.08286 9.84677 3.20144 9.71654 3.27133 9.55962C3.34122 9.40269 3.35869 9.22743 3.32114 9.0598C3.2418 8.71282 3.20102 8.35813 3.19954 8.0022C3.19954 7.659 3.23954 7.303 3.32114 6.9446C3.35874 6.77685 3.34131 6.60146 3.27142 6.4444C3.20154 6.28734 3.08292 6.15697 2.93314 6.0726L1.90354 5.4918L2.72754 4.0982L3.72914 4.6638C3.87887 4.74837 4.05186 4.78244 4.22247 4.76097C4.39308 4.7395 4.55224 4.66363 4.67634 4.5446C5.22712 4.01463 5.89627 3.62356 6.62834 3.4038C6.79336 3.35455 6.93808 3.25336 7.04099 3.11528C7.1439 2.97721 7.1995 2.80961 7.19954 2.6374V1.6022H8.79954V2.6374C8.79963 2.80971 8.85536 2.97738 8.95842 3.11547C9.06148 3.25357 9.20638 3.35469 9.37154 3.4038C10.0955 3.6198 10.7707 4.0134 11.3235 4.5446C11.4475 4.66357 11.6065 4.73949 11.7769 4.7611C11.9473 4.78271 12.1202 4.74887 12.2699 4.6646L13.2723 4.0982L14.0955 5.4918L13.0659 6.0726C12.9163 6.15709 12.7979 6.28751 12.7281 6.44456C12.6584 6.60161 12.6411 6.77694 12.6787 6.9446ZM7.99874 4.8022C6.23474 4.8022 4.79874 6.2374 4.79874 8.0022C4.79874 9.767 6.23474 11.2022 7.99874 11.2022C9.76434 11.2022 11.1987 9.767 11.1987 8.0022C11.1987 6.2374 9.76434 4.8022 7.99874 4.8022ZM7.99874 9.6022C7.11714 9.6022 6.39874 8.8846 6.39874 8.0022C6.39874 7.1198 7.11714 6.4022 7.99874 6.4022C8.88194 6.4022 9.59874 7.1198 9.59874 8.0022C9.59874 8.8846 8.88194 9.6022 7.99874 9.6022Z" fill="#F8F8F8" fill-opacity="0.9"/>
              </svg>
            </button>
            <button @click="toggleFullScreen()" ref="fullscreenButton" data-title="Во весь экран (f)" class="fullscreen-button" id="fullscreen-button">
              <svg :class="{hidden: fullscreenIcons}" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.667 0.5H17.3337V5.5H15.667V2.16667H12.3337V0.5H15.667ZM2.33366 0.5H5.66699V2.16667H2.33366V5.5H0.666992V0.5H2.33366ZM15.667 13.8333V10.5H17.3337V15.5H12.3337V13.8333H15.667ZM2.33366 13.8333H5.66699V15.5H0.666992V10.5H2.33366V13.8333Z" fill="#F8F8F8" fill-opacity="0.9"/>
              </svg>
              <svg :class="{hidden: !fullscreenIcons}" width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5H5V0" stroke="#E3E3E4" stroke-width="1.5"/>
                <path d="M0 9.5H5V14.5" stroke="#E3E3E4" stroke-width="1.5"/>
                <path d="M16 5H11V0" stroke="#E3E3E4" stroke-width="1.5"/>
                <path d="M16 9.5H11V14.5" stroke="#E3E3E4" stroke-width="1.5"/>
              </svg>
            </button>
          </div>
          <div @mouseenter="showControls()" class="bottom__settings">
            <div v-show="settings==='main'" class="main">
              <div @click="settings='speed'" class="settings__block">
                <div>Скорость</div>
                <div>
                  <span v-if="videoSpeedValues[speedValue]">{{ videoSpeedValues[speedValue].text }}</span>
                  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 11L6 6L1 1" stroke="white"/>
                  </svg>

                </div>
              </div>
              <!-- <div @click="settings='quality'" class="settings__block flex">
                  <div>{{Качество}}</div>
                  <div>
                      <span>{{videoQualityValues[qualityValue]}}px</span>
                      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 11L6 6L1 1" stroke="white"/>
                      </svg>
                  </div>
              </div> -->
            </div>
            <div v-show="settings==='speed'" class="settings-block__speed">
              <div @click="settings='main'" class="settings-block__head">
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 1L1 6L6 11" stroke="white"/>
                </svg>
                <span>Скорость</span>
              </div>
              <div
                @click="editSpeed(item, index)"
                class="settings__block"
                v-for="(item, index) in videoSpeedValues"
                :key="item.id"
              >
                {{ item.text }}
              </div>
            </div>
            <div v-show="settings==='quality'" class="settings-block__quality">
              <div @click="settings='main'" class="settings-block__head">
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 1L1 6L6 11" stroke="white"/>
                </svg>
                <span>Качество</span>
              </div>
              <div
                class="settings__block"
                v-for="item in videoQualityValues"
                :key="item"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div @dblclick.prevent="onLeftButton(10)" @click="animatePlayback(), togglePlay()" class="tab__left"></div>
      <div @dblclick.prevent="onRightButton(10)" @click="animatePlayback(), togglePlay()" class="tab__right"></div>
    </div>
    <div @mouseenter="showControls()" @click="settings=''" v-show="settings" class="close positions"></div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue'
export interface IProps {
  src: string,
  width: string,
  height: string
}
export interface VideoSpeedInterface {
  id: number,
  text: string,
  value: number,
  state?: string
}
export interface TimeInterface {
  hours: string
  minutes: string
  seconds: string
}

const props = withDefaults(defineProps<IProps>(), {
  src: '',
  width: '640px',
  height: '360px'
})
const emit = defineEmits(['start', 'end', 'play', 'pause', 'pip', 'fullscreen'])

let video = ref()
let videoControls = ref()
let playButton = ref()
let playbackIcons = ref(false)
let timeElapsed = ref('')
let duration = ref('')
let progressBar = ref()
let progressBarValue = ref(0)
let seek = ref()
let seekTooltip = ref()
let volume = ref(1)
let playbackAnimation = ref()
let fullscreenButton = ref()
let videoContainer = ref()
let fullscreenIcons = ref(false)
let pipButton = ref()
let timer = ref(0)
let speedValue = ref(3)
let videoSpeedValues: VideoSpeedInterface[] = [
  { id: 1, text: '0.25', value: 0.25 },
  { id: 2, text: '0.5', value: 0.5 },
  { id: 3, text: '0.75', value: 0.75 },
  { id: 4, text: 'Обычная', value: 1, state: 'normal' },
  { id: 5, text: '1.25', value: 1.25 },
  { id: 6, text: '1.5', value: 1.5 },
  { id: 7, text: '1.75', value: 1.75 },
  { id: 8, text: '2', value: 2 },
]
let videoQualityValues = ref(['360', '480', '720'])
let settings = ref('')
let loader = ref(true)
let beforeUpdateVolume = ref(0)
let mouseMoveTime = ref(0)
let cancelNextVideo = ref(false)
let currentTime = ref(0)
let hideClass = ref(false)
let isMoveTimeExpired = ref(false)




const playing = (): void => {
  playbackIcons.value = true
  currentTime.value = video.value.currentTime
}
const togglePlay = async () => {
  let width = window.outerWidth
  settings.value = ''
  if (video.value.paused || video.value.ended) {
    await video.value.play()
  } else if (width > 579) {
    await video.value.pause()
    clearTimeout(mouseMoveTime.value)
  } else if (width < 580 && !hideClass.value) {
    await video.value.pause()
  } else if (width < 580 && hideClass.value) {
    hideClass.value = false
  }
}
const updatePlayButton = (): void => {
  mousemove()
  playbackIcons.value = !playbackIcons.valueOf()

  if (video.value.paused) {
    emit('pause')
    playButton.value.setAttribute('data-title', `Смотреть (k)`)
  } else {
    emit('play')
    loader.value = false
    playButton.value.setAttribute('data-title', `Пауза (k)`)
  }
}
const formatTime = (timeInSeconds:number): TimeInterface => {
  const result: string = new Date((timeInSeconds || 0) * 1000).toISOString().substr(11, 8)

  return {
    hours: result.substr(0, 2),
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  }
}
const initializeVideo = (): void => {
  const videoDuration: number = Math.round(video.value.duration)
  if (seek?.value) {
    seek.value.setAttribute('max', videoDuration)
  }
  const time: TimeInterface = formatTime(videoDuration)
  duration.value = `${parseInt(time.hours) ? time.hours + ':' : ''}${time.minutes}:${time.seconds}`
  if (loader.value && !video.value.paused && video.value.duration == 0) {
    setTimeout(() => {
      loader.value = false
      video.value.play()
    }, 5000)
  } else if (video.value.paused) {
    video.value.pause()
  } else video.value.play()
}
const updateTimeElapsed = (): void => {
  const time: TimeInterface = formatTime(Math.round(video.value.currentTime))
  timeElapsed.value = `${parseInt(time.hours) ? time.hours + ':' : ''}${time.minutes}:${time.seconds}`
  progressBar.value = Math.round(video.value.currentTime / video.value.duration * 100)
  progressBarValue.value = Math.round(video.value.currentTime / video.value.duration * 100)
  playbackIcons.value = true
}
const updateProgress = (): void => {
  seek.value.value = Math.floor(video.value.currentTime)
  progressBar.value = video.value.currentTime / video.value.duration * 100
  progressBarValue.value = Math.round(video.value.currentTime / video.value.duration * 100)
}
const updateSeekTooltip = (e: Event): void => {
  const event = e as MouseEvent
  const target = event.target as HTMLInputElement
  const skipTo: number = Math.max(Math.round((event.offsetX / target!.clientWidth) * parseInt(target!.getAttribute('max')!, 10)), 0)
  seek.value.setAttribute('data-seek', skipTo)
  const t: TimeInterface = formatTime(skipTo)
  seekTooltip.value.textContent = `${parseInt(t.hours) ? t.hours + ':' : ''}${t.minutes}:${t.seconds}`
  const rect = video.value.getBoundingClientRect()
  const fixLeftPosition: number = Math.max(event.pageX - rect.left - 10, 10)
  const fixRightPosition: number = Math.min(fixLeftPosition, video.value.getBoundingClientRect().right - 60)
  seekTooltip.value.style.left = `${fixRightPosition}px`
}
const skipAhead = (e: Event): void => {
  const event = e as InputEvent
  loader.value = true
  const target = event.target as HTMLInputElement
  const skipTo: number | string = (target.dataset.seek ? target.dataset.seek : target.value) || 0
  video.value.currentTime = skipTo
  seek.value.value = skipTo
  cancelNextVideo.value = false
}
const updateVolume = (): void => {
  if (video.value.muted) {
    video.value.muted = false
  }

  video.value.volume = volume.value
}
const updateVolumeIcon = (): void => {

}
const toggleMute = (): void => {
  video.value.muted = !video.value.muted

  if (video.value.muted) {
    beforeUpdateVolume.value = volume.value
    volume.value = 0
  } else {
    volume.value = beforeUpdateVolume.value
  }
}
const animatePlayback = (): void => {
  let width: number = window.outerWidth
  if (width > 579 || !hideClass.value)
    playbackAnimation.value.animate([
      {
        opacity: 1,
        transform: "scale(1)",
      },
      {
        opacity: 0,
        transform: "scale(1.3)",
      }
    ], {
      duration: 500,
    })
}
const toggleFullScreen = (): void => {
  if (fullscreenIcons.value) {
    const document: any = window.document
    if (document.exitFullscreen) document.exitFullscreen()
    else if (document.webkitCancelFullscreen) document.webkitCancelFullscreen()
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen()
  } else {
    emit('fullscreen')
    if (videoContainer.value.requestFullscreen) videoContainer.value.requestFullscreen()
    else if (videoContainer.value.webkitRequestFullscreen) videoContainer.value.webkitRequestFullscreen()
    else if (videoContainer.value.mozRequestFullScreen) videoContainer.value.mozRequestFullScreen()
    else if (videoContainer.value.webkitEnterFullScreen) videoContainer.value.webkitEnterFullScreen()
    else if (videoContainer.value.enterFullscreen) videoContainer.value.enterFullscreen()
  }
}
const updateFullscreenButton = (): void => {
  fullscreenIcons.value = !fullscreenIcons.value

  if (fullscreenIcons.value) {
    fullscreenButton.value.setAttribute('data-title', 'Выйти из полного экрана')
  } else {
    fullscreenButton.value.setAttribute('data-title', ('Полный экран'))
  }
}
const togglePip = async () => {
  try {
    if (video.value !== document.pictureInPictureElement) {
      emit('pip')
      await video.value.requestPictureInPicture()
    } else {
      await document.exitPictureInPicture()
    }
  } catch (error) {
    console.log(error)
  }
}
const toggleSettings = (): void => {
  if (!settings.value) {
    settings.value = 'main'
  } else {
    settings.value = ''
  }
  mousemove()
}
const hideControls = (): void => {
  let width: number = window.outerWidth
  if (!video.value.paused && width > 579)
    hideClass.value = true
  videoControls.value?.classList.add('hide')
}
const showControls = (): void => {
  let width: number = window.outerWidth
  if (width > 579 || !hideClass.value) {
    hideClass.value = false
  }
  videoControls.value?.classList.remove('hide')
}
const keyboardShortcuts = (event: KeyboardEvent): void => {
  const {key} = event
  switch (key) {
    case 'k':
      togglePlay()
      animatePlayback()
      break
    case ' ':
      event.preventDefault()
      togglePlay()
      animatePlayback()
      break
    case 'm':
      toggleMute()
      break
    case 'f':
      toggleFullScreen()
      break
    case 'p':
      togglePip()
      break
    case 'l':
      if (video.value.currentTime < video.value.duration - 10) video.value.currentTime += 10
      break
    case 'j':
      if (video.value.currentTime >= 10) video.value.currentTime -= 10
      break
    case 'ArrowRight':
      event.preventDefault()
      onRightButton()
      break
    case 'ArrowLeft':
      event.preventDefault()
      onLeftButton()
      break
    case 'F5':
      break
    default:
      break
  }
}
const editSpeed = (e: VideoSpeedInterface, index: number): void => {
  video.value.playbackRate = e.value
  settings.value = ''
  speedValue.value = index
}
const movieWaiting = (): void => {
  loader.value = true
}
const movieError = (): void => {
  alert('Ошибка при воспроизведении видео')
}
const canplay = (): void => {
  const videoWorks = !!document.createElement('video').canPlayType
  if (videoWorks && videoControls?.value) {
    video.value.controls = false
    videoControls.value?.classList.remove('hidden')

  }
  video.value.play()
  loader.value = false
}
const mousemove = (): void => {
  clearTimeout(mouseMoveTime.value)
  if (isMoveTimeExpired.value || settings.value || video.value.paused) {
    // video.value.classList.remove('no-cursor')
    showControls()
    mouseMoveTime.value = 0
    isMoveTimeExpired.value = false
  } else {
    mouseMoveTime.value = setTimeout(() => {
      hideClass.value = true
      isMoveTimeExpired.value = true
      video.value.classList.add('no-cursor')
      hideControls()
    }, 2000)
  }
}
const nextVideoTimer = (): void => {
  if (timer.value > 0 && !cancelNextVideo.value) {
    timer.value--
    if (timer.value === 0) {
      // this.$emit('end')
    }
    setTimeout(() => {
      nextVideoTimer()
    }, 1000)
  }
}
const ended = (): void => {
  timer.value = 6
  cancelNextVideo.value = false
  emit('end')
  // if(!this.watch.nextVideo) this.cancelNextVideo = true
  // else this.cancelNextVideo = false
  video.value.classList.remove('no-cursor')
  nextVideoTimer()
  showControls()
}
const rePlay = (): void => {
  loader.value = true
  video.value.currentTime = 0
  cancelNextVideo.value = false
}
const onRightButton = (timer: number = 5): void => {
  if (video.value.currentTime < video.value.duration - timer) video.value.currentTime += timer
}
const onLeftButton = (timer: number = 5): void => {
  if (video.value.currentTime >= timer) video.value.currentTime -= timer
}



onMounted(() => {
  document.addEventListener('DOMContentLoaded', () => {
    if (!('pictureInPictureEnabled' in document)) {
      pipButton.value?.classList.add('hidden')
    }
  })
  document.addEventListener('keydown', keyboardShortcuts)
  volume.value = video.value.volume
  initializeVideo()
})
onUnmounted(() => {
  document.removeEventListener('keydown', keyboardShortcuts)
  document.removeEventListener('DOMContentLoaded', () => {
    if (!('pictureInPictureEnabled' in document)) {
      pipButton.value?.classList.add('hidden')
    }
  })
})
</script>

<style scoped>

:root {
  --youtube-red: red;
}

/* .video-block{
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
} */

.video-container {
  margin: 20px auto 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 16px;
  background: #000;
}

video {
  width: 100%;
  height: 80vh;
  min-height: 300px;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
}

.fullvision video {
  height: 100%;
}

.time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}

.video-controls {
  right: 0;
  left: 0;
  padding: 10px;
  position: absolute;
  bottom: 0;
  z-index: 2;
  transition: all 0.2s ease;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.001), rgba(0, 0, 0, 0.1));
}

.video-controls:hover {
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3));
  opacity: 1 !important;
}

/* .video-container:hover .video-controls {
    opacity: 1;
} */

.video-controls.hide {
  opacity: 0;
  pointer-events: none;
}

.video-progress {
  position: relative;
  height: 8.4px;
  margin-bottom: 10px;
}

progress {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 2px;
  width: 100%;
  height: 6px;
  pointer-events: none;
  position: absolute;
  top: 0;
}

progress::-webkit-progress-bar {
  background-color: #474545;
  border-radius: 2px;
}

progress::-webkit-progress-value {
  background: var(--youtube-red);
  border-radius: 2px;
}

progress::-moz-progress-bar {
  border: 1px solid var(--youtube-red);
  background: var(--youtube-red);
}

.progress {
  background: rgba(189, 189, 189, .5);
  height: 6px;
  width: 100%;
  border-radius: 16px;
}

.progress .progress__value {
  background: #F06292;
  height: 100%;
  position: relative;
  border-radius: 16px;
}

.progress .progress__value::after {
  position: absolute;
  content: '';
  height: 18px;
  width: 18px;
  right: -9px;
  top: -5px;
  opacity: 0;
  border-radius: 50% 50%;
  background: #FFF;
}

.video-progress:hover .progress .progress__value::after, .progress .progress__value:hover::after {
  opacity: 1;
}

.seek {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  cursor: pointer;
  margin: 0;
  opacity: 0;
}

.seek:hover + .seek-tooltip {
  display: block;
}

.seek-tooltip {
  display: none;
  position: absolute;
  top: -50px;
  margin-left: -20px;
  font-size: 12px;
  padding: 3px;
  content: attr(data-title);
  font-weight: bold;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
}

.bottom-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-controls {
  display: flex;
  align-items: center;
  color: #fff;
}

.volume-controls {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.volume-controls input {
  width: 100px;
  opacity: 1;
  transition: all 0.4s ease;
}

.volume-controls:hover input, .volume-controls input:focus {
  width: 100px;
  opacity: 1;
}

button {
  cursor: pointer;
  position: relative;
  margin-right: 7px;
  font-size: 12px;
  padding: 3px;
  border: none;
  outline: none;
  background-color: transparent;
}

button * {
  pointer-events: none;
}

button::before {
  content: attr(data-title);
  position: absolute;
  display: none;
  right: 0;
  top: -50px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-weight: bold;
  padding: 4px 6px;
  word-break: keep-all;
  white-space: pre;
}
.left-controls button::before {
  right: auto;
  left: 0;
}

@media (min-width: 579px) {
  button:hover::before {
    display: inline-block;
  }
}

.fullscreen-button {
  margin-right: 0;
}

.playback-animation {
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -40px;
  margin-top: -40px;
  width: 80px;
  height: 80px;
  border-radius: 80px;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
}

input[type=range] {
  /* -webkit-appearance: none;
  -moz-appearance: none; */
  height: 6px;
  background: rgba(189, 189, 189, .5);
  cursor: pointer;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  cursor: pointer;
  border-radius: 1.3px;
  -webkit-appearance: none;
  transition: all 0.4s ease;
}

input[type=range]::-webkit-slider-thumb {
  height: 16px;
  width: 16px;
  border-radius: 16px;
  background: var(--youtube-red);
  cursor: pointer;
  -webkit-appearance: none;
  margin-left: -1px;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: transparent;
}

input[type=range].volume {
  height: 4px;
  border-radius: 4px;
  /* background-color: red; */
  opacity: 0;
  visibility: hidden;
  transition: all .3s;
}

#volume-button:hover + input[type=range].volume, input[type=range].volume:hover {
  opacity: 1;
  visibility: visible;
}

input[type=range].volume::-webkit-slider-runnable-track {
  background-color: transparent;
}

input[type=range].volume::-webkit-slider-thumb {
  margin-left: 0;
  height: 14px;
  width: 14px;
  background: #fff;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 1.3px;
}

input[type=range]::-moz-range-thumb {
  height: 14px;
  width: 14px;
  border-radius: 50px;
  border: 1px solid var(--youtube-red);
  background: var(--youtube-red);
  cursor: pointer;
  margin-top: 5px;
}

input[type=range]:focus::-moz-range-track {
  outline: none;
}

input[type=range].volume::-moz-range-thumb {
  border: 1px solid #fff;
  background: #fff;
}

.hidden {
  display: none;
}

.bottom__settings {
  position: absolute;
  bottom: calc(100% + 10px);
  background: rgba(31, 32, 35, .8);
  right: 10px;
  width: 300px;
}

.bottom__settings svg {
  margin-left: 5px;
}

.bottom__settings div.settings__block {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bottom__settings div.settings__block:hover {
  cursor: pointer;
  background: rgba(189, 189, 189, .5);
}

.bottom__settings div.settings__block > div:last-child {
  width: 100px;
}

.settings-block__head {
  border-bottom: 1px solid rgb(189, 189, 189);
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.settings-block__speed .settings__block, .settings-block__quality .settings__block {
  padding-left: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.close {
  position: fixed;
  z-index: 1;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.no-cursor, .no-cursor * {
  cursor: none !important;
}

.fullvision video {
  height: 100vh;
  max-width: 100%;
  min-width: 100%;
  min-height: 300px;
}

.timer, .nextVideoGrid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.3);
  font-size: 24px;
  text-align: center;
  z-index: 9;
}

.timer button {
  color: #FFF;
  font-size: 24px;
}

.timer .play img {
  width: 40px;
  cursor: pointer;
}

.next__video-grid {
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: repeat(3, 33.3%);
  height: 100%;
  width: 100%;
  position: absolute;

}

.next__video-grid > div {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
}

.next__video-grid > div .next__video-back {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  color: #FFF;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  box-sizing: border-box;
  transition: opacity .3s;
}

.next__video-grid > div .next__video-back a {
  color: #FFF;
  text-decoration: none;
  display: block;
  padding: 5px 20px;
  height: 100%;
  box-sizing: border-box;
}

.next__video-grid > div:hover .next__video-back {
  opacity: 1;
  visibility: visible;
}

.next__video-grid > div img {
  max-width: 300px;
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media (max-width: 991px) {
  video {
    height: auto;
    max-height: 500px;
  }
}

@media (max-width: 579px) {
  video {
    height: auto;
    max-height: 300px;
  }

  .fullvision .video-container {
    z-index: 9;
  }

  .video-container {
    margin-top: 0;
    position: fixed;
    width: 100%;
    left: 0;
    top: 60px;
    z-index: 2;
  }

  .bottom__settings {
    bottom: auto;
    left: 50%;
    right: auto;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(31, 32, 35, 1);
  }

  .next__video-grid {
    grid-template-columns: repeat(3, 33.3%);
    grid-template-rows: repeat(2, 50%);
  }

  .tab__left, .tab__right {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 30%;
    /* background: red; */
  }

  .tab__right {
    right: 0;
  }

  .tab__left {
    left: 0;
  }
}

@media (max-width: 490px) {
  video {
    max-height: 270px;
    min-height: 270px;
  }

  .video-container {
    height: 270px;
  }
}

@media (max-width: 380px) {
  video {
    max-height: 220px;
    min-height: 220px;
  }

  .video-container {
    height: 220px;
  }
}

</style>