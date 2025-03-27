import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { LessonName } from "../types/types";
import {
  LESSONS_LIST,
  MATH_LESSONS,
  RUS_LESSONS,
} from "../constants/constants";

interface Prop {
  item: LessonName;
}

export const DrawerListItem = ({ item }: Prop) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lessonArray, setLessonArray] = useState<Array<string>>([]);

  useEffect(() => {
    const setCorrectArray = (lessonQuantity: number) => {
      if (lessonQuantity > 0) {
        const rightArray = new Array(lessonQuantity)
          .fill(item + " ")
          .map((item, index) => item + (index + 1));
        setLessonArray(rightArray);
      } else setLessonArray([]);
    };

    switch (item) {
      case LESSONS_LIST[0]:
        setCorrectArray(RUS_LESSONS);
        break;
      case LESSONS_LIST[1]:
        setCorrectArray(MATH_LESSONS);
        break;
      case "Scratch":
        setCorrectArray(0);
        break;
      default:
        setCorrectArray(0);
    }
  }, [item]);

  const chooseLesson = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <ListItemButton onClick={chooseLesson}>
        <ListItemText primary={item} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {lessonArray.map((item) => (
            <ListItemButton sx={{pl: 4}} key={item}>
              <ListItemText primary={item} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};
