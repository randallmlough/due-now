export const classList = (...classes) => {
  return classes.filter(item => !!item).join(' ')
}
