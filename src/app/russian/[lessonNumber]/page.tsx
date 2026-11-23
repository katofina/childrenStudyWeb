import { LessonIntro } from "../../components/LessonIntro";

interface PageProps {
  params: Promise<{ lessonNumber: string }>;
}

export default async function RussianLessonPage({ params }: PageProps) {
  const { lessonNumber: lessonNumberParam } = await params;
  const lessonNumber = parseInt(lessonNumberParam, 10);

  return (
    <div>
      <LessonIntro lessonNumber={lessonNumber} />
    </div>
  );
}