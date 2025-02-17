interface Question {
  question: string;
  answer: string;
  options: string[];
}

export interface QuizType {
  title: string;
  icon: string;
  questions: Question[];
}

// Base type for a question
interface BaseQuestion {
  question: string;
}

export interface MCQQuestion extends BaseQuestion {
  options: string[];
  answer: string;
}

// Drag-and-drop question type
export interface DragDropQuestion extends BaseQuestion {
  type: "drag-drop";
  // For ordering tasks, use 'correctOrder'
  draggableItems: string[];
  correctOrder?: string[];
  // For matching tasks, you may use 'droppableItems' and 'correctMatches'
  droppableItems?: string[];
  correctMatches?: { [key: string]: string };
}
