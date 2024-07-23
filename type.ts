import { IconType } from 'react-icons'; // Import the IconType type from react-icons module

export interface FormField {
    name: string;
    label: string;
    field: 'input' | 'textarea';
    required: boolean;
  }
  
  export interface ContentTemplate {
    slug: string;
    name: string;
    desc: string;
    aiPrompt: string;
    form: FormField[];
    icon: IconType; // Assuming you're using react-icons for icons
  }