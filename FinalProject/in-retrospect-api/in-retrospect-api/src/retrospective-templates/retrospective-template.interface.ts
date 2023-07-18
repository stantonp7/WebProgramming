export interface RetrospectiveTemplate {
    _id?: string;
    name: string;
    columns: Array<RetrospectiveTemplateCol>;
  }
  
export interface RetrospectiveTemplateCol {
    _id?: string;
    name: string;
    position: number;
  }
  