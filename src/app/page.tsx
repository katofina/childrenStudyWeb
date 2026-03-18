'use client';
import Image from "next/legacy/image";
import styles from "./page.module.css";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";

const ARR_CLASSES = [
  "Обучению чтению и грамоте детей от 4 лет",
  "Математические занятия для детей 5-12 лет",
  "Уроки по программированию (Scratch) от 7 лет",
];

export default function Home() {
  return (
    <div className={styles.page}>
      <Paper variant="elevation" elevation={3} className={styles.paper}>
        <Box className={styles.hero}>
          <div className={styles.heroBg}>
            <Image
              src="/imagesForChildren/playingchildren.png"
              alt="Дети играют"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>

          <Box className={styles.heroContent}>
            <Typography component="p" sx={{ fontSize: "2.4rem", fontWeight: 700, mb: 1 }}>
              Добро пожаловать в ChildrenStudy!
            </Typography>
            <Typography component="p" sx={{ fontSize: "1.3rem", color: "rgba(0,0,0,0.7)" }}>
              Весёлые занятия для детей 4–12 лет с яркими сюрпризами и играми!
            </Typography>
          </Box>
        </Box>

        <List className={styles.list}>
          {ARR_CLASSES.map((item, index) => (
            <ListItem key={item} className={styles.listItem}>
              <ListItemText
                primary={item}
                secondary={`Уровень ${index + 1}`}
                slotProps={{
                  primary: {
                    sx: { fontSize: "1.7rem", fontWeight: 700 },
                  },
                  secondary: {
                    sx: { color: "rgba(0,0,0,0.7)", fontSize: "1.1rem" },
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
