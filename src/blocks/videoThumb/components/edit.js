import VideoThumb from "./videoThumb";
import {__} from "@wordpress/i18n";
import {InspectorControls} from "@wordpress/block-editor";
import {PanelBody, TextControl} from "@wordpress/components";

const getVideoIdFromUrl = (url, source) => {
    switch (source) {
        case "youtube":
            const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            const match = url.match(regExp);
            return (match && match[7].length === 11) ? match[7] : "";
        case "vimeo":
            const vimeoReg = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/
            const parseUrl = vimeoReg.exec(url)
            console.dir(parseUrl);
            return parseUrl && parseUrl.length >= 6 ? parseUrl[5] : "";
        default:
            return null
    }
};

const getSourceFromUrl = url => {
    if(url.match(/(https|http):\/\/([\w]*.)*(youtube.com|youtu.be)\//) !== null) {
        return "youtube";
    }

    if(url.match(/(https|http):\/\/([\w]*.)*(vimeo.com)\//) !== null) {
        return "vimeo";
    }
}

const EditVideoThumb = props => {
    const {
        attributes: {
            source = "",
            title,
            videoId = "",
            videoUrl,
        },
        setAttributes
    } = props;

    const setVideoUrl = value => {
        const newSource = getSourceFromUrl(value);
        const videoId = getVideoIdFromUrl(value, newSource);
        setAttributes({videoUrl: value, videoId, source: newSource});
    }

    return [
        <InspectorControls key="videothumb-inspector">
            <PanelBody
                title={__("Options")}
                initialOpen={true}>
                <TextControl
                    label={__("Video URL")}
                    value={videoUrl}
                    onChange={setVideoUrl}
                />
            </PanelBody>
        </InspectorControls>,
        <>
            {(source.length === 0 || videoId.length === 0) && <div>Please select video source and URL in the settings panel</div>}
            {source.length > 0 && videoId.length > 0 && <VideoThumb {...props.attributes} />}
        </>
    ];
};

export default EditVideoThumb;
