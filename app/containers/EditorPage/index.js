/*
 *
 * EditorPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import classnames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { makeEditing, makeComponents } from './selectors';
import * as actions from './actions';
import ComponentRenderer from '../../components/ComponentRenderer/index';
import TypeButton from '../../components/TypeButton';
import './styles.scss';
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

  renderContent(component) {
    /*const type = component.get('type');
    if (type === 'row') {
      if (component.get('children')) {
        return (
          <div className="row" key={component.get('id')}>
            {component.get('children').map(i => this.renderContent(i))}
          </div>
        );
      }
      return <div className="row" key={component.get('id')} />;
    } else if (type === 'div') {
      if (component.get('children')) {
        return (
          <div className="col-md-6" key={component.get('id')}>
            {component.get('children').map(i => this.renderContent(i))}
          </div>
        );
      }
      return <div className="col-md-6" key={component.get('id')} />;
    } else if (type === 'text') {
      return (
        <p key={component.get('id')}>
          {component.get('id')}
        </p>
      );
    }
    throw Error('invalid component type');*/

    const onSelect = event => {
      event.stopPropagation();
      this.props.actions.selectElement(component.get('id'));
    };

    const type = component.get('type');

    let children = null;
    if (component.get('children')) {
      children = component.get('children').map(c => this.renderContent(c));
    }

    if (type === 'row') {
      const cls = classnames('row', {
        selected: component.get('selected'),
        editing: this.props.editingProp,
      });
      return (
        <div className={cls} key={component.get('id')} onClick={onSelect}>
          {children}
        </div>
      );
    } else if (type === 'div') {
      const col = component.getIn(['options', 'col'], 6);
      const cls = classnames(`col-md-${col}`, {
        selected: component.get('selected'),
        editing: this.props.editingProp,
      });
      return (
        <div className={cls} key={component.get('id')} onClick={onSelect}>
          {children}
        </div>
      );
    } else if (type === 'text') {
      const cls = classnames({
        selected: component.get('selected'),
        editing: this.props.editingProp,
      });
      const text = component.getIn(['options', 'text'], '');
      return (
        <p className={cls} key={component.get('id')} onClick={onSelect}>
          {text}
        </p>
      );
    }

    throw new Error('invalid component type');
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
            <TypeButton type="row" actions={this.props.actions} />
            <TypeButton type="div" actions={this.props.actions} />
            <TypeButton type="text" actions={this.props.actions} />
          </div>
        </div>
        <ComponentRenderer
          component={this.props.components}
          editingProp={this.props.editingProp}
          actions={this.props.actions}
        />
      </div>
    );
  }
}

EditorPage.propTypes = {
  editingProp: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  components: PropTypes.objectOf(Immutable.Map),
};

const mapStateToProps = createStructuredSelector({
  editingProp: makeEditing(),
  components: makeComponents(),
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
