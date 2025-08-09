import React from 'react'

interface LoadingProps {
  emptyTableText?: string
}

const Loading: React.FC<LoadingProps> = ({ emptyTableText }) => (
  <div className="overlay overlay-block">
    <div className="spinner-border text-primary" />
    <div className="text-center mt-2">{emptyTableText}</div>
  </div>
)

export default Loading
