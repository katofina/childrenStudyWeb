import { LessonName } from "../types/types";

export const RUS_LESSONS = 56;
export const MATH_LESSONS = 44;
export const SCRATCH_LESSONS = 0;

export const LESSONS_LIST: Array<LessonName> = ["Русский", "Математика", "Scratch"];

export const RUS_LESSON_NAMES = Array.from({ length: RUS_LESSONS }, (_, i) => `Русский ${i + 1}`);
export const MATH_LESSON_NAMES = Array.from({ length: MATH_LESSONS }, (_, i) => `Математика ${i + 1}`);
export const SCRATCH_LESSON_NAMES: string[] = [];