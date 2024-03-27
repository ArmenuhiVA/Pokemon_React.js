import React from 'react'
import './Pagination.css'

function Pagination({ currentPage, onPageChange }) {
  return (
    <div className='Pagination'>
        <button onClick={() => onPageChange(currentPage-1)} disabled={currentPage === 1}>Previous</button>
        <span className='current-page'>Page {currentPage}</span>
        <button onClick={() => onPageChange(currentPage+1)}> Next</button>
    </div>
  )
}

export default Pagination