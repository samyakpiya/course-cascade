import { Schema, model } from "dynamoose";

const chapterProgressSchema = new Schema({
  chapterId: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

const sectionProgressSchema = new Schema({
  sectionId: {
    type: String,
    required: true,
  },
  chapters: {
    type: Array,
    schema: [chapterProgressSchema],
  },
});

const userCourseProgressSchema = new Schema(
  {
    userId: {
      type: String,
      hashKey: true,
      required: true,
    },
    courseId: {
      type: String,
      rangeKey: true,
      required: true,
    },
    enrollmentDate: {
      type: String,
      required: true,
    },
    overallProgress: {
      type: Number,
      required: true,
    },
    sections: {
      type: Array,
      schema: [sectionProgressSchema],
    },
    lastAccessedTimestamp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserCourseProgress = model(
  "UserCourseProgress",
  userCourseProgressSchema
);
export default UserCourseProgress;
