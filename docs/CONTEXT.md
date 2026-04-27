# Rumo — Sistema Operacional do Instrutor
### Documento de contexto do projeto · versão 1.0

> Este arquivo deve ser lido antes de qualquer tarefa de desenvolvimento. Ele contém o contexto completo de negócio, produto, arquitetura e identidade visual do Rumo. Quando houver dúvida sobre uma decisão, consulte este documento antes de perguntar.

---

## 1. O Negócio

### O que é o Rumo
O Rumo é um SaaS B2B mobile-first para instrutores autônomos de trânsito no Brasil. É o "Sistema Operacional" do instrutor — uma ferramenta única que substitui caderno, WhatsApp desorganizado e planilha, profissionalizando a operação do negócio.

### A ruptura que criou o mercado
Em dezembro de 2025, o Contran publicou a **Resolução 1.020/2025** que acabou com a obrigatoriedade das autoescolas para tirar CNH. O candidato pode agora contratar um instrutor autônomo credenciado diretamente pelo Detran. Isso criou uma nova categoria profissional — o instrutor independente — sem nenhuma ferramenta de gestão disponível para ele.

Em 27 de abril de 2026, o governo federal lançou a **"Jornada do Instrutor"** dentro do app CNH do Brasil, uma plataforma de geolocalização que conecta alunos a instrutores autônomos. Isso resolve o problema de captação de alunos — e deixa o problema de gestão completamente em aberto. **Esse é exatamente o espaço que o Rumo ocupa.**

### Posicionamento
> *"Do caderno ao negócio de verdade."*

O Rumo não compete com o governo — ele complementa. O governo resolve a descoberta do instrutor. O Rumo resolve tudo que vem depois: agenda, confirmação, registro, cobrança, financeiro.

### O problema que resolvemos
O instrutor autônomo hoje:
- Agenda pelo WhatsApp e perde mensagens
- Sofre com no-show (aluno que não aparece) — prejuízo direto em hora bloqueada
- Não sabe quanto ganhou no mês
- Cobra o aluno com constrangimento
- Perde o histórico do aluno quando ele some por meses

---

## 2. Usuário

### Perfil do instrutor autônomo
- **Idade:** 25–50 anos
- **Dispositivo:** celular o dia todo, dentro do carro
- **Repertório digital:** WhatsApp, Instagram, talvez iFood — nada mais sofisticado
- **Jornada:** entre 5 e 20 aulas práticas por semana
- **Modelo de cobrança atual:** Pix na hora ou dinheiro, sem controle
- **Maior dor operacional:** no-show e falta de controle financeiro

### Como ele usa o produto
O instrutor **não vai abrir um laptop**. Tudo acontece no celular, entre aulas, no pátio do Detran, esperando o aluno. A interface deve funcionar com uma mão, com o sol batendo na tela, em 30 segundos de interação.

### Canais de contato com o produto
1. **PWA instalado na tela inicial** — acesso direto, como qualquer app
2. **WhatsApp** — canal de entrega dos lembretes, cobranças e resumos. O instrutor recebe valor pelo WhatsApp antes mesmo de abrir o app

---

## 3. Produto

### Tagline
> *"Do caderno ao negócio de verdade."*

### Sequência de construção (não inverter essa ordem)
```
Fase 1 — MVP:        Resolver a dor (agenda, lembrete, CRM, cobrança)
Fase 2 — MLP:        Criar vínculo emocional (identidade profissional, resumo semanal)
Fase 3 — Gamificação: Criar hábito (streak, metas, progresso do aluno)
```

### Funcionalidades do MVP

| Funcionalidade | Descrição | Plano |
|---|---|---|
| Agenda inteligente | Link de agendamento público do instrutor. Aluno escolhe horário disponível | Free |
| Lembrete automático | WhatsApp automático 24h antes da aula via Z-API | Premium |
| CRM de alunos | Cadastro, histórico de aulas, progresso de CNH (etapas) | Free (básico) / Premium (completo) |
| Cobrança automática | Pix com aviso automático após a aula | Premium |
| Dashboard financeiro | Receita do mês, a receber, projeção | Premium |
| Follow-up automático | Mensagem quando aluno some por X dias sem agendar | Premium |

### Modelo de monetização — Freemium

| Plano | Preço | O que inclui |
|---|---|---|
| Free | R$ 0 | Agenda básica + cadastro de alunos |
| Premium | R$ 39,90–49,90/mês | Tudo do free + automações WhatsApp + financeiro + cobrança |

**Lógica do freemium:** o plano free substitui o caderno. O premium monetiza o que já convenceu — automações que economizam tempo e geram dinheiro.

**Break-even de infra:** 8 instrutores pagantes cobrem o custo mensal de infraestrutura (~R$ 300/mês).

### Fora do escopo do MVP
- Captação de alunos (o governo resolve via Jornada do Instrutor)
- Funcionalidades pedagógicas (como ensinar)
- App nativo iOS/Android (é PWA)
- Marketplace ou rede social entre instrutores

### Estratégia de crescimento (Go-to-Market)
1. **Cavalo de Troia:** o instrutor compartilha o link de agendamento com a marca Rumo, gerando curiosidade em alunos e outros instrutores
2. **Member-get-member:** instrutor indica colega e ganha meses de Premium
3. **Resumo Matinal:** todo domingo, card com desempenho da semana enviado pelo WhatsApp — cria hábito diário

---

## 4. Arquitetura Técnica

### Stack

| Camada | Tecnologia | Função |
|---|---|---|
| Frontend + API | **Next.js** (App Router) | Framework fullstack — frontend PWA + API Routes no mesmo repositório |
| Deploy | **Vercel** | CI/CD automático, edge functions, domínio |
| Banco de dados | **Supabase** | PostgreSQL + autenticação + storage |
| Cache / Jobs | **Upstash** | Redis serverless — fila de lembretes e cache |
| WhatsApp | **Z-API** | Envio de lembretes, cobranças e resumos (~R$ 70/mês) |
| Pagamentos | **Stripe** | Assinaturas free → premium, webhooks |
| E-mails | **Resend** | E-mails transacionais (boas-vindas, recibos) |
| Autenticação | **NextAuth** | Login e sessão do instrutor |

### Estrutura de pastas esperada
```
/app
  /api              → API Routes do Next.js (lógica de negócio)
  /(auth)           → Páginas de login/cadastro
  /(dashboard)      → Área logada do instrutor
  /agenda/[slug]    → Página pública de agendamento do instrutor
/components         → Componentes reutilizáveis
/lib
  supabase.ts       → Cliente Supabase
  zapi.ts           → Integração Z-API (WhatsApp)
  stripe.ts         → Integração Stripe
  resend.ts         → Integração Resend
/hooks              → Custom hooks React
/types              → TypeScript types globais
/public             → Assets estáticos
```

### Padrões de desenvolvimento
- **TypeScript** em tudo — sem `any`
- **Server Components** por padrão, Client Components só quando necessário (interatividade, hooks)
- **Server Actions** para mutações de dados, não endpoints REST separados
- **Zod** para validação de schemas
- **Tailwind CSS** para estilização
- **Mobile-first** em todos os componentes — testar sempre em viewport 390px
- Comentários em **português** — o time fala português

### Regras de negócio críticas (a serem detalhadas)
- O lembrete de WhatsApp dispara **24h antes** da aula agendada
- Um instrutor pode ter múltiplos alunos simultâneos em etapas diferentes da CNH
- O plano free tem limite de X alunos ativos (a definir na validação)
- Stripe webhook atualiza o plano do instrutor em tempo real

---

## 5. Identidade Visual

### Nome e sigla
- **Nome completo:** Sistema Operacional do Instrutor
- **Sigla:** Rumo
- **Símbolo:** "7" estilizado integrado ao logotipo (referência à sinalização viária)

### Paleta de cores

A fonte canônica é `frontend/design-system/tokens.css` (escalas 50–950 + semânticas + status). Resumo das cores-mãe:

| Nome | Hex | Uso |
|---|---|---|
| Asfalto | `#101418` | Background dark mode, textos primários sobre fundo claro |
| Sinal Lima | `#B7F500` | Cor de ação primária — CTAs, highlights, destaques |
| Concreto | `#F4F5F2` | Background light mode, textos sobre fundo escuro |
| Rota Azul | `#2D6BFF` | Links e cor de suporte |

Status do produto (chips/badges): Pendente, Pago, Confirmado, Cancelado — pares fg/bg dedicados no DS. Semânticas (success/warning/danger/info) e escalas completas (Asfalto, Lima, Rota) também em `tokens.css`.

### Tipografia
- **Fonte principal:** Bricolage Grotesque (Google Fonts)
- **Pesos usados:** 300, 400, 500, 600, 700, 800
- **Import:** `https://fonts.google.com/specimen/Bricolage+Grotesque`

```css
/* Hierarquia tipográfica */
Display:  700–800, 32–48px  → Headlines de impacto ("Profissionalize sua jornada.")
Headline: 600–700, 20–28px  → Títulos de seção
Body:     400,     14–16px  → Texto corrido
Caption:  400,     12px     → Labels e metadados
Label:    500,     12–14px  → Botões e tags
```

### Tom de voz
- **Direto** — vai direto ao ponto, sem rodeios
- **Confiante** — fala com autoridade sobre a rotina do instrutor
- **Próximo** — como um parceiro que entende o dia a dia, não uma startup fria
- **Sem jargão técnico** — o instrutor não é tech-savvy

**Exemplos corretos:**
- ✅ "Chega de perder hora com aluno que não aparece."
- ✅ "Seu negócio organizado. Você focado em dar aula."
- ❌ "Otimize sua gestão com automações inteligentes."

### Dark mode
O produto é usado dentro do carro, ao sol e à noite. **Dark mode é o modo padrão.** O Sinal Lima (`#B7F500`) é a cor de ação primária — botões, CTAs, links ativos.

> Nota: o DS shippado em `frontend/design-system/` está em light-first (decisão original do handoff de design pelo uso ao sol). Os tokens dark precisam ser adicionados ao DS antes do scaffold do app.

---

## 6. Status atual do projeto

### Concluído
- [x] Briefing executivo e posicionamento de produto
- [x] Roteiro de entrevistas com instrutores (arquivo .docx)
- [x] Formulário de pesquisa no Google Forms (link ativo)
- [x] Lista de ~43 instrutores com WhatsApp para outreach
- [x] Disparador HTML de WhatsApp (43 botões com mensagem pré-preenchida)
- [x] Diagrama de arquitetura técnica
- [x] Workflow do instrutor (jornada + dores + cobertura do produto)
- [x] Brand guideline v1 (gerado, em revisão)

### Em andamento
- [ ] Validação com instrutores — envio do formulário de pesquisa
- [ ] Entrevistas qualitativas (meta: 10 instrutores)
- [ ] Revisão do brand guideline (ajustes de símbolo, dark mode, copies)

### Ainda não definido (não inventar)
- [ ] Schema do banco de dados (tabelas, relacionamentos, campos)
- [ ] Regras de negócio detalhadas das automações (horários exatos, limites do plano free)
- [ ] Fluxo de onboarding do instrutor (primeiros 5 minutos no app)
- [ ] Nome de domínio final
- [ ] Limite de alunos no plano free

---

## 7. Instruções para o Claude Code

### Como trabalhar neste projeto
1. **Sempre mobile-first** — qualquer componente deve funcionar em 390px antes de qualquer outra resolução
2. **Dark mode por padrão** — usar Asfalto `#101418` como background base, Sinal Lima `#B7F500` para ações primárias (tokens em `frontend/design-system/tokens.css`)
3. **Bricolage Grotesque** em toda tipografia — nunca usar outra fonte sem autorização explícita
4. **Português** em todos os textos de interface, comentários de código e mensagens de erro
5. **Não inventar regras de negócio** — quando algo não estiver definido neste documento, perguntar antes de implementar
6. **Componentes pequenos e reutilizáveis** — nada de componentes com mais de 150 linhas
7. **Testar sempre em mobile** — o usuário final usa o celular dentro do carro

### Prioridade de desenvolvimento
```
1. Autenticação (cadastro e login do instrutor)
2. Agenda (criação de horários + link público de agendamento)
3. CRM de alunos (cadastro e histórico básico)
4. Lembrete automático via WhatsApp (Z-API)
5. Cobrança e financeiro
6. Dashboard e relatórios
```

### Quando houver dúvida
Consulte este documento primeiro. Se a dúvida persistir, pergunte antes de implementar. É melhor pausar 2 minutos do que construir na direção errada.
