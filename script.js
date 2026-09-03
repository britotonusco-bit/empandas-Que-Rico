/* ============================================================
   EMPANADAS QUE RICO — DESDE CERO
   Flujo: sucursal -> menú -> carrito -> entrega -> pago
   -> RPC Supabase -> WhatsApp -> seguimiento
   ============================================================ */

const CONFIG = {
  cajaPorPedido: 2500,
  whatsapp: {
    Centro: "573000000001",
    Cuba: "573148978258",
    Circunvalar: "573024932188"
  },
  sucursales: {
    Centro: {
      numero: 1,
      nombre: "Punto 1 — Bombay 3",
      ciudad: "Dosquebradas, Risaralda",
      direccion: "Manzana 10, Casa 16, Bombay 3",
      horario: "Lunes a sábado desde las 3:00 PM",
      domicilios: false,
      mapa: "https://www.google.com/maps/search/?api=1&query=Manzana+10+Casa+16+Bombay+3+Dosquebradas+Risaralda"
    },
    Cuba: {
      numero: 2,
      nombre: "Punto 2 — Barrio El Modelo",
      ciudad: "Dosquebradas, Risaralda",
      direccion: "Calle 49 # 19-27, Barrio El Modelo",
      horario: "Lunes a sábado desde las 2:00 PM",
      domicilios: true,
      mapa: "https://www.google.com/maps/search/?api=1&query=Calle+49+19-27+Barrio+El+Modelo+Dosquebradas+Risaralda"
    },
    Circunvalar: {
      numero: 3,
      nombre: "Punto 3 — Barrio Providencia",
      ciudad: "Pereira, Risaralda",
      direccion: "Carrera 20 # 21-26, Barrio Providencia",
      horario: "Lunes a sábado desde las 3:00 PM",
      domicilios: true,
      mapa: "https://www.google.com/maps/search/?api=1&query=Carrera+20+21-26+Barrio+Providencia+Pereira+Risaralda"
    }
  },
  tarifasDomicilio: {
    Cuba: {
      Dosquebradas: {
        "El Japón":5300,"San Gregorio":5300,"San Rafael":5300,"Olaya Herrera":5300,"Coogemela":5300,"Valher":5300,"Fabio León":5300,"La Cabaña":5300,"Pío XII":5300,"Los Leones":5300,"El Carmen":5300,"Los Cámbulos":5300,"Alonso Valencia":5300,"Villa Fanny":5300,"La Aurora":5300,"El Paraíso":5300,"Santiago Londoño":5300,"Camilo Mejía Duque":5300,"Los Héroes":5300,"Vela I y II":5300,"Los Abedules":5300,"Altos de Santa Mónica":5300,"Las Garzas":5300,"Villa Santa Mónica":5300,"Villa Clara":5300,"Panorama Center":5300,"Diana Turbay":5300,"Álvaro Patiño Amariles I y II":5300,"Saturno":5300,"La Sultana":5300,
        "Los Olivos":6300,"Campestre A":6300,"Campestre B":6300,"Campestre C":6300,"Campestre D":6300,"El Refugio":6300,"Tairona":6300,"El Oasis":6300,"Torres del Sol":6300,"Quintas del Campestre":6300,"Villa del Campestre":6300,"Maracay":6300,"Santa Isabel I":6300,"Santa Isabel II":6300,"El Poblado":6300,"Lusitania":6300,"Santa Clara":6300,"Pasadena":6300,
        "Otún":7300,"El Balso":7300,"Las Vegas":7300,"La Graciela":7300,"La Esneda":7300,"La Badea":7300,"Inquilinos":7300,"Minuto de Dios":7300,"Villa Alexandra":7300,"Pedregales":7300,"La Romelia":7300,"La Romelia Alta":7300,"La Romelia Baja":7300,"Galaxia":7300,"Las Acacias":7300,"Los Pinos":7300,"Los Guamos":7300,"Bocacanoa":7300,"El Bosque-Carbonero":7300,"La Floresta":7300,"Estación Gutiérrez":7300,"Villa Carola":7300,"Bosques de la Acuarela":7300,"Lara Bonilla":7300,"El Rosal":7300,"El Chicó":7300,"Villa Colombia":7300,"La Semilla":7300,"Tejares de la Loma":7300,"Nuevo Bosque":7300,
        "Sectores alejados de La Romelia":8300,"Sectores altos de La Romelia":8300,"Sectores alejados de La Acuarela":8300,"Zonas rurales cercanas":9300,"Sectores periféricos de Dosquebradas":9300
      },
      Pereira: {
        "Centro":10300,"San Nicolás":10300,"Río Otún":10300,"Ferrocarril":10300,"Villavicencio":10300,"Oriente":10300,"El Jardín":10300,"Boston":10300,"Olímpica":10300,"Universidad":10300,
        "Perla del Otún":11300,"El Poblado":11300,"Villa Santana":11300,"Consota":11300,"El Oso":11300,"San Joaquín":11300,"Kennedy":11300,"Maraya":11300,"Jardín I":11300,"Jardín II":11300,"Jardín III":11300,"Los Andes":11300,"Los Arrayanes":11300,"Los Cedros":11300,"Los Quimbayas":11300,"Niza I":11300,"Niza II":11300,"Portal de Los Cedros":11300,"Villas del Jardín":11300,"Ciudadela Comfamiliar":11300,"Villa del Café":11300,"Nuevo Horizonte":11300,"Paz Verde":11300,"Rincón del Café":11300,
        "El Rocío":12300,"Rocío Bajo":12300,"Rocío Alto":12300,"Sectores altos de Villa Santana":12300,"Sectores alejados de El Oso":12300,"Sectores alejados de Consota":12300,"Sectores alejados de San Joaquín":12300,"Sectores periféricos de Pereira":12300
      },
      "Parque Industrial":{"Parque Industrial":15300,"Sector A – Parque Industrial":15300,"Sectores residenciales del Parque Industrial":15300},
      "Cuba":{"Cuba":15300,"San Fernando":15300,"La Independencia":16300,"La Playita":16300,"La Unión":16300,"Barberos":17300,"Brisas del Consotá":17300,"Cortés":17300,"Rafael Uribe I":18300},
      "Cerritos":{"Vía Cerritos / sectores iniciales":18300,"Cerritos":20300,"Galicia":20300,"Galicia Alta":20300,"Esperanza Galicia":20300,"Estación Villegas":20300,"Cerritos Campestre":20300,"Reservas del Campo":20300,"Senderos del Campo":20300,"Portal del Campo":20300,"Casas del Campo":20300,"Sol de Galicia":20300,"El Tigre — sectores cercanos":20300,"El Tigre — sectores alejados":22300,"Mukava del Valle":22300,"Sectores rurales / fincas alejadas":22300},
      "Vía Armenia":{"Vía Armenia — sectores cercanos":18300,"Vía Armenia — zona normal":20300,"Vía Armenia — sectores alejados":22300,"Fincas / sectores rurales alejados":22300},
      "Santa Rosa de Cabal":{"Hermosa Etapa I":15300,"Hermosa Etapa II":15300,"Hermosa Etapa III":15300,"Hermosa Etapa IV":15300,"Hermosa Etapa V":15300,"Hermosa Etapa VI":15300,"Los Corales":15300,"Los Ángeles":15300,"Los Portales de la Villa":15300,"Ciudadela Florida del Río":15300,"Portal de la Hermosa":15300,"Jardín de la Hermosa":15300,"Los Sauces":15300,"San Roque":15300,"Presbítero Francisco Londoño":15300,"Villas de San Fernando":15300,"Mirador de la Villa":15300,"Villa Diana I":15300,"Villa Diana II":15300,"Villa Diana III":15300,"Villa Cabal":15300,"Fermín López":15300,"José Ignacio López Arcila":15300,"El Campestre":15300,"Las Camelias":15300,"Los Bloques":15300,"Las Araucarias":15300,"Los Portales":15300,"Linares":15300,"Las Quintas":15300,"El Edén":15300,"La Eugenia":15300,"Sor Teresa de Calcuta":15300,"San Francisco":15300,"Córdoba":17300,"Suiza":17300,"La Milagrosa":17300,"Rotario":17300,"La Unión":17300,"La Quiebra":17300,"San Eugenio":17300,"Pío XII":17300,"San Bernardino":17300,"Santa Helena":17300,"La Primavera":17300,"Altos de Veracruz":17300,"Ozanam":17300,"San Diego":17300,"Simón Bolívar":17300,"Cerros de la Traviata":17300,"El Paraíso":17300,"Cartaguito":17300,"Fondo Obrero":17300,"Monserrate Casas":17300,"Monserrate Bloques":17300,"Los Álamos":17300,"Portal de Monserrate":17300,"Los Andes":17300,"Urbanización Pindaná":17300,"El Truco I":17300,"El Truco II":17300,"El Carmelo":17300,"La Estación":17300,"Sector Plaza de Mercado":17300,"Italia":20300,"Villa Oruma":20300,"La Trinidad I":20300,"La Trinidad II":20300,"La Trinidad III":20300,"Bosques de Santa Ana I":20300,"Bosques de Santa Ana II":20300,"San Luis Gonzaga":20300,"El Poblado":20300,"Terrazas de las Colinas":20300,"Los Jardines":20300,"Guayacanes":20300,"Villa Fanny":20300,"La Flora I":20300,"La Flora II":20300,"Kennedy":20300,"Los Sauces":20300,"La Carolina":20300,"Villa Alegría":20300,"San Vicente":20300,"Villa Deisy":20300,"Nuevo Horizonte":20300,"Villa Xiomara I":20300,"Villa Xiomara II":20300,"Los Laureles":20300,"Altos de Laureles":20300,"Colombia I":20300,"Colombia II":20300,"Las Terrazas":20300,"El Carmelo":20300,"Montearroyo":20300,"Los Pinos":20300,"El Paipa":20300,"Caldas":20300,"La María":20300,"Ciudadela Artesanal":20300,"Casas Fiscales":20300,"El Vergel":20300,"Los Cristales":20300,"Los Robles":20300,"Los Alcázares":20300,"El Triunfo":20300,"El Palmar":20300,"Belén":20300,"Villa Amparo":20300,"Betania I":20300,"Betania II":20300,"Betania III":20300,"Pinares":20300,"Villa Rosita":20300,"Portales de Betania":20300,"Bosques de Santa Ana III":20300,"La Carrilera":20300,"Palos de Moguer":20300,"Villa Nora":20300}
    },
    Circunvalar: {
      "Providencia": 5300,
      "Palermo & Venecia": 5300,
      "Lorena & Olaya Herrera": 5300,
      "Centenario & San Nicolás": 6300,
      "Boston & San Luis": 6300,
      "Las Gaviotas & La Unidad": 6300,
      "Caracol la Curva": 8300,
      "Rocío Bajo": 7300,
      "Rocío Alto": 8300,
      "Colombo Americano": 9300,
      "La Ofrenda": 13300,
      "Ciudad Jardín & Álamos": 6300,
      "Canaán": 6300,
      "UTP & El Bosque": 7300,
      "Popular Modelo": 7300,
      "Pinares & Alpes": 6300,
      "Pinares Zona Campestre": 7300,
      "Corocito": 7300,
      "Alfonso López": 7300,
      "Kennedy": 8300,
      "Villa Santana": 10300,
      "Las Brisas": 11300,
      "El Remanso – Guayabal & Tokio": 12300,
      "La Florida": 20300,
      "Calle 11 hasta Calle 40 con Av Rio": 7300,
      "Calle 41 hasta Calle 50": 8300,
      "La Elvira & Niza 1 y 2": 7300,
      "Maraya": 8300,
      "Batallon Av Sur & Av 30": 9300,
      "Galán – La Esneda & Bavaria": 7300,
      "El Triunfo – El Balso & San Judas": 8300,
      "Aeropuerto & Nacederos": 10300,
      "Parque Industrial Centro": 11300,
      "Parque Industrial Zona Alta": 13300,
      "Poblado 1 & Hamburgo": 6300,
      "Poblado 2 & Villa del Prado": 7300,
      "Samaria 1 y 2": 8300,
      "Villa Verde": 9300,
      "Miraflores": 10300,
      "Naranjito": 11300,
      "Jardín 1 y 2": 7300,
      "Villas del Jardín 1,2y3": 7300,
      "Home Center & Amatista": 7300,
      "Arc de la Colina & Tanambi": 7300,
      "La Castellana - Tisú & Amaru": 8300,
      "El Dorado": 8300,
      "Panorama 1 y 2": 10300,
      "Padre Valencia": 10300,
      "La Divisa": 10300,
      "El Nogal": 10300,
      "Las Mercedes": 11300,
      "Estación Policía El Acuario": 11300,
      "Cuba hasta Viejo Paris": 11300,
      "Los Sauces & Villa Eliza": 11300,
      "Terranova": 12300,
      "Los 2500 Lotes": 12300,
      "Bosques de Cuba & Hacienda Cuba": 12300,
      "San Marcos & Puertas de Alcalá": 13300,
      "Montelíbano & Villa Navarra": 13300,
      "El Cardal & Villa de Leiva": 13300,
      "Villa Nova": 15300,
      "Alta Vista y Batará": 12300,
      "Entre Ríos – Toledo – T de Alejandría": 13300,
      "Corales – Gamma & Cañaveral": 11300,
      "Estadio y Expo futuro": 12300,
      "Club el Nogal & San Silvestre": 12300,
      "Senderos de San Silvestre": 14300,
      "Belmonte & Pueblito Cafetero": 13300,
      "Portal de Cerritos & Solarum": 15300,
      "Belmonte Bajo & Mukava": 15300,
      "San José de las Villas 1,2,3,4,5": 15300,
      "Papiro & Mitaca": 8300,
      "Bambú & Teka": 8300,
      "Portal del Sol & Los Cerezos": 8300,
      "La Macarena": 9300,
      "La Graciela": 9300,
      "Santa Isabel": 9300,
      "Campestre A y D": 9300,
      "Campestre B y C": 10300,
      "Mirador del Colibrí": 11300,
      "Japón": 9300,
      "Monte Bonito": 10300,
      "Frailes": 11300,
      "Santa Mónica": 8300,
      "La Pradera & Milán": 9300,
      "Irazu & Bonanza": 10300,
      "Guadalupe": 10300,
      "Los Molinos & El Progreso": 10300,
      "Molivento de las Villas 1 y 2": 11300,
      "Zaguán de Villa Vento": 11300,
      "Las Violetas & Terragrata": 11300,
      "Los Naranjos y San Fernando": 11300,
      "La Capilla & Santa Teresita": 12300,
      "Villa del Campo & Tacuara": 11300,
      "Bombay & Villa Roble": 12300,
      "Agua Azul & Carbonero": 13300,
      "Bosques de la Acuarela": 14300,
      "La Romelia": 15300,
      "Vereda el Tigre": 20300,
      "Galicia": 20300,
      "Parque Consota & Ucumari": 22300,
      "Pereira Cerritos Entrada 1 a la 4": 20300,
      "Pereira Cerritos Entrada 5 a la 8": 22300
    }
  }
};

const PRODUCTOS_FALLBACK = [{"id":"papa-mixta","cat":"Papas rellenas","icon":"🥔","nombre":"Papa Mixta","desc":"Carne, pollo y huevo cocinado.","precio":5000,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"papa-barril","cat":"Papas rellenas","icon":"🥔","nombre":"Papa Rellena de Carne Asada al Barril","desc":"Papa rellena de carne asada al barril.","precio":5000,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"emp-carne","cat":"Empanadas","icon":"🥟","nombre":"Empanada de carne desmechada","desc":"Carne desmechada de res y papa.","precio":2500,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"emp-pollo","cat":"Empanadas","icon":"🥟","nombre":"Empanada de pollo","desc":"Pollo y papa.","precio":2500,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"emp-mixta","cat":"Empanadas","icon":"🥟","nombre":"Empanada mixta","desc":"Pollo, carne de res y papa.","precio":2500,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"emp-chicharron-platano","cat":"Empanadas","icon":"🥟","nombre":"Empanada de chicharrón con plátano maduro","desc":"Chicharrón y plátano maduro.","precio":3000,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"emp-queso","cat":"Empanadas","icon":"🥟","nombre":"Empanada de queso","desc":"Queso.","precio":3000,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"emp-ranchera","cat":"Empanadas","icon":"🥟","nombre":"Empanada ranchera","desc":"Carne de res, queso, tocineta y salchicha.","precio":4000,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"emp-carne-barril","cat":"Empanadas","icon":"🥟","nombre":"Empanada de carne asada al barril","desc":"Carne asada al barril.","precio":4000,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"arepa-huevo-perico-carne","cat":"Arepas","icon":"🫓","nombre":"Arepa de huevo, perico y carne desmechada","desc":"Huevo, perico y carne desmechada.","precio":6000,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"mega-tradicional-30","cat":"Mega empanadas de 30 cm","icon":"🥟","nombre":"Mega Empanada Tradicional de 30 cm","desc":"Carne, pollo, chicharrón, tocineta, queso, salchicha ranchera, plátano maduro y carne asada al barril.","precio":12000,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"mega-arrecha","cat":"Mega empanadas de 30 cm","icon":"🥟","nombre":"Mega Arrecha","desc":"Arroz, pollo, chicharrón, tocineta, carne asada al barril, queso, plátano y salchicha ranchera.","precio":15000,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"mega-desmechada","cat":"Mega empanadas de 30 cm","icon":"🥟","nombre":"Mega Desmechada","desc":"Carne de res desmechada con guiso criollo.","precio":15000,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"mega-barril","cat":"Mega empanadas de 30 cm","icon":"🥟","nombre":"Mega Barril","desc":"Carne asada al barril.","precio":15000,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"coca-01","cat":"Coca-Cola","icon":"🥤","nombre":"Coca-Cola","desc":"Bebida gaseosa o refresco.","precio":4000,"puntos":["Cuba","Circunvalar"]},{"id":"coca-02","cat":"Coca-Cola","icon":"🥤","nombre":"Ginger","desc":"Bebida gaseosa o refresco.","precio":3000,"puntos":["Cuba","Circunvalar"]},{"id":"coca-03","cat":"Coca-Cola","icon":"🥤","nombre":"Premio","desc":"Bebida gaseosa o refresco.","precio":3000,"puntos":["Cuba","Circunvalar"]},{"id":"coca-04","cat":"Coca-Cola","icon":"🥤","nombre":"Sun Tea","desc":"Bebida gaseosa o refresco.","precio":4000,"puntos":["Cuba","Circunvalar"]},{"id":"coca-05","cat":"Coca-Cola","icon":"🥤","nombre":"Del Valle","desc":"Bebida gaseosa o refresco.","precio":3000,"puntos":["Cuba","Circunvalar"]},{"id":"coca-06","cat":"Coca-Cola","icon":"🥤","nombre":"Agua","desc":"Bebida gaseosa o refresco.","precio":3000,"puntos":["Cuba","Circunvalar"]},{"id":"coca-07","cat":"Coca-Cola","icon":"🥤","nombre":"Sprite","desc":"Bebida gaseosa o refresco.","precio":3000,"puntos":["Cuba","Circunvalar"]},{"id":"coca-08","cat":"Coca-Cola","icon":"🥤","nombre":"Fanta","desc":"Bebida gaseosa o refresco.","precio":3000,"puntos":["Cuba","Circunvalar"]},{"id":"coca-09","cat":"Coca-Cola","icon":"🥤","nombre":"Quatro","desc":"Bebida gaseosa o refresco.","precio":3000,"puntos":["Cuba","Circunvalar"]},{"id":"coca-10","cat":"Coca-Cola","icon":"🥤","nombre":"Soda","desc":"Bebida gaseosa o refresco.","precio":4000,"puntos":["Cuba","Circunvalar"]},{"id":"coca-11","cat":"Coca-Cola","icon":"🥤","nombre":"Del Valle Frutos","desc":"Bebida gaseosa o refresco.","precio":4000,"puntos":["Cuba","Circunvalar"]},{"id":"coca-12","cat":"Coca-Cola","icon":"🥤","nombre":"Coca-Cola 1.5 L","desc":"Bebida gaseosa o refresco.","precio":7000,"puntos":["Cuba","Circunvalar"]},{"id":"coca-13","cat":"Coca-Cola","icon":"🥤","nombre":"Sprite 1.5 L","desc":"Bebida gaseosa o refresco.","precio":7000,"puntos":["Cuba","Circunvalar"]},{"id":"coca-14","cat":"Coca-Cola","icon":"🥤","nombre":"Coca-Cola 2.25 L","desc":"Bebida gaseosa o refresco.","precio":9000,"puntos":["Cuba","Circunvalar"]},{"id":"coca-15","cat":"Coca-Cola","icon":"🥤","nombre":"Coca-Cola 3 L","desc":"Bebida gaseosa o refresco.","precio":12000,"puntos":["Cuba","Circunvalar"]},{"id":"coca-16","cat":"Coca-Cola","icon":"🥤","nombre":"Del Valle 1.5 L","desc":"Bebida gaseosa o refresco.","precio":7000,"puntos":["Cuba","Circunvalar"]},{"id":"coca-17","cat":"Coca-Cola","icon":"🥤","nombre":"Quatro 1.5 L","desc":"Bebida gaseosa o refresco.","precio":7000,"puntos":["Cuba","Circunvalar"]},{"id":"postobon-01","cat":"Postobón","icon":"🥤","nombre":"Postobón Manzana 250 ml","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-02","cat":"Postobón","icon":"🥤","nombre":"Postobón Manzana 400 ml","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-03","cat":"Postobón","icon":"🥤","nombre":"Postobón Manzana 600 ml","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-04","cat":"Postobón","icon":"🥤","nombre":"Postobón Manzana 1.5 L","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-05","cat":"Postobón","icon":"🥤","nombre":"Postobón Manzana 2.5 L","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-06","cat":"Postobón","icon":"🥤","nombre":"Postobón Colombiana 250 ml","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-07","cat":"Postobón","icon":"🥤","nombre":"Postobón Colombiana 400 ml","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-08","cat":"Postobón","icon":"🥤","nombre":"Postobón Colombiana 600 ml","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-09","cat":"Postobón","icon":"🥤","nombre":"Postobón Colombiana 1.5 L","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-10","cat":"Postobón","icon":"🥤","nombre":"Postobón Colombiana 2.5 L","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-11","cat":"Postobón","icon":"🥤","nombre":"Postobón Uva 250 ml","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-12","cat":"Postobón","icon":"🥤","nombre":"Postobón Uva 400 ml","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-13","cat":"Postobón","icon":"🥤","nombre":"Postobón Uva 600 ml","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-14","cat":"Postobón","icon":"🥤","nombre":"Postobón Uva 1.5 L","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-15","cat":"Postobón","icon":"🥤","nombre":"Postobón Uva 2.5 L","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-16","cat":"Postobón","icon":"🥤","nombre":"Postobón Naranja 250 ml","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-17","cat":"Postobón","icon":"🥤","nombre":"Postobón Naranja 400 ml","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-18","cat":"Postobón","icon":"🥤","nombre":"Postobón Naranja 600 ml","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-19","cat":"Postobón","icon":"🥤","nombre":"Postobón Naranja 1.5 L","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-20","cat":"Postobón","icon":"🥤","nombre":"Postobón Naranja 2.5 L","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-21","cat":"Postobón","icon":"🥤","nombre":"Postobón Tamarindo 250 ml","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-22","cat":"Postobón","icon":"🥤","nombre":"Postobón Tamarindo 400 ml","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-23","cat":"Postobón","icon":"🥤","nombre":"Postobón Tamarindo 600 ml","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-24","cat":"Postobón","icon":"🥤","nombre":"Postobón Tamarindo 1.5 L","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"postobon-25","cat":"Postobón","icon":"🥤","nombre":"Postobón Tamarindo 2.5 L","desc":"Bebida gaseosa.","precio":4000,"puntos":["Cuba"]},{"id":"cong-carne","cat":"Congeladas","icon":"🧊","nombre":"Empanadas congeladas de carne x12","desc":"Paquete de 12 unidades.","precio":24000,"puntos":["Cuba","Circunvalar"]},{"id":"cong-pollo","cat":"Congeladas","icon":"🧊","nombre":"Empanadas congeladas de pollo x12","desc":"Paquete de 12 unidades.","precio":24000,"puntos":["Cuba","Circunvalar"]},{"id":"cong-mixta","cat":"Congeladas","icon":"🧊","nombre":"Empanadas congeladas mixtas x12","desc":"Paquete de 12 unidades.","precio":24000,"puntos":["Cuba","Circunvalar"]},{"id":"cong-queso","cat":"Congeladas","icon":"🧊","nombre":"Empanadas congeladas de queso x12","desc":"Paquete de 12 unidades.","precio":30000,"puntos":["Cuba","Circunvalar"]},{"id":"cong-barril","cat":"Congeladas","icon":"🧊","nombre":"Empanadas congeladas de carne al barril x12","desc":"Paquete de 12 unidades.","precio":42000,"puntos":["Cuba","Circunvalar"]},{"id":"cong-ranchera","cat":"Congeladas","icon":"🧊","nombre":"Empanadas congeladas rancheras x12","desc":"Paquete de 12 unidades.","precio":42000,"puntos":["Cuba","Circunvalar"]},{"id":"cong-chicharron","cat":"Congeladas","icon":"🧊","nombre":"Empanadas congeladas de chicharrón x12","desc":"Paquete de 12 unidades.","precio":30000,"puntos":["Cuba","Circunvalar"]},{"id":"salsa-tomate","cat":"Salsas","icon":"🧂","nombre":"Salsa de tomate","desc":"Salsa para acompañar.","precio":0,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"salsa-ajo","cat":"Salsas","icon":"🧂","nombre":"Salsa de ajo","desc":"Salsa para acompañar.","precio":0,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"salsa-rosada","cat":"Salsas","icon":"🧂","nombre":"Salsa rosada","desc":"Salsa para acompañar.","precio":0,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"salsa-picante","cat":"Salsas","icon":"🧂","nombre":"Salsa picante","desc":"Salsa para acompañar.","precio":0,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"salsa-tartara","cat":"Salsas","icon":"🧂","nombre":"Salsa tártara","desc":"Salsa para acompañar.","precio":0,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"salsa-mostaza","cat":"Salsas","icon":"🧂","nombre":"Salsa de mostaza","desc":"Salsa para acompañar.","precio":0,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"salsa-miel-mostaza","cat":"Salsas","icon":"🧂","nombre":"Salsa miel mostaza","desc":"Salsa para acompañar.","precio":0,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"salsa-bbq","cat":"Salsas","icon":"🧂","nombre":"Salsa BBQ","desc":"Salsa para acompañar.","precio":0,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"salsa-chimichurri","cat":"Salsas","icon":"🧂","nombre":"Salsa chimichurri","desc":"Salsa para acompañar.","precio":0,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"salsa-guacamole","cat":"Salsas","icon":"🧂","nombre":"Guacamole","desc":"Salsa para acompañar.","precio":0,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"salsa-hogao","cat":"Salsas","icon":"🧂","nombre":"Salsa de hogao","desc":"Salsa para acompañar.","precio":0,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"salsa-mayonesa","cat":"Salsas","icon":"🧂","nombre":"Mayonesa","desc":"Salsa para acompañar.","precio":0,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"salsa-mayonesa-ajo","cat":"Salsas","icon":"🧂","nombre":"Mayonesa de ajo","desc":"Salsa para acompañar.","precio":0,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"salsa-cilantro","cat":"Salsas","icon":"🧂","nombre":"Salsa de cilantro","desc":"Salsa para acompañar.","precio":0,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"salsa-aguacate","cat":"Salsas","icon":"🧂","nombre":"Salsa de aguacate","desc":"Salsa para acompañar.","precio":0,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"salsa-queso","cat":"Salsas","icon":"🧂","nombre":"Salsa de queso","desc":"Salsa para acompañar.","precio":0,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"salsa-ranch","cat":"Salsas","icon":"🧂","nombre":"Salsa ranch","desc":"Salsa para acompañar.","precio":0,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"salsa-maracuya","cat":"Salsas","icon":"🧂","nombre":"Salsa de maracuyá","desc":"Salsa para acompañar.","precio":0,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"salsa-pina","cat":"Salsas","icon":"🧂","nombre":"Salsa de piña","desc":"Salsa para acompañar.","precio":0,"puntos":["Centro","Cuba","Circunvalar"]},{"id":"salsa-especial","cat":"Salsas","icon":"🧂","nombre":"Salsa especial","desc":"Salsa para acompañar.","precio":0,"puntos":["Centro","Cuba","Circunvalar"]}];
let PRODUCTOS = [...PRODUCTOS_FALLBACK];

async function cargarProductosDesdeSupabase(){
  try{
    const c=obtenerSupabaseClient();
    const {data,error}=await c.from("productos")
      .select("id,categoria,icono,nombre,descripcion,precio,sucursales,activo")
      .eq("activo",true)
      .order("categoria",{ascending:true})
      .order("nombre",{ascending:true});
    if(error) throw error;
    PRODUCTOS=(data||[]).map(p=>({
      id:p.id,
      cat:p.categoria,
      icon:p.icono||"🍽️",
      nombre:p.nombre,
      desc:p.descripcion||"",
      precio:Number(p.precio||0),
      puntos:Array.isArray(p.sucursales)?p.sucursales:[]
    }));
    console.info("Menú cargado desde Supabase:",PRODUCTOS.length,"productos activos.");
  }catch(e){
    console.warn("No se pudo cargar el menú desde Supabase. Se usa la copia de respaldo del index.",e);
  }
}

let carrito = cargarCarrito();
let modalidadEntrega = "";
let pedidoActual = null;
let supabaseClient = null;

function $(id){ return document.getElementById(id); }
function dinero(n){ return "$" + Number(n || 0).toLocaleString("es-CO"); }
function escapar(t){
  return String(t ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function cargarCarrito(){
  try { return JSON.parse(localStorage.getItem("carritoLaEsquina") || "[]"); }
  catch { return []; }
}
function guardarCarrito(){ localStorage.setItem("carritoLaEsquina", JSON.stringify(carrito)); }
function producto(id){ return PRODUCTOS.find(p=>p.id===id); }
function puntoActual(){ return localStorage.getItem("sucursalLaEsquina") || ""; }

function obtenerSupabaseClient(){
  if(supabaseClient) return supabaseClient;
  const cfg = window.SUPABASE_CONFIG || {};
  if(!window.supabase) throw new Error("La librería de Supabase no está cargada.");
  if(!cfg.url || !cfg.anonKey) throw new Error("config.js no está cargado o está incompleto.");
  supabaseClient = window.supabase.createClient(cfg.url, cfg.anonKey);
  return supabaseClient;
}

function horaColombia(){
  return new Date(new Date().toLocaleString("en-US",{timeZone:"America/Bogota"}));
}
function cerradoDomingo(){ return horaColombia().getDay() === 0; }
function abiertoPunto(p){
  if(cerradoDomingo()) return false;
  const inicio = p === "Cuba" ? 14*60 : 15*60;
  const d=horaColombia(), m=d.getHours()*60+d.getMinutes();
  return m >= inicio;
}
function domicilioDisponible(p){
  if(cerradoDomingo() || !CONFIG.sucursales[p]?.domicilios) return false;
  const d=horaColombia(), m=d.getHours()*60+d.getMinutes();
  return m >= 15*60 && m <= 22*60+30;
}
function estadoPunto(p){
  if(cerradoDomingo()) return "🔴 Cerrado hoy (domingo)";
  return abiertoPunto(p) ? "🟢 Abierto" : `🕒 Abre desde ${p==="Cuba"?"2:00 PM":"3:00 PM"}`;
}
function estadoDomicilio(p){
  if(!CONFIG.sucursales[p]?.domicilios) return "❌ Sin domicilio";
  if(cerradoDomingo()) return "🔴 Domicilios cerrados hoy";
  return domicilioDisponible(p) ? "🟢 Domicilios 3:00 PM–10:30 PM" : "🕒 Domicilios desde las 3:00 PM";
}

function mostrarSelectorSucursal(){
  const overlay=$("overlaySucursal");
  overlay.innerHTML = `
    <div class="modal branch-modal">
      <button class="modal-close" type="button" onclick="cerrarSelectorSucursal()">✕</button>
      <span class="eyebrow">EMPANADAS QUE RICO</span>
      <h2>¿Dónde quieres hacer tu pedido?</h2>
      <p class="muted">El menú se adapta al punto que elijas.</p>
      <div class="branch-grid">
        ${Object.entries(CONFIG.sucursales).map(([k,p])=>`
          <button class="branch-card" type="button" onclick="seleccionarSucursal('${k}')">
            <span class="branch-number">0${p.numero}</span>
            <h3>${escapar(p.nombre)}</h3>
            <strong>${escapar(p.ciudad)}</strong>
            <p>${escapar(p.direccion)}</p>
            <small>🕒 ${escapar(p.horario)}</small>
            <small>${estadoPunto(k)}</small>
            <small>${k==="Centro" ? "📋 Solo menú · no se realizan domicilios" : estadoDomicilio(k)}</small>
            <b>Elegir este punto →</b>
          </button>
        `).join("")}
      </div>
      <div class="sunday-note">🔴 Domingo: todos los puntos están cerrados.</div>
    </div>`;
  overlay.classList.remove("hidden");
}
function cerrarSelectorSucursal(){ $("overlaySucursal").classList.add("hidden"); }

function seleccionarSucursal(p){
  if(!CONFIG.sucursales[p]) return;
  localStorage.setItem("sucursalLaEsquina",p);
  carrito = carrito.filter(i => producto(i.id)?.puntos?.includes(p));
  guardarCarrito();
  cerrarSelectorSucursal();
  renderTodo();
  document.querySelector("#menu")?.scrollIntoView({behavior:"smooth"});
}

function renderMenu(){
  const cont=$("menuContainer");
  const p=puntoActual();
  if(!p){
    cont.innerHTML=`<div class="empty-menu"><div>📍</div><h3>Primero elige tu punto</h3><p>Selecciona una sucursal para ver el menú.</p><button class="primary-btn" type="button" onclick="mostrarSelectorSucursal()">Elegir sucursal</button></div>`;
    $("subtituloSucursalMenu").textContent="Selecciona una sucursal para comenzar.";
    return;
  }
  const lista=PRODUCTOS.filter(x=>x.puntos.includes(p));
  const grupos={};
  lista.forEach(x=>(grupos[x.cat] ||= []).push(x));
  cont.innerHTML=Object.entries(grupos).map(([cat,arr])=>`
    <section class="menu-category" data-category="${escapar(cat)}">
      <div class="category-title"><h3>${escapar(cat)}</h3><span>${arr.length} opciones</span></div>
      <div class="product-grid">
        ${arr.map(x=>`
          <article class="product" data-name="${escapar(x.nombre.toLowerCase())}">
            <div class="product-image">${x.icon}</div>
            <div class="product-content">
              <h4>${escapar(x.nombre)}</h4>
              <p>${escapar(x.desc)}</p>
              <div class="product-bottom">
                <strong class="price">${dinero(x.precio)}</strong>
                ${p==="Centro" ? '<span class="menu-only-note">Solo menú</span>' : `<button class="add" type="button" onclick="agregar('${x.id}')">+ Agregar</button>`}
              </div>
            </div>
          </article>`).join("")}
      </div>
    </section>`).join("");
  $("subtituloSucursalMenu").textContent = `${CONFIG.sucursales[p].nombre} · ${estadoPunto(p)}`;
}
function filtrarProductos(){
  const q=$("buscador").value.toLowerCase().trim();
  document.querySelectorAll(".product").forEach(c=>c.style.display=c.dataset.name.includes(q)?"":"none");
  document.querySelectorAll(".menu-category").forEach(g=>{
    g.style.display=[...g.querySelectorAll(".product")].some(x=>x.style.display!=="none")?"":"none";
  });
}

function renderPuntos(){
  $("puntosFisicos").innerHTML=Object.entries(CONFIG.sucursales).map(([k,p])=>`
    <article class="location-card">
      <span class="branch-number">0${p.numero}</span>
      <h3>${escapar(p.nombre)}</h3>
      <p>${escapar(p.direccion)}</p>
      <strong>${escapar(p.ciudad)}</strong>
      <div class="location-info">🕒 ${escapar(p.horario)}</div>
      <div class="location-info">${estadoDomicilio(k)}</div>
      <a class="map-button" target="_blank" rel="noopener" href="${p.mapa}">🗺️ Ver ubicación</a>
      <button class="secondary-btn full" type="button" onclick="seleccionarSucursal('${k}')">Elegir este punto</button>
    </article>`).join("");
}
function actualizarBanner(){
  const p=puntoActual(), b=$("sucursalActualBanner");
  if(!p){b.innerHTML="";return;}
  const s=CONFIG.sucursales[p];
  b.innerHTML=`📍 <strong>${escapar(s.nombre)}</strong> · ${escapar(s.ciudad)}
    <br><small>${escapar(s.direccion)} · ${estadoPunto(p)} · ${estadoDomicilio(p)}</small>
    <button class="link-btn" type="button" onclick="mostrarSelectorSucursal()">Cambiar punto</button>`;
}

function agregar(id){
  if(!puntoActual()){ alert("Primero elige una sucursal."); mostrarSelectorSucursal(); return; }
  const p=producto(id);
  if(!p || !p.puntos.includes(puntoActual())) return;
  const item=carrito.find(x=>x.id===id);
  if(item) item.cantidad++;
  else carrito.push({id,cantidad:1});
  guardarCarrito(); renderCarrito(); abrirCarrito();
}
function cambiarCantidad(id,delta){
  const i=carrito.find(x=>x.id===id); if(!i)return;
  i.cantidad += delta;
  if(i.cantidad<=0) carrito=carrito.filter(x=>x.id!==id);
  guardarCarrito(); renderCarrito();
}
function eliminar(id){ carrito=carrito.filter(x=>x.id!==id); guardarCarrito(); renderCarrito(); }
function agregarMasProductos(){ cerrarCarrito(); $("menu").scrollIntoView({behavior:"smooth"}); }

function sucursalDomicilioActual(){
  return puntoActual();
}
function obtenerZonas(ciudad){
  const suc=sucursalDomicilioActual();
  if(suc==="Cuba") return Object.keys(CONFIG.tarifasDomicilio.Cuba?.[ciudad]||{});
  if(suc==="Circunvalar" && ciudad==="Pereira") return Object.keys(CONFIG.tarifasDomicilio.Circunvalar||{});
  return [];
}
function costoDomicilio(){
  const zona=$("clienteZona")?.value || "";
  const suc=sucursalDomicilioActual();
  if(zona==="__OTRO__"){ const d=Number($("clienteDistancia")?.value||0); return d ? 4300+d*1000 : 0; }
  if(suc==="Cuba") return Number(CONFIG.tarifasDomicilio.Cuba?.[$("clienteCiudad")?.value||""]?.[zona]||0);
  return Number(CONFIG.tarifasDomicilio[suc]?.[zona]||0);
}
function calcular(){
  const subtotal=carrito.reduce((s,i)=>s+(producto(i.id)?.precio||0)*i.cantidad,0);
  let empaque=0, domicilio=0;
  if(modalidadEntrega==="domicilio"){ empaque=carrito.length?CONFIG.cajaPorPedido:0; domicilio=costoDomicilio(); }
  if(modalidadEntrega==="recoger"){
    empaque=document.querySelector('input[name="empaque"]:checked')?.value==="caja"?CONFIG.cajaPorPedido:0;
  }
  return {subtotal,empaque,domicilio,total:subtotal+empaque+domicilio};
}

function renderCarrito(){
  const c=calcular();
  $("contadorCarrito").textContent=carrito.reduce((s,i)=>s+i.cantidad,0);
  $("subtotal").textContent=dinero(c.subtotal);
  $("empaque").textContent=dinero(c.empaque);
  $("domicilio").textContent=dinero(c.domicilio);
  $("total").textContent=dinero(c.total);
  if(!carrito.length){
    $("carritoItems").innerHTML=`<div class="cart-empty"><div>🛒</div><p>Tu carrito está vacío.</p><small>Agrega productos del menú.</small></div>`;
    return;
  }
  $("carritoItems").innerHTML=carrito.map(i=>{
    const p=producto(i.id);
    return `<div class="cart-row">
      <div><h4>${p.icon} ${escapar(p.nombre)}</h4><small>${dinero(p.precio)} c/u</small>
        <div class="qty"><button type="button" onclick="cambiarCantidad('${p.id}',-1)">−</button><strong>${i.cantidad}</strong><button type="button" onclick="cambiarCantidad('${p.id}',1)">+</button><button class="remove" type="button" onclick="eliminar('${p.id}')">Eliminar</button></div>
      </div><strong>${dinero(p.precio*i.cantidad)}</strong>
    </div>`;
  }).join("");
}
function abrirCarrito(){renderCarrito();$("overlayCarrito").classList.remove("hidden");}
function cerrarCarrito(){$("overlayCarrito").classList.add("hidden");}
function cerrarSiOverlay(e){if(e.target.id==="overlayCarrito")cerrarCarrito();}

function abrirCheckout(){
  if(!carrito.length){alert("Agrega al menos un producto.");return;}
  cerrarCarrito();
  modalidadEntrega="";
  pedidoActual=null;
  $("pedidoForm").reset();
  $("formEntrega").classList.add("hidden");
  $("resumenInicial").innerHTML=resumenInicialHTML();
  mostrarPaso("checkoutPaso0");
  $("overlayCheckout").classList.remove("hidden");
}

function irADatosEntrega(){
  if(!carrito.length){cerrarCheckout();alert("El carrito está vacío.");return;}
  mostrarPaso("checkoutPaso1");
}

function resumenInicialHTML(){
  const c=calcular();
  const p=puntoActual();
  return `<div class="invoice-head">
    <div><h3>🥟 Empanadas Que Rico</h3><span class="invoice-number">PRE-FACTURA · Pedido pendiente de datos</span></div>
    <strong>Resumen</strong>
  </div>
  <div class="invoice-items">${carrito.map(i=>{
    const x=producto(i.id);
    return `<div class="invoice-item"><span>${i.cantidad} × ${escapar(x.nombre)}</span><strong>${dinero(x.precio*i.cantidad)}</strong></div>`;
  }).join("")}</div>
  <div class="invoice-totals">
    <div class="summary-line"><span>Productos</span><strong>${dinero(c.subtotal)}</strong></div>
    <div class="summary-line"><span>Empaque</span><strong>Se define en el siguiente paso</strong></div>
    <div class="summary-line"><span>Domicilio</span><strong>Se calcula según la zona</strong></div>
    <div class="invoice-total"><span>Subtotal productos</span><strong>${dinero(c.subtotal)}</strong></div>
  </div>
  <div class="invoice-note">📍 ${p ? `Sucursal seleccionada: <strong>${escapar(CONFIG.sucursales[p]?.nombre || p)}</strong>` : "Selecciona una sucursal para continuar."}<br>ℹ️ El total final aparecerá en la factura después de elegir modalidad, empaque y zona.</div>`;
}
function cerrarCheckout(){$("overlayCheckout").classList.add("hidden");}
function mostrarPaso(id){
  ["checkoutPaso0","checkoutPaso1","checkoutPaso2","checkoutPasoPago","checkoutResultado"].forEach(x=>$(x).classList.add("hidden"));
  $(id).classList.remove("hidden");
}

function seleccionarEntrega(tipo){
  modalidadEntrega=tipo;
  $("formEntrega").classList.remove("hidden");
  $("camposDomicilio").classList.toggle("hidden",tipo!=="domicilio");
  $("camposRecoger").classList.toggle("hidden",tipo!=="recoger");
  $("clienteCiudad").required=tipo==="domicilio";
  $("clienteZona").required=tipo==="domicilio";
  $("clienteDireccion").required=tipo==="domicilio";
  $("clienteSucursal").required=tipo==="recoger";
  $("resumenModalidad").innerHTML=tipo==="domicilio"
    ?"🛵 <strong>Domicilio.</strong> La caja es obligatoria ($2.500)."
    :"🏪 <strong>Recoger en sucursal.</strong> Puedes elegir caja o bolsa.";
  renderCarrito();
}
function cargarZonas(){
  const z=$("clienteZona"); z.innerHTML='<option value="">Selecciona tu barrio o zona</option>';
  obtenerZonas($("clienteCiudad").value).forEach(x=>{const o=document.createElement("option");o.value=x;o.textContent=x;z.appendChild(o);});
  const o=document.createElement("option");
  o.value="__OTRO__";
  o.textContent="Otro barrio o zona — no aparece en la lista";
  z.appendChild(o);
  actualizarDomicilio();
}
function actualizarZonasPorSucursal(){
  const z=$("clienteZona");
  const suc=sucursalDomicilioActual();
  z.innerHTML='<option value="">Selecciona tu barrio o zona</option>';
  const zonas=obtenerZonas($("clienteCiudad").value);
  if(!zonas.length && suc==="Cuba"){
    z.innerHTML='<option value="">Tarifas de domicilio de El Modelo aún no programadas</option>';
  }else{
    zonas.forEach(x=>{const o=document.createElement("option");o.value=x;o.textContent=x;z.appendChild(o);});
    const o=document.createElement("option");
    o.value="__OTRO__";
    o.textContent="Otro barrio o zona — no aparece en la lista";
    z.appendChild(o);
  }
  actualizarDomicilio();
}
function actualizarDomicilio(){
  const zona=$("clienteZona")?.value || "";
  const otro=zona==="__OTRO__";
  $("zonaNoEncontrada")?.classList.toggle("hidden",!otro);
  if(!otro){
    if($("clienteZonaOtro")) $("clienteZonaOtro").value="";
    if($("clienteDistancia")) $("clienteDistancia").value="";
  }
  const v=costoDomicilio();
  $("valorDomicilio").textContent=dinero(v);
  $("avisoDomicilio").classList.toggle("hidden",!zona || (otro && !$("clienteDistancia")?.value));
  renderCarrito();
}

function mostrarPago(e){
  e.preventDefault();
  if(!modalidadEntrega){alert("Selecciona domicilio o recoger.");return;}
  if(modalidadEntrega==="domicilio"){
    const suc=puntoActual();
    if(!suc || !domicilioDisponible(suc)){alert("El punto seleccionado no tiene el domicilio disponible en este momento.");return;}
    if(suc==="Cuba" && !Object.keys(CONFIG.tarifasDomicilio.Cuba?.[$("clienteCiudad")?.value||""]||{}).length){
      alert("Los domicilios de Barrio El Modelo todavía no tienen tarifas programadas. Por ahora no se puede continuar con domicilio en este punto.");
      return;
    }
    if($("clienteZona").value==="__OTRO__" && !$("clienteZonaOtro").value.trim()){
      alert("Escribe el nombre del barrio o zona."); return;
    }
    if($("clienteZona").value==="__OTRO__" && !$("clienteDistancia").value){
      alert("Selecciona la distancia aproximada desde el punto."); return;
    }
    if(!costoDomicilio()){
      alert("Selecciona el barrio o zona para calcular el valor del domicilio."); return;
    }
  } else if(!$("clienteSucursal").value){alert("Selecciona la sucursal.");return;}
  const c=calcular();
  pedidoActual={
    cliente:{
      nombre:$("clienteNombre").value.trim(),
      telefono:$("clienteTelefono").value.trim(),
      ciudad:$("clienteCiudad").value,
      zona:$("clienteZona").value==="__OTRO__" ? $("clienteZonaOtro").value.trim() : $("clienteZona").value,
      zona_no_listada: $("clienteZona").value==="__OTRO__",
      distancia_aproximada: $("clienteZona").value==="__OTRO__" ? $("clienteDistancia").value : "",
      direccion:$("clienteDireccion").value.trim(),
      sucursal:puntoActual(),
      empaque:document.querySelector('input[name="empaque"]:checked')?.value || "caja",
      nota:$("clienteNota").value.trim()
    },
    modalidad:modalidadEntrega,
    items:carrito.map(x=>({...x})),
    ...c
  };
  $("resumenCheckout").innerHTML=resumenHTML();
  mostrarPaso("checkoutPaso2");
}
function volverEntrega(){mostrarPaso("checkoutPaso1");}
function irAlPago(){renderMetodosPago();mostrarPaso("checkoutPasoPago");}

function resumenHTML(){
  const p=pedidoActual;
  const entrega=p.modalidad==="domicilio"
    ? `🛵 Domicilio<br>Ciudad: ${escapar(p.cliente.ciudad)}<br>Zona: ${escapar(p.cliente.zona)}<br>Dirección: ${escapar(p.cliente.direccion)}<br>Preparado por: ${escapar(CONFIG.sucursales[p.cliente.sucursal]?.nombre || p.cliente.sucursal)}`
    : `🏪 Recoger en: ${escapar(CONFIG.sucursales[p.cliente.sucursal]?.nombre || p.cliente.sucursal)}`;
  return `<div class="summary-section"><strong>👤 Cliente</strong><br>${escapar(p.cliente.nombre)} · ${escapar(p.cliente.telefono)}</div>
  <div class="summary-section"><strong>📍 Entrega</strong><br>${entrega}</div>
  <div class="summary-section"><strong>🍽️ Productos</strong>${p.items.map(i=>{const x=producto(i.id);return `<div class="summary-line"><span>${i.cantidad} × ${escapar(x.nombre)}</span><strong>${dinero(x.precio*i.cantidad)}</strong></div>`}).join("")}</div>
  <div class="summary-line"><span>Empaque</span><strong>${dinero(p.empaque)}</strong></div>
  <div class="summary-line"><span>Domicilio</span><strong>${dinero(p.domicilio)}</strong></div>
  <div class="summary-line total"><span>TOTAL</span><strong>${dinero(p.total)}</strong></div>
  <div class="summary-section"><strong>📝 Observaciones:</strong> ${escapar(p.cliente.nota)}</div>`;
}

function mensajePedido(){
  const p=pedidoActual, modalidad=p.modalidad==="domicilio"?"🛵 DOMICILIO":"🏪 RECOGER EN SUCURSAL";
  return `*EMPANADAS QUE RICO — PEDIDO #${p.numero_pedido}*

👤 *CLIENTE*
Nombre: ${p.cliente.nombre}
Teléfono: ${p.cliente.telefono}

📍 *ENTREGA*
Modalidad: ${modalidad}
${p.modalidad==="domicilio"
?`Ciudad: ${p.cliente.ciudad}
Zona: ${p.cliente.zona}
Dirección: ${p.cliente.direccion}
Punto que prepara/envía: ${CONFIG.sucursales[p.cliente.sucursal]?.nombre || p.cliente.sucursal}`
:`Sucursal: ${CONFIG.sucursales[p.cliente.sucursal]?.nombre || p.cliente.sucursal}`}

🍽️ *PRODUCTOS*
${p.items.map(i=>{const x=producto(i.id);return `${i.cantidad} x ${x.nombre} — ${dinero(x.precio*i.cantidad)}`}).join("\n")}

📦 Empaque: ${p.empaque?`Caja — ${dinero(p.empaque)}`:"Bolsa — $0"}
🛵 Domicilio: ${dinero(p.domicilio)}
💰 *TOTAL: ${dinero(p.total)}*
💳 Método: ${p.metodo==="transferencia"?"Transferencia":"Efectivo"}
🟡 *ESTADO: PENDIENTE DE VERIFICACIÓN*
📝 Observación: ${p.cliente.nota || "Ninguna"}`;
}

async function guardarPedidoEnNube(){
  if(!pedidoActual) throw new Error("No existe pedidoActual.");
  if(pedidoActual.idNube) return pedidoActual;
  const client=obtenerSupabaseClient();

  const payload={
    p_sucursal: pedidoActual.cliente.sucursal || "",
    p_modalidad: pedidoActual.modalidad,
    p_metodo_pago: pedidoActual.metodo,
    p_cliente: pedidoActual.cliente,
    p_items: pedidoActual.items,
    p_subtotal: Number(pedidoActual.subtotal),
    p_empaque: Number(pedidoActual.empaque),
    p_domicilio: Number(pedidoActual.domicilio),
    p_total: Number(pedidoActual.total)
  };

  const {data,error}=await client.rpc("registrar_pedido_publico",payload);
  if(error){
    console.error("SUPABASE RPC ERROR:",error);
    throw new Error(error.message || "Supabase rechazó el pedido.");
  }
  const row=Array.isArray(data)?data[0]:data;
  if(!row?.id) throw new Error("La función de Supabase no devolvió el pedido.");
  pedidoActual.idNube=row.id;
  pedidoActual.numero_pedido=row.numero_pedido;
  pedidoActual.trackingToken=row.tracking_token;
  pedidoActual.estado=row.estado || "verificacion";
  localStorage.setItem(`pedido_${row.numero_pedido}`,JSON.stringify({
    numero:row.numero_pedido,trackingToken:row.tracking_token,estado:row.estado
  }));
  return pedidoActual;
}

function numeroWhatsApp(){
  return CONFIG.whatsapp[pedidoActual.cliente.sucursal] || CONFIG.whatsapp.Cuba;
}
function abrirWhatsApp(mensaje){
  const url=`https://wa.me/${numeroWhatsApp()}?text=${encodeURIComponent(mensaje)}`;
  window.location.href=url;
}
function mensajeError(e){
  console.error("REGISTRO DE PEDIDO:",e);
  const partes=[];
  if(e?.message) partes.push(e.message);
  if(e?.code) partes.push("Código: "+e.code);
  if(e?.details) partes.push("Detalle: "+e.details);
  if(e?.hint) partes.push("Ayuda: "+e.hint);
  const detalle=partes.join("\n") || String(e || "Error desconocido");
  alert("No pudimos registrar el pedido.\n\n"+detalle+"\n\nSi acabas de configurar Supabase, ejecuta COMPLETO el archivo supabase_integracion.sql en SQL Editor y vuelve a probar.");
}

function metodosPagoSucursal(sucursal){
  if(sucursal==="Circunvalar") return [
    {id:"transferencia",icon:"🏦",nombre:"Transferencia",detalle:"Bre-B · Nequi · Bancolombia"},
    {id:"efectivo",icon:"💵",nombre:"Efectivo",detalle:"Pago al recibir el domicilio"}
  ];
  if(sucursal==="Cuba") return [
    {id:"transferencia",icon:"🏦",nombre:"Transferencia",detalle:"Bre-B · Nequi"},
    {id:"efectivo",icon:"💵",nombre:"Efectivo",detalle:"Al recibir o recoger"}
  ];
  return [
    {id:"transferencia",icon:"🏦",nombre:"Transferencia",detalle:"Nequi · Bancolombia · Llave"},
    {id:"efectivo",icon:"💵",nombre:"Efectivo",detalle:"Al recibir o recoger"}
  ];
}
function renderMetodosPago(){
  const suc=pedidoActual?.cliente?.sucursal || puntoActual();
  const opciones=metodosPagoSucursal(suc);
  $("paymentOptions").innerHTML=opciones.map(x=>`<button class="payment-card" type="button" onclick="seleccionarPago('${x.id}')">
    <span>${x.icon}</span><strong>${x.nombre}</strong><small>${x.detalle}</small>
  </button>`).join("");
}
function datosTransferenciaSucursal(sucursal){
  if(sucursal==="Circunvalar") return `
    <div class="bank-data">
      <div><span>Llave Bre-B</span><strong>0092338157</strong></div>
      <div><span>Nequi</span><strong>3209321767</strong></div>
      <div><span>Bancolombia</span><strong>Cuenta de ahorros 72500010039</strong></div>
    </div>`;
  if(sucursal==="Cuba") return `
    <div class="bank-data">
      <div><span>Llave Bre-B</span><strong>3148978258</strong></div>
      <div><span>Nequi</span><strong>3148978258</strong></div>
      <div><span>Nombre de cuenta</span><strong>Maribel Rico Ceballos</strong></div>
    </div>`;
  return `<div class="bank-data"><div><span>Banco</span><strong>Bancolombia</strong></div><div><span>Llave</span><strong>CONFIGURA_AQUI_LA_LLAVE</strong></div><div><span>Nequi</span><strong>CONFIGURA_AQUI_EL_NUMERO</strong></div></div>`;
}
function seleccionarPago(metodo){
  pedidoActual.metodo=metodo;
  if(metodo==="transferencia"){
    $("checkoutResultado").innerHTML=`<div class="payment-info"><h3>🏦 Datos para transferencia</h3>
      <p>Transfiere exactamente <strong>${dinero(pedidoActual.total)}</strong>.</p>
      ${datosTransferenciaSucursal(pedidoActual.cliente.sucursal)}
      <p class="warning">Después del pago, envía el comprobante por WhatsApp.</p></div>
      <button class="primary-btn full" type="button" onclick="enviarPedido()">📲 Registrar pedido y enviar comprobante</button>`;
  }else{
    $("checkoutResultado").innerHTML=`<div class="success"><div class="success-icon">🧾</div><h2>Pedido listo</h2>${resumenHTML()}</div>
      <button class="primary-btn full" type="button" onclick="enviarPedido()">📲 Registrar pedido y enviar a WhatsApp</button>`;
  }
  mostrarPaso("checkoutResultado");
}

async function enviarPedido(){
  try{
    await guardarPedidoEnNube();
    const extra=pedidoActual.metodo==="transferencia"
      ? "\n\n⚠️ *ADJUNTA AQUÍ EL COMPROBANTE DE TRANSFERENCIA.*"
      : "";
    abrirWhatsApp(mensajePedido()+extra);
    mostrarPantallaFinal();
  }catch(e){mensajeError(e);}
}
function mostrarPantallaFinal(){
  $("checkoutResultado").innerHTML=`<div class="verification-screen">
    <div class="status-icon yellow">🟡</div>
    <span class="order-code">Pedido #${escapar(pedidoActual.numero_pedido)}</span>
    <h2>Pedido registrado</h2>
    <div class="invoice-card">${resumenHTML()}</div>
    <p>Tu pedido fue guardado correctamente y está pendiente de verificación.</p>
    <p>Guarda tu número de pedido para consultar el estado.</p>
    <button class="secondary-btn full" type="button" onclick="copiarSeguimiento()">🔗 Copiar seguimiento</button>
    <button class="primary-btn full" type="button" onclick="finalizarPedido()">Finalizar</button>
  </div>`;
}
function copiarSeguimiento(){
  const url=`${location.origin}${location.pathname}?pedido=${encodeURIComponent(pedidoActual.numero_pedido)}&token=${encodeURIComponent(pedidoActual.trackingToken)}#seguimiento`;
  navigator.clipboard?.writeText(url).then(()=>alert("Enlace copiado.")).catch(()=>prompt("Copia este enlace:",url));
}
function finalizarPedido(){
  carrito=[]; guardarCarrito(); renderCarrito(); cerrarCheckout(); modalidadEntrega=""; pedidoActual=null;
}

async function consultarPedido(){
  const numero=$("consultaPedido").value.trim().replace("#","");
  if(!numero){alert("Escribe el número de pedido.");return;}
  try{
    const client=obtenerSupabaseClient();
    const token=new URLSearchParams(location.search).get("token");
    const r=token
      ? await client.rpc("consultar_pedido_por_token",{p_token:token})
      : await client.rpc("consultar_pedido_por_numero",{p_numero:numero});
    if(r.error) throw r.error;
    const row=Array.isArray(r.data)?r.data[0]:r.data;
    if(!row){mostrarEstadoPedido(numero,"no_encontrado");return;}
    mostrarEstadoPedido(row.numero_pedido,row.estado,row.motivo_invalido);
  }catch(e){
    console.error(e);
    const local=JSON.parse(localStorage.getItem(`pedido_${numero}`)||"null");
    mostrarEstadoPedido(numero,local?.estado||"verificacion");
  }
}
function mostrarEstadoPedido(numero,estado,motivo=""){
  const estados={
    verificacion:["🟡","yellow","Pedido en verificación","Recibimos tu pedido y el negocio está revisando la información."],
    validado:["🟢","green","Pedido validado","El negocio validó el pedido. Continuará con la preparación."],
    rechazado:["🔴","red","Pedido rechazado",motivo?`Motivo: ${motivo}`:"El negocio no pudo validar el pedido."],
    preparacion:["🍳","blue","Pedido en preparación","Tu pedido está siendo preparado."],
    en_domicilio:["🛵","blue","Pedido en domicilio","Tu pedido salió para entrega."],
    entregado:["✅","green","Pedido entregado","Tu pedido fue entregado correctamente."],
    no_encontrado:["🔎","red","No encontrado","No encontramos un pedido con ese número."]
  };
  const e=estados[estado]||estados.verificacion;
  $("estadoPedidoCard").innerHTML=`<div class="status-icon ${e[1]}">${e[0]}</div><span class="order-code">Pedido #${escapar(numero)}</span><h3>${e[2]}</h3><p>${escapar(e[3])}</p>`;
}

async function cargarTarifasDomicilioDesdeNube(){
  try{
    const c=obtenerSupabaseClient();
    const {data,error}=await c.from("tarifas_domicilio").select("sucursal,ciudad,zona,precio,activo").eq("activo",true);
    if(error) throw error;
    (data||[]).forEach(r=>{
      if(r.sucursal==="Cuba"){ CONFIG.tarifasDomicilio.Cuba[r.ciudad] ||= {}; CONFIG.tarifasDomicilio.Cuba[r.ciudad][r.zona]=Number(r.precio); }
      else if(CONFIG.tarifasDomicilio[r.sucursal]) CONFIG.tarifasDomicilio[r.sucursal][r.zona]=Number(r.precio);
    });
  }catch(e){ console.warn("Tarifas locales usadas:",e.message); }
}

function renderTodo(){
  actualizarBanner(); renderMenu(); renderPuntos(); renderCarrito();
}
document.addEventListener("DOMContentLoaded",async()=>{
  await cargarProductosDesdeSupabase();
  await cargarTarifasDomicilioDesdeNube();
  renderTodo();
  const p=new URLSearchParams(location.search).get("pedido");
  if(p){$("consultaPedido").value=p;consultarPedido();}
  setInterval(()=>{actualizarBanner();renderPuntos();},30000);
});
