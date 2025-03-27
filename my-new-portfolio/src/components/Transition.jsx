import React, { useState, useEffect } from "react"

const Transition = ({ children, currentPage, previousPage }) => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayedPage, setDisplayedPage] = useState(currentPage)
  const [previousDisplayedPage, setPreviousDisplayedPage] = useState(null)

  useEffect(() => {
    
    if (currentPage !== displayedPage) {
      setPreviousDisplayedPage(displayedPage)
      setIsTransitioning(true)

      
      const timer = setTimeout(() => {
        setDisplayedPage(currentPage)

        
        const cleanupTimer = setTimeout(() => {
          setIsTransitioning(false)
          setPreviousDisplayedPage(null)
        }, 500)

        return () => clearTimeout(cleanupTimer)
      }, 50)

      return () => clearTimeout(timer)
    }
  }, [currentPage, displayedPage, previousPage])

  return (
    <div className="page-transition-container">
      
      {isTransitioning && previousDisplayedPage && (
        <div className="page-transition page-exit">
          {React.Children.toArray(children).find((child) => child.props.pageId === previousDisplayedPage)}
        </div>
      )}

      
      <div className={`page-transition ${isTransitioning ? "page-enter" : ""}`}>
        {React.Children.toArray(children).find((child) => child.props.pageId === displayedPage)}
      </div>
    </div>
  )
}

export default Transition;
