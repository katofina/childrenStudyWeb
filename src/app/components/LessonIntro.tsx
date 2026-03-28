"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchLessonIntroFromFirestore } from "../firebase/lessonService";
import { LessonIntroData } from "../types/types";
import Image from "next/image";

export interface LessonIntroProps {
  lessonNumber: number;
  firestoreEnabled?: boolean;
}

const visualImagePool = [
  "/imagesForChildren/cloud.gif",
  "/imagesForChildren/clouds.gif",
  "/imagesForChildren/sun.gif",
  "/imagesForChildren/butterflies.gif",
];

export function LessonIntro({
  lessonNumber,
  firestoreEnabled = true,
}: LessonIntroProps) {
  const [data, setData] = useState<LessonIntroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const backgroundImage = useMemo(() => {
    const idx = Math.floor(Math.random() * visualImagePool.length);
    return visualImagePool[idx];
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        if (firestoreEnabled) {
          const result = await fetchLessonIntroFromFirestore(lessonNumber);
          setData(result);
        } else {
          setError("На данный момент урок не доступен.")
        }
      } catch (e) {
        console.error("LessonIntro load error:", e);
        setError("На данный момент урок не доступен");
      };
    }

    load();
  }, [lessonNumber, firestoreEnabled]);

  if (loading) {
    return <div>Загрузка урока {lessonNumber}...</div>;
  }

  if (!data) {
    return <div>Данные урока не найдены.</div>;
  }
  
  if (error.length) {
    return <div>{error}</div>
  }

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#C9FFEA",
        borderRadius: "24px",
        border: "3px solid #1F4DFF",
        padding: "24px",
        textAlign: "center",
        color: "#08387A",
        fontFamily: "Comic Sans MS, Comic Neue, Segoe UI, sans-serif",
        overflow: "hidden",
        minWidth: "310px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <Image
        src={backgroundImage}
        alt="background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.2,
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <h1 style={{ margin: 0, color: "#042D66", fontSize: "3.2rem" }}>
          Страна Русского языка
        </h1>
        <p
          style={{
            margin: "12px 0 24px",
            fontSize: "1.7rem",
            color: "#022155",
          }}
        >
          Путешествие{" "}
          <Image
            src="/imagesForChildren/${lessonNumber}.gif"
            alt={`Урок ${data.lessonNumber}`}
            style={{ width: "140px", margin: "0 auto 18px", display: "block" }}
          />
        </p>

        <p style={{ fontSize: "1.3rem", lineHeight: 1.5, padding: "0 16px" }}>
          {data.preAttentionText}
        </p>

        <p
          style={{
            fontSize: "2.2rem",
            color: "#DA1E21",
            fontWeight: 800,
            margin: "18px 0",
          }}
        >
          Внимание!
        </p>

        <p style={{ fontSize: "1.35rem", lineHeight: 1.5, padding: "0 16px" }}>
          {data.postAttentionText}
        </p>
      </div>
    </div>
  );
}
