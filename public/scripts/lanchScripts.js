const formLanche = document.getElementById('form-lanche');
const mensagem = document.getElementById('mensagem');
const mensagemLanche = document.createElement('p');
formLanche.appendChild(mensagemLanche); 


const enviarLanche = async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const ingredientes = document.getElementById('ingredientes').value.trim();

  if (!nome || !ingredientes) return;

  try {
    const res = await fetch('/api/lanches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, ingredientes })
    });

    if (!res.ok) {
      const erro = await res.json();
      throw new Error(erro.error || 'Erro ao adicionar lanche');
    }

    mensagemLanche.textContent = 'Lanche adicionado com sucesso!';
    mensagemLanche.style.color = 'green';

    formLanche.reset();
    carregarLanches();

  } catch (err) {
    mensagemLanche.textContent = 'Erro ao adicionar lanche';
    mensagemLanche.style.color = 'red';
    console.error(err);
  }
};

formLanche.addEventListener('submit', enviarLanche);


//-------------LÓGICA DE ENVIO DE LANCHES-(POST)-----------👆🏻

// ----------- JÓGICA DE CARREGAMENTO DE LANCHES--------👇🏻


const carregarLanches = async () => {
  fetch('/api/lanches')
    .then(response => response.json())
    .then(lanches => {
        const lista = document.getElementById('lista-lanches');
        lista.innerHTML = '';
        lanches.forEach(lanche => {
            //console.log(`Dados recebidos: ${lanches}`)
            const li = document.createElement('li');
            li.innerHTML = `<strong>${lanche.nome}</strong><br /><span class="ingredients">${lanche.ingredientes}</span>`;
            lista.appendChild(li);
  });
  })
  .catch(err => {
  console.error('Erro ao carregar os lanches:', err);
  });
}

carregarLanches();

// -------------LÓGICA DE SUGESTÃO DE LANCHES --------- 👇🏻


const formSugestao = document.getElementById('form-sugestao');

if (formSugestao) {
  formSugestao.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome-sugestao').value.trim();
    const ingredientes = document.getElementById('ingredientes-sugestao').value.trim();

    if (!nome || !ingredientes) return;

    try {
      const res = await fetch('/sugestao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, ingredientes })
      });

      if (!res.ok) {
        const erro = await res.json();
        throw new Error(erro.error || 'Erro ao enviar sugestão');
      }
      
      localStorage.setItem('ultimaSugestao', JSON.stringify({ nome, ingredientes }));
      window.location.href = '/sugestao';
    } catch (err) {
      alert(`Erro: ${err.message}`);
      console.error(err);
    }
  });
}




