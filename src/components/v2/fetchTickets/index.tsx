"use client";
import { useFetchTickets } from "@/hooks/useFetchTickets";
import { Grid3x3 } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
  Container,
  Grid,
  Modal,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import sanitizeHtml from "sanitize-html";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export type Chamados = Chamado[];

export interface Chamado {
  id: number;
  entities_id: number;
  name: string;
  date: string;
  closedate: string;
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
  begin_waiting_date: any;
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
}

const TabelaChamadosV2 = () => {
  const [tickets, setTickets] = useState<Chamados>([]); // ja mapeia os chamadosa
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/getTickets");
        if (!response.ok) {
          throw new Error(
            "Não conseguir buscar os chamados. Verifique se o cliente está na intranet."
          );
        }

        const data = await response.json();

        setTickets(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);
  return (
    <Grid
      container
      spacing={1}
      sx={{
        marginTop: 1,
        margin: "0 auto",
        gap: 0,
      }}
    >
      {isLoading && <div>Loading tickets...</div>}
      {error && <div>Error: {error}</div>}

      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </Grid>
  );
};

type ticketCardProps = {
  ticket: Chamado;
};

const baseFontSize = 16; // tamanho em pixels
const getTypographyStyles = (mediaQuery: any) => ({
  root: {
    fontSize: baseFontSize,
    [`@media (min-width: 3000px)`]: {
      fontSize: baseFontSize * 1.2, // Aumenta o tamanho da fonte em 20% para TVs 4K
    },
  },
});

const TicketCard = ({ ticket }: ticketCardProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const htmlsanitized = extractString(ticket.content);
  const truncatedContent = htmlsanitized.substring(0, 50);

  return (
    <Grid item xs={6} sm={4} md={4} lg={4} xl={4}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            maxHeight: "80vh", // Set a maximum height for the modal
            overflowY: "auto", // Add vertical scroll when content overflows
          }}
        >
          <ModalContent ticket={ticket} />
        </Box>
      </Modal>
      <Card key={ticket.id} sx={{ maxWidth: "100%", height: "100%" }}>
        <CardActionArea
          onClick={handleOpen}
          sx={{ maxWidth: "100%", height: "100%" }}
        >
          <CardContent>
            <Typography
              variant="h1"
              sx={{
                fontSize: baseFontSize,
                ["@media (min-width: 3000px)"]: {
                  // Media query simplificada
                  fontSize: baseFontSize * 3,
                },
                fontWeight: "bold",
              }}
            >
              {ticket.name}
            </Typography>
            <Typography
              sx={{
                fontSize: baseFontSize,
                ["@media (min-width: 3000px)"]: {
                  // Media query simplificada
                  fontSize: baseFontSize * 2.6,
                },
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: truncatedContent }} />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

// util para interpretar html
const extractString = (html: string): string => {
  // Cria um elemento DOM a partir do HTML
  const element = document.createElement("div");
  element.innerHTML = html;

  // Retorna o texto sem formatação do elemento
  return element.textContent || "";
};

// dentro do modal
const ModalContent = ({ ticket }: ticketCardProps) => {
  const htmlsanitized = extractString(ticket.content);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  let [nestedUserList, setNestedUserList] = useState(false);

  const handleClickNestedItem = () => {
    setNestedUserList(!nestedUserList);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setNestedUserList(false);
  };

  useEffect(() => {
    // Perform any side-effects related to nestedUserList
    console.log("nestedUserList updated:", nestedUserList);
  }, [nestedUserList]);

  let menuData = ["- Próximo da fila -", "Outro usuário"];
  let usersData = ["fulano", "ciclano", "beltrano"];

  return (
    <div>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {ticket.name}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <div dangerouslySetInnerHTML={{ __html: htmlsanitized }} />
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            onClick={handleClick}
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Typography justifyContent={"center"}>Atribuir chamado</Typography>
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            sx={{ overflowY: "scroll" }}
          >
            {menuData.map((option) => (
              <MenuItem key={option} onClick={handleClose}>
                {option}
              </MenuItem>
            ))}
            <ListItemButton onClick={handleClickNestedItem}>
              teste
            </ListItemButton>
            <Collapse in={nestedUserList} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {usersData.map((option) => (
                  <ListItemButton key={option} onClick={handleClose}>
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={option} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Menu>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            onClick={() =>
              window.open(
                `${process.env.NEXT_PUBLIC_API_GLPI_BASE_URL_TICKET}/?id=${ticket.id}`
              )
            }
          >
            <Typography justifyContent={"center"}>Página GLPI</Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default TabelaChamadosV2;
