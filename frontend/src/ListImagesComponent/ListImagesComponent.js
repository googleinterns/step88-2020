import React from 'react'
import PropTypes from 'prop-types'
import ImageComponent from '../ImageComponent/ImageComponent'

function ListImagesComponent() {
    return (
      <div className="listImagesContainer">
        <ImageComponent />
        <ImageComponent />
        <ImageComponent />
      </div>
    )
}

export default ListImagesComponent
