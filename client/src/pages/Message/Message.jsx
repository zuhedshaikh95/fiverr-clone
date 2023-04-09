import React from "react";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosFetch } from '../../utils';
import { Link, useParams } from "react-router-dom";
import "./Message.scss";

const Message = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  const { conversationID } = useParams();
  
  const { isLoading, error, data } = useQuery({
    queryKey: ['messages'],
    queryFn: () =>
      axiosFetch.get(`/messages/${conversationID}`)
        .then(({ data }) => {
          console.log(data);
          return data;
        })
        .catch(({ response }) => {
          console.log(response.data);
        })
  });
  
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (message) => 
      axiosFetch.post('/messages', message)
    ,
    onSuccess: () =>
      queryClient.invalidateQueries(['messages'])
  })

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    
    mutation.mutate({
      conversationID,
      description: event.target[0].value
    });

    event.target.reset();
  }

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages" className="link">Messages</Link>
        </span>
        {
          isLoading
            ? '...loading'
            : error
              ? 'Something went wrong'
              : <div className="messages">
                {
                  data.map((message) => (
                    <div className={message.userID._id === currentUser._id ? 'owner item' : 'item'} key={message._id}>
                      <img
                        src={message.userID.image || '/media/noavatar.png'}
                        alt=""
                      />
                      <p>
                        {message.description}
                      </p>
                    </div>
                  ))
                }
              </div>
        }
        <hr />
        <form className="write" onSubmit={handleMessageSubmit}>
          <textarea cols="30" rows="10" placeholder="Write a message"></textarea>
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;