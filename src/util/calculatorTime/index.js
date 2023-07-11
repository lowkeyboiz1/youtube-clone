import moment from 'moment'

export const calculatorTime = (publishTime) => {
  const diffDuration = moment.duration(moment().diff(moment(publishTime)))

  const hoursDiff = diffDuration.hours()
  const minutesDiff = diffDuration.minutes()
  const daysDiff = diffDuration.days()
  const weeksDiff = diffDuration.weeks()
  const monthsDiff = diffDuration.months()
  const yearsDiff = diffDuration.years()

  let result = ''
  if (yearsDiff > 0) {
    result = yearsDiff + ' năm'
  } else if (monthsDiff > 0) {
    result = monthsDiff + ' tháng'
  } else if (weeksDiff > 0) {
    result = weeksDiff + ' tuần'
  } else if (daysDiff > 0) {
    result = daysDiff + ' ngày'
  } else if (hoursDiff > 0) {
    result = hoursDiff + ' giờ'
  } else if (minutesDiff > 0) {
    result = minutesDiff + ' phút'
  } else {
    result = '0 giờ'
  }

  return result
}
