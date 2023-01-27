const foodTypes: string[] = ['foods', 'beverages'];
const foodCategories = [
  {
    name: 'Entradas',
    image:
      'https://b1861587.smushcdn.com/1861587/wp-content/themes/yootheme/cache/80/entradas-para-cardapio-restaurante-804ebbe0.jpeg?lossy=1&strip=1&webp=1',
    typeId: 1,
  },
  {
    typeId: 1,
    name: 'Lanches',
    image: 'https://www.sabornamesa.com.br/media/k2/items/cache/bf1e20a4462b71e3cc4cece2a8c96ac8_XL.jpg',
  },
  {
    typeId: 1,
    name: 'Pratos Principais',
    image: 'https://f.i.uol.com.br/fotografia/2011/09/01/81264-970x600-1.jpeg',
  },
  {
    typeId: 1,
    name: 'Sobremesas',
    image: 'https://cdn.abrahao.com.br/base/fa1/4db/4d8/tipos-sobremesa-para-vender.jpg',
  },
];
const beveragesCategories = [
  {
    typeId: 2,
    name: 'Não Alcoólicos',
    image:
        'https://tudorondonia.com/uploads/11-12-20-c5rh6shqd80e006.jpg',
  },
  {
    typeId: 2,
    name: 'Cerveja',
    image: 'https://content.paodeacucar.com/wp-content/uploads/2017/03/tipos-de-cerveja-vienna.jpg',
  },
  {
    typeId: 2,
    name: 'Drinks da Casa',
    image: 'https://www.receiteria.com.br/wp-content/uploads/receitas-de-drinks-faceis-0.jpg',
  },
  {
    typeId: 2,
    name: 'Carta de Vinhos',
    image:
        'https://ichef.bbci.co.uk/news/640/cpsprodpb/3E8F/production/_127251061_c2018252-e442-4ee1-905e-9f55c6deb967.jpg',
  },
];

const optionals = [
  {
    name: "Parmesão",
    value: 500,
  },
  {
    name: "Gorgonzola",
    value: 600,
  },
  {
    name: "Fatias de pão",
    value: 200,
  },
  {
    name: "Ovo frito",
    value: 250,
  },
  {
    name: "Fatias de bacon",
    value: 350,
  },
  {
    name: "Mix de folhas",
    value: 600,
  },
  {
    name: "Purê de batata",
    value: 800,
  },
  {
    name: "Polenta frita",
    value: 1000,
  },
  {
    name: "Maionese caseira",
    value: 300,
  },
  {
    name: "Batata frita",
    value: 1000,
  },
  {
    name: "Chantilly",
    value: 300,
  },
  {
    name: "Marshmellow",
    value: 500,
  },
  {
    name: "Água com gás",
    value: 500,
  },
  {
    name: "Copos",
    value: 0,
  },
]

const productsList = [
  {
    name: "CANJA DE FRANGO",
    description: "Peito de frango, abóbora, abobrinha, cenoura e tomate cozidos em caldo da casa.",
    value: 4300,
    categoryId: 1,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/71a2c10a-adf5-4cb5-a839-c7e4be4bcb99/202005142358_B1x1_i.jpg"
  },
  {
    name: "CLÁSSICO PÃO DE QUEIJO",
    description: "6 unidades de pães caseiros assados em nosso forno de barro",
    value: 1700,
    categoryId: 1,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/71a2c10a-adf5-4cb5-a839-c7e4be4bcb99/201911051112_FVWo_p.jpg"
  },
  {
    name: "MINI PASTEL DE QUEIJO",
    description: "Releitura do pastel tradicional. 5 unidades pastel feito com massa wanton queijo e manjericão empanadas com farinha panko",
    value: 1700,
    categoryId: 1,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/56eea577-9bd7-430b-a88a-20802aefa85c/202104251301_8463_.jpeg"
  },
  {
    name: "SALADA DO CHEFE",
    description: "Mix de alfaces,cenoura, tomate e molho de mostarda em grão.",
    value: 3000,
    categoryId: 1,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/3f8ff572-b3ed-496f-b298-3abc9bfd5fc8/202101270741_No0B_.jpeg"
  },
  {
    name: "SOPA DE ALHO PORO",
    description: "Para se aquecer nesse frio. Deliciosa sopa de alho poro",
    value: 2600,
    categoryId: 1,
    image: "https://img.itdg.com.br/tdg/images/blog/uploads/2018/11/shutterstock_732036895.jpg?w=1200"
  },
  {
    name: "BAIÃO DE DOIS",
    description: "Preparado com arroz, feijão de corda, linguiça, bacon, queijo coalho. Finalizado com cebolinha e um crocante torresmo.",
    value: 4800,
    categoryId: 3,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/56eea577-9bd7-430b-a88a-20802aefa85c/202104251458_4I5B_.jpeg"
  },
  {
    name: "BIFE ACEBOLADO NA BRASA",
    description: "Bife selado na brasa, finalizado com molho roti de carne bovina e bacon, arroz branco, feijão preto e farofa de ovos",
    value: 6600,
    categoryId: 3,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/71a2c10a-adf5-4cb5-a839-c7e4be4bcb99/202005150005_lEu7_b.jpg"
  },
  {
    name: "COMERCIAL DA CASA",
    description: "Releitura do tradicional paulistano composta por arroz branco, bife de chorizo, batata palito e ovo frito.",
    value: 6100,
    categoryId: 3,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/56eea577-9bd7-430b-a88a-20802aefa85c/202104251520_0IJT_.jpeg"
  },
  {
    name: "FILÉ MIGON Á PARMEGIANNA",
    description: "Filé Mignon gratinado com queijo minas padrão, molho de tomates frescos, arroz branco e batata palito.",
    value: 7600,
    categoryId: 3,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/56eea577-9bd7-430b-a88a-20802aefa85c/202104251512_0M50_.jpeg"
  },
  {
    name: "FILÉ DE FRANGO",
    description: "Filé de frango com arroz de brócolis",
    value: 4500,
    categoryId: 3,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/56eea577-9bd7-430b-a88a-20802aefa85c/202105170859_paCk_p.jpg"
  },
  {
    name: "FRANGO PARMEGIANA",
    description: "Filé de frango gratinado com queijo minas padrão, molho de tomates frescos, arroz branco e batata soufflée.",
    value: 4800,
    categoryId: 3,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/71a2c10a-adf5-4cb5-a839-c7e4be4bcb99/202005150006_o2QV_p.jpg"
  },
  {
    name: "MAMINHA GRELHADA",
    description: "Acompanha arroz, feijão e farofa de ovos",
    value: 8000,
    categoryId: 3,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/3f8ff572-b3ed-496f-b298-3abc9bfd5fc8/202101270743_Bo35_.jpeg"
  },
  {
    name: "PICADINHO DA FAZENDA",
    description: "Picadinho de contra filé, acompanha arroz branco, feijão preto, banana à milanesa, couve, farofa e ovo frito.",
    value: 7000,
    categoryId: 3,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/71a2c10a-adf5-4cb5-a839-c7e4be4bcb99/202005150006_Sbha_p.jpg"
  },
  {
    name: "STROGONOFF DE FILÉ MIGNON",
    description: "Filé mignon com champignon fresco, arroz branco e batata palha.",
    value: 7100,
    categoryId: 3,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/71a2c10a-adf5-4cb5-a839-c7e4be4bcb99/202005150007_RRqV_s.jpg"
  },
  {
    name: "VIRADA PAULISTA",
    description: "Surpreenda-se com esta releitura paulistana feita pelos chefes. Arroz, tutu de feijão, bisteca, linguiça de lombo, couve branqueada e torresmo.",
    value: 5400,
    categoryId: 3,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/56eea577-9bd7-430b-a88a-20802aefa85c/202104251524_I1NO_.jpeg"
  },
  {
    name: "BOLO DE TAPIOCA",
    description: "Macio bolo de tapioca granulada com leite de coco e coco ralado",
    value: 600,
    categoryId: 4,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/3f8ff572-b3ed-496f-b298-3abc9bfd5fc8/202102241515_Yo3G_.jpeg"
  },
  {
    name: "BOLO DE CENOURA COM CHOCOLATE BELGA",
    description: "Delicioso bolo de cenoura, finalizado com calda de chocolate Callebeaut.",
    value: 1400,
    categoryId: 4,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/56eea577-9bd7-430b-a88a-20802aefa85c/202104251536_1M7X_.jpeg"
  },
  {
    name: "BRIGADEIRO DE CHOCOLATE BELGA",
    description: "6 unidades de brigadeiros feito com chocolate nêmeses.",
    value: 1400,
    categoryId: 4,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/56eea577-9bd7-430b-a88a-20802aefa85c/202112082037_UfxW_p.jpg"
  },
  {
    name: "PUDIM DE LEITE",
    description: "Sobremesa individual. Servido com calda cremosa de caramelo",
    value: 2100,
    categoryId: 4,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/71a2c10a-adf5-4cb5-a839-c7e4be4bcb99/201910311510_7lNO_a.jpg"
  },
  {
    name: "QUINDIM",
    description: "Sobremesa individual. Quindim cremoso acompanhado de lascas de coco torradas",
    value: 2300,
    categoryId: 4,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/71a2c10a-adf5-4cb5-a839-c7e4be4bcb99/201911051324_GH4J_q.jpg"
  },
  {
    name: "SALADA DE FRUTAS",
    description: "Mix de frutas da época",
    value: 2500,
    categoryId: 4,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/56eea577-9bd7-430b-a88a-20802aefa85c/202105161114_86I3_.jpeg"
  },
  {
    name: "MUFFIN DE BLUBERRY",
    description: "Muffin de mirtilo e morangos frescos, sem adição de conservantes",
    value: 1800,
    categoryId: 4,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/56eea577-9bd7-430b-a88a-20802aefa85c/202209181235_1SF3_i.jpg"
  },
  {
    name: "AMERICAN CHICKEN",
    description: "Frango empanado, queijo muçarela derretido, alface americana, picles e molho à sua escolha.",
    value: 3300,
    categoryId: 2,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/c938537f-9a4b-4962-9f1e-7dd822cf339d/202202221810_U515_i.jpg"
  },
  {
    name: "AMERICANO",
    description: "Da terra do tio sam. 110g de blend burguês, queijo cheddar, fatias de bacon crocante e o sabor especial do molho barbecue.",
    value: 3600,
    categoryId: 2,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/c3e797dd-9f39-40d6-bb8a-8628b6cccb23/202112101536_1FB8_i.jpg"
  },
  {
    name: "BACON BBQ",
    description: "Pão brioche, blend Burguês 110g, queijo cheddar cremoso, cebola crocante, Bacon Seara Gourmet, picles de pepino e molho barbecue.",
    value: 3400,
    categoryId: 2,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/c938537f-9a4b-4962-9f1e-7dd822cf339d/202208181259_7756_i.jpg"
  },
  {
    name: "CHEDDAR",
    description: "110g de blend burguês, queijo cheddar, cebola em tiras mergulhada no molho shoyu e um banho de farofa de bacon",
    value: 3700,
    categoryId: 2,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/238e2621-fe02-45df-bd7e-3561676f5a69/202207081731_WAP6_i.jpg"
  },
  {
    name: "CHEESEBURGUÊS",
    description: "O tradicional cheeseburguer! - 110g de blend burguês com queijo muçarela, com sabor especial do molho barbecue.",
    value: 2900,
    categoryId: 2,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/c3e797dd-9f39-40d6-bb8a-8628b6cccb23/202112101538_2Q50_i.jpg"
  },
  {
    name: "CLÁSSICO",
    description: "110g de blend burguês, queijo muçarela, picles, bacon e o sabor especial do molho secreto",
    value: 3800,
    categoryId: 2,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/c3e797dd-9f39-40d6-bb8a-8628b6cccb23/202112101539_D5XK_i.jpg"
  },
  {
    name: "COSTELA ANGUS",
    description: "O fora da curva! 180g de costela bovina angus, queijo cheddar, alface, bacon, pico de gallo e molho â sua escolha.",
    value: 4200,
    categoryId: 2,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/c3e797dd-9f39-40d6-bb8a-8628b6cccb23/202112101540_40X6_i.jpg"
  },
  {
    name: "COSTELA CHEDDAR BOMB",
    description: "Uma explosão de sabor! Molho de pimenta sriracha (Picante), 180g de costela bovina angus, queijo cheddar derretido, tiras de bacon e creme de cheddar",
    value: 4600,
    categoryId: 2,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/c938537f-9a4b-4962-9f1e-7dd822cf339d/202202041217_5X08_i.jpg"
  },
  {
    name: "ÁGUA CRYSTAL SEM GÁS VIP 350ML",
    description: "Garrafa 350ml",
    value: 500,
    categoryId: 5,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202204121136_j23iqb70kud.jpg"
  },
  {
    name: "ÁGUA CRYSTAL COM GÁS VIP 350ML",
    description: "Garrafa 350ml",
    value: 500,
    categoryId: 5,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202204121127_gm3t3i9krbb.jpg"
  },
  {
    name: "COCA-COLA ORIGINAL 250ML",
    description: "Garrafa 250ml",
    value: 800,
    categoryId: 5,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210190430_54ls5w3w7gc.jpg"
  },
  {
    name: "FANTA GUARANÁ 350ML",
    description: "Lata 350ml",
    value: 800,
    categoryId: 5,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/820af392-002c-47b1-bfae-d7ef31743c7f/202210311529_yra9lc7oyj.jpg"
  },
  {
    name: "SUCOS NATURAIS",
    description: "Opções: Laranja, Abacaxi, Maracujá, Morango e Melancia",
    value: 1200,
    categoryId: 5,
    image: "https://cdn.deliway.com.br/blog/base/6a3/c8e/9db/sucos-diferentes.jpg"
  },
  {
    name: "BATIDA DE COCO",
    description: "Tradicional batida da casa, preparada com Cachaça Tulha Branca, leite de coco e xarope de açúcar. Serve 2 pessoas",
    value: 3800,
    categoryId: 7,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/041ac111-a88c-408e-b03e-2f04a6ef856b/202102241348_qUpg_.jpeg"
  },
  {
    name: "BATIDA DE MARACUJÁ",
    description: "Tradicional batida da casa, preparada com Cachaça Tulha Branca, polpa de maracujá e xarope de açúcar. Serve 2 pessoas",
    value: 3800,
    categoryId: 7,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/041ac111-a88c-408e-b03e-2f04a6ef856b/202102241350_o4Iw_.jpeg"
  },
  {
    name: "BATIDA DE LIMÃO",
    description: "Tradicional Batida da casa, preparada com Cachaça Tulha Branca, limão taiti e xarope de açúcar. Serve 2 pessoas",
    value: 3800,
    categoryId: 7,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/041ac111-a88c-408e-b03e-2f04a6ef856b/202102241345_p511_.jpeg"
  },
  {
    name: "GIN TÔNICA 300ML",
    description: "Gin Gordon's com 2 pedrinhas de gelo, uma rodela de limão siciliano e especiarias (zimbro e pimenta rosa).",
    value: 3400,
    categoryId: 7,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/fdce1751-f661-4a33-a97f-2e057097fa97/202004291854_qo1W_g.png"
  },
  {
    name: "MOSCOW MULE 200ML",
    description: "Vodka Absolut, suco de limão, xarope de gengibre, água com gás, hortelã e uma espuma cremosa de gengibre.",
    value: 3200,
    categoryId: 7,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/fdce1751-f661-4a33-a97f-2e057097fa97/202005271722_3Z4d_m.png"
  },
  {
    name: "CHOPP PILSEN 300ML",
    description: "Chopp pilsen servido em copo próprio extremamente gelado.",
    value: 900,
    categoryId: 6,
    image: "https://images.tcdn.com.br/img/img_prod/420472/kit_de_insumos_cerveja_artesanal_pilsen_ale_113_1_20170411152937.jpg"
  },
  {
    name: "CHOPP AMERICAN IPA 300ML",
    description: "Chopp american IPA servido em copo próprio extremamente gelado.",
    value: 1200,
    categoryId: 6,
    image: "https://images.tcdn.com.br/img/img_prod/420472/kit_de_insumos_cerveja_artesanal_american_ipa_opcoes_de_10_a_60l_109_1_20190906105206.jpg"
  },
  {
    name: "CHOPP RED ALE 300ML",
    description: "Chopp red ale servido em copo próprio extremamente gelado.",
    value: 1200,
    categoryId: 6,
    image: "https://images.tcdn.com.br/img/img_prod/420472/kit_de_insumos_cerveja_artesanal_red_ale_117_1_20170411153033.jpg"
  },
  {
    name: "CHOPP SESSION 300ML",
    description: "Chopp session servido em copo próprio extremamente gelado.",
    value: 1500,
    categoryId: 6,
    image: "https://images.tcdn.com.br/img/img_prod/420472/kit_de_insumos_cerveja_artesanal_session_ipa_opcoes_de_10_a_40l_1307_1_20181025140012.jpg"
  },
  {
    name: "CHOPP STOUT 300ML",
    description: "Chopp stout servido em copo próprio extremamente gelado.",
    value: 1100,
    categoryId: 6,
    image: "https://images.tcdn.com.br/img/img_prod/420472/kit_de_insumos_cerveja_artesanal_stout_119_1_20170411153127.jpg"
  },
  {
    name: "TAÇA DE VINHO TINTO DON SIMON SELECCION TEMPRANILLO",
    description: "Região: Castilla-La Mancha. Uvas: Tempranillo",
    value: 1200,
    categoryId: 8,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/ebe8c9fb-ec96-4013-86d0-4f0b0ae30000/202008261712_v5h2_e.jpg"
  },
  {
    name: "TAÇA DE AROS CABERNET SAUVIGNON 2021",
    description: "Região: Valle Central. Uvas: Cabernet Sauvignon",
    value: 1000,
    categoryId: 8,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/ebe8c9fb-ec96-4013-86d0-4f0b0ae30000/202209081644_DSTK_i.jpg"
  },

  {
    name: "TAÇA DE FUENTEVINA PINOT NOIR",
    description: "Região: Extremadura. Uvas: Pinot Noir",
    value: 2200,
    categoryId: 8,
    image: "https://www.ifood.com.br/delivery/sao-paulo-sp/evino---morumbi-vila-progredior/4ff10472-4b9b-44c5-a948-7044016b5eaf?item=4c5075c2-517a-42f8-a004-3036c85ed8cc"
  },

  {
    name: "TAÇA DE FIELO CABERNET SAUVIGNON MERLOT 2020",
    description: "Região: Valle Central. Uvas: Várias Uvas",
    value: 1000,
    categoryId: 8,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/ebe8c9fb-ec96-4013-86d0-4f0b0ae30000/202209081501_684G_i.jpg"
  },

  {
    name: "TAÇA DE PINOT GRIGIO VILLAGGIO 2020",
    description: "Região: Sicília. Uvas: Pinot Grigio",
    value: 3500,
    categoryId: 8,
    image: "https://static-images.ifood.com.br/image/upload/t_medium/pratos/ebe8c9fb-ec96-4013-86d0-4f0b0ae30000/202205171554_7474_i.jpg"
  },
]

export {
  foodTypes,
  foodCategories,
  beveragesCategories,
  optionals,
  productsList
}