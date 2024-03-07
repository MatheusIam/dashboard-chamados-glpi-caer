import { TicketProps } from "@/components/tabelachamados/ticketprops";
import mariadb from "mariadb";
import { NextResponse } from "next/server";

export type ActorsProps = Actor[];

export interface Actor {
  id: number;
  name: string;
  password: string;
  password_last_update: any;
  phone: string;
  phone2: any;
  mobile: any;
  realname: string;
  firstname: string;
  locations_id: number;
  language: any;
  use_mode: number;
  list_limit: any;
  is_active: number;
  comment: any;
  auths_id: number;
  authtype: number;
  last_login: string;
  date_mod: string;
  date_sync: string;
  is_deleted: number;
  profiles_id: number;
  entities_id: number;
  usertitles_id: number;
  usercategories_id: number;
  date_format: any;
  number_format: any;
  names_format: any;
  csv_delimiter: any;
  is_ids_visible: any;
  use_flat_dropdowntree: any;
  show_jobs_at_login: any;
  priority_1: any;
  priority_2: any;
  priority_3: any;
  priority_4: any;
  priority_5: any;
  priority_6: any;
  followup_private: any;
  task_private: any;
  default_requesttypes_id: any;
  password_forget_token: any;
  password_forget_token_date: any;
  user_dn: string;
  registration_number: any;
  show_count_on_tabs: any;
  refresh_views: any;
  set_default_tech: any;
  personal_token: string;
  personal_token_date: string;
  api_token: any;
  api_token_date: any;
  cookie_token: string;
  cookie_token_date: string;
  display_count_on_home: any;
  notification_to_myself: any;
  duedateok_color: any;
  duedatewarning_color: any;
  duedatecritical_color: any;
  duedatewarning_less: any;
  duedatecritical_less: any;
  duedatewarning_unit: any;
  duedatecritical_unit: any;
  display_options: any;
  is_deleted_ldap: number;
  pdffont: any;
  picture: any;
  begin_date: any;
  end_date: any;
  keep_devices_when_purging_item: any;
  privatebookmarkorder: any;
  backcreated: any;
  task_state: any;
  palette: any;
  page_layout: any;
  fold_menu: any;
  fold_search: any;
  savedsearches_pinned: any;
  timeline_order: any;
  itil_layout: string;
  richtext_layout: any;
  set_default_requester: any;
  lock_autolock_mode: any;
  lock_directunlock_notification: any;
  date_creation: string;
  highcontrast_css: number;
  plannings: any;
  sync_field: any;
  groups_id: number;
  users_id_supervisor: number;
  timezone: any;
  default_dashboard_central: any;
  default_dashboard_assets: any;
  default_dashboard_helpdesk: any;
  default_dashboard_mini_ticket: any;
  default_central_tab: number;
  nickname: any;
  timeline_action_btn_layout: number;
  timeline_date_format: number;
}

export async function GET() {
  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   next: { revalidate: 60 },
  // })

  const conn = await mariadb.createConnection({
    host: process.env.NEXT_PUBLIC_API_DB_HOST,
    user: process.env.NEXT_PUBLIC_API_DB_USER,
    password: process.env.NEXT_PUBLIC_API_DB_PASSWD,
    database: process.env.NEXT_PUBLIC_API_DB_NAME,
  });

  const result = await conn.query(
    "SELECT * FROM glpi_users WHERE locations_id = 3 ORDER BY name ASC;",
    (err: any, res: any, meta: any) => {
      if (err) {
        console.error("Error querying data: ", err);
      } else {
        console.log(res);
      }
    }
  );

  const data: Promise<ActorsProps> = await result;

  return NextResponse.json(data);
}
