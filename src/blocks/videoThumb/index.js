import "./styles/editor.scss";
import "./styles/style.scss";
import EditVideoThumb from "./components/edit";
import VideoThumb from "./components/videoThumb";

wp.blocks.registerBlockType("fractaldimensions/video-thumb", {
    title: "FD - Video (with Thumbnail)",
    icon: "video",
    category: "fractaldimensions",
    attributes: {
        source: {
            type: "string",
            default: "youtube",
        },
        title: {
            type: "string",
        },
        videoId: {
            type: "string",
        },
        videoUrl: {
            type: "string",
        }
    },
    edit: function (props) {
        return <EditVideoThumb {...props} />
    },
    save: function (props) {
        return <VideoThumb {...props.attributes} />
    },
});
