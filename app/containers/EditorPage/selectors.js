import { createSelector } from 'reselect';

/**
 * Direct selector to the editorPage state domain
 */
const selectEditorPageDomain = () => state => state.get('editorPage');

/**
 * Other specific selectors
 */

const makeEditing = () =>
  createSelector(selectEditorPageDomain(), substate => substate.get('editing'));

/**
 * Default selector used by EditorPage
 */

const makeSelectEditorPage = () =>
  createSelector(selectEditorPageDomain(), substate => substate.toJS());

export default makeSelectEditorPage;
export { selectEditorPageDomain, makeEditing };
