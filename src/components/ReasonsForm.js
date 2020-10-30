import React from "react";
import { Checkbox, Typography } from "@material-ui/core";

import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  ShoppingCart,
  LocalPharmacy,
  EmojiPeople,
  BusinessCenter,
  ChildCare,
  AccountBalance,
  Accessible,
  School,
  DirectionsRun,
} from "@material-ui/icons";

const outingReasons = [
  {
    id: "work",
    title: "Travail",
    icon: BusinessCenter,
    description: "Déplacements professionnels",
  },
  {
    id: "shopping",
    title: "Achats",
    icon: ShoppingCart,
    description: "Achats de première nécessité",
  },
  {
    id: "health",
    title: "Santé",
    icon: LocalPharmacy,
    description: "Consultations médicales",
  },
  {
    id: "family",
    title: "Famille",
    icon: ChildCare,
    description: "Garde d'enfants, assistance à une personne vulnérable",
  },
  {
    id: "handicap",
    title: "Handicap",
    icon: Accessible,
    description: "Déplacements de personnes en situation de handicap",
  },
  {
    id: "sport",
    title: "Sport",
    icon: DirectionsRun,
    description: "Se dégourdir les jambes avec/sans chien",
  },
  {
    id: "justice",
    title: "Convocation",
    icon: AccountBalance,
    description: "Convocation judiciaire ou administrative",
  },
  {
    id: "missions",
    title: "Missions",
    icon: EmojiPeople,
    description:
      "Missions d'intérêt général sur demande de l'autorité administrative",
  },
  {
    id: "school",
    title: "Ecole",
    icon: School,
    description: "Déplacement pour chercher les enfants à l'école",
  },
];

const ReasonsForm = function (props) {
  const _getInitialState = function () {
    let initialState = {};
    outingReasons.forEach((reason) => {
      initialState = { ...initialState, [reason.id]: false };
    });

    return initialState;
  };
  const [state, setState] = React.useState(_getInitialState());

  React.useEffect(() => {
    props.onChange(state);
  }, [state, props]);

  const handleChange = (id) => () => {
    setState((state) => ({ ...state, [id]: !state[id] }));
  };

  return (
    <React.Fragment>
      <List>
        {outingReasons.map(({ id, title, icon, description }) => {
          return (
            <ListItem button key={id} onClick={handleChange(id)}>
              <ListItemIcon>{React.createElement(icon, {})}</ListItemIcon>
              <ListItemText>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2">{description}</Typography>
              </ListItemText>
              <ListItemSecondaryAction>
                <Checkbox checked={state[id]} onChange={handleChange(id)} />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </React.Fragment>
  );
};

export default ReasonsForm;
