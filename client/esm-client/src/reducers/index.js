import { combineReducers } from "redux";
import authReducer from "./authReducer";
import testReducer from "./testReducer";
import selectTestReducer from "./selectReducer";
import attemptedTestReducer from "./attemptedTestReducer";
import classesReducer from "./classesReducer";
import TeacherReducer from "./teacherReducer";

export default combineReducers({
  auth: authReducer,
  tests: testReducer,
  selectedTest: selectTestReducer,
  userAttemptedTime: attemptedTestReducer,
  classesData: classesReducer,
  teacher: TeacherReducer,
});
