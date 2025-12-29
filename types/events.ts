export interface TicketLink {
  nume: string;
  url: string;
}

export interface Eveniment {
  id: number;
  titlu: string;
  descriere: string;
  data: string;
  dataFormatata: string;
  ora: string;
  locatie: string;
  categorie: string;
  culoare: string;
  imageUrl: string;
  detalii: string;
  linkuriTickets: TicketLink[];
}

