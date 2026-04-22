import { AdminCourseEditClient } from "./AdminCourseEditClient";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminCourseEditPage({ params }: PageProps) {
  const { id } = await params;
  return <AdminCourseEditClient courseId={id} />;
}
