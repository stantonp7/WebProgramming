export interface Retrospective {
    _id?: string;
    email: string;
    password: string;
    createdBy: string;
  }
  
export interface RetrospectiveCol {
    _id?: string;
    name: string;
    position: number;
    responses: [RetrospectiveResponse];

  }

export interface RetrospectiveResponse {
    _id?: string;
    response: string;
    position: number;
    user: string;
}

export interface RetrospectiveComment {
    _id?: string;
    comment: string;
    user: string;
}
  