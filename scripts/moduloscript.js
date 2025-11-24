const params = new URLSearchParams(window.location.search);
const curso = params.get("curso");
const modulo = params.get("modulo");
const gambiarra = params.get("gambiarra") != null ? params.get("gambiarra") : 0;

fetch('../json/' + curso + '/' + modulo + '/file.json')
        .then(response => response.json())
        .then(data => {
            handleData(data);
        })
        .catch(error => {
            console.error('Erro ao carregar o json: ' + '../json/' + curso + '/' + modulo + '/file.json')
        });

function handleData(data) {
    document.getElementById('top-title').innerText = data.name;
    document.title = data.name;

    for(let i=0; i<data.classes.length; i++) {
        const classs = data.classes[i];
        const li = document.getElementById('module-' + (i+1));
        li.getElementsByClassName('div-title')[0].innerText = classs.name;
        li.getElementsByClassName('info')[0].innerHTML = '<p>' + classs.description + '</p>';
        li.getElementsByClassName('percentage')[0].innerText = gambiarra + '%';
        li.getElementsByClassName('module-button')[0].addEventListener('click', (e) => window.location.href = 'aula.html?curso=' + curso + '&modulo=' + modulo + '&aula=' + classs.path + '&gambiarra=' + gambiarra);
    }

    if (gambiarra == 100) {
        document.getElementById('module-1').getElementsByTagName('img')[0].src = '../images/books/Clear-Book.png';
    }
}

document.getElementById('back-button').addEventListener('click', (e) => window.location.href = 'curso.html?curso=' + curso);