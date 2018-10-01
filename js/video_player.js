class VideoPlayerBasic {
    constructor(settings) {
        this._settings = Object.assign(VideoPlayerBasic.getDefaultSettings(), settings);
    }

    /**
     * Метод init.
     * Производим проверку на наличие кретических свойств в настройках.
     * Производим запуск методов инициализации разметки и events. 
     * Возвращаем публичные методы.
     */
    init() {
        if (!this._settings.videoUrl) return console.error("Пожалуйста задайте адрес видео!");
        if (!this._settings.videoPlayerContainer) return console.error("Пожалуйста задайте в виде css селектора контейнер для видео!");

        // Создали и добавили разметку
        VideoPlayerBasic.addTemplate(this._settings);

        // Находим элементы управления в зависимости от контейнера
        this._video = document.querySelector(`${this._settings.videoPlayerContainer} .player__video`);
        this._toggleBtn = document.querySelector(`${this._settings.videoPlayerContainer} .toggle`);
        this._progressFilled = document.querySelector(`${this._settings.videoPlayerContainer} .progress__filled`);

        // Устанавливаем события
        this._setEvents();

        return this;
    }

    toggle(e) {
        const method = this._video.paused ? "play" : "pause";
        this._toggleBtn.textContent = this._video.paused ? '❚ ❚' :  '►';
        this._video[method](); // this._video["play"]();   
    }

    _handleProgress(e) {
        const percent = (this._video.currentTime / this._video.duration) * 100;
        this._progressFilled.style.flexBasis = `${percent}%`;
    }

    play() {
        this._video.play();
    }

    pause() {
        this._video.pause();
    }

    stop() {
        this._video.pause();
        this._video.currentTime = 0;
    }

    _setEvents(settings) {
        this._video.addEventListener("click", e => this.toggle(e));
        this._toggleBtn.addEventListener("click",  e => this.toggle(e));
        this._video.addEventListener("timeupdate", e => this._handleProgress(e));
    }

    static addTemplate(settings) {
        const template = VideoPlayerBasic.template(settings);
        document.querySelector(settings.videoPlayerContainer).insertAdjacentHTML("afterbegin", template);
    }

    static template(settings) {
        const videoTemplate = `<video class="player__video viewer" src="${settings.videoUrl}"> </video>`;
        
        const controlsTemplate = `
            <div class="player__controls">
                <div class="progress">
                    <div class="progress__filled"></div>
                </div>
                <button class="player__button toggle" title="Toggle Play">►</button>
                <input type="range" name="volume" class="player__slider" min=0 max="1" step="0.05" value="1">
                <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
                <button data-skip="-1" class="player__button">« 1s</button>
                <button data-skip="1" class="player__button">1s »</button>
            </div>
        `;

        return `
            ${videoTemplate}
            ${settings.controls ? controlsTemplate : ""}
        `;
    }

    static getDefaultSettings() {
        /**
         * Список настроек
         * - адрес видео
         * - тип плеера "basic", "pro"
         * - controls: true, false
         * - loop: true, false
         * - valume: 0 - 1
         */

         return {
             videoUrl: "",
             videoPlayerContainer: ".myplayer",
             playerType: "basic",
             controls: true,
             loop: false,
             valume: 1
         }
    }
}

const myplayer = new VideoPlayerBasic({ 
        videoUrl: "video/mov_bbb.mp4",
        videoPlayerContainer: ".myplayer1",
}).init();

const myplayer2 = new VideoPlayerBasic({ 
    videoUrl: "video/mov_bbb.1.mp4",
    videoPlayerContainer: ".myplayer2",
}).init();

// TODO: Написать комменты для каждого метода
// TODO: Написать метод изменения громкости и подвязать его к range инпуту


// const videoUrlLinks = ["video/mov_bbb.mp4", "video/mov_bbb.1.mp4"];

// videoUrlLinks.forEach((link, index) => {
//     new VideoPlayerBasic({ 
//         videoUrl: link,
//         videoPlayerContainer: `.myplayer${index+1}`,
//     }).init();
// })