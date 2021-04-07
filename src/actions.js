// NOTE: dispatch an error action via the error action creator when any error
// occurs
export const errorActionCreater = function (errorType, error) {
  return {
    type: errorType,
    error: true,
    payload: error,
  }
}