import { doc, getDoc } from "firebase/firestore";
import { getFirestoreDb } from "./firebaseClient";
import { LessonIntroData } from "../types/types";

export async function fetchLessonIntroFromFirestore(
  lessonNumber: number
): Promise<LessonIntroData | null> {
  try {
    const db = getFirestoreDb();
    // collection in Firestore is russian-lessons, docs are named lesson-<n>
    const docRef = doc(db, "russian-lessons", `lesson-${lessonNumber}`);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.warn(`Lesson intro not found for lesson-${lessonNumber}`);
      return null;
    }

    const data = docSnap.data();
    const preAttentionText = String(data.context || data.preAttentionText || "");
    const postAttentionText = String(data.description || data.postAttentionText || "");
    const title = String(data.title || `Урок ${lessonNumber}`);
    const number = Number(data.section || data.lessonNumber || lessonNumber);

    return {
      title,
      lessonNumber: Number.isNaN(number) ? lessonNumber : number,
      preAttentionText,
      postAttentionText,
    };
  } catch (error) {
    console.error("Error fetching lesson intro from Firestore:", error);
    return null;
  }
}
