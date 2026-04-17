import React, { useState, useMemo } from 'react';
import { Calculator, ChefHat, Info, Minus, Plus, Scale, Search, BookOpen, Trash2, Save, X, Edit3 } from 'lucide-react';

// Base de datos de recetas catalogadas por Libro
const recipesDB = [
  // --- LIBRO: MÉTODO TEXTURA PERFECTA ---
  {
    id: 'premezcla',
    book: 'Método Textura Perfecta',
    name: 'Premezcla Casera Universal (40-30-30)',
    baseYield: 1000,
    yieldUnit: 'gramos',
    description: 'El bloque fundacional de tu independencia económica. Rinde 1 kilo.',
    ingredients: [
      { name: 'Almidón de Maíz', amount: 400, unit: 'g' },
      { name: 'Fécula de Mandioca', amount: 300, unit: 'g' },
      { name: 'Harina de Arroz', amount: 300, unit: 'g' }
    ],
    tip: 'Guardá en un recipiente hermético y agitá vigorosamente antes de usar para evitar que las harinas decanten por su peso.'
  },
  
  // --- LIBRO: SIN TACC, SIN DRAMA (LIBRO PRINCIPAL) ---
  {
    id: 'pan_molde',
    book: 'Sin TACC, Sin Drama',
    name: '01. Pan de Molde Sin TACC',
    baseYield: 12,
    yieldUnit: 'rebanadas',
    description: 'El pan de la heladera de siempre. Masa batida, miga suave y elástica.',
    ingredients: [
      { name: 'Premezcla Universal', amount: 280, unit: 'g' },
      { name: 'Psyllium husk en polvo', amount: 15, unit: 'g' },
      { name: 'Levadura seca', amount: 7, unit: 'g' },
      { name: 'Sal fina', amount: 8, unit: 'g' },
      { name: 'Azúcar (para espumar)', amount: 10, unit: 'g' },
      { name: 'Agua tibia', amount: 280, unit: 'ml' },
      { name: 'Aceite de girasol', amount: 30, unit: 'ml' },
      { name: 'Huevo', amount: 1, unit: 'unidad' }
    ],
    tip: 'No le agregues harina extra. La masa debe quedar como una pasta espesa y pegajosa. Usa vapor en el horno.'
  },
  {
    id: 'pan_campesino',
    book: 'Sin TACC, Sin Drama',
    name: '02. Pan Campesino Sin TACC',
    baseYield: 1,
    yieldUnit: 'hogaza',
    description: 'Corteza crocante, miga alveolada. Horneado en cacerola de hierro.',
    ingredients: [
      { name: 'Premezcla Universal', amount: 320, unit: 'g' },
      { name: 'Psyllium husk en polvo', amount: 12, unit: 'g' },
      { name: 'Levadura seca', amount: 5, unit: 'g' },
      { name: 'Sal fina', amount: 9, unit: 'g' },
      { name: 'Azúcar', amount: 5, unit: 'g' },
      { name: 'Agua tibia', amount: 300, unit: 'ml' },
      { name: 'Aceite de oliva', amount: 20, unit: 'ml' },
      { name: 'Huevo', amount: 1, unit: 'unidad' },
      { name: 'Vinagre de manzana', amount: 15, unit: 'ml' }
    ],
    tip: 'El vapor que genera la masa al calentarse queda atrapado en la cacerola cerrada. Es el secreto de la costra profesional.'
  },
  {
    id: 'chipa_paraguayo',
    book: 'Sin TACC, Sin Drama',
    name: '03. Chipá Paraguayo-Correntino',
    baseYield: 20,
    yieldUnit: 'chipás',
    description: 'Costra crujiente e interior chicloso y quesero.',
    ingredients: [
      { name: 'Fécula de mandioca (Almidón)', amount: 500, unit: 'g' },
      { name: 'Queso rallado (Pategrás + Cremoso)', amount: 200, unit: 'g' },
      { name: 'Manteca pomada', amount: 100, unit: 'g' },
      { name: 'Huevos', amount: 2, unit: 'unidades' },
      { name: 'Leche tibia', amount: 100, unit: 'ml' },
      { name: 'Sal fina', amount: 8, unit: 'g' },
      { name: 'Anís en grano', amount: 5, unit: 'g' }
    ],
    tip: 'Si la masa queda seca, agrega la leche tibia de a cucharadas hasta que se despegue de las manos.'
  },
  {
    id: 'pan_hamburguesas',
    book: 'Sin TACC, Sin Drama',
    name: '04. Pan de Hamburguesas',
    baseYield: 8,
    yieldUnit: 'panes',
    description: 'Tiernos, dorados y firmes para aguantar el jugo de la carne.',
    ingredients: [
      { name: 'Premezcla Universal', amount: 300, unit: 'g' },
      { name: 'Psyllium en polvo', amount: 10, unit: 'g' },
      { name: 'Levadura seca', amount: 7, unit: 'g' },
      { name: 'Sal', amount: 8, unit: 'g' },
      { name: 'Azúcar', amount: 15, unit: 'g' },
      { name: 'Leche tibia', amount: 260, unit: 'ml' },
      { name: 'Huevo', amount: 1, unit: 'unidad' },
      { name: 'Manteca derretida', amount: 30, unit: 'g' },
      { name: 'Fécula de mandioca (Para chuño)', amount: 50, unit: 'g' },
      { name: 'Agua fría (Para chuño)', amount: 150, unit: 'ml' }
    ],
    tip: 'Prepara el chuño y agrégalo caliente. Forma los bollos con las manos bien mojadas para alisarlos perfecto.'
  },
  {
    id: 'focaccia',
    book: 'Sin TACC, Sin Drama',
    name: '05. Focaccia con Romero y Oliva',
    baseYield: 12,
    yieldUnit: 'porciones',
    description: 'Pan plano italiano, esponjoso, de masa batida.',
    ingredients: [
      { name: 'Premezcla Universal', amount: 280, unit: 'g' },
      { name: 'Psyllium en polvo', amount: 10, unit: 'g' },
      { name: 'Levadura seca', amount: 7, unit: 'g' },
      { name: 'Sal', amount: 8, unit: 'g' },
      { name: 'Azúcar', amount: 5, unit: 'g' },
      { name: 'Agua tibia', amount: 280, unit: 'ml' },
      { name: 'Aceite de oliva extra virgen', amount: 60, unit: 'ml' },
      { name: 'Huevo', amount: 1, unit: 'unidad' },
      { name: 'Romero fresco', amount: 10, unit: 'g' },
      { name: 'Sal gruesa', amount: 5, unit: 'g' }
    ],
    tip: 'Distribuye la masa líquida con espátula húmeda. Una vez leudada, hunde los dedos bañados en aceite para hacer los hoyuelos.'
  },
  {
    id: 'medialunas_manteca',
    book: 'Sin TACC, Sin Drama',
    name: '06. Medialunas de Manteca',
    baseYield: 16,
    yieldUnit: 'medialunas',
    description: 'Hojaldradas, dulces y con almíbar. El trofeo Sin TACC.',
    ingredients: [
      { name: 'Premezcla Universal', amount: 320, unit: 'g' },
      { name: 'Psyllium en polvo', amount: 8, unit: 'g' },
      { name: 'Levadura seca', amount: 7, unit: 'g' },
      { name: 'Azúcar', amount: 40, unit: 'g' },
      { name: 'Sal', amount: 7, unit: 'g' },
      { name: 'Leche entera tibia', amount: 180, unit: 'ml' },
      { name: 'Huevos', amount: 2, unit: 'unidades' },
      { name: 'Manteca derretida (masa)', amount: 30, unit: 'g' },
      { name: 'Fécula de mandioca (Para chuño)', amount: 50, unit: 'g' },
      { name: 'Agua fría (Para chuño)', amount: 150, unit: 'ml' },
      { name: 'Manteca muy fría (Empaste)', amount: 120, unit: 'g' }
    ],
    tip: 'Si el chuño se enfría, no sirve. Agrégalo en caliente. La manteca del empaste debe estar súper fría pero maleable.'
  },
  {
    id: 'vigilantes',
    book: 'Sin TACC, Sin Drama',
    name: '07. Vigilantes Sin TACC',
    baseYield: 14,
    yieldUnit: 'facturas',
    description: 'Factura alargada con crema pastelera o membrillo.',
    ingredients: [
      { name: 'Premezcla Universal', amount: 300, unit: 'g' },
      { name: 'Psyllium en polvo', amount: 8, unit: 'g' },
      { name: 'Levadura seca', amount: 7, unit: 'g' },
      { name: 'Azúcar', amount: 35, unit: 'g' },
      { name: 'Sal', amount: 7, unit: 'g' },
      { name: 'Leche tibia', amount: 160, unit: 'ml' },
      { name: 'Huevos', amount: 2, unit: 'unidades' },
      { name: 'Manteca derretida', amount: 40, unit: 'g' },
      { name: 'Fécula de mandioca (Para chuño)', amount: 50, unit: 'g' },
      { name: 'Agua fría (Para chuño)', amount: 150, unit: 'ml' },
      { name: 'Dulce de membrillo', amount: 200, unit: 'g' }
    ],
    tip: 'Carga la manga pastelera con la masa y escudilla bastones directos a la bandeja para no lidiar con el amasado.'
  },
  {
    id: 'bolas_fraile',
    book: 'Sin TACC, Sin Drama',
    name: '08. Bolas de Fraile',
    baseYield: 12,
    yieldUnit: 'unidades',
    description: 'Esponjosas, fritas y rellenas de dulce de leche.',
    ingredients: [
      { name: 'Premezcla Universal', amount: 280, unit: 'g' },
      { name: 'Psyllium en polvo', amount: 8, unit: 'g' },
      { name: 'Levadura seca', amount: 7, unit: 'g' },
      { name: 'Azúcar', amount: 30, unit: 'g' },
      { name: 'Sal', amount: 5, unit: 'g' },
      { name: 'Leche tibia', amount: 150, unit: 'ml' },
      { name: 'Huevos', amount: 2, unit: 'unidades' },
      { name: 'Manteca derretida', amount: 35, unit: 'g' },
      { name: 'Fécula de mandioca (Para chuño)', amount: 50, unit: 'g' },
      { name: 'Agua fría (Para chuño)', amount: 150, unit: 'ml' },
      { name: 'Dulce de leche repostero', amount: 200, unit: 'g' }
    ],
    tip: 'El aceite debe estar exactamente a 170ºC. Fríe sobre cuadraditos de papel manteca; se desprenderán solos al freír.'
  },
  {
    id: 'canoncitos',
    book: 'Sin TACC, Sin Drama',
    name: '09. Cañoncitos de Dulce de Leche',
    baseYield: 18,
    yieldUnit: 'cañoncitos',
    description: 'Tubos de hojaldre crocantes rellenos de placer.',
    ingredients: [
      { name: 'Premezcla Universal', amount: 320, unit: 'g' },
      { name: 'Psyllium en polvo', amount: 8, unit: 'g' },
      { name: 'Levadura seca', amount: 7, unit: 'g' },
      { name: 'Azúcar', amount: 20, unit: 'g' },
      { name: 'Sal', amount: 7, unit: 'g' },
      { name: 'Leche tibia', amount: 180, unit: 'ml' },
      { name: 'Huevo', amount: 1, unit: 'unidad' },
      { name: 'Manteca derretida', amount: 30, unit: 'g' },
      { name: 'Fécula de mandioca (Para chuño)', amount: 50, unit: 'g' },
      { name: 'Agua fría (Para chuño)', amount: 150, unit: 'ml' },
      { name: 'Manteca fría (Empaste)', amount: 100, unit: 'g' },
      { name: 'Dulce de leche repostero', amount: 300, unit: 'g' }
    ],
    tip: 'Enrolla en tubos de metal bien engrasados. Retira los tubos inmediatamente al salir del horno antes de que se peguen.'
  },
  {
    id: 'masa_pizza',
    book: 'Sin TACC, Sin Drama',
    name: '10. Masa de Pizza',
    baseYield: 2,
    yieldUnit: 'pizzas',
    description: 'Bordes inflados, base crocante que no parece galleta.',
    ingredients: [
      { name: 'Premezcla Universal', amount: 300, unit: 'g' },
      { name: 'Psyllium en polvo', amount: 10, unit: 'g' },
      { name: 'Levadura seca', amount: 7, unit: 'g' },
      { name: 'Sal', amount: 8, unit: 'g' },
      { name: 'Azúcar', amount: 5, unit: 'g' },
      { name: 'Agua tibia', amount: 220, unit: 'ml' },
      { name: 'Aceite de oliva', amount: 30, unit: 'ml' },
      { name: 'Vinagre de manzana', amount: 5, unit: 'ml' }
    ],
    tip: 'Horno precalentado a 250ºC. El choque térmico es vital para la base crujiente.'
  },
  {
    id: 'tapas_empanadas',
    book: 'Sin TACC, Sin Drama',
    name: '11. Tapas de Empanadas',
    baseYield: 24,
    yieldUnit: 'tapas',
    description: 'Para horno o fritas. Repulgue perfecto que no se rompe.',
    ingredients: [
      { name: 'Premezcla Universal', amount: 350, unit: 'g' },
      { name: 'Psyllium en polvo', amount: 6, unit: 'g' },
      { name: 'Sal', amount: 8, unit: 'g' },
      { name: 'Manteca fría en cubos', amount: 60, unit: 'g' },
      { name: 'Huevo', amount: 1, unit: 'unidad' },
      { name: 'Agua fría', amount: 100, unit: 'ml' },
      { name: 'Fécula de mandioca (Para chuño)', amount: 60, unit: 'g' },
      { name: 'Agua fría (Para chuño)', amount: 180, unit: 'ml' }
    ],
    tip: 'Si las vas a freír, agrega 20g extra de manteca a la masa para que resistan el calor sin abrirse.'
  },
  {
    id: 'bizcochuelo_base',
    book: 'Sin TACC, Sin Drama',
    name: '12. Bizcochuelo Base',
    baseYield: 1,
    yieldUnit: 'torta 24cm',
    description: 'Miga súper aireada, ideal para cumpleaños.',
    ingredients: [
      { name: 'Premezcla Universal', amount: 180, unit: 'g' },
      { name: 'Polvo para hornear', amount: 8, unit: 'g' },
      { name: 'Sal', amount: 1, unit: 'g' },
      { name: 'Huevos (temp. ambiente)', amount: 4, unit: 'unidades' },
      { name: 'Azúcar', amount: 180, unit: 'g' },
      { name: 'Aceite de girasol neutro', amount: 80, unit: 'ml' },
      { name: 'Leche', amount: 80, unit: 'ml' },
      { name: 'Esencia de vainilla', amount: 5, unit: 'ml' }
    ],
    tip: 'Bate los huevos con el azúcar 10 minutos enteros hasta el punto letra (cinta). Es clave para que quede alto y no se apelmace.'
  },
  {
    id: 'budin_limon',
    book: 'Sin TACC, Sin Drama',
    name: '13. Budín de Limón con Glacé',
    baseYield: 1,
    yieldUnit: 'budín inglés',
    description: 'Húmedo, cítrico, el clásico del mate a la tarde.',
    ingredients: [
      { name: 'Premezcla Universal', amount: 200, unit: 'g' },
      { name: 'Polvo para hornear', amount: 8, unit: 'g' },
      { name: 'Bicarbonato de sodio', amount: 2, unit: 'g' },
      { name: 'Sal', amount: 1, unit: 'g' },
      { name: 'Huevos', amount: 3, unit: 'unidades' },
      { name: 'Azúcar', amount: 160, unit: 'g' },
      { name: 'Aceite de girasol', amount: 120, unit: 'ml' },
      { name: 'Jugo de limón fresco', amount: 100, unit: 'ml' },
      { name: 'Ralladura de 2 limones', amount: 10, unit: 'g' },
      { name: 'Azúcar impalpable (Glacé)', amount: 120, unit: 'g' },
      { name: 'Jugo de limón (Glacé)', amount: 30, unit: 'ml' }
    ],
    tip: 'Vuelca el glacé sobre el budín recién salido del horno (pinchado con palillo) para que se hidrate y absorba el limón.'
  },
  {
    id: 'alfajores_marplatenses',
    book: 'Sin TACC, Sin Drama',
    name: '14. Alfajores Marplatenses',
    baseYield: 20,
    yieldUnit: 'alfajores',
    description: 'Masa de cacao tierna, que se deshace en la boca.',
    ingredients: [
      { name: 'Almidón de maíz (NO premezcla)', amount: 250, unit: 'g' },
      { name: 'Harina de arroz', amount: 100, unit: 'g' },
      { name: 'Cacao amargo', amount: 20, unit: 'g' },
      { name: 'Polvo para hornear', amount: 6, unit: 'g' },
      { name: 'Sal', amount: 1, unit: 'g' },
      { name: 'Manteca pomada', amount: 150, unit: 'g' },
      { name: 'Azúcar impalpable', amount: 80, unit: 'g' },
      { name: 'Yemas de huevo', amount: 2, unit: 'unidades' },
      { name: 'Esencia de vainilla', amount: 5, unit: 'ml' },
      { name: 'Coñac o jugo de naranja', amount: 15, unit: 'ml' },
      { name: 'Dulce de leche repostero', amount: 400, unit: 'g' }
    ],
    tip: 'Solo yemas y azúcar impalpable garantizan la textura friable (que se desarma en la boca). ¡Respeta los 160ºC de horno bajo!'
  },
  {
    id: 'galletas_avena_falsa',
    book: 'Sin TACC, Sin Drama',
    name: '15. Galletitas Falsa "Avena"',
    baseYield: 28,
    yieldUnit: 'galletitas',
    description: 'El sabor clásico usando copos de quinoa tostada o mijo.',
    ingredients: [
      { name: 'Premezcla Universal', amount: 150, unit: 'g' },
      { name: 'Copos de quinoa/mijo (sin TACC)', amount: 100, unit: 'g' },
      { name: 'Azúcar rubio', amount: 100, unit: 'g' },
      { name: 'Azúcar negro', amount: 80, unit: 'g' },
      { name: 'Manteca', amount: 120, unit: 'g' },
      { name: 'Huevo', amount: 1, unit: 'unidad' },
      { name: 'Polvo para hornear', amount: 5, unit: 'g' },
      { name: 'Canela', amount: 3, unit: 'g' },
      { name: 'Sal', amount: 2, unit: 'g' },
      { name: 'Chips de chocolate', amount: 100, unit: 'g' }
    ],
    tip: 'Retíralas cuando el borde esté dorado pero el centro blanco; se ponen crujientes al enfriarse.'
  },
  {
    id: 'pan_arabe',
    book: 'Sin TACC, Sin Drama',
    name: '16. Pan Árabe / Pita',
    baseYield: 8,
    yieldUnit: 'pitas',
    description: 'El pan que se infla y hace bolsillo para rellenar.',
    ingredients: [
      { name: 'Premezcla Universal', amount: 280, unit: 'g' },
      { name: 'Psyllium en polvo', amount: 10, unit: 'g' },
      { name: 'Levadura seca', amount: 7, unit: 'g' },
      { name: 'Sal', amount: 8, unit: 'g' },
      { name: 'Azúcar', amount: 5, unit: 'g' },
      { name: 'Agua tibia', amount: 220, unit: 'ml' },
      { name: 'Aceite de oliva', amount: 20, unit: 'ml' }
    ],
    tip: 'Cocinar en sartén ultra caliente (250ºC) 2 minutos por lado. El vapor interno creará el globo.'
  },
  {
    id: 'scones_clasicos',
    book: 'Sin TACC, Sin Drama',
    name: '17. Scones Clásicos',
    baseYield: 12,
    yieldUnit: 'scones',
    description: 'Ideales para mermelada y té, con bordes rugosos.',
    ingredients: [
      { name: 'Premezcla Universal', amount: 250, unit: 'g' },
      { name: 'Polvo para hornear', amount: 8, unit: 'g' },
      { name: 'Sal', amount: 5, unit: 'g' },
      { name: 'Azúcar', amount: 30, unit: 'g' },
      { name: 'Manteca fría en cubos', amount: 80, unit: 'g' },
      { name: 'Huevo', amount: 1, unit: 'unidad' },
      { name: 'Leche fría', amount: 80, unit: 'ml' },
      { name: 'Vinagre de manzana', amount: 5, unit: 'ml' }
    ],
    tip: 'Une la masa sin amasar, usando cortantes o las manos frías. Si amasas, el scone queda duro.'
  },
  {
    id: 'tortitas_negras',
    book: 'Sin TACC, Sin Drama',
    name: '18. Tortitas Negras (Cara Sucias)',
    baseYield: 14,
    yieldUnit: 'facturas',
    description: 'Masa tierna cubierta de una capa densa de azúcar negro.',
    ingredients: [
      { name: 'Premezcla Universal', amount: 300, unit: 'g' },
      { name: 'Psyllium en polvo', amount: 8, unit: 'g' },
      { name: 'Levadura seca', amount: 7, unit: 'g' },
      { name: 'Azúcar', amount: 35, unit: 'g' },
      { name: 'Sal', amount: 7, unit: 'g' },
      { name: 'Leche tibia', amount: 160, unit: 'ml' },
      { name: 'Huevos', amount: 2, unit: 'unidades' },
      { name: 'Manteca derretida', amount: 40, unit: 'g' },
      { name: 'Fécula de mandioca (Para chuño)', amount: 50, unit: 'g' },
      { name: 'Agua fría (Para chuño)', amount: 150, unit: 'ml' },
      { name: 'Azúcar negro', amount: 150, unit: 'g' },
      { name: 'Agua para mojar el azúcar', amount: 30, unit: 'ml' }
    ],
    tip: 'Mezcla el azúcar negro con el agua para hacer una pasta densa; aplícala arriba antes de hornear.'
  },
  {
    id: 'bizcochitos_grasa',
    book: 'Sin TACC, Sin Drama',
    name: '19. Bizcochitos de Grasa',
    baseYield: 40,
    yieldUnit: 'bizcochitos',
    description: 'Salados, crocantes, el mejor amigo del mate amargo.',
    ingredients: [
      { name: 'Premezcla Universal', amount: 200, unit: 'g' },
      { name: 'Polvo para hornear', amount: 5, unit: 'g' },
      { name: 'Sal', amount: 8, unit: 'g' },
      { name: 'Azúcar', amount: 1, unit: 'g' },
      { name: 'Grasa vacuna o vegetal derretida', amount: 80, unit: 'g' },
      { name: 'Agua tibia', amount: 80, unit: 'ml' },
      { name: 'Anís en semillas (opcional)', amount: 5, unit: 'g' }
    ],
    tip: 'Pica cada bizcochito con un tenedor antes de hornear. Dejar enfriar en rejilla para el golpe crocante.'
  },
  {
    id: 'pancakes',
    book: 'Sin TACC, Sin Drama',
    name: '20. Pancakes Esponjosos',
    baseYield: 12,
    yieldUnit: 'pancakes',
    description: 'Desayuno exprés de domingo en sartén.',
    ingredients: [
      { name: 'Premezcla Universal', amount: 180, unit: 'g' },
      { name: 'Polvo para hornear', amount: 8, unit: 'g' },
      { name: 'Sal', amount: 2, unit: 'g' },
      { name: 'Azúcar', amount: 20, unit: 'g' },
      { name: 'Huevos', amount: 2, unit: 'unidades' },
      { name: 'Leche', amount: 200, unit: 'ml' },
      { name: 'Aceite', amount: 30, unit: 'ml' },
      { name: 'Vainilla', amount: 5, unit: 'ml' }
    ],
    tip: 'El secreto de la altura está en batir las claras a nieve e incorporarlas suavemente a lo último.'
  },
  {
    id: 'tarta_queso_clasica',
    book: 'Sin TACC, Sin Drama',
    name: '22. Tarta de Queso Clásica',
    baseYield: 1,
    yieldUnit: 'tarta (22cm)',
    description: 'Cheesecake horneado, base crocante y centro tembloroso.',
    ingredients: [
      { name: 'Galletitas molidas (sin TACC)', amount: 200, unit: 'g' },
      { name: 'Manteca derretida (base)', amount: 80, unit: 'g' },
      { name: 'Queso crema (sin TACC)', amount: 500, unit: 'g' },
      { name: 'Azúcar', amount: 150, unit: 'g' },
      { name: 'Huevos', amount: 3, unit: 'unidades' },
      { name: 'Crema de leche', amount: 200, unit: 'ml' },
      { name: 'Jugo de limón', amount: 30, unit: 'ml' }
    ],
    tip: 'Cocción a baño maría a 160ºC. Apaga cuando el centro aún tiemble un poco. Firmeza perfecta tras 4hs de heladera.'
  },
  {
    id: 'brownies',
    book: 'Sin TACC, Sin Drama',
    name: '26. Brownies de Chocolate',
    baseYield: 9,
    yieldUnit: 'cuadrados',
    description: 'Centro extremadamente húmedo y costra craquelada.',
    ingredients: [
      { name: 'Chocolate semi amargo 70%', amount: 200, unit: 'g' },
      { name: 'Manteca', amount: 150, unit: 'g' },
      { name: 'Huevos', amount: 3, unit: 'unidades' },
      { name: 'Azúcar', amount: 200, unit: 'g' },
      { name: 'Premezcla Universal', amount: 80, unit: 'g' },
      { name: 'Cacao amargo', amount: 20, unit: 'g' },
      { name: 'Sal', amount: 2, unit: 'g' }
    ],
    tip: 'No te pases de horno (20-22 min max a 175ºC). El palillo debe salir con migas húmedas pegadas, nunca limpio.'
  },
  {
    id: 'torta_tres_leches',
    book: 'Sin TACC, Sin Drama',
    name: '30. Torta Tres Leches',
    baseYield: 1,
    yieldUnit: 'torta',
    description: 'El postre de cumpleaños definitivo que absorbe todo el líquido.',
    ingredients: [
      { name: 'Bizcochuelo Base (Ver Receta 12)', amount: 1, unit: 'unidad' },
      { name: 'Crema de leche', amount: 200, unit: 'ml' },
      { name: 'Leche entera', amount: 200, unit: 'ml' },
      { name: 'Leche condensada (sin TACC)', amount: 200, unit: 'ml' },
      { name: 'Crema para montar', amount: 400, unit: 'ml' },
      { name: 'Azúcar impalpable', amount: 50, unit: 'g' }
    ],
    tip: 'Vierte las leches con el bizcochuelo frío (muy pinchado con escarbadientes) para evitar que se desarme.'
  }
];

export default function App() {
  // Estado principal que ahora usa la base de datos inicial y permite agregar nuevas
  const [recipes, setRecipes] = useState(recipesDB);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState(recipesDB[0].id);
  const [multiplier, setMultiplier] = useState(1);
  
  // Estados para el modo "Agregar Receta Manual"
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    book: 'Mis Recetas Manuales',
    description: '',
    baseYield: 1,
    yieldUnit: 'porciones',
    tip: '',
    ingredients: [{ name: '', amount: '', unit: 'g' }]
  });

  // Filtrar recetas por buscador (usando el estado 'recipes', no la DB estática)
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => 
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.book.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, recipes]);

  // Agrupar recetas por libro para el menú lateral
  const groupedRecipes = useMemo(() => {
    return filteredRecipes.reduce((acc: Record<string, typeof recipesDB>, recipe) => {
      if (!acc[recipe.book]) acc[recipe.book] = [];
      acc[recipe.book].push(recipe);
      return acc;
    }, {});
  }, [filteredRecipes]);

  const selectedRecipe = recipes.find(r => r.id === selectedRecipeId);

  const handleIncrement = () => setMultiplier(prev => prev + 0.5);
  const handleDecrement = () => setMultiplier(prev => (prev > 0.5 ? prev - 0.5 : 0.5));

  const handleSelectRecipe = (id) => {
    setSelectedRecipeId(id);
    setMultiplier(1);
    setIsAddingMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- LÓGICA DEL FORMULARIO DE NUEVA RECETA ---
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...newRecipe.ingredients];
    updatedIngredients[index][field] = value;
    setNewRecipe({ ...newRecipe, ingredients: updatedIngredients });
  };

  const addIngredientRow = () => {
    setNewRecipe({
      ...newRecipe,
      ingredients: [...newRecipe.ingredients, { name: '', amount: '', unit: 'g' }]
    });
  };

  const removeIngredientRow = (index) => {
    const updatedIngredients = newRecipe.ingredients.filter((_, i) => i !== index);
    setNewRecipe({ ...newRecipe, ingredients: updatedIngredients });
  };

  const saveNewRecipe = () => {
    // Validación básica
    if (!newRecipe.name || newRecipe.ingredients.length === 0 || !newRecipe.ingredients[0].name) {
      alert("Por favor, ingresa un nombre y al menos un ingrediente.");
      return;
    }

    const recipeToSave = {
      ...newRecipe,
      id: 'custom_' + Date.now(),
      // Convertir amounts a números
      ingredients: newRecipe.ingredients.map(ing => ({
        ...ing,
        amount: parseFloat(ing.amount) || 0
      }))
    };

    setRecipes([recipeToSave, ...recipes]);
    setSelectedRecipeId(recipeToSave.id);
    setIsAddingMode(false);
    // Resetear formulario
    setNewRecipe({
      name: '', book: 'Mis Recetas Manuales', description: '',
      baseYield: 1, yieldUnit: 'porciones', tip: '',
      ingredients: [{ name: '', amount: '', unit: 'g' }]
    });
  };

  return (
    <div id="app-container" className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans selection:bg-[#bbf7d0] flex flex-col">
      {/* Header Sleek */}
      <header className="bg-white text-[#0f172a] h-[70px] border-b border-[#e2e8f0] px-6 md:px-10 flex items-center justify-between z-10 shrink-0">
        <div className="w-full max-w-[1024px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-[#22c55e]" />
            <div className="text-[20px] font-extrabold text-[#22c55e] flex gap-1">
              Sin TACC<span className="font-light text-[#0f172a]">Lab</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-5 text-[14px] font-medium text-[#64748b]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse"></div>
              <span>{recipes.length} recetas en base</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1024px] mx-auto flex flex-col md:grid md:grid-cols-[300px_1fr] gap-0 overflow-hidden">
        
        {/* PANEL LATERAL: Buscador y Lista de Recetas */}
        <aside className="w-full bg-white border-r border-[#e2e8f0] flex flex-col shadow-none">
          <div className="p-[30px] pb-4 flex flex-col gap-4 border-b border-[#e2e8f0] md:border-none md:pb-0">
            <button 
              onClick={() => setIsAddingMode(true)}
              className="w-full bg-[#4ade80] text-white font-bold py-3 rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#22c55e] transition-colors"
            >
              <Plus className="w-5 h-5" /> Nueva Receta
            </button>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#64748b]" />
              </div>
              <input
                type="text"
                placeholder="Buscar recetas..."
                className="w-full pl-[36px] pr-4 py-[10px] bg-[#f8fafc] border border-[#e2e8f0] rounded-[6px] focus:bg-white focus:ring-1 focus:ring-[#4ade80] focus:border-[#4ade80] outline-none transition-all text-[14px] text-[#0f172a]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-y-auto p-[30px] pt-4 flex-1 h-[40vh] md:h-auto custom-scrollbar flex flex-col gap-5">
            {Object.keys(groupedRecipes).length === 0 ? (
              <div className="text-center text-[#64748b] py-8">
                <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-[14px]">No se encontraron recetas.</p>
              </div>
            ) : (
              Object.entries(groupedRecipes).map(([book, bookRecipes]: [string, any]) => (
                <div key={book}>
                  <h2 className="text-[14px] uppercase tracking-[1px] text-[#64748b] mb-[10px] font-bold">{book}</h2>
                  <ul className="m-0 p-0 list-none">
                    {(bookRecipes as typeof recipesDB).map(recipe => (
                      <li key={recipe.id}
                          onClick={() => handleSelectRecipe(recipe.id)}
                          className={`p-[12px_15px] rounded-[8px] mb-2 cursor-pointer transition-colors text-[14px] font-medium flex items-center gap-[10px] ${
                            selectedRecipeId === recipe.id && !isAddingMode
                              ? 'bg-[#f0fdf4] text-[#22c55e] border border-[#bbf7d0]'
                              : 'bg-transparent text-[#0f172a] border border-transparent hover:bg-[#f1f5f9]'
                          }`}
                      >
                        {recipe.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* PANEL PRINCIPAL */}
        <section className="w-full p-4 md:p-[40px] overflow-y-auto bg-[#f8fafc] h-[60vh] md:h-auto custom-scrollbar flex flex-col">
          
          {/* MODO AGREGAR RECETA */}
          {isAddingMode ? (
            <div className="bg-white rounded-[16px] border border-[#e2e8f0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] w-full flex flex-col animation-fade-in p-[24px] md:p-[40px] flex-shrink-0">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-[24px] font-bold text-[#0f172a] mb-1">
                    Creador de Recetas
                  </h1>
                  <p className="text-[14px] text-[#64748b]">Agrega tus propias recetas al sistema.</p>
                </div>
                <button onClick={() => setIsAddingMode(false)} className="p-2 bg-[#f1f5f9] rounded-full hover:bg-[#e2e8f0] transition text-[#64748b]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#64748b] uppercase mb-1">Nombre de la Receta *</label>
                  <input type="text" className="w-full p-[10px_14px] border border-[#e2e8f0] rounded-[6px] focus:ring-1 focus:ring-[#4ade80] focus:border-[#4ade80] outline-none text-[15px]" placeholder="Ej: Falso Pan de Queso" value={newRecipe.name} onChange={e => setNewRecipe({...newRecipe, name: e.target.value})} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#64748b] uppercase mb-1">Rinde Cuánto (Número) *</label>
                    <input type="number" className="w-full p-[10px_14px] border border-[#e2e8f0] rounded-[6px] focus:ring-1 focus:ring-[#4ade80] focus:border-[#4ade80] outline-none text-[15px]" placeholder="Ej: 12" value={newRecipe.baseYield} onChange={e => setNewRecipe({...newRecipe, baseYield: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#64748b] uppercase mb-1">Unidad (Ej: porciones, panes)</label>
                    <input type="text" className="w-full p-[10px_14px] border border-[#e2e8f0] rounded-[6px] focus:ring-1 focus:ring-[#4ade80] focus:border-[#4ade80] outline-none text-[15px]" placeholder="Ej: chipás" value={newRecipe.yieldUnit} onChange={e => setNewRecipe({...newRecipe, yieldUnit: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#64748b] uppercase mb-1">Breve Descripción</label>
                  <input type="text" className="w-full p-[10px_14px] border border-[#e2e8f0] rounded-[6px] focus:ring-1 focus:ring-[#4ade80] focus:border-[#4ade80] outline-none text-[15px]" placeholder="Ej: Ideal para la merienda..." value={newRecipe.description} onChange={e => setNewRecipe({...newRecipe, description: e.target.value})} />
                </div>

                <div className="mt-6 border-t border-[#e2e8f0] pt-6">
                  <label className="block text-[14px] font-bold text-[#0f172a] mb-4">Ingredientes *</label>
                  <div className="space-y-3">
                    {newRecipe.ingredients.map((ing, idx) => (
                      <div key={idx} className="flex flex-wrap md:flex-nowrap gap-2 items-start">
                        <input type="text" placeholder="Ingrediente" className="w-full md:flex-1 p-[10px_14px] border border-[#e2e8f0] rounded-[6px] focus:ring-1 focus:ring-[#4ade80] focus:border-[#4ade80] outline-none text-[15px]" value={ing.name} onChange={e => handleIngredientChange(idx, 'name', e.target.value)} />
                        <input type="number" placeholder="Cant." className="flex-1 md:w-24 p-[10px_14px] border border-[#e2e8f0] rounded-[6px] focus:ring-1 focus:ring-[#4ade80] focus:border-[#4ade80] outline-none text-[15px] text-center" value={ing.amount} onChange={e => handleIngredientChange(idx, 'amount', e.target.value)} />
                        <input type="text" placeholder="Und" className="flex-1 md:w-20 p-[10px_14px] border border-[#e2e8f0] rounded-[6px] focus:ring-1 focus:ring-[#4ade80] focus:border-[#4ade80] outline-none text-[15px] text-center" value={ing.unit} onChange={e => handleIngredientChange(idx, 'unit', e.target.value)} />
                        {newRecipe.ingredients.length > 1 && (
                          <button onClick={() => removeIngredientRow(idx)} className="p-[10px] text-[#ef4444] hover:bg-[#fef2f2] rounded-[6px] transition mt-[2px]">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button onClick={addIngredientRow} className="text-[#22c55e] font-semibold text-[14px] flex items-center gap-1 mt-2 hover:text-[#16a34a]">
                      <Plus className="w-4 h-4" /> Agregar ingrediente
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#64748b] uppercase mb-1">Tip o Secreto</label>
                  <textarea className="w-full p-[10px_14px] border border-[#e2e8f0] rounded-[6px] focus:ring-1 focus:ring-[#4ade80] focus:border-[#4ade80] outline-none text-[15px]" rows={2} placeholder="Agrega un consejo útil..." value={newRecipe.tip} onChange={e => setNewRecipe({...newRecipe, tip: e.target.value})}></textarea>
                </div>

                <div className="pt-4 border-t border-[#e2e8f0] mt-6">
                  <button onClick={saveNewRecipe} className="w-full md:w-auto bg-[#4ade80] text-white font-bold py-[12px] px-[24px] rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#22c55e] transition-colors ml-auto">
                    <Save className="w-5 h-5" /> Guardar Receta
                  </button>
                </div>
              </div>
            </div>
          ) : 
          
          /* MODO VER RECETA (Calculadora) */
          selectedRecipe && (
            <div className="bg-white rounded-[16px] border border-[#e2e8f0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] flex flex-col h-auto min-h-0 animation-fade-in flex-shrink-0">
              <div className="p-[20px] md:p-[24px] border-b border-[#e2e8f0] flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
                <div className="title-area">
                  <h1 className="text-[20px] md:text-[24px] font-bold text-[#0f172a] mb-1 flex items-center flex-wrap gap-2">
                    {selectedRecipe.name}
                    <span className="bg-[#fef3c7] text-[#92400e] px-[8px] py-[4px] rounded-[4px] text-[10px] font-bold tracking-wide uppercase align-middle ml-1">
                      Gluten Free
                    </span>
                  </h1>
                  {selectedRecipe.description && (
                    <p className="text-[13px] md:text-[14px] text-[#64748b]">
                      {selectedRecipe.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-[20px] shrink-0">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold uppercase text-[#64748b]">Porciones</label>
                    <div className="flex items-center gap-1">
                      <button onClick={handleDecrement} className="w-8 h-8 flex items-center justify-center rounded bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#0f172a] font-bold text-lg leading-none cursor-pointer select-none transition-colors">-</button>
                      <div className="w-[80px] py-[8px] px-2 border-2 border-[#e2e8f0] rounded-[6px] text-[16px] font-semibold text-center text-[#0f172a]">
                        {(selectedRecipe.baseYield * multiplier).toFixed(1).replace('.0', '')}
                      </div>
                      <button onClick={handleIncrement} className="w-8 h-8 flex items-center justify-center rounded bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#0f172a] font-bold text-lg leading-none cursor-pointer select-none transition-colors">+</button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold uppercase text-[#64748b]">Multiplicador</label>
                    <div className="font-semibold text-[#22c55e] text-[16px] h-[40px] flex items-center">
                      x {multiplier.toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-[20px] md:p-[24px]">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left pb-[12px] border-b-2 border-[#f8fafc] text-[12px] font-bold uppercase text-[#64748b]">Ingrediente</th>
                      <th className="text-left pb-[12px] border-b-2 border-[#f8fafc] text-[12px] font-bold uppercase text-[#64748b] w-[120px]">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRecipe.ingredients.map((ing, idx) => (
                      <tr key={idx}>
                        <td className="py-[14px] border-b border-[#f1f5f9] text-[14px] md:text-[15px] text-[#0f172a] font-medium">{ing.name}</td>
                        <td className="py-[14px] border-b border-[#f1f5f9] text-[14px] md:text-[15px]">
                          <span className="font-bold text-[#22c55e]">
                            {(ing.amount * multiplier).toFixed(1).replace('.0', '')}
                            <span className="text-[#64748b] text-[13px] font-normal ml-1">{ing.unit}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {selectedRecipe.tip && (
                  <div className="mt-8 p-[16px] bg-[#f8fafc] rounded-[8px] flex items-start gap-3 border border-[#e2e8f0] text-[13px] md:text-[14px] text-[#64748b] leading-relaxed">
                    <Info className="w-5 h-5 flex-shrink-0 text-[#f59e0b] mt-0.5" />
                    <div>
                      <strong className="block text-[#0f172a] font-medium mb-1">Tip de preparación</strong>
                      {selectedRecipe.tip}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-[20px] md:p-[24px] bg-[#fafafa] border-t border-[#e2e8f0] rounded-b-[16px] flex flex-wrap gap-8 items-center shrink-0">
                <div className="flex flex-col">
                  <span className="text-[12px] font-normal text-[#64748b]">Tot. Ingredientes</span>
                  <span className="text-[18px] font-bold text-[#0f172a]">{selectedRecipe.ingredients.length} items</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-normal text-[#64748b]">Presentación</span>
                  <span className="text-[18px] font-bold text-[#0f172a] capitalize">{selectedRecipe.yieldUnit}</span>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
