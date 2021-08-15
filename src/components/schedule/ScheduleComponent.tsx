import React from 'react'
import ConfigurationContext from '../../ConfigurationContext'



export default class BookerEntityComponent extends React.Component {

  constructor(props) {
    super(props)
  }

  static contextType = ConfigurationContext

  render() {

    return (
      <div>scheduleee</div>
    )
  }

}
