import React from 'react'
import PropTypes from 'prop-types'

function BackButton() {
  return (
    <div className='backToSearchButtonContainer'>
      <a href='/'>
        <button id='backToSearchButton' type='button' class='btn btn-primary'>Back</button>
      </a>
    </div>
  )
}

function RouteButton() {
  return (
    <div className='routeButtonContainer'>
      <a href='/route'>
        <button id='routeButton' type='button' class='btn btn-primary'>Show Route</button>
      </a>
    </div>
  )
}

export {BackButton, RouteButton};
