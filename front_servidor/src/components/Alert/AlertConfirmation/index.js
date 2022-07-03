import React from "react";

import SweetAlert from "react-bootstrap-sweetalert";
export default function AlertConfirmation({ show, onHide, onConfirm }) {
  return (
    <SweetAlert
      warning
      show={show}
      showConfirm={true}
      showCancel
      confirmBtnText="Sim, tenho certeza"
      confirmBtnBsStyle="danger"
      title="Tem certeza que deseja apagar?"
      onConfirm={() => onConfirm()}
      onCancel={onHide}
    />
  );
}
