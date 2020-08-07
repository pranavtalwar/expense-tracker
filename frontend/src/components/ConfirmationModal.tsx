import React from 'react'
import Modal from 'react-modal'

interface Props {
    isOpen: boolean,
    removeExpense: () => void
    cancelRemoveExpense: () => void
}

const ConfirmationModal: React.FC<Props> = ({ isOpen, removeExpense, cancelRemoveExpense }) => {
    return (
        <Modal
            isOpen={isOpen}
            contentLabel="Remove Expense"
            closeTimeoutMS={200}
            className="modal"
        >
            <h2 className="modal-title">Are you sure you want to delete this expense?</h2>
            <div className="button-div">
                <button onClick={removeExpense}>Yes</button>
                <button onClick={cancelRemoveExpense}>No</button>
            </div>
           
        </Modal>
    )
}

export default ConfirmationModal