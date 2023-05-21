import '../../styles/skeleton.css'

export const SetScrollbarCss = () => {
  const customStyle = document.createElement('style')
  const css = '#word-definition-container::-webkit-scrollbar {width: 7px!important; border-radius: 32px; height: 5px; border: 1px solid rgba(112, 0, 255, 0.12); background: rgba(112, 0, 255, 0.04);} #word-definition-container::-webkit-scrollbar-thumb { background-color: rgba(112,0,255,0.12);cursor: pointer; borderRadius: 32px} #wordbook-translation-selector::-webkit-scrollbar {width: 7px!important; border-radius: 32px; height: 5px; border: 1px solid rgba(112, 0, 255, 0.12); background: rgba(112, 0, 255, 0.04);} #wordbook-translation-selector::-webkit-scrollbar-thumb { background-color: rgba(112,0,255,0.12);cursor: pointer; borderRadius: 32px} '
  if (customStyle.styleSheet) {
    customStyle.styleSheet.cssText = css
  } else {
    customStyle.appendChild(document.createTextNode(css))
  }
  const headElement = document.head
  headElement.appendChild(customStyle)
}

export const CreateSkeleton = () => {
  const skeletonBody = document.createElement('div')
  skeletonBody.id = 'skeleton-body'

  skeletonBody.append(GetSkeletonLine(74))
  skeletonBody.append(GetSkeletonLine(89))
  skeletonBody.append(GetSkeletonLine(79))
  skeletonBody.append(GetSkeletonLine(85))
  skeletonBody.append(GetSkeletonLine(79))
  skeletonBody.append(GetSkeletonLine(89))
  skeletonBody.append(GetSkeletonLine(92))
  skeletonBody.append(GetSkeletonLine(75))
  skeletonBody.append(GetSkeletonLine(63))
  skeletonBody.append(GetSkeletonLine(89))
  skeletonBody.append(GetSkeletonLine(75))
  skeletonBody.append(GetSkeletonLine(69))
  skeletonBody.append(GetSkeletonLine(80))

  return skeletonBody
}

const GetSkeletonLine = (width) => {
  const skeletonLine = document.createElement('div')
  skeletonLine.id = 'skeleton-text'
  skeletonLine.style.width = `${width}%`
  skeletonLine.className = 'skeleton skeleton-text'

  return skeletonLine
}
