/*
 *
 * EditorPage actions
 *
 */

import { DEFAULT_ACTION, TOGGLE_EDITOR } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function toggleEditor() {
  return {
    type: TOGGLE_EDITOR,
  };
}
