// types.ts

import { IconType } from 'react-icons';

export interface FormField {
  name: string;
  label: string;
  required: boolean;
}

export interface ContentTemplate {
  name: string;
  aiPrompt: string;
  icon: IconType; // Assuming you're using react-icons for icons
}
