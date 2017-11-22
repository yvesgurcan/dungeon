import React, {Component} from "react"
import {connect} from 'react-redux'
import {View} from "./../components/Web.js"

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    ...ownProps,
  }
}

