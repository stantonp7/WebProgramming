import { model, Schema, Document } from 'mongoose';
import { RetrospectiveTemplate,  RetrospectiveTemplateCol } from '../retrospective-template.interface';

const RetrospectiveTempalteSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createdBy: {
    type: String,
  },
  columns: {
    type: Array<RetrospectiveTemplateCol>(),
  },
});

export const RetrospectiveTemplateModel = model<RetrospectiveTemplate & Document>('RetrospectiveTemplates', RetrospectiveTempalteSchema);
