# CLAUDE.md – Padrões e Instruções para Rumo

Este arquivo define como Claude Code deve trabalhar no projeto Rumo.

## 🎯 Princípios do Projeto

1. **MVP First** – Focar em funcionalidades core. Sem gold-plating.
2. **Type Safety** – TypeScript obrigatório. Sem `any`.
3. **Performance** – Otimizar para mobile e conexões lentas.
4. **Documentação** – Código limpo é documentação.
5. **Testabilidade** – Estruturar código para ser testável desde o início.

## 📂 Estrutura de Pastas (Convenção)

### Backend (`/backend/src`)
backend/src/
├── controllers/
├── services/
├── models/
├── middleware/
├── routes/
├── utils/
├── config/
└── tests/

### Frontend (`/frontend/src`)
frontend/src/
├── components/
├── pages/
├── hooks/
├── services/
├── utils/
├── styles/
└── types/

## 🏗️ Convenções de Código

### TypeScript
- Classes: PascalCase
- Funções: camelCase
- Constantes: UPPER_SNAKE_CASE
- Interfaces: PascalCase

### React/Frontend
- Componentes: PascalCase
- Props com tipos explícitos
- Sem `any` types

## 📋 Padrões de Commit
feat: criar cadastro de instrutor
fix: corrigir validação de email
docs: atualizar documentação
refactor: simplificar lógica
test: adicionar testes

## 🧪 Testes

Todos os serviços devem ter testes. Mínimo 70% de cobertura.

## 🔐 Segurança

1. JWT com refresh token
2. Validar TODOS os inputs
3. CORS configurado
4. Rate limiting
5. Nunca commitar secrets

## 🚀 Workflow com Claude Code

```bash
claude
# > /task criar autenticação com JWT
# Claude executa, testa, commita
```

---

**Last Updated:** Abril 2026
