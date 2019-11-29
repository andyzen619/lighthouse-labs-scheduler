import React from "react";

import "components/InterviewerList.scss"

import InterviewerListItem from "components/InterviewerListItem";

export default function({interviewers, value, onChange}=this.props){
  
  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{
        interviewers.map((interviewer) => 
          <InterviewerListItem
            key = {interviewer.id}
            name = {interviewer.name}
            avatar = {interviewer.avatar}
            selected = {interviewer.id === value}
            setInterviewer = {event => {onChange(interviewer)}}
          />
        )
      }
    </ul>
  </section>
  );
}