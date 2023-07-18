import { model, Schema, Document } from 'mongoose';
import { Retrospective, RetrospectiveCol, RetrospectiveComment } from '../retrospective.interface';

const RetrospectiveSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createdBy: {
    type: String,
  },
  templateID: {
    type: String,
    required: true,
  },
  columns: {
    type: Array<RetrospectiveCol>(),
  },
  comments: {
    type: Array<RetrospectiveComment>(),
  }

});

export const RetrospectiveModel = model<Retrospective & Document>('Retrospectives', RetrospectiveSchema);
