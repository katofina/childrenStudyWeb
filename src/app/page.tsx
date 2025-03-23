import Image from "next/image";
import styles from "./page.module.css";
import { Paper, List, ListItem, ListItemText } from "@mui/material";

const ARR_CLASSES = [
    "Обучению чтению и грамоте детей от 4 лет",
    "Математические занятия для детей 5-12 лет",
    "Уроки по программированию (Scratch) от 7 лет",
  ];

export default function Home() {

  return (
    <div className={styles.page}>
      <Paper variant="elevation" elevation={3} className={styles.paper}>
        <div className={styles.image}>
          <Image
            src="/imagesForChildren/playingchildren.png"
            height={300}
            width={500}
            layout="responsive"
            alt=""
          />
        </div>

        <List className={styles.list}>
          {ARR_CLASSES.map((item) => (
            <ListItem key={item} className={styles.listItem}>
              <ListItemText
              primary={item}
              slotProps={{
                primary: {
                  sx: { fontSize: "1.5rem" },
                },
              }}
            />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
}
