import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import { UserRoute } from './users/users.route';
import { RetrospectiveRoute } from './retrospectives/retrospectives.route';
import { RetrospectiveTemplateRoute } from './retrospective-templates/retrospective-templates.route';

ValidateEnv();

const app = new App([new RetrospectiveRoute(), new RetrospectiveTemplateRoute]);

app.listen();
