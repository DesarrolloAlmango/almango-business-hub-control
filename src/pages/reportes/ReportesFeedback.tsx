
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FeedbackList } from "@/components/dashboard/FeedbackList";

export default function ReportesFeedback() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Feedback y Evaluaciones</h1>
      </div>
      
      <FeedbackList />
    </DashboardLayout>
  );
}
