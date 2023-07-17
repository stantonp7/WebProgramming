import { model, Schema, Document } from 'mongoose';
import { RetrospectiveTemplate, RetrospectiveTempalteCol } from '../retrospective-template.interface';

const RetrospectiveTempalteSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  columns: {
    type: Array<RetrospectiveTempalteCol>(),
  },

});

export const RetrospectiveTempalteModel = model<RetrospectiveTemplate & Document>('RetrospectiveTemplates', RetrospectiveTempalteSchema);
