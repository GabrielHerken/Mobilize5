let botoes = Array.from(document.getElementsByClassName('curso-botao'));

botoes.forEach(botao => {
    botao.addEventListener('click', (e) => buttonHandler(botao.id))
});

function buttonHandler(id) {
    window.location.href = 'curso.html?curso=' + id;
}