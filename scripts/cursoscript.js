const params = new URLSearchParams(window.location.search);
const curso = params.get("curso");

fetch('../json/' + curso + '/file.json')
        .then(response => response.json())
        .then(data => {
            handleData(data);
        })
        .catch(error => {
            console.error('Erro ao carregar o json: ' + '../json/' + curso + '/file.json')
        });

function handleData(data) {
    document.getElementById('top-title').innerText = data.name;
    document.title = data.name;

    for(let i=0; i<data.modules.length; i++) {
        const module = data.modules[i];
        const li = document.getElementById('module-' + (i+1));
        li.getElementsByClassName('div-title')[0].innerText = module.name;
        li.getElementsByClassName('info')[0].innerHTML = '<p>' + module.description + '</p>';
        li.getElementsByClassName('module-button')[0].addEventListener('click', (e) => window.location.href = 'modulo.html?curso=' + curso + '&modulo=' + module.path);
    }
}

document.getElementById('back-button').addEventListener('click', (e) => window.location.href = 'index.html')