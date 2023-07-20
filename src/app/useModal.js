import { useState } from 'react'

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false)
  
  function toggle() {
    setIsShowing(state => !state)
    // console.log('modal toggled')
  }

  // return state and function
  return [isShowing, toggle]
}

export default useModal