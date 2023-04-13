import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosFetch, getCurrentUser } from '../../utils';
import toast from 'react-hot-toast';
import './MyGigs.scss';

const MyGigs = () => {
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ['my-gigs'],
    queryFn: () =>
      axiosFetch(`/gigs?userID=${currentUser._id}`)
        .then(({ data }) => {
          console.table(data)
          return data;
        })
        .catch(({ response }) => {
          console.log(response.data);
        })
  });

  const mutation = useMutation({
    mutationFn: (_id) =>
      axiosFetch.delete(`/gigs/${_id}`)
    ,
    onSuccess: () =>
      queryClient.invalidateQueries(['my-gigs'])
  });

  const handleGigDelete = (gig) => {
    mutation.mutate(gig._id);
    toast.success(gig.title + ' deleted successfully!');
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='myGigs'>
      {
        isLoading
          ? '...loading'
          : error
            ? 'Something went wrong'
            : <div className="container">
              <div className="title">
                <h1>My Gigs</h1>
                <Link to='/organize' className='link'>
                  <button>Add New Gig</button>
                </Link>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Sales</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((gig) => (
                      <tr key={gig._id}>
                        <td>
                          <img
                            className="cover"
                            src={gig.cover}
                            alt=""
                          />
                        </td>
                        <td>{gig.title}</td>
                        <td>{gig.price.toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                          style: "currency",
                          currency: "INR",
                        })}</td>
                        <td>{gig.sales}</td>
                        <td>
                          <img className='delete' src="./media/delete.png" alt="delete" onClick={() => handleGigDelete(gig)} />
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
      }
    </div>
  )
}

export default MyGigs