import { DB_HOST, DB_PORT, DB_DATABASE } from '@config';

export const dbConnection: any = {
  url: `${DB_HOST}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
};
