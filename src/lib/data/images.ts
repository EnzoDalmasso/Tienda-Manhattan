/**
 * Imágenes demo (Unsplash). Reemplazar por fotos propias de la marca
 * (Supabase Storage / Cloudinary) cuando estén disponibles.
 */
const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  // Editorial / lifestyle
  heroTrench: u("1539533018447-63fcce2678e3", 2000),
  heroShopping: u("1483985988355-763728e1935b", 2000),
  blazerStreet: u("1552874869-5c39ec9288dc"),
  darkCoatStreet: u("1485968579580-b6d095142e6e"),
  whiteDressStreet: u("1566206091558-7f218b696731"),
  hatWhite: u("1617922001439-4a2e6562f328"),
  whiteShirtWoman: u("1581338834647-b0fb40704e21"),
  denimCoatMilan: u("1539109136881-3be0616acf4b"),
  // Tienda
  storeInterior: u("1567401893414-76b7b1e5a7a5", 1800),
  storeRack: u("1445205170230-053b83016050", 1800),
  storeBoutique: u("1441986300917-64674bd600d8", 1800),
  rackWhite: u("1490481651871-ab68de25d43d"),
  rackNeutral: u("1603400521630-9f2de124b33b"),
  rackPastel: u("1578932750294-f5075e85f44a"),
  hangersPastel: u("1509319117193-57bab727e09d"),
  knitRack: u("1558769132-cb1aea458c5e"),
  // Vestidos
  floralDress: u("1496747611176-843222e1e57c"),
  redFlowingDress: u("1595777457583-95e059d581b8"),
  redPolkaDress: u("1572804013309-59a88b7e92f1"),
  purpleDress: u("1566174053879-31528523f8ae"),
  denimDress: u("1591369822096-ffd140ec948f"),
  greenSlip: u("1618932260643-eee4a2f652a6"),
  redGown: u("1612336307429-8a898d10e223"),
  purpleLace: u("1551803091-e20673f15770"),
  // Blusas / camisas
  whiteBlouse: u("1581044777550-4cfa60707c03"),
  embroideredBlouse: u("1564257631407-4deb1f99d992"),
  denimShirt: u("1596755094514-f87e34085b2c"),
  blouseSkirt: u("1583496661160-fb5886a0aaaa"),
  blueTee: u("1564584217132-2271feaeb3c5"),
  redTop: u("1529139574466-a303027c1d8b"),
  // Abrigos / sacos
  blackCoat: u("1554412933-514a83d2f3c8"),
  burgundyCoat: u("1483985988355-763728e1935b"),
  leatherJacket: u("1551028719-00167b16eac5"),
  denimJacket: u("1611312449408-fcece27cdbb7"),
  bomber: u("1591047139829-d91aecb6caea"),
  // Tejidos
  creamKnit: u("1434389677669-e08b4cac3105"),
  foldedKnit: u("1624623278313-a930126a11c3"),
  redSweat: u("1485230895905-ec40ba36b9bc"),
  // Denim / pantalones
  foldedJeans: u("1604176354204-9268737828e4"),
  jeansDetail: u("1542272604-787c3835535d"),
  jeansLegs: u("1541099649105-f69ad21f3246"),
  pinkJoggers: u("1594633312681-425c7b97ccd1"),
  jeansFlatlay: u("1544441893-675973e31985"),
  // Faldas
  whiteSkirt: u("1582142306909-195724d33ffc"),
  // Accesorios
  redBag: u("1584917865442-de89df76afd3"),
  orangeBag: u("1590874103328-eac38a683ce7"),
  sunglasses: u("1511499767150-a48a237f0083"),
  jewelry: u("1606760227091-3dd870d97f1d"),
  bootsFlatlay: u("1479064555552-3ef4979f8908"),
  flatlay: u("1525507119028-ed4c629a60a3"),
} as const;
