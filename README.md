# Brain Damage - Sistema de Rastreamento de Personagem

Sistema interativo para acompanhar e gerenciar arquétipos de personagens do jogo Brain Damage. Uma ferramenta digital que substitui anotações em papel, oferecendo rastreamento visual de dano cerebral, rolagem de dados e persistência de dados entre sessões.

## 🎮 O que é Brain Damage?

Brain Damage é uma aplicação web que serve como "ficha de personagem digital" para o jogo de mesa. O sistema permite:

- **Visualizar arquétipos de personagens** com suas características, defeitos e habilidades especiais
- **Rastrear Dano Cerebral** através de um grid visual de 6 células numeradas
- **Rolar dados** com animação visual e histórico do resultado
- **Adicionar dano automaticamente** rolando 1d6 e incrementando a célula correspondente
- **Persistir progresso** salvando automaticamente o estado de cada personagem

## 🎯 Funcionalidades Principais

### Grid de Brain Damage (2x3)

- 6 células numeradas que representam diferentes áreas de dano cerebral
- Incremento manual clicando em cada célula
- Rolagem automática de dano com botão dedicado
- Animação visual durante a seleção aleatória
- Valores salvos automaticamente no navegador

### Sistema de Dados

- Barra visual com as 6 faces do dado
- Cada face numerada para fácil identificação
- Suporte para símbolos especiais em cada face
- Animação de rolagem com destaque do resultado

### Gerenciamento de Personagens

- Seleção visual de arquétipos na página inicial
- Página de detalhes individual para cada personagem
- Informações completas: nome, defeito, característica e flavor text
- Estado independente salvo para cada arquétipo

## 🚀 Como Usar

1. Acesse a aplicação no navegador
2. Selecione um arquétipo de personagem na tela inicial
3. Use o botão "🎲 Rolar Dano" para adicionar dano cerebral aleatório
4. Clique nas células do grid para ajustar valores manualmente
5. Role dados usando o botão 🎲 para verificar resultados
6. Seu progresso é salvo automaticamente

## 💻 Tecnologias

Desenvolvido com Next.js 16, React 19, TypeScript e Tailwind CSS 4.

---

**Instalação e Desenvolvimento**

```bash
yarn install    # Instalar dependências
yarn dev        # Executar em modo de desenvolvimento
yarn build      # Criar build de produção
```
