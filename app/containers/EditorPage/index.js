/*
 *
 * EditorPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeEditing } from './selectors';

import * as actions from './actions';

// eslint-disable-next-line react/prefer-stateless-function
export class EditorPage extends React.PureComponent {
  constructor() {
    super();
    this.onToggleClickBinded = this.onToggleClick.bind(this);
  }

  onToggleClick() {
    console.log(this);
    console.log('editing', this.props.actions.toggleEditor);
    this.props.actions.toggleEditor();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>test: {this.props.editingProp ? 'on' : 'off'}</p>
          </div>
          <div className="col-md-6">
            <button
              className="btn btn-default"
              onClick={this.onToggleClickBinded}>
              {'Button'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

EditorPage.propTypes = {
  editingProp: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  editingProp: makeEditing(),
});

// const mapStateToProps = state => ({
//   editingProp: state.getIn(['editorPage', 'editing']),
// });

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
  // return {
  //   actions: {
  //     toggleEditor: () => {
  //       dispatch(actions.toggleEditor());
  //     },
  //   },
  // };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
