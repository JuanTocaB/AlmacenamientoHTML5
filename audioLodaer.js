import audioFiles from './audioFiles.json' assert {type: 'json'};

var btn = document.getElementById('audios');
btn.addEventListener('click', loadAudioFiles);



function loadAudioFiles() {
    var audios = audioFiles.audios;
    var audioDiv = document.getElementById('audioList');

    for (var i = 0; audios[i] != null; i++) {
        var div = document.createElement('div');
        var h2 = document.createElement('h2');
        var br = document.createElement('br');
        var a = document.createElement('a');

        a.innerHTML = `<a href = "#" onclick ="playPodcast('${audios[i].nombre}', '${audios[i].Descripción}', '${audios[i].path}')">Play</a>`

        h2.innerHTML = audios[i].nombre;

        div.appendChild(h2);
        div.appendChild(br);
        div.appendChild(a);

        audioDiv.appendChild(div);
        
        btn.remove();
    }    

}

