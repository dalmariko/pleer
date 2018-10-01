class VideoPlayerBasic {
    constructor(settings) {
        this._settings = Object.assign(VideoPlayerBasic.getDefaultsettings(), settings);
    }


    //Производим проверку на наличие критических свойств.
    //Произвоидм запуск методов инициализации разметки и eventos.
    //Возвращаем публичные методы.
    init() {
        if (!this._settings.videoUrl) return console.error("Пожалуйста задайте адрес видео");
        if (!this._settings.videoPlayerContainer) return console.error("Пожалуйста задайте контейнер видео");



       VideoPlayerBasic.addTemplate(this._settings);
        this._video=document.querySelector(`${this._settings.videoPlayerContainer} .player__video`);

        this._togleBtn = document.querySelector(`${this._settings.videoPlayerContainer} .toggle`);

        this._progressFilled = document.querySelector(`${this._settings.videoPlayerContainer} .progress__filled`);

       this._setEvents();

        return this;
        // is.video.paused ? ;
    }

    toggle(e){
        const method = this._video.paused?'play':'pause';
        this._togleBtn.textContent = this._video.paused?'❚ ❚' : '►';
        this._video[method]();
    }


    _handleProgress(e){
           const present = (this._video.currentTime / this._video.duration) * 100;
           this._progressFilled.style.flexBasis =`${ present }%`;
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


     _setEvents(){
        this._video.addEventListener('click',e=>this.toggle(e));
        this._togleBtn.addEventListener('click',e=>this.toggle(e));
        this._video.addEventListener('timeupdate',e=>this._handleProgress(e));
    }

    static addTemplate(settings){
        const template = VideoPlayerBasic.template(settings);
        document.querySelector(settings.videoPlayerContainer).insertAdjacentHTML('afterbegin',template);
    }

    static template(settings) {

        const videoTemplate = `<video class="player__video viewer" src="${settings.videoUrl}"> </video>`;

        const controlsTemplate = `<div class="player__controls">
       
       <div class="progress">
             <div class="progress__filled"></div>
       </div>
       
       <button class="player__button toggle" title="Toggle Play">►</button>
       
       <input type="range" name="volume" class="player__slider" min=0 max="1" step="0.05" value="1">
       <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
       
       <button data-skip="-1" class="player__button">« 1s</button>
       <button data-skip="1" class="player__button">1s »</button>
       
     </div>`;

        return `${videoTemplate}${settings.controls?controlsTemplate:''}`;
    }


    static getDefaultsettings() {
        /*
         * Список настроек
         * - адрес видео
         * - тип плеера "basic","pro"
         * - controls: - true , false
         * - loop: повторять или нет видео true,false
         * - volume: 0 - 1
         * */

        return {
            videoUrl: '',
            videoPlayerContainer: '.myplayer',
            plaerType: 'basic',
            controls: 'true',
            loop: false,
            volume: 1
        }
    }
}

const mypleyer = new VideoPlayerBasic(
    {
        videoUrl: 'video/mov_bbb.mp4',
        videoPlayerContainer: '.player'
    }
).init();

