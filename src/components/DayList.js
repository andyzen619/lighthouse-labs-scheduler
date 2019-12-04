import React from "react";
import DayListItem from "components/DayListItem";

/**
 * Returns the view for day list of application
 * @param {*} param0 
 */
export default function({days, propDay, setDay} = this.props) {
  return (
    <ul>
      {days.map(day => (
        <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === propDay}
          setDay={setDay}
        />
      ))}
      )
    </ul>
  );
}
