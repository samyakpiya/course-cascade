import React from "react";
import SharedNotificationSettings from "@/components/SharedNotificationSettings";

const TeacherSettings = () => {
  return (
    <div className="w-3/5">
      <SharedNotificationSettings
        title="Teacher Settings"
        subtitle="Manage  your teacher notification settings"
      />
    </div>
  );
};

export default TeacherSettings;
