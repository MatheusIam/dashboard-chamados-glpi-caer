export interface TicketProps {
  id: number;
  entities_id: number;
  name: string;
  date: string;
  closedate: any;
  solvedate: string;
  takeintoaccountdate: string;
  date_mod: string;
  users_id_lastupdater: number;
  status: number;
  users_id_recipient: number;
  requesttypes_id: number;
  content: string;
  urgency: number;
  impact: number;
  priority: number;
  itilcategories_id: number;
  type: number;
  global_validation: number;
  slas_id_ttr: number;
  slas_id_tto: number;
  slalevels_id_ttr: number;
  time_to_resolve: any;
  time_to_own: any;
  begin_waiting_date: string;
  sla_waiting_duration: number;
  ola_waiting_duration: number;
  olas_id_tto: number;
  olas_id_ttr: number;
  olalevels_id_ttr: number;
  ola_ttr_begin_date: any;
  internal_time_to_resolve: any;
  internal_time_to_own: any;
  waiting_duration: number;
  close_delay_stat: number;
  solve_delay_stat: number;
  takeintoaccount_delay_stat: number;
  actiontime: number;
  is_deleted: number;
  locations_id: number;
  validation_percent: number;
  date_creation: string;
  links: Link[];
}

export interface Link {
  rel: string;
  href: string;
}
