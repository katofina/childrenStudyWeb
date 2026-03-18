import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { useState, useMemo, useCallback, memo } from "react";
import { LessonName } from "../types/types";
import {
  LESSONS_LIST,
  MATH_LESSON_NAMES,
  RUS_LESSON_NAMES,
  SCRATCH_LESSON_NAMES,
} from "../constants/constants";

interface Prop {
  item: LessonName;
}

export const DrawerListItem = memo(({ item }: Prop) => {
  const [isOpen, setIsOpen] = useState(false);

  const lessonArray = useMemo(() => {
    switch (item) {
      case LESSONS_LIST[0]:
        return RUS_LESSON_NAMES;
      case LESSONS_LIST[1]:
        return MATH_LESSON_NAMES;
      case "Scratch":
        return SCRATCH_LESSON_NAMES;
      default:
        return [];
    }
  }, [item]);

  const chooseLesson = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <ListItemButton onClick={chooseLesson}>
        <ListItemText primary={item} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {lessonArray.map((lessonName) => (
            <ListItemButton sx={{ pl: 4 }} key={lessonName}>
              <ListItemText primary={lessonName} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
});

DrawerListItem.displayName = "DrawerListItem";
