import React from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { axiosFetch } from '../../utils';
import moment from 'moment';
import './Messages.scss';

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['conversations'],
    queryFn: () =>
      axiosFetch.get('/conversations')
        .then(({ data }) => {
          console.log(data);
          return data;
        })
        .catch(({ response }) => {
          console.log(response);
        })
  })

  const mutation = useMutation({
    mutationFn: (id) =>
      axiosFetch.patch(`/conversations/${id}`)
    ,
    onSuccess: () =>
      queryClient.invalidateQueries(['conversations'])
  })

  const handleMessageRead = (id) => {
    mutation.mutate(id);
  }

  return (
    <div className='messages'>
      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        {
          isLoading
            ? '...loading'
            : error
              ? 'Something went wrong!'
              : <table>
                <thead>
                  <tr>
                    <th>{currentUser.isSeller ? 'Buyer' : 'Seller'}</th>
                    <th>Last Message</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((conv) => (
                      <tr key={conv._id} className={((currentUser.isSeller && !conv.readBySeller) || (!currentUser.isSeller && !conv.readByBuyer)) &&
                        "active"}>
                        <td>{currentUser.isSeller ? conv.buyerID.username : conv.sellerID.username}</td>
                        <td>
                          <Link className='link' to={`/message/${conv.conversationID}`}>
                            {conv?.lastMessage?.slice(0, 100)}...
                          </Link>
                        </td>
                        <td>{moment(conv.updatedAt).fromNow()}</td>
                        <td>
                          {
                            ((currentUser.isSeller && !conv.readBySeller) || (!currentUser.isSeller && !conv.readByBuyer)) &&
                            (<button onClick={() => handleMessageRead(conv.conversationID)}>Mark as read</button>)
                          }
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
        }
      </div>
    </div>
  )
}

export default Messages