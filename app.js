// ==========================================
// SISTEMA DE AGENDA CLÍNICA - LÓGICA PRINCIPAL
// ==========================================

// DADOS ARMAZENADOS NO NAVEGADOR
let profissionais = JSON.parse(localStorage.getItem('profissionais')) || [];
let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

// ==========================================
// FUNÇÃO: SALVAR DADOS NO NAVEGADOR
// ==========================================
function salvarDados() {
    localStorage.setItem('profissionais', JSON.stringify(profissionais));
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
}

// ==========================================
// FUNÇÃO: TROCAR ABAS
// ==========================================
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove a classe "active" de todas as abas
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));

        // Adiciona "active" na aba clicada
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');

        // Atualiza os dados quando entra na aba
        if (tabId === 'calendario') {
            mostrarCalendario();
        }
    });
});

// ==========================================
// FUNÇÃO: ADICIONAR PROFISSIONAL
// ==========================================
function adicionarProfissional() {
    const nome = document.getElementById('nomeProfissional').value.trim();
    const especialidade = document.getElementById('especialidade').value.trim();
    const cor = document.getElementById('corProfissional').value;

    // Validação
    if (!nome || !especialidade) {
        alert('❌ Por favor, preencha todos os campos!');
        return;
    }

    // Adiciona o profissional
    const profissional = {
        id: Date.now(),
        nome,
        especialidade,
        cor,
        dataCriacao: new Date().toLocaleDateString('pt-BR')
    };

    profissionais.push(profissional);
    salvarDados();

    // Limpa os campos
    document.getElementById('nomeProfissional').value = '';
    document.getElementById('especialidade').value = '';

    // Atualiza as listas
    mostrarProfissionais();
    atualizarSelectProfissionais();
    atualizarFilterProfissionais();

    alert('✅ Profissional adicionado com sucesso!');
}

// ==========================================
// FUNÇÃO: MOSTRAR LISTA DE PROFISSIONAIS
// ==========================================
function mostrarProfissionais() {
    const lista = document.getElementById('listaProfissionais');

    if (profissionais.length === 0) {
        lista.innerHTML = '<p class="texto-vazio">Nenhum profissional cadastrado ainda</p>';
        return;
    }

    lista.innerHTML = profissionais.map(prof => `
        <div class="item-profissional">
            <div style="display: flex; align-items: center; width: 100%;">
                <div class="cor-profissional" style="background-color: ${prof.cor}"></div>
                <div class="item-info" style="flex: 1;">
                    <h3>${prof.nome}</h3>
                    <p>🎯 Especialidade: ${prof.especialidade}</p>
                    <p>📅 Cadastrado em: ${prof.dataCriacao}</p>
                </div>
            </div>
            <div class="item-actions">
                <button class="btn btn-danger btn-small" onclick="deletarProfissional(${prof.id})">
                    🗑️ Deletar
                </button>
            </div>
        </div>
    `).join('');
}

// ==========================================
// FUNÇÃO: DELETAR PROFISSIONAL
// ==========================================
function deletarProfissional(id) {
    if (confirm('⚠️ Tem certeza que deseja deletar este profissional?')) {
        profissionais = profissionais.filter(p => p.id !== id);
        agendamentos = agendamentos.filter(a => a.profissionalId !== id);
        salvarDados();
        mostrarProfissionais();
        atualizarSelectProfissionais();
        atualizarFilterProfissionais();
        alert('✅ Profissional deletado!');
    }
}

// ==========================================
// FUNÇÃO: ATUALIZAR SELECT DE PROFISSIONAIS
// ==========================================
function atualizarSelectProfissionais() {
    const select = document.getElementById('selectProfissional');
    select.innerHTML = '<option value="">Selecione o profissional</option>' +
        profissionais.map(prof => `<option value="${prof.id}">${prof.nome} - ${prof.especialidade}</option>`).join('');
}

// ==========================================
// FUNÇÃO: ATUALIZAR FILTRO DE PROFISSIONAIS (CALENDÁRIO)
// ==========================================
function atualizarFilterProfissionais() {
    const select = document.getElementById('profissionalFiltro');
    select.innerHTML = '<option value="">Todos os profissionais</option>' +
        profissionais.map(prof => `<option value="${prof.id}">${prof.nome}</option>`).join('');
}

// ==========================================
// FUNÇÃO: CRIAR AGENDAMENTO
// ==========================================
function criarAgendamento() {
    const profissionalId = document.getElementById('selectProfissional').value;
    const nomeCliente = document.getElementById('nomeCliente').value.trim();
    const telefoneCliente = document.getElementById('telefoneCliente').value.trim();
    const tipoServico = document.getElementById('tipoServico').value;
    const data = document.getElementById('dataAgendamento').value;
    const hora = document.getElementById('horaAgendamento').value;
    const duracao = parseInt(document.getElementById('duracao').value) || 60;

    // Validação
    if (!profissionalId || !nomeCliente || !tipoServico || !data || !hora) {
        alert('❌ Por favor, preencha todos os campos!');
        return;
    }

    // Verifica se há conflito de horário
    const dataHora = new Date(`${data}T${hora}`);
    const dataHoraFim = new Date(dataHora.getTime() + duracao * 60000);

    const conflito = agendamentos.some(ag => {
        if (ag.profissionalId !== parseInt(profissionalId) || ag.data !== data) return false;
        const agDataHora = new Date(`${ag.data}T${ag.hora}`);
        const agDataHoraFim = new Date(agDataHora.getTime() + ag.duracao * 60000);
        return (dataHora < agDataHoraFim && dataHoraFim > agDataHora);
    });

    if (conflito) {
        alert('⚠️ Já existe um agendamento neste horário para este profissional!');
        return;
    }

    // Adiciona o agendamento
    const agendamento = {
        id: Date.now(),
        profissionalId: parseInt(profissionalId),
        nomeCliente,
        telefoneCliente,
        tipoServico,
        data,
        hora,
        duracao,
        dataCriacao: new Date().toLocaleDateString('pt-BR')
    };

    agendamentos.push(agendamento);
    salvarDados();

    // Limpa os campos
    document.getElementById('nomeCliente').value = '';
    document.getElementById('telefoneCliente').value = '';
    document.getElementById('tipoServico').value = '';
    document.getElementById('dataAgendamento').value = '';
    document.getElementById('horaAgendamento').value = '';

    mostrarAgendamentos();
    alert('✅ Agendamento criado com sucesso!');
}

// ==========================================
// FUNÇÃO: MOSTRAR LISTA DE AGENDAMENTOS
// ==========================================
function mostrarAgendamentos() {
    const lista = document.getElementById('listaAgendamentos');

    if (agendamentos.length === 0) {
        lista.innerHTML = '<p class="texto-vazio">Nenhum agendamento registrado</p>';
        return;
    }

    // Ordena por data e hora
    const agendamentosOrdenados = [...agendamentos].sort((a, b) => {
        const dateA = new Date(`${a.data}T${a.hora}`);
        const dateB = new Date(`${b.data}T${b.hora}`);
        return dateA - dateB;
    });

    lista.innerHTML = agendamentosOrdenados.map(ag => {
        const prof = profissionais.find(p => p.id === ag.profissionalId);
        const dataFormatada = new Date(ag.data + 'T00:00').toLocaleDateString('pt-BR');
        
        return `
            <div class="item-agendamento">
                <div style="display: flex; align-items: center; width: 100%;">
                    <div class="cor-profissional" style="background-color: ${prof?.cor || '#ccc'}"></div>
                    <div class="item-info" style="flex: 1;">
                        <h3>👤 ${ag.nomeCliente}</h3>
                        <p>💇 Profissional: ${prof?.nome || 'Desconhecido'}</p>
                        <p>✂️ Serviço: ${ag.tipoServico}</p>
                        <p>📅 Data: ${dataFormatada} | ⏰ Hora: ${ag.hora} | ⏱️ Duração: ${ag.duracao} min</p>
                        <p>📱 Telefone: ${ag.telefoneCliente}</p>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn btn-danger btn-small" onclick="deletarAgendamento(${ag.id})">
                        🗑️ Deletar
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ==========================================
// FUNÇÃO: DELETAR AGENDAMENTO
// ==========================================
function deletarAgendamento(id) {
    if (confirm('⚠️ Tem certeza que deseja deletar este agendamento?')) {
        agendamentos = agendamentos.filter(a => a.id !== id);
        salvarDados();
        mostrarAgendamentos();
        alert('✅ Agendamento deletado!');
    }
}

// ==========================================
// FUNÇÃO: MOSTRAR CALENDÁRIO
// ==========================================
function mostrarCalendario() {
    const data = document.getElementById('dataFiltro').value;
    const profissionalFiltro = document.getElementById('profissionalFiltro').value;
    
    // Se não houver data selecionada, usa hoje
    const dataParaMostrar = data || new Date().toISOString().split('T')[0];
    
    const agendamentosDodia = agendamentos.filter(ag => {
        const matching = ag.data === dataParaMostrar;
        if (!profissionalFiltro) return matching;
        return matching && ag.profissionalId === parseInt(profissionalFiltro);
    });

    let html = '<div class="timeline">';

    // Cria slots de hora em hora de 08:00 a 20:00
    for (let hora = 8; hora < 20; hora++) {
        const horaLabel = String(hora).padStart(2, '0') + ':00';
        html += `<div class="hora-bloco">
            <div class="hora-label">${horaLabel}</div>
            <div class="agenda-horas" id="hora-${hora}"></div>
        </div>`;
    }

    html += '</div>';
    document.getElementById('calendarioView').innerHTML = html;

    // Adiciona os agendamentos
    agendamentosDodia.forEach(ag => {
        const [horaStr, minStr] = ag.hora.split(':');
        const hora = parseInt(horaStr);
        const min = parseInt(minStr);
        
        const prof = profissionais.find(p => p.id === ag.profissionalId);
        
        // Calcula a posição e altura no calendário
        const top = (min / 60) * 60;
        const height = (ag.duracao / 60) * 60;

        const bloco = document.createElement('div');
        bloco.className = 'bloco-agendamento';
        bloco.style.backgroundColor = prof?.cor || '#667eea';
        bloco.style.top = top + 'px';
        bloco.style.height = height + 'px';
        bloco.style.width = '95%';
        bloco.title = `${ag.nomeCliente} - ${ag.tipoServico}`;
        bloco.innerHTML = `<strong>${ag.nomeCliente}</strong><br/>${ag.tipoServico}`;

        document.getElementById(`hora-${hora}`).appendChild(bloco);
    });
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================
window.addEventListener('load', function() {
    mostrarProfissionais();
    atualizarSelectProfissionais();
    atualizarFilterProfissionais();
    mostrarAgendamentos();

    // Atualiza calendário quando muda filtros
    document.getElementById('dataFiltro').addEventListener('change', mostrarCalendario);
    document.getElementById('profissionalFiltro').addEventListener('change', mostrarCalendario);

    // Define data de hoje no calendário
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('dataFiltro').value = hoje;
});

// ==========================================
// FUNÇÃO: LIMPAR TODOS OS DADOS (SOMENTE PARA TESTES)
// ==========================================
function limparTodosDados() {
    if (confirm('⚠️ ATENÇÃO! Isso vai deletar TODOS os dados. Tem certeza?')) {
        profissionais = [];
        agendamentos = [];
        salvarDados();
        location.reload();
    }
}
