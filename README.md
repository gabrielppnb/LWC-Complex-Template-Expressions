# LWC Complex Template Expressions (TDX 2026)

Documentacao introdutoria sobre Complex Template Expressions em LWC: conceito, problema que resolve, como funciona e como testar em org Spring '26+.

## O que e

Complex Template Expressions e uma funcionalidade do LWC que permite escrever expressoes JavaScript diretamente no template HTML, reduzindo a necessidade de getters apenas para formatacao/apresentacao.

Exemplos de expressoes:

- concatenacao de texto
- operacoes aritmeticas
- ternarios
- optional chaining e nullish coalescing
- map/filter/join para exibicao

## Problema que ele resolve

Antes desse recurso, qualquer logica minimamente dinamica no template exigia criar getters no arquivo `.js`, mesmo para calculos simples de apresentacao.

Isso gerava:

- boilerplate desnecessario
- troca constante entre HTML e JS
- codigo mais verboso para cenarios triviais de UI

Com Complex Template Expressions, parte dessa logica de exibicao pode ficar no HTML, mais perto da interface.

## Status e disponibilidade

- Status: Beta/Pilot (experimental)
- API minima: `66.0` no `.js-meta.xml`
- Recomendacao oficial atual: evitar uso em producao ate GA

## Como funciona

Fluxo de uso:

1. Definir `apiVersion` 66.0+ no componente.
2. Usar expressoes entre chaves no template.
3. Em atributos, usar expressoes complexas entre aspas (`"{...}"`).
4. Manter no template apenas logica de apresentacao (nao regra de negocio pesada).

## Exemplo rapido

```html
<p>{`Hello ${user?.name ?? 'Guest'}`}</p>
<p>{amount * (1 + taxRate)}</p>
<p>{count > 10 ? 'High' : 'Low'}</p>
<div>{items.filter(i => i.active).map(i => i.name).join(', ')}</div>
```

## Exemplo do PoC (HTML completo)

Trecho real usado no componente `complexTemplateExpressionsPoc`:

```html
<template>
	<section class="demo">
		<h2>Complex Template Expressions PoC</h2>

		<p class="line"><strong>Greeting:</strong> {`Hello ${user?.profile?.name ?? 'Guest'}`}</p>
		<p class="line"><strong>Total + Tax:</strong> {amount * (1 + taxRate)}</p>
		<p class="line"><strong>Stock:</strong> {count > 10 ? 'High stock' : 'Low stock'}</p>
		<p class="line"><strong>Active Items:</strong> {items.filter(i => i.active).map(i => i.name).join(', ') || 'None'}</p>
		<p class="line"><strong>Cart Count:</strong> {itemCount}</p>

		<div class="actions">
			<button class="btn" onclick="{() => itemCount--}">Inline -1</button>
			<button class="btn" onclick="{() => itemCount++}">Inline +1</button>
			<button class="btn" onclick={resetCount}>Reset (JS handler)</button>
		</div>
	</section>
</template>
```

## Regras e restricoes principais

- Nao usar `this` no template (use `{itemCount}`, nao `{this.itemCount}`).
- Apenas arrow functions (sem `function` declaration).
- Arrow function com block body (`{ ... }`) nao e suportada.
- `async/await` nao e suportado.
- Operadores como assignment/update fora de arrow function nao sao suportados.
- Expressoes em atributos precisam estar entre aspas.

## Quando usar

Use quando:

- a logica e curta e claramente de exibicao
- voce quer reduzir getters de formatacao simples

Evite quando:

- ha regra de negocio
- a expressao fica longa/dificil de ler
- precisa de testes unitarios isolados mais robustos

## Como testar no projeto

Este repositorio contem um PoC em:

- `force-app/main/default/lwc/complexTemplateExpressionsPoc`

Deploy:

```bash
sf project deploy start --source-dir force-app/main/default/lwc/complexTemplateExpressionsPoc
```

Teste no App Builder:

1. Adicione o componente **Complex Template Expressions PoC** em uma App/Home Page.
2. Salve e ative.
3. Verifique os campos calculados e a lista filtrada no template.
4. Clique em **Inline -1** para validar update dentro de arrow function inline.

## Troubleshooting

Erro de compilacao por sintaxe:

- confira se o componente esta em `apiVersion` 66.0+
- confira se expressoes em atributos complexos estao entre aspas

Erro por recurso indisponivel na org:

- algumas orgs podem nao ter o comportamento completo habilitado (beta/preview)
- teste em sandbox de preview ou org com Spring '26 plenamente ativa

## Referencias oficiais

- Salesforce Developers Blog: Complex Template Expressions (Spring '26)
- LWC Dev Guide: Template Expressions
- LWC Dev Guide: Considerations and Limitations
