/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ChangeEvent, Component, Fragment } from "react";
import { EuiConfirmModal, EuiForm, EuiFormRow, EuiFieldText, EuiOverlayMask, EuiSpacer, EuiText } from "@elastic/eui";

interface DeleteModalProps {
  policyId: string;
  closeDeleteModal: (event?: any) => void;
  onClickDelete: (event?: any) => void;
}

interface DeleteModalState {
  confirmDeleteText: string;
}

export default class DeleteModal extends Component<DeleteModalProps, DeleteModalState> {
  state = { confirmDeleteText: "" };

  onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ confirmDeleteText: e.target.value });
  };

  render() {
    const { policyId, closeDeleteModal, onClickDelete } = this.props;
    const { confirmDeleteText } = this.state;

    return (
      <EuiOverlayMask>
        <EuiConfirmModal
          title="Delete policy"
          onCancel={closeDeleteModal}
          onConfirm={onClickDelete}
          cancelButtonText="Cancel"
          confirmButtonText="Delete policy"
          buttonColor="danger"
          defaultFocusedButton="confirm"
          confirmButtonDisabled={confirmDeleteText != "delete"}
        >
          <EuiForm>
            <Fragment>
              <EuiText size="s">
                Delete "<strong>{policyId}</strong>" permanently? Indices will no longer be managed using this policy.
              </EuiText>
            </Fragment>
            <EuiSpacer size="s" />
            <EuiFormRow helpText={`To confirm deletion, type "delete".`}>
              <EuiFieldText value={confirmDeleteText} placeholder="delete" onChange={this.onChange} data-test-subj="deleteTextField" />
            </EuiFormRow>
          </EuiForm>
        </EuiConfirmModal>
      </EuiOverlayMask>
    );
  }
}
