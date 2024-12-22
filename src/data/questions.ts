import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    text: "休日の過ごし方に近いのはどれですか？",
    options: [
      { text: "大勢でパーティーを開く", type: "E" },
      { text: "親しい友達とだけ小さな集まり", type: "I" },
      { text: "家族と穏やかに過ごす", type: "S" },
      { text: "一人でゆったりと読書や映画鑑賞", type: "I" },
      { text: "予定を立てずに気ままに行動", type: "P" }
    ]
  },
  // Add all 20 questions here following the same pattern
];