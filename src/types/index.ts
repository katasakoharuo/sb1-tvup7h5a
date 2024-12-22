export type Question = {
  id: number;
  text: string;
  options: {
    text: string;
    type: string;
  }[];
};

export type PersonalityType = {
  code: string;
  title: string;
  description: string;
  traits: string[];
};

export type Answer = {
  questionId: number;
  selectedType: string;
};