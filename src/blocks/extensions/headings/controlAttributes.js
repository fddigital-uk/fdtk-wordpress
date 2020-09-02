import { __ } from "@wordpress/i18n";

export const headingControlOptions = [
    {
        label: __('Normal'),
        value: ''
    },
    {
        label: __('Standout - Self'),
        value: 'h-big-self'
    },
    {
        label: __('Standout - All Headings Contained'),
        value: 'h-big-all'
    },
]

export const addHeadingControlAttribute = (settings, name) => {
    settings.attributes = {
        ...(settings.attributes) ? settings.attributes : {},
        headingOption: {
            type: 'string',
            default: headingControlOptions[0].value
        }
    }

    return settings;
};

