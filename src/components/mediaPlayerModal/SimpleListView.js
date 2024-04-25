import React, { useState } from "react";
import { Container, Button,Tooltip } from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  itemButton: {
    background: "#499cea",
    color: "white",
    margin: 2,
    textAlign: "left",
    wordBreak: "break-all",
    height:40,
    display: "block",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "99.1%",
    borderRadius:0,
    "&:hover": {
      background: "#168eff",
    },
  },
  itemButtonSelected: {
    background: "#db3d44",
    "&:hover": {
      background: "#db3d44",
    },
  },
}));
const SimpleListView = (props) => {
  const classes = useStyles();
  const [items, setItems] = useState(props.items);
  return (
    <Container
      disableGutters={true}
     
    >
      {items.map((item) => {
        return (
            <Tooltip title={item.text}>
          <Button tool
            variant="contained"
            className={clsx(classes.itemButton, {
              [classes.itemButtonSelected]: item.selected,
            })}
            onClick={() => {
              const prevSelectedItem = _.find(items, (node) => node.selected);
              if (prevSelectedItem != undefined)
                prevSelectedItem.selected = undefined;

              item.selected = true;
              setItems(_.cloneDeep(items));
              props.onItemClick(item);
            }}
            key={item.id}
          >
            {item.text}
          </Button>
          </Tooltip>
        );
      })}
    </Container>
  );
};

export default SimpleListView;
