# Bloco de interatividade — Timeline Orchestra

Implementação da spec `Bloco de interatividade — Timeline Orchestra`.
Referências `§n` neste arquivo apontam para as seções daquele documento.

## O princípio, em uma frase

O bloco **não é uma lista de campos**, é um **contrato de 5 regiões fixas**.
Interatividade nova muda o **payload** (`contract.ts`), nunca o layout.

| #   | Região   | Onde vive no código                                    |
| --- | -------- | ------------------------------------------------------ |
| 1   | Âncora   | `.tlb__ancora` — ícone (tipo) + título                 |
| 2   | Extensão | **é a largura** — `lanes.ts › geometryOf`, sem markup  |
| 3   | Escopo   | `.tlb__escopo` → `ScopeMatrix` no popover              |
| 4   | Adornos  | `.tlb__adornos` — trilho de plugins (nota/alerta/dep.) |
| 5   | Ação     | `.tlb__acao` — UMA primária, resto no `...`            |

Camada 0 (sinal de estado) não é região: é o **container**, via `data-state`
no elemento raiz do bloco.

## Arquivos

| Arquivo                        | Responsabilidade                                              |
| ------------------------------ | ------------------------------------------------------------- |
| `contract.ts`                  | Tipos do payload + **orçamento de slots** (§3). É o contrato. |
| `InteractivityBlock.tsx`       | As 5 regiões. Só pergunta "esse slot cabe?" e obedece.        |
| `InteractivityPopover.tsx`     | Superfície de overflow do orçamento (§4).                     |
| `ScopeMatrix.tsx`              | Matriz praça × plataforma acessível (§4.1).                   |
| `TimelineTrack.tsx`            | Geometria, roving tabindex e **um** popover por trilha.       |
| `usePopoverController.ts`      | Máquina de estados de §5. Onde mora o comportamento.          |
| `usePopoverPosition.ts`        | Ancoragem: flip vertical, clamp, scroll interno.              |
| `useRegionPulse.ts`            | Dado ao vivo: só a região que mudou pulsa (§5).               |
| `lanes.ts`                     | Empacotamento em trilhas — **provisório**, ver §7.            |
| `timeline.css` / `popover.css` | Zero hex. Tudo sai de `styles/tokens.css`.                    |

## Como adicionar um tipo de interatividade

Custo de design = zero. São dois passos, nenhum deles em CSS:

1. `contract.ts` → acrescente o valor em `InteractivityType`.
2. `icons.tsx` → mapeie o glifo em `TYPE_GLYPH` e o rótulo em `TYPE_LABEL`.

O TypeScript recusa compilar se você esquecer o glifo — os mapas são
`Record<InteractivityType, …>` de propósito.

## Como adicionar um metadado ao bloco

1. Acrescente o campo em `Interactivity`.
2. Declare um slot em `SLOT_BUDGET` com `region`, `priority` e `minWidth`.
3. Renderize dentro da região certa, protegido por `slot('seu.slot')`.

O colapso passa a funcionar sozinho e o popover continua sendo o overflow.

> Se o metadado **não cabe em nenhuma das 5 regiões**, ele não é do bloco:
> vai pro drawer. A alternativa é subir `CONTRACT_VERSION` — decisão explícita
> e versionada, nunca "só nesse caso" (§0).

## Canais de cor (§2) — a regra que trava escala se for quebrada

Cada canal tem um portador próprio. Não os misture:

| Canal     | Portador                              | Nunca faça                           |
| --------- | ------------------------------------- | ------------------------------------ |
| Tipo      | forma do glifo                        | dar cor por tipo                     |
| Estado    | container (`data-state`)              | usar a lima em outra coisa           |
| Progresso | `.tlb__progresso` (`--progress-fill`) | pintar de lima                       |
| Ação      | botão (peso)                          | reusar a cor de estado como destaque |

A lima é `--state-live`. **Não** é accent genérico.

## Acessibilidade (§6 — bloqueia merge)

Implementado e verificado por script:

- Estado nunca só por cor: além do fill, o dot muda de **forma** por estado
  (anel tracejado / anel / disco / traço / triângulo), e o `aria-label` do
  bloco sempre inclui o estado por extenso.
- `--text-secondary` e `--text-muted` passam 4.5:1 nas três superfícies.
- Alvos de toque ≥44px: reais no rodapé do popover; no bloco (36px de altura)
  a área de ponteiro é expandida por pseudo-elemento.
- Matriz com `aria-label` por célula (`"SP · TV+ · erro"`), célula de 20px e
  legenda visível.
- Popover navegável e fechável por teclado; Esc devolve o foco pra âncora.
- `prefers-reduced-motion` zera transform/opacity — estado ainda muda.
- Glifo decorativo com `aria-hidden`; botão só-ícone com `aria-label`.

## Modelo de teclado

Um único tab stop na trilha (§5: 40 blocos ≠ 40 paradas de Tab).

| Tecla         | Efeito                                           |
| ------------- | ------------------------------------------------ |
| Tab           | entra na trilha                                  |
| ← →           | bloco anterior/próximo na mesma lane             |
| ↑ ↓           | lane vizinha, bloco temporalmente mais próximo   |
| Home / End    | primeiro / último da lane                        |
| Enter, Espaço | fixa o popover **e leva o foco pra dentro dele** |
| Esc           | fecha e devolve o foco pra âncora                |

Navegar com as setas **abre o popover como preview sem roubar o foco**. Se ele
roubasse, a segunda seta não navegaria mais nada.

## O que este código deliberadamente NÃO resolve (§7)

1. **Modelo de trilha/lane.** `lanes.ts` faz empacotamento guloso por horário
   de início, com Contextual acima de Persistente no empate. Não é a regra
   final: colisão, replicada em N praças e empilhamento continuam sem spec.
   Quando a regra sair, é `lanes.ts` que muda — e só ele.
2. **Escada de detalhe completa.** O drawer não existe aqui. Ações com
   `behavior: 'navigate'` marcam o ponto de saída, mas não navegam pra lugar
   nenhum ainda.
3. **Motion de ciclo de vida na trilha** (criar, publicar, arrastar, remover).
4. **Dono do contrato.** Sem uma pessoa/rito definido para aprovar região ou
   prioridade nova, o `SLOT_BUDGET` vira terra de ninguém e o contrato morre
   igual aos outros.
