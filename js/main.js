/**
 * Created by sy on 16/6/14.
 */
function init() {
    document.addEventListener('DOMContentLoaded', function () {
        var json_xhr = new XMLHttpRequest();
        json_xhr.open("GET", "../data/info.json", true);
        json_xhr.onload = function () {
            if (json_xhr.status == 200) {
                var result = JSON.parse(json_xhr.responseText);
                var mark_xhr = new XMLHttpRequest();
                mark_xhr.open("GET", "../res/mark.svg", true);
                mark_xhr.onload = function () {
                    if (mark_xhr.status == 200) {
                        for (var i = 0; i < result.skills.length; i++) {
                            var skill = result.skills[i];
                            var skill_row = document.createElement("div");
                            var skill_name = document.createElement("div");
                            var svg_document=mark_xhr.responseXML.cloneNode(true);
                            var skill_score = svg_document.documentElement;
                            skill_row.className = "skill-row";
                            skill_name.className = "skill-name";
                            skill_name.innerHTML = skill.name;
                            skill_score.className.baseVal = "skill-score";
                            svg_document.getElementById("score").setAttribute("width", skill.score);
                            skill_row.appendChild(skill_name);
                            skill_row.appendChild(skill_score);
                            document.getElementById("skills").appendChild(skill_row);
                        }
                    }
                };
                mark_xhr.send();
                loadsvg(result.communication);
                document.getElementById("name").innerHTML = result.name;
                document.getElementById("title").innerHTML = result.title;


                function loadsvg(communication){
                    if(communication.length>0) {
                        var icon_xhr = new XMLHttpRequest();
                        icon_xhr.open("GET", "../res/"+communication[0].icon);
                        icon_xhr.onload = function () {
                            if (icon_xhr.status == 200) {
                                var communication_row = document.createElement("div");
                                var communication_text = document.createElement("div");
                                var communication_icon = icon_xhr.responseXML.documentElement;
                                communication_text.innerHTML = communication[0].info;
                                communication_text.className = "communication-text";
                                communication_icon.className.baseVal = "communication-icon";
                                communication_row.classList = "communication-row";
                                communication_row.appendChild(communication_icon);
                                communication_row.appendChild(communication_text);
                                document.getElementById("communications").appendChild(communication_row);
                                loadsvg(communication.slice(1,communication.length));
                            }
                        };
                        icon_xhr.send();
                    }
                }
            }
        };
        json_xhr.send();
    });
}

init();

