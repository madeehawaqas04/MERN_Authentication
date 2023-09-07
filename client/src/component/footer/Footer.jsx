import React from 'react'

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <>
      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Copyright &copy; {year} Stack Soft</span>
            
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
