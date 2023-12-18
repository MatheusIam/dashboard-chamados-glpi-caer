export interface ticketIDProps {
  id: number;
  tickets_id: string;
  users_id: string;
  type: number;
  use_notification: number;
  alternative_email: string;
  links: Link[];
}

export interface Link {
  rel: string;
  href: string;
}
