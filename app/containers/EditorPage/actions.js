/*
 *
 * EditorPage actions
 *
 */

import {
  DEFAULT_ACTION,
  TOGGLE_EDITOR,
  SELECT_ELEMENT,
  INSERT_ELEMENT,
} from './constants';

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

export function selectElement(id) {
  return {
    type: SELECT_ELEMENT,
    id,
  };
}

export function insertElement(itemType) {
  return {
    type: INSERT_ELEMENT,
    itemType,
  };
}
