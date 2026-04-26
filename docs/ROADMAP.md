# ROADMAP.md – Rumo Product Roadmap

**Data:** Abril 2026  
**Horizonte:** 6-12 meses

## 📍 Visão Geral

Rumo começa como um MVP focado em gestão de instrutores e aulas.
MVP (Maio) → Beta (Junho) → v1.0 (Agosto) → Scale (2026-2027)

## 🏃 Phase 1: MVP Core (Maio 2026)

**Objetivo:** Lançar MVP funcional com fluxo base

### Backlog Priorizado

**Alta Prioridade (MUST)**
- Autenticação e autorização
- Cadastro de instrutores (CRUD)
- Cadastro de aulas (CRUD)
- Atribuição manual de instrutor
- Dashboard com métricas básicas
- Notificações por email
- Modelo de dados (Postgres)
- API REST documentada

**Média Prioridade (SHOULD)**
- Testes unitários (min 70%)
- Testes E2E
- Documentação de deploy
- CI/CD (GitHub Actions)

**Baixa Prioridade (NICE-TO-HAVE)**
- Dark mode
- Customização de cores
- Analytics básicas

### Tarefas Técnicas

**Backend:**
- Setup Express + TypeScript
- PostgreSQL schema
- JWT auth com refresh token
- CRUD endpoints
- Middleware de autorização
- Service layer
- Email service

**Frontend:**
- Setup React + TypeScript + Tailwind
- Layout base
- Pages: Login, Dashboard, Instrutores, Aulas
- Forms
- API client
- State management

## 🎯 Phase 2: Beta & Polish (Junho 2026)

**Objetivo:** Refinar MVP, adicionar recursos secundários

### Features Novas
- Sistema de disponibilidade automática
- Sugestão de instrutor
- Cancelamento em lote
- Logs de auditoria
- Drag-and-drop
- Filtros avançados
- Exportar CSV/PDF

## 💎 Phase 3: v1.0 (Agosto 2026)

**Objetivo:** Lançar versão estável com suporte a produção

### Features Finais
- Gestão de alunos (básico)
- Faturamento
- Planos (Starter, Pro, Enterprise)
- Pagamento (Stripe)
- Integrações (Google Calendar)

## 🚀 Phase 4+: Scale & Growth (2026-2027)

- App mobile
- ML: sugestão de instrutores
- Marketplace de cursos
- Comunidade

---

**Last Updated:** Abril 2026
