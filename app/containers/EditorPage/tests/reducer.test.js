
import { fromJS } from 'immutable';
import editorPageReducer from '../reducer';

describe('editorPageReducer', () => {
  it('returns the initial state', () => {
    expect(editorPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
