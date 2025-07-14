const enviarContato = async (e) => {
    e.preventDefault();
  
    const contatoForm = document.getElementById('contatoForm');
    const mensagemContato = document.createElement('p');
    contatoForm.appendChild(mensagemContato);
  
    const formData = new FormData(contatoForm);
    const nome = formData.get('nome').trim();
    const email = formData.get('email').trim();
    const assunto = formData.get('assunto').trim();
    const mensagem = formData.get('mensagem').trim();
  
    if (!nome || !email || !assunto || !mensagem) return;
  
    try {
      const res = await fetch('/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, assunto, mensagem })
      });
  
      if (!res.ok) {
        const erro = await res.json();
        throw new Error(erro.error || 'Erro ao enviar contato');
      }
  
      mensagemContato.textContent = 'Mensagem enviada com sucesso!';
      mensagemContato.style.color = 'green';
      contatoForm.reset();
  
    } catch (err) {
      mensagemContato.textContent = `Erro ao enviar mensagem`;
      mensagemContato.style.color = 'red';
      console.error(err);
    }
  };
  
const contatoForm = document.getElementById('contatoForm');
if (contatoForm) {
  contatoForm.addEventListener('submit', enviarContato);
}

const listaContainer = document.getElementById('lista-contatos');
const mensagemInicial = document.getElementById('mensagem');

if (listaContainer) {
  fetch('/contato/json')
    .then(res => res.json())
    .then(contatos => {
      if (!contatos.length) {
        mensagemInicial.textContent = 'Nenhum contato foi enviado ainda.';
        return;
      }

      mensagemInicial.remove();

      contatos.forEach(contato => {
        const div = document.createElement('div');
        div.classList.add('sugestao', 'mb-8');

        const titulo = document.createElement('h2');
        titulo.textContent = 'Detalhes do Contato:';
        titulo.classList.add('mb-5');
        div.appendChild(titulo);

        for (const chave in contato) {
          const p = document.createElement('p');
          p.innerHTML = `<strong>${chave.charAt(0).toUpperCase() + chave.slice(1)}:</strong> <span>${contato[chave]}</span>`;
          div.appendChild(p);
        }

        listaContainer.appendChild(div);
      });
    })
    .catch(err => {
      console.error(err);
      mensagemInicial.textContent = 'Erro ao carregar contatos.';
    });
}

