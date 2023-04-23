export const SetScrollbarCss = () => {
  const customStyle = document.createElement('style')
  const css = '#word-definition-container::-webkit-scrollbar {width: 5.5px!important; border-radius: 10px!important; height: 5px;} #word-definition-container::-webkit-scrollbar-thumb { background-color: rgba(112,0,255,.3);cursor: pointer;} #wordbook-translation-selector::-webkit-scrollbar {width: 5.5px!important; border-radius: 10px!important; height: 5px;} #wordbook-translation-selector::-webkit-scrollbar-thumb { background-color: rgba(112,0,255,.3);cursor: pointer;}'
  if (customStyle.styleSheet) {
    customStyle.styleSheet.cssText = css
  } else {
    customStyle.appendChild(document.createTextNode(css))
  }
  const headElement = document.head
  headElement.appendChild(customStyle)
}
