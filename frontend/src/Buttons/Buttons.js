import React from 'react'
import PropTypes from 'prop-types'

function BackButton() {
  return (
    <div className="backButtonContainer">
      <button id="backButton" type="button" class="btn btn-primary">Back</button>
    </div>
  )
}

function RouteButton() {
  return (
    <div className="routeButtonContainer">
      <button id="routeButton" type="button" class="btn btn-primary">Show Route</button>
    </div>
  )
}

export {BackButton, RouteButton};
