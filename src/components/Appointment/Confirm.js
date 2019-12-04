import React from "react";
import Button from "components/Button"


/**
 * Returns our Confirm view
 * @param {*} param0 
 */
export default function({message, onCancel, onConfirm} = this.props) {

  return (
    <main className="appointment__card appointment__card--confirm">
    <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={onCancel}>Cancel</Button>
        <Button danger onClick={onConfirm}>Confirm</Button>
      </section>
    </main>
  )
}