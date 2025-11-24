const params = new URLSearchParams(window.location.search);
const curso = params.get("curso");
const modulo = params.get("modulo");
const aula = params.get("aula");
const gambiarra = params.get("gambiarra");

fetch('../json/' + curso + '/' + modulo + '/' + aula + '/file.json')
        .then(response => response.json())
        .then(data => {
            handleData(data);
        })
        .catch(error => {
            console.error('../json/' + curso + '/' + modulo + '/' + aula + '/file.json')
        });

const videoDiv = document.getElementsByClassName('video-div')[0];
const videoButton = document.getElementById('explanation-button');
const quizDiv = document.getElementsByClassName('quiz-div')[0];
const quizButton = document.getElementById('quiz-button');

let acertos = 0;
let errou = false;

function handleData(data) {
    document.title = data.name;
    document.getElementById('video-iframe').src = data.link;
    quizButton.addEventListener('click', () => {
        videoDiv.style.display = 'none';
        videoButton.classList = '';
        quizDiv.style.display = 'block';
        quizButton.classList = 'selected';
    });
    videoButton.addEventListener('click', () => {
        videoDiv.style.display = 'block';
        videoButton.classList = 'selected';
        quizDiv.style.display = 'none';
        quizButton.classList = '';
    });

    showQuiz(data, 0);
}

document.getElementById('back-button').addEventListener('click', () => window.location.href = 'modulo.html?curso=' + curso + '&modulo=' + modulo + '&gambiarra=' + gambiarra);

function showQuiz(data, index) {
    errou = false;
    document.getElementById('quiz-pergunta').innerText = 'Pergunta ' + (index + 1);
    document.getElementById('quiz-texto').innerText = data.perguntas[index].texto
    const alternativasL = document.getElementById('quiz-alternativas').getElementsByTagName('label');
    const alternativasI = document.getElementById('quiz-alternativas').getElementsByTagName('input');
    for(let i=0; i<5; i++) {
        alternativasI[i].checked = false;
        alternativasL[i].style.textDecoration = 'none'
        alternativasL[i].style.color = '#181818'
        alternativasI[i].disabled = false;
        alternativasL[i].innerText = data.perguntas[index].alternativas[i];
    }

    function handleAnswer() {
        let element = document.querySelector('input[name="pergunta"]:checked');
        if (element == null)
            return;

        if (element.value == data.perguntas[index].correto) {
            document.getElementById('quiz-pronto').removeEventListener('click', handleAnswer);

            if (errou == false)
                acertos++;

            if (data.perguntas.length > index + 1) {
                showQuiz(data, index + 1);
            } else {
                handleConclusion(data);
            }
        } else {
            errou = true;
            element.checked = false;
            element.parentElement.getElementsByTagName('label')[0].style.textDecoration = 'line-through'
            element.parentElement.getElementsByTagName('label')[0].style.color = 'red'
            element.disabled = true;
        }
    }

    document.getElementById('quiz-pronto').addEventListener('click', handleAnswer);
}

function handleConclusion(data) {
    document.getElementsByClassName('perguntas-div')[0].style.display = 'none';
    document.getElementsByClassName('conclusao-div')[0].style.display = 'flex';
    document.getElementsByClassName('conclusao-div')[0].getElementsByTagName('h1')[0].innerText = acertos + '/' + data.perguntas.length;
    document.getElementsByClassName('conclusao-div')[0].getElementsByTagName('button')[0].addEventListener('click', () => window.location.href = 'modulo.html?curso=' + curso + '&modulo=' + modulo + '&gambiarra=' + Math.max(Math.floor(100 * acertos / data.perguntas.length), parseInt(gambiarra)));
}