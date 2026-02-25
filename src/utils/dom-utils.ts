export const setBodyCursor = (cursor: string) => {
  document.body.style.cursor = cursor
}

export const setTextSelection = (enabled: boolean) => {
  document.body.style.userSelect = enabled ? "" : "none"
}
