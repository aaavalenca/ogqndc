export interface Panel {
    description: string;
    narrator?: string;
    dialogue?: string;
  }
  
  export interface ComicPage {
    page: string;
    overall: string;
    panels: Panel[];
  }
  