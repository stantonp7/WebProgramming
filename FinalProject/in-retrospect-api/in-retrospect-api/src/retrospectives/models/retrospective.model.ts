import { model, Schema, Document } from 'mongoose';
import { Retrospective, RetrospectiveCol, RetrospectiveComment } from '../retrospective.interface';

const RetrospectiveSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  columns: {
    type: Array<RetrospectiveCol>(),
  },
  comments: {
    type: Array<RetrospectiveComment>(),
  }

});

export const RetrospectiveModel = model<Retrospective & Document>('Retrospectives', RetrospectiveSchema);
