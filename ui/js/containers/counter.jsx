import React, {PropTypes as types} from 'react'
import { connect } from 'react-redux'
import actions from '../actions'

let Counter = React.createClass({
  propTypes: {
    storeState: types.object,
    dispatch: types.func
  },

  render () {
    return (
      <div>
        <input type='button' onClick={this.increment} value='Button'/>
        <div>
          Counter: {this.props.storeState.count}
        </div>
      </div>
    )
  },

  increment () {
    this.props.dispatch(actions.incrementCount())
  }
})

const mapStateToProps = (storeState) => ({ storeState })

const mapDispatchToProps = (dispatch) => ({ dispatch })

Counter = connect(mapStateToProps, mapDispatchToProps)(Counter)

export default Counter
