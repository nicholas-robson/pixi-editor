import $ from 'jquery';
import { Modal } from 'bootstrap';

export function initSettings() {
    const modalHTML = `
<div class='modal fade'>
    <div id="settings-modal" class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content  bg-dark text-white">
      <div class="modal-body">
          <div id="control-position" class="row">
                <label for="position-x" class="col-sm-4 col-form-label col-form-label-sm ">Position</label>
                <div class="col-sm-8">
                <div class="input-group input-group-sm">
                    <input type="number" class="form-control form-control-sm" id="position-x" step="1">
                    <input type="number" class="form-control form-control-sm" id="position-y" step="1">
                </div>
                </div>
            </div>
      </div>
      <div class="modal-footer border-dark">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
    </div>
    </div>
`;

    const modal = $(modalHTML);

    const myModal = new Modal(modal[0], {});
    myModal.show();
}
