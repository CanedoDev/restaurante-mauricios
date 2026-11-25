# Mauricio’s de Itaipava · direção de design v2

**Rascunho para revisão de Enzo · 25 de novembro de 2026**

O visitante vê a varanda e o nome Mauricio’s na primeira dobra. Pode abrir o cardápio imediatamente, percorrer as especialidades ou consultar a rota. A loja usa os mesmos tipos, cores e botões da home, com fotos, busca e controles dimensionados para escolher um prato.

[Home desktop no Figma](https://www.figma.com/design/pCwt6vixyfoH4DI2scSheh/Mauricios?node-id=18-3) · [Home celular](https://www.figma.com/design/pCwt6vixyfoH4DI2scSheh/Mauricios?node-id=18-4) · [Cardápio desktop](https://www.figma.com/design/pCwt6vixyfoH4DI2scSheh/Mauricios?node-id=18-5) · [Cardápio celular](https://www.figma.com/design/pCwt6vixyfoH4DI2scSheh/Mauricios?node-id=18-6). A página **V2 · Casa e cardápio** reúne a proposta atual. A [prévia v1](https://www.figma.com/design/pCwt6vixyfoH4DI2scSheh/Mauricios?node-id=1-2) registra a origem da varanda, das primeiras fotos de pratos e do fluxo de cardápio.

## Fontes e decisões

| Fonte | Recorte observado | Decisão para o Mauricio’s |
| --- | --- | --- |
| The Vineyard | Abertura em duas fases com sete imagens, faixa sálvia, carrossel de categorias em escala monumental, duplas e trios de mídia, avaliações, informações práticas, FAQ e rodapé de grande escala | A varanda ocupa a primeira tela. O nome e o CTA já estão visíveis. O manifesto e a colagem aparecem na rolagem seguinte. A ordem e a alternância de cor, imagem e silêncio vêm da referência. [Home do Vineyard](https://www.vineyard.co.za/) |
| La Bella Pizza | Catálogo, busca, famílias de produtos, detalhe, quantidade, carrinho e revisão | Manter a jornada de compra. Trocar a linguagem de pizzaria pela tipografia da casa, fotos reais e retirada no Shopping Altair. [Cardápio de referência](<G:/Meu Drive/CANEDO WEB STUDIO/projetos portifolio/la bella pizza site animado/cardapio.html>) |
| Délice e Zimmerl | Calor do fundo claro no primeiro, hierarquia tipográfica e navegação comedida no segundo | Creme nas áreas de comida e serifada de alto contraste na marca. O verde vem da varanda. [Délice](https://delice.ca/) · [Zimmerl](https://www.restaurantzimmerl.at/) |
| Restaurante e unidade pesquisada | Tradição declarada na bio, fotos de mesas e pratos, categorias, nota, comodidades, telefone e endereço da ficha | Usar nomes reais, a síntese de avaliações sem aspas e os contatos desta unidade. A nota e os horários têm data. [Instagram oficial](https://www.instagram.com/restaurante.mauricios/) · [Ficha exata no Google Maps](https://www.google.com/maps/search/?api=1&query=Restaurante+Mauricio%27s+Itaipava&query_place_id=ChIJVUDop_5UmAARL4ryjMd0rLM) |

O [briefing aprovado](./BRIEFING-ESTRUTURA-v2.md) define a estrutura. O [dossiê de pesquisa](<C:/Users/enzoc/OpenBot/Shared/pesquisa-restaurante-mauricios.md>) identifica as fontes por unidade. A expressão pública é **mais de 60 anos de tradição**. O ano de fundação segue em aberto.

## Cor, tipografia e composição

| Token | Valor | Aplicação |
| --- | --- | --- |
| `--paper` | `#FCFAF5` | Fundo principal e catálogo |
| `--cream` | `#FFF9F3` | Assinaturas, convites, carrinho e texto sobre foto |
| `--sage` | `#D2DFD9` | Confiança, avaliações e Instagram |
| `--ink` | `#20352D` | Títulos, texto e foco sobre fundo claro |
| `--deep` | `#254438` | Pílula principal em fundo claro, painel da lareira e barra de pedido |
| `--night` | `#151D25` | Rodapé e base de modal |
| `--muted` / `--rule` | `#5A655E` / `#CFD2C6` | Descrições e divisórias |
| `--sand` | `#EDD3A6` | Rótulos sobre o painel escuro |
| `--on-dark` | `#FFFFFF` | Texto pequeno e controles sobre foto e verde |

**Instrument Serif** Regular desenha o nome e os títulos. Italic marca a segunda linha do manifesto e da lareira. **DM Sans** Regular, Medium e SemiBold compõe texto, navegação, preço e controles. Distribuir somente fontes cuja licença esteja disponível no projeto. Fallbacks sugeridos são Georgia para display e Arial para interface. A marca e o M dentro de uma oval são uma assinatura tipográfica provisória.

| Elemento | Desktop de 1440 px | Celular de 390 px |
| --- | --- | --- |
| Nome na hero | 244 px / 250 px, tracking −3% | 106 px / 116 px, tracking −3% |
| Categoria sobre foto | 116 / 124 px | 64–67 / 78 px |
| Título de seção | 67–100 px, entrelinha próxima da altura do tipo | 41–65 px, até duas linhas |
| Texto editorial | 17–21 / 26–32 px | 15–17 / 22–25 px |
| Controle, preço e rótulo | 14–19 px. Rótulos curtos em caixa-alta, 10–12 px, espaçamento de 0,12 em | Controles de 14–17 px. Rótulos auxiliares de 10–12 px |
| Wordmark do rodapé | 332 / 350 px | 105 / 124 px |

Usar uma escala fluida entre os quadros. Para a marca principal, começar por `clamp(72px, calc(54px + 13.2vw), 244px)` e validar a palavra inteira em 320, 390, 768, 1024 e 1440 px. A primeira dobra tem 900 px e 844 px nos quadros de referência. No site, usar `100svh` com altura mínima suficiente para acomodar header, título, subtítulo e CTAs em celulares baixos. A foto cobre a área sem distorção. Proteger a leitura com véu escuro graduado, mais forte no topo e perto da base. Verificar a cópia sobre os trechos claros da varanda.

Margens externas de 60–72 px no desktop e 22–24 px no celular. Grades de texto têm até 640 px por coluna. No cardápio, o catálogo usa cerca de 820 px e o carrinho 392 px. Até 767 px, usar a composição móvel. De 768 a 1099 px, manter duas colunas onde houver espaço e abrir o carrinho em gaveta. A partir de 1100 px, usar o carrinho lateral quando sobrarem pelo menos 620 px para o catálogo. Em telas ultralargas, limitar a largura do texto e estender apenas a mídia e a cor.

Fotos têm cantos retos. A pílula usa raio de 999 px, 44–52 px de altura e margem lateral suficiente para o rótulo. No fundo escuro, usar creme sólido na ação principal e contorno claro na secundária. Preservar filetes editoriais e sinais de mais/menos nos controles. Links simples do rodapé usam texto. Os dois traços do menu e os chevrons circulares do carrossel identificam ações.

## Home

| Bloco | Desktop | Celular e destino |
| --- | --- | --- |
| **1 · Header** | Marca à esquerda, cinco âncoras centrais e **Ver cardápio** à direita. Transparente sobre a varanda, papel opaco com filete ao avançar. | M, CTA e botão de menu. Painel de navegação ocupa a tela e oferece as cinco âncoras. Fechar no botão, com Escape ou ao escolher uma seção. |
| **2 · Hero e manifesto** | Varanda em tela cheia. Nome centralizado acima do subtítulo e das pílulas **Ver cardápio** e **Como chegar**. Na segunda fase, “Da serra, uma mesa de mar.” entre sete fotos, sem obstruir o texto central. | Nome em uma linha. Manter os dois CTAs na primeira dobra. Os recortes menores contornam o manifesto por cima, pelas laterais e por baixo. A rota interna vai à seção de visita. |
| **3 · Confiança** | Faixa sálvia de 178 px. Mais de 60 anos, 4,7/5 com 390 avaliações, estacionamento gratuito e acessibilidade no Shopping Altair. Pílula para o cardápio. | Duas colunas para tradição e nota. Acesso e CTA ficam centralizados abaixo. |
| **4 · Categorias** | Quatro cenas com título de 116 px sobre fotografia, uma frase curta, CTA contextual, posição e controles anterior/próximo. Abas na base. | Uma foto por vez, título em 64–67 px, contador e controles. Permitir gesto horizontal. **Frutos do Mar**, **Chapas & Carnes**, **Entradas & Bar** e **Sobremesas** abrem a família correspondente. |
| **5 · Assinaturas da casa** | Duas fotos amplas em alturas deslocadas. Clássicos de camarão reúne chiclete, moqueca e bobó. Chapas quentes & executivo destaca a picanha e o filé. Cada coluna tem link próprio. Fechar com filetes e M oval. | Uma sequência vertical com o CTA perto da sua fotografia. |
| **6 · Trio de mídia** | Panela, varanda e bebida. Imagem central alta, laterais menores em cotas diferentes. | Preservar a composição em três planos. Reduzir deslocamento para manter o centro e as pontas legíveis. |
| **7 · Avaliações** | Sálvia. Nota **4,7 / 5** e **390 avaliações** de um lado. Do outro, síntese dos temas observados e acesso ao Google. | Nota e síntese empilhadas. “Bobó e chiclete”, porções fartas/quentes e ambiente tranquilo vêm da ficha. Sem nomes atribuídos ou testemunhos fabricados. |
| **8 · Experiência** | Fotografia do salão da lareira e painel verde. “Varanda de dia. Lareira no frio.” Apresentar mesas externas, bar, vinhos, opção infantil e cadeirinhas. | Primeiro a sala, depois o texto e **Consultar reserva** no WhatsApp da bio. |
| **9 · Visite-nos** | Foto real da fachada ajuda a reconhecer a entrada. Endereço, grade de horários, contatos, Google Maps e WhatsApp ficam juntos. | Empilhar foto, endereço, horários e duas ações. O endereço permanece selecionável sem carregar mapa interativo. |
| **10 · Convites** | Fundo `#FFF9F3`, três fotografias com títulos fora da imagem. **Almoço executivo**, **Lareira e vinhos**, **Encontros em família**. | Um convite por vez, com ação para executivo, horários ou reserva. Consultar o prato do dia e a disponibilidade da casa. |
| **11 · FAQ** | Título à esquerda, acordeão à direita. Questões sobre entrega/retirada, reservas, acesso, pagamento e opções de carne/infantil. | Uma coluna, sinal de mais/menos e respostas integrais. Uma pergunta aberta por vez. As cinco respostas estão nos componentes locais do Figma. |
| **12 · Instagram** | Faixa sálvia, `@restaurante.mauricios`, quatro fotos em alturas alternadas e pílula para o perfil. | Recortes em faixa e link legível. Identificar as fotos da prévia como registros do Maps. O perfil é aberto sob ação do visitante. |
| **13 · Rodapé** | Fundo `#151D25`, divisor com monograma, nome em grande escala, endereço, horários e telefones. Links para âncoras, Maps e Instagram, mais **Ver cardápio**. | Preservar a palavra inteira, agrupamentos de contato e CTA largo. |

**Localização e serviço.** Estrada União e Indústria, 11811, lojas 5/6, Shopping Altair, andar G, Itaipava, Petrópolis – RJ, CEP 25750-225. Segunda a quarta, 11h–18h. Quinta e sexta, 11h–22h. Sábado e domingo, 11h–19h. Fixo **(24) 2231-9974** e WhatsApp **(24) 99306-1488**. A ficha do Maps foi consultada em 25/11/2026. O destaque “Novo horário” do Instagram não foi confirmado. Indicar consulta à casa nos feriados. O link de localização usa o identificador da unidade `ChIJVUDop_5UmAARL4ryjMd0rLM`. [Ficha da unidade](https://www.google.com/maps/search/?api=1&query=Restaurante+Mauricio%27s+Itaipava&query_place_id=ChIJVUDop_5UmAARL4ryjMd0rLM)

## Cardápio, item e revisão do pedido

A home aponta para `cardapio.html`. Vincular as chamadas de categoria aos IDs abaixo. Uma busca por ingrediente só inclui os ingredientes conhecidos. O catálogo e os preços precisam de confirmação da casa.

| Categoria | Fragmento | Amostra do protótipo |
| --- | --- | --- |
| Mais pedidos | `#mais-pedidos` | Chiclete, moqueca e bobó de camarão. Usar o destaque apenas nesses pratos. |
| Frutos do Mar | `#frutos-do-mar` | Os três destaques e arroz de camarão |
| Chapas & Carnes | `#chapas-e-carnes` | Picanha na pedra e filé à piamontese |
| Entradas & Petiscos | `#entradas-e-petiscos` | Empada de camarão. Esta é a entrada do CTA “Entradas & Bar”, com Batidas & Bebidas disponível na barra. |
| Executivo | `#executivo` | Frango grelhado como exemplo de enquadramento. A composição do executivo do dia depende da casa. |
| Sobremesas | `#sobremesas` | Flan |
| Batidas & Bebidas | `#batidas-e-bebidas` | Caipirinha de tangerina |

1. **Catálogo.** Cabeçalho compacto com retorno à home, título, aviso **Preços ilustrativos** e busca por nome/ingrediente. Barra de categorias sticky. Atualizar a aba ativa com `IntersectionObserver` quando o início de uma seção cruza a borda inferior da barra. O clique faz a seção correspondente aparecer abaixo dela, com `scroll-margin-top`; só movimentar horizontalmente a barra até revelar a aba ativa. Preservar a ordem original. A busca ignora caixa e acentos, informa número de resultados e permite limpar. O Figma mostra “Chiclete” e uma tela de busca vazia.
2. **Cards.** Desktop com duas colunas e fotos horizontais. No celular, foto de aproximadamente 101 × 103 px à esquerda e nome, descrição, preço e ação à direita. O botão e o card abrem o mesmo detalhe. Repetições em Mais pedidos e na família usam a mesma identidade do produto.
3. **Detalhe.** Modal central no desktop e folha inferior no celular. Foto, nome, descrição, preço unitário ilustrativo, observação opcional, quantidade mínima de uma unidade e CTA para adicionar. O Figma exemplifica a observação com “Talheres à parte”. Na implementação o usuário digita a própria observação. Exibir opções de porção somente após receber as opções reais.
4. **Carrinho.** Coluna lateral no desktop. No celular, barra com subtotal e **Ver carrinho**, seguida de gaveta. Mostrar quantidades, preço unitário, controles de adicionar/diminuir e remover. Carrinho vazio apresenta orientação e impede revisão. Retirada e entrega são escolhas explícitas. Ao escolher retirada, mostrar Shopping Altair, andar G. Em entrega, mostrar o endereço a informar e a taxa a confirmar. Preservar a revisão ao voltar de um detalhe.
5. **Revisão.** Resumir quantidade, prato, observações, modalidade, endereço de entrega quando preenchido, subtotal e situação da taxa. **Abrir WhatsApp** é uma ação manual. O destino previsto é `https://wa.me/5524993061488?text=<resumo codificado>`; usar `encodeURIComponent` uma vez. Reservas usam o WhatsApp da bio. O protótipo de pedido termina na demonstração do resumo. [Contato público do restaurante](https://wa.me/5524993061488)

**Exemplo de cálculo.** Uma moqueca a R$ 92,00 e uma empada a R$ 14,00 somam R$ 106,00. Com mais uma empada, o subtotal vira R$ 120,00. Em JavaScript, somar `quantidade × precoEmCentavos`; formatar com `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })` só ao exibir. Manter taxa desconhecida como **a confirmar**. O total fechado depende dela. Dados de exemplo incluem chiclete R$ 84, bobó R$ 78, arroz de camarão R$ 72, filé R$ 86, picanha R$ 94, frango R$ 38, flan R$ 18 e caipirinha R$ 27.

## Coreografia para GSAP e ScrollTrigger

Os quadros mostram composição, repouso e estados acionáveis. Os tempos abaixo orientam a implementação web e a comparação com a referência visual. Usar um único controlador de rolagem, com o documento em rolagem nativa. Registrar os efeitos por `gsap.matchMedia()` e desfazê-los ao mudar de faixa ou preferência.

| Gatilho e alvo | Entrada, percurso e saída | Celular / movimento reduzido |
| --- | --- | --- |
| Primeiro quadro e header | Exibir o nome, a foto e o CTA principal no primeiro paint. A partir de 72 px, aplicar `.scrolled` com fundo papel, texto verde e filete em 180 ms. No retorno ao topo, restaurar a transparência. Manter contraste durante a troca. | Painel do menu em 260 ms. Linhas entram em sequência de 50 ms. Fechar, restaurar foco e desbloquear a rolagem ao selecionar âncora ou sair. |
| `.line-inner` em títulos internos | Criar máscara por linha com `overflow: hidden`. Ao entrar a 85% da viewport, mover `yPercent: 100 → 0` em 0,78 s, `power3.out`, stagger de 0,06 s, uma vez. Recalcular quebras após fontes e redimensionamento. Manter o nome acessível como uma só frase. | Reduzir duração para 0,50 s. Com movimento reduzido, texto integral imediatamente. A hero principal dispensa reveal de entrada. |
| `.section-home-hero` e colagem | Da hero ao manifesto, reservar 0,55 altura de viewport de transição. Foto da varanda vai de 1,04× a 1,00× e sobe até 4%. Título e botões saem com a dobra. No manifesto, 7 imagens com amplitudes alternadas de −58, +36, −28, +52, −42, +25 e −34 px, de `top bottom` a `bottom top`, scrub 0,6. O centro permanece livre. | Sem pin em telas pequenas. Limitar cada deslocamento a 12–18 px. Em movimento reduzido, duas seções naturais e fotos imóveis. |
| `.section-categories` | Quatro slides. Clique, teclado ou arraste atualizam título, contador, CTA e foto juntos. Próxima foto revela com recorte horizontal, 0,66 s `power2.inOut`; a linha de título sobe 0,56 s após 80 ms. Saída reversa para a categoria anterior. Manter um único estado ativo e resolver cliques rápidos pelo último destino. | Arraste horizontal sem bloquear scroll vertical. Sem autoplay. Movimento reduzido usa troca imediata ou dissolução até 100 ms. |
| `.section-break-border` e trio | Divisor nasce do centro. Cada metade vai de `scaleX(0)` a 1 em 0,72 s, origem na ponta junto do M. No trio, deslocar esquerda −38 px, centro +58 px e direita −22 px em todo o percurso, scrub 0,7. Recortar apenas dentro de cada imagem. | No trio usar até −10 / +16 / −6 px. Divisor completo e fotografias fixas em movimento reduzido. |
| Pílulas `.btn-text` / `.btn-text-hover` | Sob hover com ponteiro fino ou foco visível, primeira cópia sobe de 0 a −105%. Segunda entra de +100% e escala 0,9 → 1 em 0,28 s, `power2.out`. Manter caixa e linha de base. Reverter do progresso atual ao sair. Marcar a cópia visual como `aria-hidden`. | Em touch, manter rótulo único e feedback de pressão. Com movimento reduzido, mudar somente cor ou contorno. |
| FAQ `.section-faq` | Botão atualiza `aria-expanded` e `aria-controls`. Abrir de altura 0 à altura medida em 0,28 s, fechar em 0,22 s. Ao terminar, altura automática para reflow. Mais vira menos. Manter o foco na pergunta. | Usar o mesmo mecanismo. Movimento reduzido troca a altura imediatamente. |
| Modal, revisão e gaveta | Desktop com véu 0 → 55% e painel +12 px → 0 em 0,2 s. Celular sobe a folha desde o rodapé em 0,26 s. Reabrir no último estado válido. Escape ou botão visível fecham e devolvem o foco. | Respeitar `env(safe-area-inset-bottom)`, área de toque de pelo menos 44 px e conteúdo interno rolável. Com movimento reduzido, abrir sem deslocamento. |

**Acessibilidade e carregamento.** Conteúdo e links visíveis no HTML inicial. Carregar primeiro a foto da varanda com dimensões e prioridade adequadas. Demais fotos com tamanhos reservados, recortes responsivos e lazy loading abaixo da dobra. Expor setas do carrossel como botões nomeados, aba ativa com estado programático e mudanças do carrinho em região `aria-live="polite"`. Conter o foco no modal aberto, guardar o acionador e usar anel de foco duplo sobre fotografia. Em falha do JavaScript, conservar acesso às categorias, endereço, telefone e contatos. Na web, substituir a amostra por cardápio e preços validados antes de oferecer pedidos reais.

## Fotografia e materiais provisórios

Abertura com a varanda da unidade, de **mari rellan**, julho de 2021. O salão com bar vem da foto de **Rachel Ewald**, agosto de 2017. Os demais registros usados foram selecionados na galeria da mesma ficha. As camadas de fotografia no Figma identificam a cena e preservam o preenchimento de imagem. Exportar o recorte próprio para cada proporção, mantendo a unidade, o prato e a autoria rastreáveis. Não atribuir as fotos da galeria ao perfil do Instagram. [Fotos da unidade](https://www.google.com/maps/search/?api=1&query=Restaurante+Mauricio%27s+Itaipava&query_place_id=ChIJVUDop_5UmAARL4ryjMd0rLM)

Antes do uso público, confirmar marca em vetor, autorização das imagens, cardápio vigente, preços, porções, taxa e área de entrega, disponibilidade do executivo e horários em feriados. A prévia usa fotografias reais, palavra-marca e preços provisórios. O repositório, o código final e a publicação pertencem à etapa de frontend.

