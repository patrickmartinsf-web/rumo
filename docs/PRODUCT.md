# PRODUCT.md – Especificação Funcional - Rumo MVP

**Versão:** 1.0  
**Data:** Abril 2026  
**Status:** Em desenvolvimento

## 📌 Visão Geral

**Rumo** é um SaaS para gerenciamento de instrutores e aulas. Permite que academias organizem seus instrutores, agendas de aulas e alunos de forma simples e eficiente.

## 🎯 Objetivos do MVP

1. Cadastro e gestão de instrutores
2. Criação e agendamento de aulas
3. Atribuição dinâmica de instrutores
4. Dashboard com visão operacional
5. Sistema básico de notificações
6. Relatórios simples de performance

## 👤 Personas

### Maria (Gerenciadora de Academia)
- **Objetivo:** Organizar 40+ instrutores e 150+ aulas por semana
- **Pain Point:** Coordenação manual é confusa

### João (Instrutor)
- **Objetivo:** Saber quais aulas ele está escalado
- **Pain Point:** Recebe avisos desorganizados por WhatsApp

### Ana (Recepcionista)
- **Objetivo:** Confirmar presença em aulas
- **Pain Point:** Gerencia lista de papel

## 📋 Funcionalidades MVP

### 1. Autenticação
- Cadastro de academia
- Login com email/senha
- Roles: Admin, Gerenciador, Recepcionista, Instrutor

### 2. Gestão de Instrutores
- CRUD (criar, ler, editar, deletar)
- Especialidades (múltiplas)
- Horários de disponibilidade
- Status (ativo, inativo, afastado)

### 3. Gestão de Aulas
- CRUD de aulas
- Data, hora, local, capacidade
- Atribuição de instrutor
- Status (rascunho, confirmada, cancelada)

### 4. Dashboard
- Aulas de hoje
- Instrutores em falta
- Taxa de ocupação
- Métricas básicas

### 5. Notificações
- Email ao atribuir instrutor
- Email quando aula é cancelada
- In-app notifications

### 6. Relatórios
- Performance de instrutores
- Ocupação por horário
- Exportar CSV

## 🗄️ Modelo de Dados
Academy
├── id, name, email, plan
User
├── id, academyId, email, role, name
Instructor
├── id, academyId, name, email, phone, specialties, availability, status
Class
├── id, academyId, name, specialty, date, startTime, endTime, room, capacity, instructorId, status
Notification
├── id, userId, type, message, isRead

## 📊 Priorização

### Alta Prioridade (MUST)
- Autenticação
- CRUD Instrutores
- CRUD Aulas
- Atribuição de instrutor
- Dashboard básico
- Notificações email

### Média Prioridade (SHOULD)
- Testes
- CI/CD
- Documentação

### Baixa Prioridade (NICE-TO-HAVE)
- Dark mode
- Customização de cores

---

**Last Updated:** Abril 2026
