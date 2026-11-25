# Briefing e Estrutura v2 — Restaurante Mauricio's de Itaipava

**Versão:** v2 (25/11/2026)
**Pasta oficial do projeto:** `G:\Meu Drive\CANEDO WEB STUDIO\projetos portifolio\restaurante-mauricios`

## Fontes e Referências
- **Dossiê de pesquisa:** `C:\Users\enzoc\OpenBot\Shared\pesquisa-restaurante-mauricios.md`
- **Prévia Figma v1:** [Mauricio's de Itaipava · Prévia v1](https://www.figma.com/design/pCwt6vixyfoH4DI2scSheh/Mauricio%E2%80%99s-de-Itaipava-%C2%B7-Pr%C3%A9via-v1?node-id=1-2)
- **Referência principal (Home, seções e motion):** [The Vineyard Hotel](https://www.vineyard.co.za/)
- **Referência funcional/visual da tela de pedidos:** `G:\Meu Drive\CANEDO WEB STUDIO\projetos portifolio\la bella pizza site animado\cardapio.html`
- **Fontes públicas do cliente:** [Instagram @restaurante.mauricios](https://www.instagram.com/restaurante.mauricios/) · [Google Maps (Shopping Altair, Itaipava)](https://www.google.com/maps?cid=12947671498710501935)

---

## Objetivo e Jornada Principal
- **Posicionamento estratégico:** Casa tradicional de frutos do mar, grelhados e chapas quentes em Itaipava com **mais de 60 anos de tradição** (bio oficial), ambiente familiar e acolhedor na serra (varanda, mesas externas, lareira, bar e estacionamento gratuito no Shopping Altair).
- **Ação principal (CTA primário):** **`Ver cardápio`** (`cardapio.html`), levando diretamente ao catálogo categorizado e ao carrinho visual no estilo Pizzaria La Bella, com geração de resumo formatado para envio via WhatsApp `(24) 99306-1488` (apenas revisão/abertura, sem disparo automático).
- **Ações secundárias de apoio:** Visitar o restaurante (rota no Google Maps + horários), reservar mesa ou tirar dúvidas rápidas via WhatsApp `(24) 99306-1488` / telefone `(24) 2231-9974`.

---

## Arquitetura de Seções da Home (`index.html`) — Mapeada do Vineyard

1. **Header Fixo Transparente -> Sólido (`scrolled`)**
   - Navegação limpa sobre a hero com transição de fundo ao rolar: `A Casa`, `Especialidades`, `Experiência`, `Avaliações`, `Visite-nos` e CTA pílula **`Ver cardápio`**.
   - Menu mobile fullscreen com abertura por linha (`line-inner`) e CTA destacado.

2. **Hero Impactante + Manifesto com Colagem (`.section-home-hero`) — Adaptação solicitada por Enzo**
   - **Primeira dobra (acima da dobra):** Fotografia forte do ambiente/mesa em tela cheia com contraste editorial legível, **nome/título `Mauricio’s` grande, elegante e imponente logo na abertura** (corrigindo o Vineyard, que esconde o título grande só após rolar), subtítulo curto com localização e tradição (*Frutos do mar, chapas quentes e mais de 60 anos de tradição em Itaipava*) e CTA pílula **`Ver cardápio`** + apoio discreto **`Como chegar / Reservar`**.
   - **Segunda fase da abertura (scroll):** Transição estilo Vineyard (`pin-spacer` / escala controlada da mídia) revelando o texto manifesto centralizado cercado por mosaico flutuante de 6–7 fotografias de pratos e do ambiente com parallax em profundidades distintas.

3. **Faixa de Confiança / Atributos (`.section-trust`)**
   - Fundo tonal suave (verde-sálvia claro / tom de respiro inspirado no Vineyard).
   - Atributos verificados: `+60 anos de tradição em Itaipava` · `4,7 ★ no Google (390 avaliações)` · `Estacionamento gratuito e acessibilidade completa` · CTA pílula **`Ver cardápio`**.

4. **Carrossel Monumental de Categorias (`.section-categories`)**
   - Títulos display em grande escala (`~100–116px` no desktop) sobre mídia ampla em tela cheia/panorâmica para as grandes famílias reais da casa:
     - **Frutos do Mar**
     - **Chapas & Carnes**
     - **Entradas & Bar**
     - **Sobremesas**
   - Cada slide apresenta chamada curta e CTA pílula apontando diretamente para a categoria correspondente em `cardapio.html`.

5. **Assinaturas da Casa em 2 Colunas (equivalente a `.section-rooms` + `.section-break`)**
   - Dois blocos amplos lado a lado:
     - **Clássicos de Camarão:** *Chiclete de Camarão, Moqueca de Camarão e Bobó de Camarão* (mais pedidos no Google Maps).
     - **Chapas Quentes & Executivo:** *Picanha na Pedra, Filé à Piamontese e opções do Executivo* (refeições fartas e servidas quentes).
   - Fechamento com linha divisória horizontal animada e emblema central (`.section-break`).

6. **Trio Fotográfico Assimétrico com Parallax (`.section-media-group`)**
   - Grade de 3 colunas (lateral menor, coluna central vertical mais alta, lateral menor) exibindo pratos servidos em panelas/travessas, ambiente/lareira e drinks da casa, com velocidades diferentes no scroll.

7. **Avaliações dos Clientes (`.section-reviews`)**
   - Faixa tonal de respiro com destaque real: **`4,7 / 5` baseado em `390 avaliações` no Google Maps**.
   - Síntese editorial fiel aos temas mais citados nas avaliações reais (`ambiente`, `bobó de camarão`, `chiclete`, `Itaipava`, pratos fartos e bem quentes, atendimento atencioso e facilidade de acesso no Shopping Altair) — **sem inventar nomes fictícios ou citações fabricadas**.

8. **Experiência na Serra (`.section-play`)**
   - Mídia ampla com narrativa editorial sobre o clima acolhedor de Itaipava: varanda arborizada com mesas externas, lareira para os dias frios, caipirinhas, batidas, vinhos e estrutura familiar com cardápio infantil e cadeirinhas.

9. **Localização e Horários em Itaipava (`.section-map`)**
   - Bloco visual dedicado ao endereço exato: **Estr. União e Indústria, 11811 - Lj 5/6 (Shopping Altair, Andar G), Itaipava, Petrópolis - RJ, CEP 25750-225**.
   - Grade de horários do Google Maps (com nota de confirmação via WhatsApp quando aplicável): Seg–Qua `11h–18h`, Qui–Sex `11h–22h`, Sáb–Dom `11h–19h`.
   - Informações práticas (estacionamento gratuito, acessibilidade completa, telefone `(24) 2231-9974`) e CTAs pílula **`Abrir no Google Maps`** e **`Chamar no WhatsApp`**.

10. **Convites & Momentos da Casa (`.section-offers` / `.section-blog` condensados sobre fundo creme quente `#FFF9F3`)**
    - 3 cards editoriais limpos:
      1. *Almoço Executivo (Seg–Qua)* — pratos tradicionais do dia para o almoço em Itaipava.
      2. *Inverno, Lareira & Vinhos* — noites de quinta e sexta até 22h com chapas quentes, caldos/gratinados e carta de vinhos/drinks.
      3. *Encontros em Família & Eventos* — atendimento para grupos, acessibilidade e reservas antecipadas.

11. **Informações Úteis — FAQ em Acordeão (`.section-faq`)**
    - 5 perguntas objetivas com abertura suave:
      1. Como funcionam os pedidos para entrega e retirada? (Via `cardapio.html` com envio do resumo para o WhatsApp `(24) 99306-1488`).
      2. O restaurante aceita reservas? (Sim, especialmente para grupos, fins de semana e jantares de quinta/sexta).
      3. Há estacionamento e acessibilidade? (Sim, estacionamento gratuito amplo no Shopping Altair e acessibilidade completa).
      4. Quais formas de pagamento são aceitas? (Crédito, débito, NFC, Alelo, Pluxee e vale-refeição).
      5. Além de frutos do mar, há opções de carnes, bebidas e pratos infantis? (Sim: chapas quentes, filés, executivos, batidas, drinks e cardápio infantil).

12. **Faixa do Instagram (`.section-instagram`)**
    - Chamada para `@restaurante.mauricios` com grade visual de pratos/ambiente e CTA pílula **`Ver nosso Instagram`**.

13. **Footer Escuro Amplo (`footer`, `#151D25`)**
    - Divisor `.section-break` no topo, **wordmark `Mauricio’s` em grande escala**, colunas com navegação da página, endereço no Shopping Altair, horários, contatos (`(24) 99306-1488` e `(24) 2231-9974`), links de redes/Maps e CTA pílula **`Ver cardápio`**.

---

## Arquitetura da Página de Pedidos (`cardapio.html` — Estilo Pizzaria La Bella)
- **Propósito:** Prévia visual completa e interativa de montagem de pedido sem gateway de pagamento, harmonizada com a tipografia, paleta e botões pílula da v2.
- **Estrutura:**
  - Cabeçalho compacto de retorno à Home + busca local por prato/ingrediente.
  - Barra sticky de categorias (`Mais Pedidos`, `Frutos do Mar`, `Chapas & Carnes`, `Entradas & Petiscos`, `Executivo`, `Sobremesas`, `Batidas & Bebidas`) com `scrollspy` sincronizado.
  - Cards de pratos com foto em destaque, descrição curta, selo nos campeões (*Chiclete de Camarão, Moqueca, Bobó*) e **preços marcados claramente como ilustrativos** (até confirmação oficial do restaurante).
  - Modal de detalhe do prato (observações, porção/opção quando aplicável) e adição ao carrinho.
  - Carrinho lateral fixo no desktop e barra inferior + gaveta deslizante no mobile (`+ / -`, remover item, alternância **Entrega / Retirada no Shopping Altair**, cálculo exato em centavos inteiros).
  - Modal de revisão do pedido com resumo completo e link `wa.me/5524993061488` pré-formatado (sem disparo automático).

---

## Coreografia de Animações (HTML + CSS + JS + GSAP ScrollTrigger)
- **Controlador único:** GSAP + ScrollTrigger (sem bibliotecas concorrentes de scroll ou AOS).
- **Reveals de títulos e textos:** Divisão por linhas com máscara (`overflow: hidden` + `.line-inner` subindo de `translateY(100%)` para `0`, stagger `~0.06s`, easing longo suave).
- **Hero + Colagem:** Transição fluida da abertura impactante para a narrativa e parallax em `scrub` nos quadros da colagem fotográfica.
- **Carrossel de Categorias:** Transição suave de slide e tipografia display acompanhando troca de categoria.
- **Trio `.section-media-group` & Divisores `.section-break`:** Parallax diferenciado entre as 3 colunas e expansão horizontal sutil das linhas divisórias.
- **Botões pílula (`border-radius: 999px`):** Microinteração de duplo texto (`.btn-text` / `.btn-text-hover` entrando de `translateY(100%) scale(0.9)` no hover/focus com saída e reentrada limpas).
- **FAQ:** Acordeão acessível com altura animada e estado `aria-expanded`.
- **Resiliência e Acessibilidade:** `prefers-reduced-motion: reduce` desativa movimentos amplos mantendo legibilidade imediata; conteúdo e CTAs não dependem de JS para permanecerem visíveis em fallback ou mobile; navegação completa por teclado.

---

## Restrições Canedo e Critérios de Aceite
- **Vetos obrigatórios (`preferences.md`):**
  - Proibido usar CTA/link ou `div` em linha com borda inferior e seta lateral ou diagonal.
  - Proibido usar `✳` ou ornamento radial equivalente.
  - Proibido usar a fonte `Italiana`.
  - Proibido inventar dados reais, avaliações falsas com nomes fictícios ou afirmar preços como oficiais.
- **Stack e entrega:** HTML + CSS + JS + GSAP em `G:\Meu Drive\CANEDO WEB STUDIO\projetos portifolio\restaurante-mauricios`, com repositório privado em `https://github.com/CanedoDev` e tentativa de ativação do GitHub Pages ao final (respeitando eventual restrição de plano da conta).