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
        this._progresContainer = document.querySelector(`${this._settings.videoPlayerContainer} .progress`);
        this._progressFilled = document.querySelector(`${this._settings.videoPlayerContainer} .progress__filled`);
        this._valumeControl = document.querySelector(`${this._settings.videoPlayerContainer} [name="volume"] `);

        this._mouseDoun=false;
        // Устанавливаем события
        this._setEvents();

        return this;

    }

    /**
     * Обработчик переключение с паузы на плей
     * @param e
     * @private
     */
    _toggle(e) {
        const method = this._video.paused ? "play" : "pause";
        this._toggleBtn.textContent = this._video.paused ? '❚ ❚' : '►';
        this._video[method]();
    }

    /**
     * Обработчик для полосы загрузки видео
     * @param e
     * @private
     */
    _handleProgress(e) {
        const percent = (this._video.currentTime / this._video.duration) * 100;
        this._progressFilled.style.flexBasis = `${percent}%`;
    }

    /**
     * Обработчик для звука
     * @param e
     * @private
     */
    _valumeProgres(e) {
        //получаем значение по клику на ползунке волуме и передаем значение в свойство volume плеера
        this._video.volume = this._valumeControl.value;
    }

    /**
     * Запуск плеера
     */
    play() {
        this._video.play();
    }

    /**
     * Пауза плеера
     */
    pause() {
        this._video.pause();
    }

    /**
     * Остановка плеера
     */
    stop() {
        this._video.pause();
        this._video.currentTime = 0;
    }

    _scrub(e){
        //Для того что бы ужрать условие нужно вспомнить о && запнается на лжи. а функция тру всегда и она вызывается
        if(this._mouseDoun || e.type==='click') {
           this._video.currentTime = (e.offsetX / this._progresContainer.offsetWidth) * this._video.duration;
        }
    }

    /**
     * Слушатель событий на панеле управления плеером.
     * @param settings
     * @private
     */
    _setEvents(settings) {
        this._video.addEventListener("click", e => this._toggle(e));
        this._toggleBtn.addEventListener("click", e => this._toggle(e));
        this._video.addEventListener("timeupdate", e => this._handleProgress(e));

        //события для звука.
        this._valumeControl.addEventListener("mouseup", e => this._valumeProgres(e));
        this._valumeControl.addEventListener("mousemove", e => this._valumeProgres(e));
        this._valumeControl.addEventListener("scroll", e => this._valumeProgres(e));

    //    для скраба
        this._progresContainer.addEventListener('click', e=>this._scrub(e));

        //запинается на лжи спомнить о && запнается на лжи. а функция тру всегда и она вызывается
        // this._progressContainer.addEventListener('mousemove', e=>this._mouseDoun && this._scrub(e));
        this._progresContainer.addEventListener('mousemove', e=>this._scrub(e));
        this._progresContainer.addEventListener('mousedown', e=>this._mouseDoun=true);
        this._progresContainer.addEventListener('mouseup', e=>this._mouseDoun=false);

    }

    /**
     * Добавляет разметку на страницу
     * @param settings
     */
    static addTemplate(settings) {
        const template = VideoPlayerBasic.template(settings);
        document.querySelector(settings.videoPlayerContainer).insertAdjacentHTML("afterbegin", template);
    }

    /**
     * Генеринует разметку
     * @param settings
     * @return {string}
     */
    static template(settings) {
        const videoTemplate = `<video class="player__video viewer" src="${settings.videoUrl}"> </video>`;

        const controlsTemplate = `
            <div class="player__controls">
                <div class="progress">
                    <div class="progress__filled"></div>
                </div>
                <button class="player__button toggle" title="Toggle Play">►</button>
                <input type="range" name="volume" class="player__slider" min=0 max="1" step="0.05" value="1">
            </div>
        `;

        return `
            ${videoTemplate}
            ${settings.controls ? controlsTemplate : ""}
        `;
    }

    /**
     * Возвращает настройки по умолчанию
     * @return {{videoUrl: string, videoPlayerContainer: string, playerType: string, controls: boolean, loop: boolean, valume: number}}
     */
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
            volume: 1
        }
    }
}

//
// const videoUrlLinks = ["video/mov_bbb.mp4", "video/mov_bbb.1.mp4"];
//
// videoUrlLinks.forEach((link, index) => {
//     new VideoPlayerBasic({
//         videoUrl: link,
//         videoPlayerContainer: `.myplayer${index + 1}`,
//     }).init();
// });

const mypleer1 = new VideoPlayerBasic({
        videoUrl: 'video/mov_bbb.mp4',
        videoPlayerContainer: `.myplayer1`,
    }).init();















class VideoPleerPro extends VideoPlayerBasic {
    constructor(settings){
        super(settings);
    }

    init(){
        super.init();
        VideoPleerPro.updateVideoPleerTemplate(this._settings);
    }


    // TODO: _setEvents установить события на инпут playbackRate
    // TODO: _setEvents установить события на кнопки переметки вперед назад
    // TODO: Создать метод изменения playbackRate
    // TODO: Создать метод перемотки вперед нразад по клику на кнопки data-skip






    static proVideoControlsTemplate(settings){
        return `
        <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="${settings.dafaultPlaybackrate || 1}">
        <button data-skip="${-settings.skipTime || -1}" class="player__button">« ${-settings.skipTime || -1}s</button>               
        <button data-skip="${settings.skipTime || 1}" class="player__button">${settings.skipTime || 1}s »</button>
      `;
    }

    static updateVideoPleerTemplate(settings){
        const template = VideoPleerPro.proVideoControlsTemplate(settings);
        document.querySelector(`${settings.videoPlayerContainer} .player__controls`).insertAdjacentHTML("beforeend", template);
    }
}


const mypleer2 = new VideoPleerPro({
    videoUrl: 'video/mov_bbb.mp4',
    videoPlayerContainer: `.myplayer2`,
    dafaultPlaybackrate: 0.1,
    skipTime: 2
}).init();
