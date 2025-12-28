import type { Eveniment } from "@/types/events";

export const EVENIMENTE: Eveniment[] = [
  {
    id: 0,
    titlu: "Concert Calinacho",
    descriere:
      "Ultima noapte de dragoste. Ai Grija. Dezamagit. Doar cateva titluri! Hai la concert Calinacho si bucurate-te de muzica care face si cei mai tari oameni sa lacrimeze.",
    data: "2026-01-15",
    dataFormatata: "joi, 15 ian. 2026",
    ora: "21:00",
    locatie: "Sala Polivalentă, Bulevardul Liviu Rebreanu 6, Timișoara",
    categorie: "Muzică",
    culoare: "#1a1a2e",
    imageUrl:
      "https://yt3.googleusercontent.com/hD95zJPOdMs5IG4XZW4pQDgKaZun4qpzBYS3A5xqborU4UEQytdhDihig25sithll7CVSyAUp3M=s900-c-k-c0x00ffffff-no-rj",
    detalii:
      "Calinacho vine la Timișoara cu un concert spectaculos! Așteaptă-te la un show live cu toate hiturile care l-au făcut cunoscut în întreaga țară. Atmosferă de neuitat, sound profesional și o experiență muzicală de excepție.",
    linkuriTickets: [
      { nume: "iaBilet", url: "https://www.iabilet.ro" },
      { nume: "Eventim", url: "https://www.eventim.ro" },
      { nume: "MyTicket", url: "https://www.myticket.ro" },
      { nume: "Bilete.ro", url: "https://www.bilete.ro" },
    ],
  },
  {
    id: 1,
    titlu: "Expoziție de Artă Contemporană",
    descriere: "Lucrări de artiști români și internaționali",
    data: "2026-01-18",
    dataFormatata: "dum., 18 ian. 2026",
    ora: "18:00",
    locatie: "Muzeul de Artă, Piața Unirii 1, Timișoara",
    categorie: "Artă",
    culoare: "#667eea",
    imageUrl:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
    detalii:
      "O expoziție cuprinzătoare ce prezintă lucrări de artă contemporană de la artiști români și internaționali recunoscuți. Evenimentul oferă o perspectivă unică asupra tendințelor actuale în arta vizuală.",
    linkuriTickets: [
      { nume: "iaBilet", url: "https://www.iabilet.ro" },
      { nume: "Eventim", url: "https://www.eventim.ro" },
    ],
  },
  {
    id: 2,
    titlu: "Piesa de Teatru: Cui i-e frică de Virginia Woolf?",
    descriere: "Regie: Andrei Șerban",
    data: "2026-01-20",
    dataFormatata: "mar., 20 ian. 2026",
    ora: "19:30",
    locatie: "Teatrul Național, Str. Mărășești 2, Timișoara",
    categorie: "Teatru",
    culoare: "#f5576c",
    imageUrl:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=600&fit=crop",
    detalii:
      "Una dintre cele mai puternice piese de teatru ale secolului XX, pusă în scenă de regizorul de renume internațional Andrei Șerban. O experiență teatrală intensă și memorabilă.",
    linkuriTickets: [
      { nume: "iaBilet", url: "https://www.iabilet.ro" },
      { nume: "Eventim", url: "https://www.eventim.ro" },
      { nume: "MyTicket", url: "https://www.myticket.ro" },
    ],
  },
  {
    id: 3,
    titlu: "Concert Rock: The Urban Legends",
    descriere: "Concertul anului! The Urban Legends prezintă noul album",
    data: "2026-01-28",
    dataFormatata: "mie., 28 ian. 2026",
    ora: "21:00",
    locatie: "Sala Polivalentă, Bulevardul Liviu Rebreanu 6, Timișoara",
    categorie: "Muzică",
    culoare: "#a8edea",
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    detalii:
      "Concertul anului! The Urban Legends prezintă noul album într-un show spectaculos cu efecte vizuale impresionante. Opening act: Neon Lights. Bar deschis și merchandising oficial.",
    linkuriTickets: [
      { nume: "iaBilet", url: "https://www.iabilet.ro" },
      { nume: "Eventim", url: "https://www.eventim.ro" },
      { nume: "MyTicket", url: "https://www.myticket.ro" },
      { nume: "Bilete.ro", url: "https://www.bilete.ro" },
    ],
  },
  {
    id: 4,
    titlu: "Festival de Jazz: Jazz în Orașul Vechi",
    descriere: "Artiști locali și internaționali",
    data: "2026-02-05",
    dataFormatata: "joi, 5 feb. 2026",
    ora: "20:00",
    locatie: "Club Doors, Str. Emanoil Ungureanu 7, Timișoara",
    categorie: "Muzică",
    culoare: "#ffecd2",
    imageUrl:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=600&fit=crop",
    detalii:
      "O seară dedicată jazz-ului cu artiști locali și internaționali. Atmosferă intimă și sofisticată într-una dintre cele mai iconice locații din Timișoara.",
    linkuriTickets: [
      { nume: "iaBilet", url: "https://www.iabilet.ro" },
      { nume: "Bilete.ro", url: "https://www.bilete.ro" },
    ],
  },
  {
    id: 5,
    titlu: "Stand-up Comedy: Seară de Umor",
    descriere: "Cu Costel, Micutzu și invitați speciali",
    data: "2026-02-12",
    dataFormatata: "joi, 12 feb. 2026",
    ora: "20:30",
    locatie: "Casa de Cultură, Bulevardul Regele Ferdinand 2, Timișoara",
    categorie: "Comedy",
    culoare: "#ff9a9e",
    imageUrl:
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=600&fit=crop",
    detalii:
      "O seară plină de râs alături de cei mai apreciați comedianți români. Show de stand-up comedy cu durată de aproximativ 2 ore.",
    linkuriTickets: [
      { nume: "iaBilet", url: "https://www.iabilet.ro" },
      { nume: "Eventim", url: "https://www.eventim.ro" },
      { nume: "MyTicket", url: "https://www.myticket.ro" },
    ],
  },
  {
    id: 6,
    titlu: "Festival de Film: TIFF - Timișoara International Film Festival",
    descriere: "Proiecții de filme independente și documentare",
    data: "2026-02-20",
    dataFormatata: "vin., 20 feb. 2026",
    ora: "19:00",
    locatie: "Cinema Victoria, Bulevardul Revoluției din 1989, Timișoara",
    categorie: "Film",
    culoare: "#4a5568",
    imageUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop",
    detalii:
      "Festivalul Internațional de Film de la Timișoara aduce la ecran cele mai bune filme independente și documentare din întreaga lume. Proiecții speciale, întâlniri cu regizori și discuții despre cinematografie.",
    linkuriTickets: [
      { nume: "iaBilet", url: "https://www.iabilet.ro" },
      { nume: "Eventim", url: "https://www.eventim.ro" },
    ],
  },
  {
    id: 7,
    titlu: "Concert Clasic: Orchestra Filarmonicii de Stat Timișoara",
    descriere: "Simfonia nr. 9 de Beethoven",
    data: "2026-02-25",
    dataFormatata: "mie., 25 feb. 2026",
    ora: "19:30",
    locatie: "Filarmonica de Stat, Piața Victoriei 1, Timișoara",
    categorie: "Muzică",
    culoare: "#2d3748",
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    detalii:
      "O seară memorabilă cu Orchestra Filarmonicii de Stat Timișoara, prezentând Simfonia nr. 9 de Ludwig van Beethoven. Dirijor: maestro Cristian Mandeal. Un eveniment de neuitat pentru iubitorii de muzică clasică.",
    linkuriTickets: [
      { nume: "iaBilet", url: "https://www.iabilet.ro" },
      { nume: "Eventim", url: "https://www.eventim.ro" },
      { nume: "MyTicket", url: "https://www.myticket.ro" },
    ],
  },
  {
    id: 8,
    titlu: "Concert Clasic: Orchestra Filarmonicii de Stat Timișoara",
    descriere: "Simfonia nr. 9 de Beethoven",
    data: "2026-02-25",
    dataFormatata: "mie., 25 feb. 2026",
    ora: "19:30",
    locatie: "Filarmonica de Stat, Piața Victoriei 1, Timișoara",
    categorie: "Muzică",
    culoare: "#2d3748",
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    detalii:
      "O seară memorabilă cu Orchestra Filarmonicii de Stat Timișoara, prezentând Simfonia nr. 9 de Ludwig van Beethoven. Dirijor: maestro Cristian Mandeal. Un eveniment de neuitat pentru iubitorii de muzică clasică.",
    linkuriTickets: [
      { nume: "iaBilet", url: "https://www.iabilet.ro" },
      { nume: "Eventim", url: "https://www.eventim.ro" },
      { nume: "MyTicket", url: "https://www.myticket.ro" },
    ],
  },
];

