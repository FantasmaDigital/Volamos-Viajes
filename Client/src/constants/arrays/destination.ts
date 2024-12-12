import { Destination } from "../../interface/destination.interface";

const destinations: Destination[] = [
  {
    name: "Bocas del toro, Panamá",
    package: [
      {
        description: "Especial para Luna de Miel o Aniversario",
        days: [
          {
            avalible: "3 Dias, 2 Noches",
            text: "Punta Caracol Acqua - Lodge",
          },
        ],
        includes: [
          "Traslados desde - hacia Aeropuerto Internacional y Nacional.",
          "Dos noches en Hotel Punta Caracol Acqua - Lodge",
          "Cesta artesanal de piña llena de ensalada de frutas tropicales en la habitación a la llegada",
          "Botella de champán francés en la primera cena",
          "Desayuno completo todos los días",
          "Cóctel de bienvenida",
          "Kayak, equipo de snorkel",
          "Té, café y galletas cada media tarde",
          "Cena a la luz de las velas en nuestro restaurante sobre el mar todas las noches",
          "Full Day en Bocas (Avistamiento de delfines, cayo coral, cayo zapatilla, avistamiento de perezosos)",
          "Una bolsa de regalo del Hotel Punta Coral",
          "Wifi las 24 horas",
          "Botella de agua mineral diaria en la suite",
        ],
        table: [
          {
            title: "Precios por pareja",
            rows: [
              ["Hotel", "Precio paquete por 2 personas", "Noche adicional (2 pax)"],
              ["Punta Caracol Acqua - Lodge", "$1,409.00", "$639.00"],
            ]
          }
        ],
        policy: [
          "Tarifas sujetas a cambios sin previo aviso",
          "Hotel se reserva el derecho de dar por terminada la promocion cuando asi su cierre de ventas lo determine",
          "No incluye Boleto Aereo PAC - BOC - PAC",
          "En caso de no tomar alguna actividad, NO aplica reembolso",
        ],
        avalibleUntil: "Precios validos hasta 31 marzo 2025. Consultar disponibilidad",
      },
      {
        description: "Escapada entre familia o amigos",
        days: [
          {
            avalible: "3 Dias, 2 Noches",
            text: "Punta Caracol Acqua - Lodge",
          },
        ],
        includes: [
          "Traslados desde - hacia Aeropuerto Internacional y Nacional.",
          "Dos noches en Hotel Punta Caracol Acqua - Lodge",
          "Cesta artesanal de piña llena de ensalada de frutas tropicales en la habitación a la llegada",
          "Botella de champán francés en la primera cena",
          "Desayuno completo todos los días",
          "Cóctel de bienvenida",
          "Kayak, equipo de snorkel",
          "Té, café y galletas cada media tarde",
          "Cena a la luz de las velas en nuestro restaurante sobre el mar todas las noches",
          "Full Day en Bocas (Avistamiento de delfines, cayo coral, cayo zapatilla, avistamiento de perezosos)",
          "Una bolsa de regalo del Hotel Punta Coral",
          "Cortesia Foto y Retrato de recuerdo",
          "Wifi las 24 horas",
          "Botella de agua mineral diaria en la suite",
        ],
        table: [
          {
            title: "Precios por familia",
            rows: [
              ["Hotel", "Precio paquete por 4 personas", "Noche adicional (4 pax)"],
              ["Punta Caracol Acqua - Lodge", "$1,666.00", "$670.00"],
            ]
          }
        ],
        policy: [
          "Tarifas hasta 4 pasajeros en habitacion",
          "Tarifas sujetas a cambios sin previo aviso",
          "Hotel se reserva el derecho de dar por terminada la promocion cuando asi su cierre de ventas lo determine",
          "No incluye Boleto Aereo PAC - BOC - PAC",
          "En caso de no tomar alguna actividad, NO aplica reembolso",
        ],
        avalibleUntil: "Precios validos hasta 31 marzo 2025. Consultar disponibilidad",
      }
    ],
    images: [
      "/img/destinations/bocas-del-toro-1.jpg",
      "/img/destinations/bocas-del-toro-2.jpg",
      "/img/destinations/bocas-del-toro-3.jpg",
      "/img/destinations/bocas-del-toro-4.jpg",
      "/img/destinations/bocas-del-toro-5.jpg",
    ],
  },
  {
    name: "Panamá Atracción POIN",
    package: [
      {
        description: "Disfruta de un paquete completo en Panamá con tours incluidos.",
        days: [
          { avalible: "3 noches", text: "Plan con desayuno diario y traslados." },
        ],
        includes: [
          "03 noches de alojamiento.",
          "Plan de alimentación con desayunos diarios.",
          "Traslado Aeropuerto - Hotel - Aeropuerto (servicio compartido).",
          "Tour Ciudad y Canal con entradas incluidas + Tour de Compras.",
          "Atracción Mirador de Cristal en POIN Panamá + Tour Virtual 360 + Museo Caja de Luces.",
          "Tarjeta de descuentos en centros comerciales Multiplaza y Albrook Mall.",
          "Cortesía botella de ron nacional o taza de diseño exclusivo.",
        ],
        table: [
          {
            title: "Precios por persona",
            rows: [
              ["Hotel", "Sencilla", "Doble", "Triple", "Menor (6-11 años)"],
              ["Marinn Place (ex Hyatt)", "$413.00", "$240.00", "$225.00", "$105.00"],
              ["EXE Oriental Panamá", "$421.00", "$245.00", "$225.00", "$105.00"],
              ["Studio Coliving Hotel", "$371.00", "$217.00", "$210.00", "$143.00"],
            ],
          },
        ],
        policy: [
          "Precios sujetos a disponibilidad.",
          "Última fecha de compra: 20 de diciembre.",
          "Paquete válido para viajar del 02 de enero al 31 de marzo de 2025.",
          "No incluye servicios no detallados en el programa.",
          "Aplica recargo por pago con tarjeta de crédito.",
          "Aplica gastos de cancelación.",
        ],
        avalibleUntil: "20 de diciembre de 2024",
        toursIncluded: [
          {
            name: "Cinta Costera",
            duration: "Variable",
            description: `Explora la emblemática Cinta Costera, un oasis verde en el corazón de la ciudad de Panamá. Este espacio conecta el sector moderno de Punta Paitilla con el histórico Casco Antiguo, brindando una transición única entre lo contemporáneo y lo histórico.`,
          },
          {
            name: "Canal de Panamá - Esclusas de Miraflores",
            duration: "Variable",
            description: `Visita el icónico Canal de Panamá y el Centro de Visitantes de Miraflores. Aprende sobre esta maravilla de la ingeniería y observa de cerca el tránsito de los barcos. El centro cuenta con terrazas de observación, una tienda de recuerdos, y salas de exhibición interactivas.`,
          },
          {
            name: "Casco Antiguo",
            duration: "Variable",
            description: `Pasea por el histórico Casco Antiguo, declarado Patrimonio de la Humanidad por la UNESCO. Este barrio combina estilos arquitectónicos caribeños, modernos, franceses y coloniales. Descubre monumentos como la Catedral Metropolitana y el Teatro Nacional.`,
          },
          {
            name: "Mercado de Artesanías",
            duration: "Variable",
            description: `Visita el vibrante Mercado de Artesanías, donde podrás adquirir molas, chaquiras, sombreros pintados y más. Interactúa con artesanos locales y lleva a casa recuerdos únicos de Panamá.`,
          },
          {
            name: "Calzada de Amador",
            duration: "Variable",
            description: `Disfruta de un paseo por la pintoresca Calzada de Amador, que conecta varias islas. Este destino ofrece vistas espectaculares del Océano Pacífico y la moderna ciudad de Panamá.`,
          },
          {
            name: "Mirador de Cristal",
            duration: "3 horas",
            description: `Admira vistas panorámicas de 360° desde el Mirador de Cristal, una plataforma de vidrio que ofrece una experiencia emocionante suspendido sobre la ciudad.`,
          },
          {
            name: "Tour Virtual 360°",
            duration: "3 horas",
            description: `Sumérgete en una experiencia envolvente que te transportará a los lugares más emblemáticos de Panamá desde una perspectiva única.`,
          },
          {
            name: "Museo Caja de Luces",
            duration: "3 horas",
            description: `Explora el Museo Caja de Luces, donde el arte y la tecnología se combinan para crear espectáculos visuales interactivos e impresionantes.`,
          },
        ],
      },
    ],
    images: [
      "/img/destinations/poin-panama-1.jpeg",
      "/img/destinations/poin-panama-2.jpeg",
      "/img/destinations/poin-panama-3.jpeg",
      "/img/destinations/poin-panama-4.jpeg",
      "/img/destinations/poin-panama-5.jpeg",
      "/img/destinations/poin-panama-6.jpeg",
    ],
  },
  {
    name: "Disneyland París",
    package: [
      {
        description: "Un circuito por Madrid y París que incluye visitas guiadas, actividades opcionales, y un día en Disneyland París.",
        days: [
          { avalible: "14/04/2025", text: "CIUDAD DE ORIGEN - MADRID: Llegada y traslado al hotel. Tiempo libre y paseo nocturno opcional con degustación de tapas." },
          { avalible: "15/04/2025", text: "MADRID: Visita panorámica y tiempo libre. Excursión opcional a Toledo y tablao flamenco por la noche." },
          { avalible: "16/04/2025", text: "MADRID - BURGOS - BURDEOS: Recorrido por Burgos y llegada a Burdeos. Cena y alojamiento." },
          { avalible: "17/04/2025", text: "BURDEOS - BLOIS - PARÍS: Visita al Valle del Loira y llegada a París. Paseo opcional de 'Iluminaciones de París'." },
          { avalible: "18/04/2025", text: "PARÍS: Visita panorámica y opciones de actividades como la Torre de Montparnasse, Barrio Latino y paseo en barco por el Sena." },
          { avalible: "19/04/2025", text: "PARÍS: Día libre con opciones de excursiones al Palacio de Versalles o Montmartre." },
          { avalible: "20/04/2025", text: "PARÍS - DISNEYLAND PARÍS: Día en Disneyland París con entrada a los dos parques temáticos." },
          { avalible: "21/04/2025", text: "PARÍS - CIUDAD DE DESTINO: Tiempo libre y traslado al aeropuerto. Fin de servicios." }
        ],
        includes: [
          "Traslados de llegada y salida del aeropuerto principal.",
          "Traslado a Parque Disneyland París (solo ida).",
          "Entrada a los dos parques temáticos de Disneyland París.",
          "Almuerzos y cenas indicadas en el itinerario.",
          "Modernos autocares con medidas de seguridad.",
          "Asistencia telefónica 24 horas.",
          "Guía acompañante de habla hispana.",
          "Guías locales en español en las visitas indicadas.",
          "Desayuno diario tipo buffet (en la mayoría de los hoteles)."
        ],
        table: [
          {
            title: "Precios en USD por persona en habitación doble",
            rows: [
              ["Salida", "Categoría", "Doble", "Triple", "Single"],
              ["14/04/2025", "Selección", "1725", "1668", "2190"]
            ]
          }
        ],
        policy: [
          "El precio incluye traslados desde el aeropuerto principal. Consulte suplemento para traslados desde/hacia estación de tren o puerto.",
          "Las actividades opcionales mencionadas están sujetas a disponibilidad y costo adicional.",
          "Los itinerarios pueden estar sujetos a cambios por condiciones externas."
        ],
        avalibleUntil: "21/04/2025",
        toursIncluded: [
          {
            name: "Excursión a Toledo",
            duration: "Medio día",
            description: `Si lo deseas, podrás unirte a la excursión opcional a Toledo, declarada Patrimonio de la Humanidad por la Unesco, cuya riqueza cultural viene marcada por la ejemplar convivencia que existió en esta ciudad entre las civilizaciones cristiana, hebrea y musulmana. Realizaremos un recorrido en autobús por el perímetro de la ciudad, desde el que tendremos una espléndida vista general de su patrimonio artístico. Después pasearemos por sus callejuelas y plazas más emblemáticas, incluyendo la entrada al interior de la Catedral, considerada como una de las otras maestras del arte español.`
          },
          {
            name: "Tablao Flamenco",
            description: `Como broche de oro de este día, por la noche, podrás asistir opcionalmente a un tablao flamenco donde conoceremos las raíces musicales del arte español (incluida en categoría Selección-Vi?). Alojamiento.`
          },
          {
            name: "Iluminaciones de París",
            description: `Llegada a París y tiempo libre. Si lo deseas, tendrás la posibilidad de realizar la visita opcional 'Iluminaciones de París', donde podrás descubrir esta ciudad, con sus edificios más emblemáticos iluminados (incluida en categoría Selección-Vi).`
          },
          {
            name: "Palacio de Versalles",
            description: `Si lo deseas podrás realizar una excursión opcional para conocer el Palacio de Versalles, símbolo de la monarquía francesa en su esplendor y modelo para las residencias reales de toda Europa (incluida en categoría Selección-Vi). Descubrirás, además de sus maravillosos jardines, las salas más célebres del palacio como la famosa Galería de los Espejos, la capilla real, los aposentos privados, etc.`
          },
          {
            name: "Montmartre",
            description: `Por la tarde, podrás realizar la visita opcional a Montmartre, en la que descubrirás el barrio bohemio de París con sus calles adoquinadas y sus jardines empinados donde vivieron los pintores impresionistas. Pasearás por el París antiguo hasta la basílica del Sagrado Corazón, obra maestra del siglo XIX, con su impresionante vista sobre la ciudad.`
          }
        ],
      }
    ],
    images: [
      "/img/destinations/disney-paris-2.jpg",      
      "/img/destinations/disney-paris-4.jpg",      
      "/img/destinations/disney-paris-1.jpg",      
      "/img/destinations/disney-paris-5.jpg",      
      "/img/destinations/disney-paris-3.jpg",      
    ]
  },
  {
    name: "Osaka - Tokyo",
    package: [
      {
        description: "Un circuito exclusivo por Japón que incluye Osaka, Kyoto y Tokyo, con visitas guiadas y experiencias culturales.",
        days: [
          {
            avalible: "Día 1",
            text: `Llegada al aeropuerto de Osaka donde será recibido por un asistente de habla hispana que le acompañará hasta el punto de encuentro para tomar el airport limousine bus regular. Llegada al hotel y Alojamiento. Nota: el traslado está sujeto a los horarios de transporte público, en caso de llegar antes de las 08.00hrs o después de las 18.00 horas, tendrá un suplemento de 100 USD por persona. En caso de 1 pasajero viajando solo, el suplemento será de 200 USD.`
          },
          {
            avalible: "Día 2",
            text: `Desayuno. Día libre a su disposición. Le sugerimos realizar, de manera opcional, la visita a Universal Studios donde podrá disfrutar de un mundo de emociones y fantasía. También les sugerimos realizar de manera opcional, una visita a la Expo 2025 (de abril a octubre). Alojamiento. Nota: Por política expresa de la Expo 2025 y de Universal Japan Studios, la compra de entradas debe ser realizada por el titular de la reserva, incapacitando a Special Tours y sus intermediarios a la adquisición de estas.`
          },
          {
            avalible: "Día 3",
            text: `Desayuno. A las 09.00 hrs reunión en el lobby y comienza la visita de la ciudad, con guía de habla hispana, para visitar el Castillo de Osaka, con una increíble torre principal, murallas, fosos y torres de defensa. En los meses de marzo y abril se puede disfrutar de los 600 cerezos en flor que adornan sus jardines. Después visita al barrio de Dotonbori, uno de los principales atractivos turísticos de la ciudad. Almuerzo. A continuación, traslado a Kyoto en bus privado para visitar el Templo de oro de Kinkaku-ji, cuyos tonos dorados se reflejan sobre las aguas de un estanque y está rodeado de una vegetación exquisita. Después, disfrutaremos de un paseo por el bosque de Arashiyama, donde un camino iluminado nos guiará entre inmensos bambús y nos encontraremos no solo en el increíble paisaje de los árboles sino también en los sonidos del bosque. Regreso al hotel. Alojamiento.`
          },
          {
            avalible: "Día 4",
            text: `Desayuno. A las 09.00 hrs reunión en el lobby y visita del Santuario Fushimi Inari, el principal Santuario Sintoísta de Japón dedicado al espíritu de Inari (Diosa del arroz) y conocido por los miles de toriis (arco tradicional japonés) que marcan el camino hacia el santuario. Almuerzo en un restaurante local. Por la tarde salida a Kyoto, en el camino visita de Nara, una de las ciudades más antiguas de Japón con maravillosas construcciones como el Templo Budista de Todaiji y su enorme Buda Gigante y el Parque de los Ciervos Sagrados. Tras la visita traslado al hotel. Alojamiento.`
          },
          {
            avalible: "Día 5",
            text: `Día libre para sus actividades personales o disfrutar de la ciudad por su cuenta. Puede realizar una excursión opcional a la ciudad de Hiroshima y Miyajima. La visita incluye traslado hasta la estación de Kyoto para tomar el tren bala Nozomi hasta Hiroshima. Traslado hasta Miyajima, donde se podrá visitar esta isla sagrada, el Santuario Itsukushima de Shinto famoso por la Puerta Torii, declarado Patrimonio de la Humanidad por la Unesco. Almuerzo incluido en la visita opcional. Continuación hasta el Parque Conmemorativo de la Paz. Traslado hasta la estación de Hiroshima y tren Bala Nozomi hasta Kyoto y llegada al hotel. Alojamiento.`
          },
          {
            avalible: "Día 6",
            text: `Desayuno. Traslado a la estación de tren de Kyoto con un asistente de habla hispana (el asistente no les acompañará durante el trayecto). Salida hacia Tokyo en tren bala Nozomi. Llegada y visita del Santuario Sintoísta de Meiji. Continuación con el Templo Budista Senso-ji y un paseo por la calle Nakamise. Almuerzo. Visita al barrio de Shibuya. Alojamiento.`
          },
          {
            avalible: "Día 7",
            text: `Desayuno. Día libre. Le sugerimos realizar, de manera opcional, la visita a Disneyland Tokyo donde encontrará un mundo lleno de fantasía y emoción. Alojamiento.`
          },
          {
            avalible: "Día 8",
            text: `Desayuno. A la hora indicada, traslado al aeropuerto en el airport limousine bus regular. Fin de nuestros servicios.`
          }
        ],
        includes: [
          "Asistencia a la llegada en el aeropuerto por personal de habla hispana.",
          "Traslados de llegada y salida del aeropuerto principal.",
          "7 noches de alojamiento en los hoteles indicados.",
          "Visitas guiadas en Osaka, Kyoto, Fushimi Inari, Nara y Tokyo.",
          "Seguro de viaje con coberturas según especificación."
        ],
        table: [
          {
            title: "Precios en USD por persona",
            rows: [
              ["Inicio - Fin", "Doble", "Triple", "Single", "Producto", "Días"],
              ["21/04/2025 - 09/06/2025", "2660", "2870", "4100", "Selección", "Lunes"],
              ["21/07/2025 - 21/07/2025", "2720", "2970", "4280", "Selección", "Lunes"],
              ["25/08/2025 - 13/10/2025", "2660", "2870", "4100", "Selección", "Lunes"]
            ]
          }
        ],
        policy: [
          "Este programa opera con un mínimo de 10 personas.",
          "El itinerario está sujeto a cambios por condiciones externas.",
          "Es obligatorio tramitar el visado con 60 días de antelación para ciertos países."
        ],
        avalibleUntil: "10/11/2025",
        toursIncluded: [
          {
            name: "Visita a Hiroshima y Miyajima",
            description: `Incluye traslado en tren bala, visita al Parque de la Paz, Santuario Itsukushima y almuerzo.`
          },
          {
            name: "Disneyland Tokyo",
            description: `Experiencia mágica en los parques temáticos, con entrada por cuenta del viajero.`
          }
        ]
      }
    ],
    images: [
      "/img/destinations/osaka-1.jpg",
      "/img/destinations/osaka-2.jpg",
      "/img/destinations/osaka-3.jpg",
      "/img/destinations/osaka-4.jpg",
      "/img/destinations/osaka-5.jpg",
    ]
  },
  {
    name: "Estambul y Capadocia",
    package: [
      {
        description: "Un recorrido por Turquía que incluye visitas guiadas en Estambul, Capadocia y Ankara, con experiencias culturales y paisajísticas únicas.",
        days: [
          {
            avalible: "sábado, 12 de abril de 2025",
            text: `Llegada al aeropuerto internacional de Istanbul (IST). Encuentro con nuestro personal de habla hispana y traslado al hotel. Resto del día libre. Estambul es una de las ciudades más visitadas del mundo, quizás por ser la única situada sobre dos continentes, lo que la convierte en una urbe singular y llena de contrastes. Alojamiento. Nota: El traslado por la llegada del vuelo al aeropuerto de Sabiha Gokcen (SAW) tendrá un suplemento.`
          },
          {
            avalible: "domingo, 13 de abril de 2025",
            text: `Desayuno. Después, saldremos para una excursión panorámica en una de las áreas más antiguas de la ciudad. Durante el recorrido veremos el Acueducto Romano y las Murallas de Constantinopla. También cruzaremos el puente de Gálata, sobre el Cuerno de Oro, para disfrutar de la vista panorámica dominada por los minaretes de las mezquitas, la Torre de Gálata y el lado asiático de la ciudad. Resto del día libre. Posibilidad de realizar de manera opcional la visita "LOS COLORES DE ESTAMBUL" con almuerzo incluido en restaurante típico. Por la tarde, visitaremos el Bazar Egipcio o Bazar de las Especias. Para culminar el día, embarcaremos en un barco para un paseo por el Bósforo, disfrutando de las vistas de las fortalezas otomanas, palacios, villas y puentes. Regreso al hotel. Alojamiento.`
          },
          {
            avalible: "lunes, 14 de abril de 2025",
            text: `Desayuno. Día libre. Posibilidad de realizar de manera opcional la visita "JOYAS OTOMANAS" con almuerzo incluido. Empezaremos explorando la Plaza de Sultanahmet, donde la Mezquita Azul nos sorprenderá con sus impresionantes azulejos. Continuaremos hacia el Hipódromo Romano y admiraremos el exterior de Santa Sofía. Por la tarde, nos acercaremos al Gran Bazar, tentándonos con sus miles de tiendas. Regreso al hotel. Alojamiento.`
          },
          {
            avalible: "martes, 15 de abril de 2025",
            text: `Desayuno. Hoy nos despediremos de Estambul para dirigirnos a Capadocia. En el camino, haremos dos paradas importantes: en Ankara para visitar el Mausoleo de Atatürk, fundador de la República Turca, y en el Lago Salado, uno de los lagos salinos más grandes del mundo. Podremos caminar sobre sus aguas saladas. Llegada a Capadocia. Cena y Alojamiento.`
          },
          {
            avalible: "miércoles, 16 de abril de 2025",
            text: `Opcional: Paseo en globo aerostático al amanecer, sobrevolando las "Chimeneas de Hadas". Desayuno. Durante el día exploraremos Capadocia visitando el Castillo de Ortahisar, el Valle de Güvercinlik, el Castillo de Uçhisar, el Valle de la Imaginación y el Valle del Amor. También visitaremos una fábrica de alfombras y un taller de onyx. Cena y Alojamiento. Opcional: programa "NOCHE TURCA" con bailes folclóricos en una cueva típica.`
          },
          {
            avalible: "jueves, 17 de abril de 2025",
            text: `Desayuno. A la hora indicada, traslado al aeropuerto para regresar a Estambul. Llegada y traslado al hotel. Alojamiento.`
          },
          {
            avalible: "viernes, 18 de abril de 2025",
            text: `Desayuno. A la hora indicada, traslado al aeropuerto internacional de Istanbul (IST) para salir en el vuelo de regreso. Fin de nuestros servicios. Nota: El traslado por la salida del vuelo desde el aeropuerto de Sabiha Gokcen (SAW) tendrá un suplemento.`
          }
        ],
        includes: [
          "Asistencia a la llegada y salida en el aeropuerto IST por personal de habla hispana.",
          "Traslados de llegada y salida del aeropuerto IST.",
          "6 noches de alojamiento en los hoteles indicados.",
          "Régimen alimenticio según opción de itinerario elegido.",
          "Paseo en globo aerostático en Capadocia (solo opción -SI).",
          "Cena espectáculo en Capadocia (solo opción -SI).",
          "Visita panorámica de Estambul.",
          "Visitas a Ankara y Capadocia.",
          "Guía acompañante de habla hispana.",
          "Propinas para guía y conductor.",
          "Tasas hoteleras en Turquía.",
          "Seguro de Viaje.",
          "Asistencia telefónica 24 horas."
        ],
        table: [
          {
            title: "Precios en USD por persona",
            rows: [
              ["Salidas", "Categoría", "Doble", "Triple", "Single"],
              ["12/04/2025", "Selección", "680", "670", "1500"],
              ["12/04/2025", "Sel-SI", "1340", "1330", "2160"]
            ]
          }
        ],
        policy: [
          "Este programa opera con un mínimo de 2 pasajeros.",
          "El itinerario está sujeto a cambios y modificaciones por condiciones externas.",
          "Es obligatorio proporcionar los detalles de los vuelos internacionales con al menos 7 días de antelación.",
          "Los transportes están sujetos a modificaciones por parte de las compañías."
        ],
        avalibleUntil: "28/03/2026",
        toursIncluded: [
          {
            name: "Los Colores de Estambul",
            description: `Visita a la Mezquita de Eyüp, barrios de Balat y Fener, el Bazar Egipcio y paseo en barco por el Bósforo.`
          },
          {
            name: "Joyas Otomanas",
            description: `Exploración de la Plaza de Sultanahmet, la Mezquita Azul, el Hipódromo Romano y el Gran Bazar.`
          },
          {
            name: "Paseo en Globo Aerostático",
            description: `Experiencia al amanecer sobrevolando las "Chimeneas de Hadas" en Capadocia.`
          },
          {
            name: "Noche Turca",
            description: `Cena espectáculo con bailes folclóricos en una cueva típica de Capadocia.`
          }
        ]
      }
    ],
    images: [
      "/img/destinations/estambul-1.jpg",
      "/img/destinations/estambul-2.jpg",
      "/img/destinations/estambul-3.jpg",
      "/img/destinations/estambul-4.jpg",
    ]
  }

];

export default destinations;