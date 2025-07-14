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
  
  contatoForm.addEventListener('submit', enviarContato);
