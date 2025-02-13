export const deleteOldLogs = (startDate, workLog, setWorkLog) => {
  console.log('startDate,workLog', startDate, workLog)
  const updatedWorkLog = workLog.filter(log => {
    const logDate = new Date(log.date)
    return logDate >= startDate
  })
  console.log('updatedWorkLog', updatedWorkLog)
  setWorkLog(updatedWorkLog)
}
