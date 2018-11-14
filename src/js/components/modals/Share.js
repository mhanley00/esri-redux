import Wrapper from 'js/components/modals/Wrapper';
import React, { Component } from 'react';

export default class ShareModal extends Component {
  displayName: 'ShareModal';

  close = () => {
    this.props.toggleShareModal();
  };

  render () {
    let { visible } = this.props;

    return (
      <Wrapper theme='share-modal' visible={visible} close={this.close}>
        <h3>Share Something</h3>
      </Wrapper>
    );
  }
}
