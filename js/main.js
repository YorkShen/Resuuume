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
                mark_xhr.onload = load_skill(mark_xhr, result.skills);
                mark_xhr.send();
                load_svg(result.communication);
                document.getElementById("name").innerHTML = result.name;
                document.getElementById("title").innerHTML = result.title;
                load_content(result.biography);
            }
        };
        json_xhr.send();
    });
}

function load_svg(communication) {
    if (communication.length > 0) {
        var icon_xhr = new XMLHttpRequest();
        icon_xhr.open("GET", "../res/" + communication[0].icon);
        icon_xhr.onload = function () {
            if (icon_xhr.status == 200) {
                var communication_row = document.createElement("div");
                var communication_text = document.createElement("div");
                var communication_icon = icon_xhr.responseXML.documentElement;
                communication_text.innerHTML = communication[0].info;
                communication_text.className = "communication-text";
                communication_icon.className.baseVal = "communication-icon";
                communication_row.className = "communication-row";
                communication_row.appendChild(communication_icon);
                communication_row.appendChild(communication_text);
                document.getElementById("communications").appendChild(communication_row);
                load_svg(communication.slice(1, communication.length));
            }
        };
        icon_xhr.send();
    }
}

function load_skill(mark_xhr, skills) {
    return function () {
        if (mark_xhr.status == 200) {
            for (var i = 0; i < skills.length; i++) {
                var skill = skills[i];
                var skill_row = document.createElement("div");
                var skill_name = document.createElement("div");
                var svg_document = mark_xhr.responseXML.cloneNode(true);
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
}

function load_content(biography) {
    var i, j, k;
    for (i = 0; i < biography.length; i++) {
        var section_div = document.createElement("div");
        var main_title = document.createElement("div");
        main_title.innerHTML = biography[i].title;
        main_title.className = "main_title";
        section_div.appendChild(main_title);
        for (j = 0; j < biography[i].content.length; j++) {
            var item = document.createElement("div");
            var sub_title = document.createElement("a");
            sub_title.innerHTML = biography[i].content[j].sub_title;
            sub_title.classList.add("sub_title");
            if (biography[i].content[j].link) {
                sub_title.setAttribute("href", biography[i].content[j].link);
            }
            item.className="item";
            item.appendChild(sub_title);
            for (k = 0; k < biography[i].content[j].items.length; k++) {
                if(biography[i].content[j].items[k].duration) {
                    var duration = document.createElement("div");
                    duration.className = "hint";
                    duration.innerHTML = biography[i].content[j].items[k].duration;
                    item.appendChild(duration);
                }
                if(biography[i].content[j].items[k].description){
                    var description=document.createElement("div");
                    description.className="main_text";
                    description.innerHTML=biography[i].content[j].items[k].description;
                    item.appendChild(description);
                }
            }
            section_div.appendChild(item);
        }
        document.getElementById("content").appendChild(section_div);
    }
}


init();

