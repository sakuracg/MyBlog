export default function _isMobile () {
    return (/Android|webOS|iPhone|iPod|BlackBerry/i).test(navigator.userAgent)
}