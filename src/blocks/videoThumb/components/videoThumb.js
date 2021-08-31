const YouTubeVideoThumb = props => {
    const {
        title,
        videoId
    } = props;

    return <iframe
        className="videothumb__iframe"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&showinfo=1&fs=1&wmode=transparent`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
    />
};

const VimeoVideoThumb = props => {
    const {
        title,
        videoId
    } = props;

    return <iframe
        className="videothumb__iframe"
        src={`https://player.vimeo.com/video/${videoId}`}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen/>
}

const VideoThumb = props => {
    return <div className="videothumb__container">
        {props.source === "youtube" && <YouTubeVideoThumb {...props} />}
        {props.source === "vimeo" && <VimeoVideoThumb {...props} />}
    </div>
};

export default VideoThumb;
