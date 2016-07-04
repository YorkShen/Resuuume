/**
 * Created by sy on 16/6/14.
 */
init();

function init() {
    document.addEventListener('DOMContentLoaded', function () {
        set_min_viewport();
    });
}

function set_min_viewport() {
    window.onload = function () {
        var vp = document.getElementById("vp");
        if (screen.width < 320) {
            vp.setAttribute("content", "width=320, initial-scale=1");
        }
        else {
            vp.setAttribute("content", "width=device-width, initial-scale=1");
        }
    };
}

