import '../styles/player-modal.styl';

export default ({ video, hideModal }) => (
    <div className="playermodal-main" onClick={ hideModal }>
        <div className="video-container">
            <iframe
                className="video"
                src={ "https://www.youtube.com/embed/" + video }
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
            ></iframe>
        </div>
    </div>
);