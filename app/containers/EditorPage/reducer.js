/*
 *
 * EditorPage reducer
 *
 */

import Immutable, { fromJS } from 'immutable';
import TreeUtils from 'immutable-treeutils';
import {
  DEFAULT_ACTION,
  TOGGLE_EDITOR,
  SELECT_ELEMENT,
  INSERT_ELEMENT,
} from './constants';

const Tree = new TreeUtils(Immutable.Seq.of('components'), 'id', 'children');

const initialState = fromJS({
  editing: false,
  components: {
    id: '1',
    type: 'row',
    selected: false,
    children: [
      {
        id: '11',
        type: 'div',
        selected: false,
        options: {
          col: 4,
        },
      },
      {
        id: '12',
        type: 'div',
        selected: false,
        children: [
          {
            id: '121',
            type: 'text',
            selected: false,
            options: {
              text: 'Hello react worl',
            },
          },
        ],
      },
    ],
  },
});

function editorPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case TOGGLE_EDITOR:
      return state.withMutations(s => {
        const currentEditing = state.get('editing');
        s.set('editing', !currentEditing);
      });
    case SELECT_ELEMENT:
      return state.withMutations(s => {
        const toSelectPath = Tree.byId(s, action.id);
        const selectedPath = Tree.find(s, c => c.get('selected'));
        if (selectedPath !== undefined) {
          s.setIn(selectedPath.concat('selected'), false);
        }

        s.setIn(toSelectPath.concat('selected'), true);
      });
    case INSERT_ELEMENT:
      return state.withMutations(s => {
        const selectedPath = Tree.find(s, c => c.get('selected'));

        if (selectedPath !== undefined) {
          console.log('selectedPath', selectedPath.toJS());
          const selectedChildren = s.getIn(
            selectedPath.concat('children'),
            false,
          );
          if (selectedChildren) {
          } else {
            s.setIn(selectedPath.concat('children'), fromJS([]));
          }

          s.updateIn(selectedPath.concat('children'), children => {
            console.log('children', children);
            children.push(
              fromJS({
                id: '2',
                type: action.itemType,
                selected: false,
              }),
            );
          });

          // if (selectedPath.get('children')) {
          //   console.log('if');
          //   s.updateIn(
          //     selectedPath.concat('children'),
          //     Immutable.fromJS(
          //       selectedPath.get('children').toJS().push(newElement),
          //     ),
          //   );
          // } else {
          //   console.log('else');
          //   const newChildren = [
          //     { id: '122', type: action.type, selected: false },
          //   ];
          //   s.setIn(
          //     selectedPath.concat('children'),
          //     Immutable - fromJS(newChildren),
          //   );
          // }
        } else {
          throw new Error('nothing selected, fuck off');
        }
      });
    default:
      return state;
  }
}

export default editorPageReducer;
