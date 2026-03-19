import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import Link from "next/link";
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

  const getHref = useCallback((lessonName: string) => {
    const parts = lessonName.split(' ');
    const number = parts[parts.length - 1];
    switch (item) {
      case "Русский":
        return `/russian/${number}`;
      case "Математика":
        return `/math/${number}`;
      case "Scratch":
        return `/scratch/${number}`;
      default:
        return '/';
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
            <Link key={lessonName} href={getHref(lessonName)} passHref>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary={lessonName} />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Collapse>
    </>
  );
});

DrawerListItem.displayName = "DrawerListItem";
