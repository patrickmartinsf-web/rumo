# Bloco de interatividade — Timeline Orchestra

Spec de implementação. Cobre o **bloco** na timeline e o **popover** ancorado.
Escrito pra ser plataformizável: o layout não muda por tipo de interatividade,
muda o payload. Nenhuma tela custom por caso.

Termos do domínio usados aqui: interatividade, Timeline, praça, replicada/única,
Contextual/Persistente, agulha, estouro, encaixe, DTV+, DTVPlay (TV+).

---

## 0. Princípio central

O bloco **não é uma lista de campos**, é um **contrato de 5 regiões fixas**.
Toda interatividade — as do catálogo atual e as futuras — mapeia nessas regiões.
Se um metadado novo não cabe em nenhuma das 5, ele não é do bloco (vai pro drawer)
ou o contrato precisa de revisão explícita e versionada. Nunca "só nesse caso".

A largura do bloco é definida por **duração**, mas a demanda de conteúdo é constante.
Por isso identidade e duração são coisas separadas, e o conteúdo colapsa por
**orçamento de slots com prioridade declarada** (seção 3), não por decisão manual.

---

## 1. As 5 regiões do contrato

| # | Região | Papel | Colapso |
|---|--------|-------|---------|
| 1 | Âncora | Identidade: ícone (tipo) + título | Nunca colapsa abaixo do ícone |
| 2 | Extensão | Janela temporal — **é a largura**, não um texto | Sempre presente (é o próprio bloco) |
| 3 | Escopo | Praças × plataformas — contável e expansível | Colapsa em contador numérico |
| 4 | Adornos | Trilho de plugins: nota, alerta, dependência | Colapsa em contador, depois some |
| 5 | Ação | UMA ação primária. Resto vai pro menu | Colapsa em `...`, depois some |

Camada 0 — **Sinal de estado** — não é região, é o **container**:
`rascunho | agendada | no ar | encerrada | erro | replicada`.
Vive em fill / borda / opacidade / hachura. **Nunca** compete com o conteúdo.

---

## 2. Sistema de cor por canal (crítico)

> Esse é o ponto que trava escala se não for resolvido. Hoje uma cor só (lima)
> carrega tipo, estado, progresso e ação. Cada canal precisa de um portador
> próprio, senão todo estado novo força uma cor nova ou um conflito.

| Canal | Portador | Regra |
|-------|----------|-------|
| **Tipo** | ícone da âncora | forma, nunca cor. Votação, Estatísticas, Escalação… cada um tem glifo |
| **Estado** | container (fill/borda/opacidade) | é o único dono da lima sólida |
| **Progresso** | barra dedicada | tonalidade distinta do estado, não lima |
| **Ação** | botão | neutro; primária ganha destaque por peso, não por reusar a cor de estado |

### Estados → tratamento do container

| Estado | Fill | Borda | Extra |
|--------|------|-------|-------|
| rascunho | `--surface-2` | tracejada `--border` | opacidade 0.7 |
| agendada | `--surface-2` | `--border-strong` | — |
| no ar | lima sólida | — | barra de progresso ativa |
| encerrada | neutro | — | opacidade 0.5 |
| erro | tint danger | `--border-danger` | glifo alerta na região 4 |
| replicada | igual base | badge de contador na região 1 | link visual entre instâncias |

**Acessibilidade obrigatória:** estado nunca é comunicado só por cor.
Sempre acompanha glifo ou label. Ver seção 6.

---

## 3. Escada de densidade (orçamento de slots)

Não é decisão por zoom level — é **regra em px de largura renderizada**, automática.
Cada peça declara prioridade; o bloco renderiza o que couber e colapsa o resto.

Prioridade: `âncora > estado > escopo > adornos > ação secundária`.

| Largura | O que sobrevive |
|---------|-----------------|
| ≥ 420px | ícone + título + horário início–fim + chip de escopo + 1 adorno + ação primária |
| ≥ 240px | ícone + título + só início + escopo como contador + `...` |
| ≥ 120px | ícone + título (ellipsis) + 1 dot de sinal |
| ≥ 44px  | ícone + dot de sinal |
| < 44px  | só cor e posição; identidade vai pro tooltip |

Metadado novo entra declarando sua prioridade. Custo de design = zero.

---

## 4. Popover ancorado (NÃO é tooltip)

Nome importa pro dev: tooltip é hover puro, efêmero, não-interativo — se tiver
botão dentro, quebra. O que a gente quer é **popover / hover card**: abre no hover
com delay, fixa no clique, navegável por teclado, fechável por Esc.

O popover é a **superfície de overflow do orçamento de slots**: tudo que colapsou
na escada reaparece aqui, na mesma ordem das 5 regiões. Preenche do contrato,
ninguém desenha popover novo por tipo.

### Conteúdo (ordem)

1. **Cabeçalho** — ícone + título + badge de estado + `×` (só quando fixado).
   Subtítulo: tipo · Contextual/Persistente · replicada/única · id.
   > Ajuste da crítica: quando há **erro**, o sinal sobe pra logo abaixo do
   > cabeçalho. Ordem das regiões é fixa, mas urgência reordena.
2. **Janela** — início → fim, duração, tempo restante, barra de progresso,
   linha da agulha/encaixe/estouro.
3. **Escopo** — matriz praça × plataforma (ver 4.1).
4. **Sinais** — alerta, nota, dependência. Cada um com autor + horário.
5. **Rodapé de ação** — 1 primária sólida + secundárias + `...`.

Ações são de **decisão** (pausar, replicar, republicar), não de edição.
"Editar" **navega pro drawer**, não abre form dentro. Marcar ação-que-navega
com `ti-arrow-up-right`; ação-que-executa fica sólida. (ajuste da crítica)

### 4.1 Matriz de escopo — acessível

Grid praça (coluna) × plataforma (linha: DTV+, TV+). Cada célula é um estado.

**Cor NUNCA é o único canal.** Cada célula carrega glifo:

| Estado | Cor | Glifo |
|--------|-----|-------|
| no ar | lima | `✓` (`ti-check`) |
| erro | coral | `!` (`ti-alert-triangle`) |
| agendada | contorno | `○` (`ti-circle`) |
| fora do escopo | contorno fraco | `–` (`ti-minus`) |

- Célula ≥ 14px (era 11px — abaixo do piso). (ajuste da crítica)
- Cada célula tem `aria-label` do tipo "SP · TV+ · erro".
- Legenda visível abaixo da matriz.

---

## 5. Interação e motion

### Timings

| Transição | Duração | Curva | Propriedades |
|-----------|---------|-------|--------------|
| Delay de intenção (abrir) | 350ms | — | só espera |
| Grace period (fechar) | 180ms | — | cancelável |
| Bloco hover | 120ms | `cubic-bezier(.2,0,0,1)` | `translateY(-2px)` |
| Popover entrada | 180ms | `cubic-bezier(.2,0,0,1)` | opacity 0→1, translateY -6→0, scale .985→1 |
| Popover saída | 120ms | `ease-in` | opacity→0, translateY -4 |
| Seções (stagger) | 200ms | `ease-out` | delay 40/70/100/130/160ms |
| Barra de progresso | 500ms | `cubic-bezier(.2,0,0,1)` | width 0→n%, delay 120ms |
| Troca de âncora (aberto) | 180ms | `cubic-bezier(.2,0,0,1)` | reposiciona sem fade-out |
| Botão primário `:active` | 100ms | `ease-out` | scale(.97) |

### Estados de interação

- **fechado** → hover na âncora → aguarda 350ms → **abre não-fixado**
- **não-fixado** → sai do bloco E do popover → aguarda 180ms → fecha
- **não-fixado** → clique em qualquer bloco → **fixado** (borda de pin, `×` visível)
- **fixado** → Esc, `×`, ou clique fora → fecha
- **já aberto** → move pra outro bloco → **reposiciona sem fechar** (permite comparar)
- **foco por teclado** → abre instantâneo, sem animação de posição
- Safe triangle resolvido por `pointerenter` no próprio popover (sem cálculo geométrico)

### Regras que quebram em produção se ignoradas

- **Teclado / roving tabindex:** Tab entra na trilha, **setas** navegam entre blocos.
  Não deixar cada bloco focável individualmente (40 blocos = 40 paradas de Tab).
- **Touch:** sem hover. Tap abre já fixado; o handler de "clique fora" precisa
  ignorar o mesmo gesto (bug clássico abre-e-fecha). Avaliar se no touch o certo
  é ir direto pro drawer.
- **Dado ao vivo:** bloco "no ar" muda sozinho (agulha, praça caindo). Se o popover
  está aberto e o dado atualiza: **só a região que mudou anima**, com pulso de 300ms
  na borda dela. Nunca re-entrada do painel inteiro durante leitura.

### `prefers-reduced-motion`

Zerar todas as durações de transform/opacity. Estado ainda muda, sem movimento.

---

## 6. Checklist de acessibilidade (bloqueia merge)

- [ ] Nenhum estado comunicado só por cor — sempre glifo/label junto
- [ ] Texto secundário ≥ 4.5:1 de contraste (o cinza-oliva atual reprova AA — subir tom)
- [ ] Touch targets ≥ 44px (botões do rodapé e `...`/`×` estão abaixo hoje)
- [ ] Matriz de escopo com `aria-label` por célula + legenda
- [ ] Popover navegável e fechável por teclado (Esc)
- [ ] `prefers-reduced-motion` respeitado
- [ ] Ícone decorativo com `aria-hidden`; botão só-ícone com `aria-label`

---

## 7. O que ainda falta especificar (fora deste doc)

1. **Modelo de trilha/lane** — colisão e empilhamento de interatividades
   simultâneas, replicada em N praças, Contextual sobre Persistente. A unidade
   real de escala é **bloco + trilha**, não o bloco sozinho. Sem regra de lane,
   todo bloco vira exceção.
2. **Escada de detalhe completa** — bloco → popover → drawer, com responsabilidade
   separada. Sem os 3 níveis nomeados, o popover incha até virar drawer.
3. **Motion de ciclo de vida na trilha** — criar, publicar, arrastar, remover bloco.
   É o motion que o operador vê o dia inteiro e onde mora o feedback de "deu certo".
4. **Dono do contrato** — regra escrita de quem pode adicionar região/prioridade e
   resposta padrão pro "só pra esse caso". Contrato sem dono morre igual.

---

## Notas de tokens (CDS)

Usar variáveis, nunca hex fixo (quebra dark mode):
`--surface-{0..2}`, `--text-{primary,secondary,muted}`, `--border{,-strong}`,
`--bg-{danger,accent}`, `--text-{danger,accent}`, `--radius`.
A lima é cor de marca/estado — mapear pra um token de estado próprio, não reusar
como accent genérico.
