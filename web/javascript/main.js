/**
 * Copyright © Dave Perrett, Malcolm Jarvis and Artem Vorotnikov
 *
 * This file is licensed under the GPLv2.
 * http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 */

function main() {
    // IE specific fixes here
    if (jQuery.browser.msie) {
        try {
            document.execCommand("BackgroundImageCache", false, true);
        } catch (err) {};
    };

    if (jQuery.browser.safari) {
        // Move search field's margin down for the styled input
        document.getElementById("torrent_search").style["margin-top"] = 3;
    };

    if (isMobileDevice) {
        window.onload = function () {
            setTimeout(function () {
                window.scrollTo(0, 1);
            }, 500);
        };
        window.onorientationchange = function () {
            setTimeout(function () {
                window.scrollTo(0, 1);
            }, 100);
        };
        if (window.navigator.standalone) {
            // Fix min height for isMobileDevice when run in full screen mode from home screen
            // so the footer appears in the right place
            document.getElementById("torrent_container").style["min-height"] = "338px";
        };
        document.querySelector("label[for=torrent_upload_url]").textContent("URL: ");
    } else {
        // Fix for non-Safari-3 browsers: dark borders to replace shadows.
        Array.from(document.getElementsByClassName("dialog_window")).forEach(function (e) {
            e.style["border"] = "1px solid #777";
        });
    };

    // Initialise the dialog controller
    dialog = new Dialog();

    // Initialise the main Transmission controller
    transmission = new Transmission();
    
    
    // Set magnet: protocol handler
    if (window.navigator.registerProtocolHandler) {

        window.navigator.registerProtocolHandler('magnet', window.location.origin + '/transmission/web/#magnet=%s', 'Transmission Web');

        var magnet = /#magnet=(.*)/.exec(window.location.href);
        if (magnet) {
            magnet = decodeURIComponent(magnet[1]);
            transmission.uploadTorrentFile();
            $('input#torrent_upload_url').attr('value', magnet);
            window.location.replace("#");
        }
    }

};

document.addEventListener("DOMContentLoaded", main);
