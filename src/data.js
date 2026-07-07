// Fluency – Französisch-Vokabeldatenbank
// 6 thematische Lektionen mit jeweils ~10 Vokabeln

export const LESSONS = [
  {
    id: 'basics',
    title: 'Grundlagen',
    icon: '🏠',
    description: 'Begrüßung, Zahlen & Farben',
    words: [
      { id: 'b1', word: 'Bonjour', translation: 'Guten Tag', example: 'Bonjour, comment allez-vous ?', pronunciation: 'bɔ̃ʒuʁ' },
      { id: 'b2', word: 'Merci', translation: 'Danke', example: 'Merci beaucoup pour votre aide.', pronunciation: 'mɛʁsi' },
      { id: 'b3', word: 'S\'il vous plaît', translation: 'Bitte', example: 'Un café, s\'il vous plaît.', pronunciation: 'sil vu plɛ' },
      { id: 'b4', word: 'Au revoir', translation: 'Auf Wiedersehen', example: 'Au revoir et à bientôt !', pronunciation: 'o ʁəvwaʁ' },
      { id: 'b5', word: 'Oui', translation: 'Ja', example: 'Oui, je suis d\'accord.', pronunciation: 'wi' },
      { id: 'b6', word: 'Non', translation: 'Nein', example: 'Non, je ne comprends pas.', pronunciation: 'nɔ̃' },
      { id: 'b7', word: 'Excusez-moi', translation: 'Entschuldigung', example: 'Excusez-moi, où est la gare ?', pronunciation: 'ɛkskyzemoʁ' },
      { id: 'b8', word: 'Rouge', translation: 'Rot', example: 'La rose est rouge.', pronunciation: 'ʁuʒ' },
      { id: 'b9', word: 'Bleu', translation: 'Blau', example: 'Le ciel est bleu aujourd\'hui.', pronunciation: 'blø' },
      { id: 'b10', word: 'Blanc', translation: 'Weiß', example: 'La neige est blanche.', pronunciation: 'blɑ̃' },
    ]
  },
  {
    id: 'food',
    title: 'Essen & Trinken',
    icon: '🍽️',
    description: 'Im Restaurant & in der Küche',
    words: [
      { id: 'f1', word: 'Le petit-déjeuner', translation: 'Das Frühstück', example: 'Je prends le petit-déjeuner à huit heures.', pronunciation: 'lə pəti deʒøne' },
      { id: 'f2', word: 'Le pain', translation: 'Das Brot', example: 'J\'achète du pain à la boulangerie.', pronunciation: 'lə pɛ̃' },
      { id: 'f3', word: 'Le fromage', translation: 'Der Käse', example: 'La France a plus de 400 fromages.', pronunciation: 'lə fʁɔmaʒ' },
      { id: 'f4', word: 'Le vin', translation: 'Der Wein', example: 'Un verre de vin rouge, s\'il vous plaît.', pronunciation: 'lə vɛ̃' },
      { id: 'f5', word: 'L\'eau', translation: 'Das Wasser', example: 'Je voudrais une bouteille d\'eau.', pronunciation: 'lo' },
      { id: 'f6', word: 'Le poulet', translation: 'Das Hähnchen', example: 'Le poulet rôti est délicieux.', pronunciation: 'lə pulɛ' },
      { id: 'f7', word: 'La salade', translation: 'Der Salat', example: 'Je mange une salade pour le déjeuner.', pronunciation: 'la salad' },
      { id: 'f8', word: 'Le gâteau', translation: 'Der Kuchen', example: 'Ce gâteau au chocolat est excellent.', pronunciation: 'lə ɡɑto' },
      { id: 'f9', word: 'Délicieux', translation: 'Köstlich', example: 'Ce repas est vraiment délicieux !', pronunciation: 'delisjø' },
      { id: 'f10', word: 'L\'addition', translation: 'Die Rechnung', example: 'L\'addition, s\'il vous plaît.', pronunciation: 'ladisjɔ̃' },
    ]
  },
  {
    id: 'travel',
    title: 'Stadt & Reisen',
    icon: '🏙️',
    description: 'Unterwegs in Frankreich',
    words: [
      { id: 't1', word: 'La gare', translation: 'Der Bahnhof', example: 'Le train part de la gare à midi.', pronunciation: 'la ɡaʁ' },
      { id: 't2', word: 'L\'aéroport', translation: 'Der Flughafen', example: 'L\'aéroport est à 30 minutes.', pronunciation: 'laeʁɔpɔʁ' },
      { id: 't3', word: 'L\'hôtel', translation: 'Das Hotel', example: 'J\'ai réservé une chambre à l\'hôtel.', pronunciation: 'lotɛl' },
      { id: 't4', word: 'La rue', translation: 'Die Straße', example: 'La rue est très animée le soir.', pronunciation: 'la ʁy' },
      { id: 't5', word: 'Le musée', translation: 'Das Museum', example: 'Le musée du Louvre est magnifique.', pronunciation: 'lə myze' },
      { id: 't6', word: 'La pharmacie', translation: 'Die Apotheke', example: 'Il y a une pharmacie au coin de la rue.', pronunciation: 'la faʁmasi' },
      { id: 't7', word: 'Le billet', translation: 'Die Fahrkarte', example: 'J\'ai acheté un billet aller-retour.', pronunciation: 'lə bijɛ' },
      { id: 't8', word: 'À gauche', translation: 'Links', example: 'Tournez à gauche au prochain carrefour.', pronunciation: 'a ɡoʃ' },
      { id: 't9', word: 'À droite', translation: 'Rechts', example: 'Le restaurant est à droite.', pronunciation: 'a dʁwat' },
      { id: 't10', word: 'Tout droit', translation: 'Geradeaus', example: 'Continuez tout droit pendant 200 mètres.', pronunciation: 'tu dʁwa' },
    ]
  },
  {
    id: 'family',
    title: 'Familie & Freunde',
    icon: '👨‍👩‍👧',
    description: 'Menschen & Beziehungen',
    words: [
      { id: 'fa1', word: 'La mère', translation: 'Die Mutter', example: 'Ma mère cuisine très bien.', pronunciation: 'la mɛʁ' },
      { id: 'fa2', word: 'Le père', translation: 'Der Vater', example: 'Mon père travaille à Paris.', pronunciation: 'lə pɛʁ' },
      { id: 'fa3', word: 'Le frère', translation: 'Der Bruder', example: 'Mon frère a dix-huit ans.', pronunciation: 'lə fʁɛʁ' },
      { id: 'fa4', word: 'La sœur', translation: 'Die Schwester', example: 'Ma sœur étudie la médecine.', pronunciation: 'la sœʁ' },
      { id: 'fa5', word: 'L\'ami', translation: 'Der Freund', example: 'C\'est mon meilleur ami.', pronunciation: 'lami' },
      { id: 'fa6', word: 'L\'enfant', translation: 'Das Kind', example: 'Les enfants jouent dans le parc.', pronunciation: 'lɑ̃fɑ̃' },
      { id: 'fa7', word: 'Le mari', translation: 'Der Ehemann', example: 'Son mari est très gentil.', pronunciation: 'lə maʁi' },
      { id: 'fa8', word: 'La femme', translation: 'Die Ehefrau / Frau', example: 'Sa femme est professeur.', pronunciation: 'la fam' },
      { id: 'fa9', word: 'Les grands-parents', translation: 'Die Großeltern', example: 'Mes grands-parents habitent à Lyon.', pronunciation: 'le ɡʁɑ̃ paʁɑ̃' },
      { id: 'fa10', word: 'Le voisin', translation: 'Der Nachbar', example: 'Notre voisin est très sympathique.', pronunciation: 'lə vwazɛ̃' },
    ]
  },
  {
    id: 'daily',
    title: 'Alltag & Routinen',
    icon: '📅',
    description: 'Tägliches Leben',
    words: [
      { id: 'd1', word: 'Se réveiller', translation: 'Aufwachen', example: 'Je me réveille à sept heures.', pronunciation: 'sə ʁeveje' },
      { id: 'd2', word: 'Travailler', translation: 'Arbeiten', example: 'Je travaille de neuf à dix-sept heures.', pronunciation: 'tʁavaje' },
      { id: 'd3', word: 'Dormir', translation: 'Schlafen', example: 'Je dors huit heures par nuit.', pronunciation: 'dɔʁmiʁ' },
      { id: 'd4', word: 'Manger', translation: 'Essen', example: 'Nous mangeons ensemble le soir.', pronunciation: 'mɑ̃ʒe' },
      { id: 'd5', word: 'Acheter', translation: 'Kaufen', example: 'J\'achète des légumes au marché.', pronunciation: 'aʃte' },
      { id: 'd6', word: 'Aujourd\'hui', translation: 'Heute', example: 'Aujourd\'hui, il fait beau.', pronunciation: 'oʒuʁdɥi' },
      { id: 'd7', word: 'Demain', translation: 'Morgen', example: 'Demain, nous allons à la plage.', pronunciation: 'dəmɛ̃' },
      { id: 'd8', word: 'Hier', translation: 'Gestern', example: 'Hier, j\'ai visité le Louvre.', pronunciation: 'jɛʁ' },
      { id: 'd9', word: 'Le temps', translation: 'Die Zeit / Das Wetter', example: 'Le temps passe vite.', pronunciation: 'lə tɑ̃' },
      { id: 'd10', word: 'La maison', translation: 'Das Haus', example: 'Je rentre à la maison.', pronunciation: 'la mɛzɔ̃' },
    ]
  },
  {
    id: 'work',
    title: 'Arbeit & Schule',
    icon: '💼',
    description: 'Beruf & Bildung',
    words: [
      { id: 'w1', word: 'Le bureau', translation: 'Das Büro', example: 'Je suis au bureau jusqu\'à 18 heures.', pronunciation: 'lə byʁo' },
      { id: 'w2', word: 'L\'école', translation: 'Die Schule', example: 'Les enfants vont à l\'école à pied.', pronunciation: 'lekɔl' },
      { id: 'w3', word: 'L\'ordinateur', translation: 'Der Computer', example: 'J\'utilise l\'ordinateur pour travailler.', pronunciation: 'lɔʁdinatœʁ' },
      { id: 'w4', word: 'La réunion', translation: 'Die Besprechung', example: 'La réunion commence à dix heures.', pronunciation: 'la ʁeynjɔ̃' },
      { id: 'w5', word: 'Le professeur', translation: 'Der Lehrer', example: 'Le professeur explique la leçon.', pronunciation: 'lə pʁɔfɛsœʁ' },
      { id: 'w6', word: 'L\'étudiant', translation: 'Der Student', example: 'L\'étudiant prépare ses examens.', pronunciation: 'letydjɑ̃' },
      { id: 'w7', word: 'Apprendre', translation: 'Lernen', example: 'J\'apprends le français tous les jours.', pronunciation: 'apʁɑ̃dʁ' },
      { id: 'w8', word: 'Comprendre', translation: 'Verstehen', example: 'Je ne comprends pas cette phrase.', pronunciation: 'kɔ̃pʁɑ̃dʁ' },
      { id: 'w9', word: 'Écrire', translation: 'Schreiben', example: 'J\'écris un email à mon collègue.', pronunciation: 'ekʁiʁ' },
      { id: 'w10', word: 'Lire', translation: 'Lesen', example: 'J\'aime lire des livres en français.', pronunciation: 'liʁ' },
    ]
  }
];

// Alle Wörter flach als Array
export const ALL_WORDS = LESSONS.flatMap(lesson =>
  lesson.words.map(word => ({ ...word, lessonId: lesson.id, lessonTitle: lesson.title }))
);
