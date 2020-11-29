export const getLengthConstraintColor = (current: number, max: number) => {
  const warningLimit = Math.max(max * 0.8, max - 50)

  if (current > max) return "danger"
  else if (current > warningLimit) return "warning"
  return "normal"
}
