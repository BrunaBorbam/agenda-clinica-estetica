# 📚 GUIA COMPLETO - COMO USAR SUA AGENDA

## 🚀 Começando (SUPER FÁCIL)

1. **Abra seu repositório no GitHub**: https://github.com/BrunaBorbam/agenda-clinica-estetica
2. **Clique em `index.html`**
3. **Clique no botão "Raw" (no topo direito)**
4. **Copie a URL que aparecer**
5. **Abra em seu navegador**

Ou mais fácil ainda: Acesse diretamente:
```
https://raw.githubusercontent.com/BrunaBorbam/agenda-clinica-estetica/main/index.html
```

---

## 🎯 Como Usar a Aplicação

### 1️⃣ ADICIONAR PROFISSIONAIS
- Vá para aba **"Profissionais"**
- Preencha:
  - Nome: `Maria Silva`
  - Especialidade: `Manicure`
  - Cor: `Escolha uma cor` (para identificar)
- Clique em **"➕ Adicionar"**

### 2️⃣ CRIAR AGENDAMENTOS
- Vá para aba **"Agendamentos"**
- Preencha:
  - Profissional: `Selecione um`
  - Nome do cliente: `João`
  - Telefone: `(11) 99999-9999`
  - Serviço: `Manicure` (ou escolha outro)
  - Data: `Clique para escolher`
  - Hora: `14:30`
  - Duração: `60` minutos
- Clique em **"✅ Agendar"**

### 3️⃣ VER CALENDÁRIO
- Vá para aba **"Calendário"**
- Escolha uma data
- Escolha um profissional (ou "Todos")
- Veja todos os agendamentos em forma visual!

---

## 💾 IMPORTANTE: DADOS

Seus dados são salvos **automaticamente** no navegador. Isso significa:

✅ **Pode fechar e abrir** que os dados continuam lá  
✅ **Não precisa criar conta**  
✅ **Funciona offline**  

⚠️ **ATENÇÃO:** Se limpar o histórico/cookies do navegador, os dados serão apagados!

---

## 🎨 COMO MODIFICAR

Todos os arquivos têm comentários explicando o que cada coisa faz:

- **`index.html`** - Estrutura (botões, campos de texto)
- **`styles.css`** - Aparência (cores, tamanhos)
- **`app.js`** - Lógica (como funciona)

Para modificar, é super simples:
1. Abra o arquivo no GitHub
2. Clique no ✏️ (editar)
3. Faça suas mudanças
4. Clique em "Commit changes"

---

## 🔧 EXEMPLOS DE MODIFICAÇÕES

### Mudar a cor do tema
Abra `styles.css` e procure:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Substitua os códigos de cor:
- `#667eea` = Azul (mude para `#FF69B4` = Rosa, por exemplo)
- `#764ba2` = Roxo

### Adicionar mais serviços
Abra `index.html` e procure:
```html
<option value="Manicure">Manicure</option>
<option value="Pedicure">Pedicure</option>
```

Adicione uma nova linha:
```html
<option value="Seu Serviço">Seu Serviço</option>
```

### Mudar o título
Abra `index.html` e procure:
```html
<h1>💅 Agenda Clínica de Estética</h1>
```

Mude para:
```html
<h1>💅 Agenda da Clínica da Bruna</h1>
```

---

## ❓ PERGUNTAS COMUNS

**P: Como compartilho com minha equipe?**  
R: Copie o link: `https://raw.githubusercontent.com/BrunaBorbam/agenda-clinica-estetica/main/index.html`  
Mande para seus profissionais. Todos verão a mesma agenda!

**P: Posso usar no celular?**  
R: SIM! A aplicação funciona em qualquer navegador, em qualquer dispositivo.

**P: Como faço backup dos dados?**  
R: Os dados ficam armazenados no navegador. Recomendo usar um banco de dados online (Firebase, por exemplo) para versão final.

**P: Posso adicionar clientes automaticamente?**  
R: Sim! No futuro podemos integrar com WhatsApp ou formulários online.

---

## 🎓 PRÓXIMOS PASSOS (QUANDO QUISER)

1. **Integrar com banco de dados** (Firebase)
2. **Criar app mobile** (React Native)
3. **Sistema de notificações** (SMS/WhatsApp)
4. **Recibos e comprovantes**
5. **Relatório de faturamento**

---

## 📞 PRECISA DE AJUDA?

Qualquer dúvida ou mudança que quiser fazer, é só me chamar! 🚀

---

**Desenvolvido com ❤️ para sua clínica!**
