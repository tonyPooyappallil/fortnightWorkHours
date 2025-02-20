import { replace } from 'react-router-dom'

export const deleteOldLogs = (startDate, workLog, setWorkLog) => {
  // Filter logs based on the provided start date
  const updatedWorkLog = workLog.filter(log => {
    const logDate = new Date(log.date)
    return logDate >= startDate
  })

  // Only proceed if updatedWorkLog is not empty
  if (updatedWorkLog.length > 0) {
    // Convert array of objects to an object with ids as keys
    const workLogObject = updatedWorkLog.reduce((acc, log) => {
      acc[log.id] = log
      return acc
    }, {})

    // Update the state with the new object format
    setWorkLog(workLogObject, true)
  } else {
    console.log('No logs found after filtering.')
  }
}
