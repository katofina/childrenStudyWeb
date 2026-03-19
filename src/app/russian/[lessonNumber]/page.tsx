import { LessonIntro } from "../../components/LessonIntro";

interface PageProps {
  params: {
    lessonNumber: string;
  };
}

export default function RussianLessonPage({ params }: PageProps) {
  const lessonNumber = parseInt(params.lessonNumber, 10);

  return (
    <div>
      <LessonIntro lessonNumber={lessonNumber} />
    </div>
  );
}