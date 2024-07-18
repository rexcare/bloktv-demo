const HDMI_COMMAND = "python OCR/live_detection.py"

const STREAM_COMMAND= "/bin/sh /home/bloktv/alt_key.sh"

const USB_COMMAND= '/bin/sh /home/ydeng/Documents/'

const HOME_ICONS_URLS = {
    youtube: 'https://www.youtube.com',
    spotify:'https://open.spotify.com',
    hulu:'https://www.hulu.com/',
    primevideo:'https://www.primevideo.com/',
    tubi:'https://tubitv.com/',
    netflix:'https://www.netflix.com/',
}

module.exports = {
    HOME_ICONS_URLS,
    HDMI_COMMAND,
    STREAM_COMMAND,
    USB_COMMAND
}
