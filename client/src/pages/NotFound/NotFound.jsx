import './NotFound.scss';

const NotFound = () => {
  return (
    <div className='notFound'>
      <div className='container'>
        <h1>404</h1>
        <div className='text'>
          <h2>Page not found</h2>
          <p>Sorry, we couldn’t found the page you’re looking for.</p>
        </div>
      </div>
    </div>
  )
}

export default NotFound;