import { compose } from 'redux'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { firestoreConnect } from 'react-redux-firebase'
import { spinnerWhileLoading } from 'utils/components'
import { UserIsAuthenticated } from 'utils/router'

export default compose(
  // redirect to /login if user is not logged in
  UserIsAuthenticated,
  // Create listeners based on current users UID
  firestoreConnect(({ params }) => [
    // Listener for projects the current user created
    {
      collection: 'projects',
      doc: params.projectId,
    }
  ]),
  connect(({ firestore: { data } }, { params }) => ({
    project: get(data, `projects.${params.projectId}`)
  })),

  firestoreConnect(({ params }) => [
    // Listener for projects the current user created
    {
      collection: 'measurements',
      where: ['box', '==', params.projectId],
      doc: params.measureId,
    }
  ]),

  connect(({ firestore: { data } }, { params }) => ({
    measurements: get(data, `measurements`)
  })),
  
  // Map projects from state to props
  
  // connect(({ firestore: { data } }, { params }) => ({
  //   measurements: get(data, `measurements.${params.measurementId}`)
  // })),
  // Show loading spinner while project is loading
  spinnerWhileLoading(['project'])
)
