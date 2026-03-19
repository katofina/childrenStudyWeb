"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchLessonIntroFromFirestore } from "../firebase/lessonService";
import { LessonIntroData } from "../types/types";

export interface LessonIntroProps {
  lessonNumber: number;
  firestoreEnabled?: boolean;
  onDataLoaded?: (data: LessonIntroData) => void;
}

const visualImagePool = [
  "/imagesForChildren/cloud.gif",
  "/imagesForChildren/cloud-2.gif",
  "/imagesForChildren/cloud-3.gif",
  "/imagesForChildren/sun.gif",
  "/imagesForChildren/butterfly.gif",
];

export function LessonIntro({ lessonNumber, firestoreEnabled = true, onDataLoaded }: LessonIntroProps) {
  const [data, setData] = useState<LessonIntroData | null>(null);
  const [loading, setLoading] = useState(true);

  const backgroundImage = useMemo(() => {
    const idx = Math.floor(Math.random() * visualImagePool.length);
    return visualImagePool[idx];
  }, []);

  const renderedNumberImage = useMemo(() => `/imagesForChildren/number-${lessonNumber}.gif`, [lessonNumber]);
  const attentionStatic = "Внимание";

  const fallbackData: LessonIntroData = {
    lessonNumber,
    preAttentionText: "В стране Русского языка живут буквы и звуки. Знакомимся с жителями страны - весёлыми человечками-буквами. Весёлые озорные человечки очень любят говорить, петь и шутить.",
    postAttentionText: "Начинаем знакомство с весёлыми буковками-певуньями.",
  };

  useEffect(() => {
    let canceled = false;

    async function load() {
      setLoading(true);
      try {
        if (firestoreEnabled) {
          const result = await fetchLessonIntroFromFirestore(lessonNumber);
          if (canceled) return;

          const nextData = result || fallbackData;
          setData(nextData);
          if (onDataLoaded) onDataLoaded(nextData);
        } else {
          if (canceled) return;

          setData(fallbackData);
          if (onDataLoaded) onDataLoaded(fallbackData);
        }
      } catch (e) {
        console.error("LessonIntro load error:", e);
        if (!canceled) {
          setData(fallbackData);
          if (onDataLoaded) onDataLoaded(fallbackData);
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      canceled = true;
    };
  }, [lessonNumber, firestoreEnabled, onDataLoaded]);

  if (loading) {
    return <div>Загрузка урока {lessonNumber}...</div>;
  }

  if (!data) {
    return <div>Данные урока не найдены.</div>;
  }

  return (
    <div style={{
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
    }}>
      <img
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
        <h1 style={{ margin: 0, color: "#042D66", fontSize: "3.2rem" }}>Страна Русского языка</h1>
        <p style={{ margin: "12px 0 24px", fontSize: "1.7rem", color: "#022155" }}>
          Путешествие {data.lessonNumber}
        </p>

        <img
          src={renderedNumberImage}
          alt={`Урок ${data.lessonNumber}`}
          style={{ width: "140px", margin: "0 auto 18px", display: "block" }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/imagesForChildren/number-1.png";
          }}
        />

        <p style={{ fontSize: "1.3rem", lineHeight: 1.5, padding: "0 16px" }}>
          {data.preAttentionText}
        </p>

        <p style={{ fontSize: "2.2rem", color: "#DA1E21", fontWeight: 800, margin: "18px 0" }}>
          {attentionStatic}
        </p>

        <p style={{ fontSize: "1.35rem", lineHeight: 1.5, padding: "0 16px" }}>
          {data.postAttentionText}
        </p>
      </div>
    </div>
  );
}

// TODO: add images, change number on image
