# Description

Vamos implementr um sistema de vendas online com a possibilidade de realizar pedidos com múltiplos itens, cada um deles com uma quatidade variável, calculando o frete, os impostos, aplicando um cupom de desconto e ainda interagindo com o estoque. Além disso teremos ainda fluxos de pagamento e cancelamento de pedido realizado.

# Considerations

- O valor do frete será calculado de acordo com a fórmula
- O valor mínimo é de R$10,00
- Como não temos uma forma de calcular o CEP de origem e destino para chegar na distância, por hora ela será 1000 (fixo)
- Não existem diferentes modalidades de frete (normal, expresso, …) e a origem dos produtos é sempre a mesma, além disso não existe diferença no destino, se é capital ou interior, o cálculo é feito basicamente considerando a distância, o volume e a densidade transportados


# Tests

1 - Não deve criar um pedido com cpf inválido ✅
2 - Deve criar um pedido com 3 itens (com descrição, preço e quantidade) ✅
3 - Deve criar um pedido com cupom de desconto (percentual sobre o total do pedido) ✅
4 - Não deve aplicar cupom de desconto expirado ✅
5 - Ao fazer um pedido, a quantidade de um item não pode ser negativa ✅
6 - Ao fazer um pedido, o mesmo item não pode ser informado mais de uma vez ✅
7 - Nenhuma dimensão do item pode ser negativa ✅
8 - O peso do item não pode ser negativo ✅
9 - Deve calcular o valor do frete com base nas dimensões (altura, largura e profundidade em cm) e o peso dos produtos (em kg) ✅
10 - Deve retornar o preço mínimo de frete caso ele seja superior ao valor calculado ✅

# Fórmulas

### Fórmula de Cálculo do Frete

Preço do Frete = distância (km) * volume (m3) * (densidade/100)

### Exemplos de volume ocupado (cubagem)

- Camera: 20cm x 15 cm x 10 cm = 0,003 m3
- Guitarra: 100cm x 30cm x 10cm = 0,03 m3
- Geladeira: 200cm x 100cm x 50cm = 1 m3

### Exemplos de densidade

- Camera: 1kg / 0,003 m3 = 333kg/m3
- Guitarra: 3kg / 0,03 m3 = 100kg/m3
- Geladeira: 40kg / 1 m3 = 40kg/m3

### Exemplos

distância: 1000 (fixo)
volume: 0,003
densidade: 333
preço: R$9,90 (1000 * 0,003 * (333/100))

distância: 1000 (fixo)
volume: 0,03
densidade: 100
preço: R$30,00 (1000 * 0,03 * (100/100))
