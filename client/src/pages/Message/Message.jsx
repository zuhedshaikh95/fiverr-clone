import toast from 'react-hot-toast';
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms";
import { axiosFetch } from '../../utils';
import { Loader } from '../../components';
import "./Message.scss";

const Message = () => {
  const user = useRecoilValue(userState);
  const { conversationID } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  const { isLoading, error, data } = useQuery({
    queryKey: ['messages'],
    queryFn: () =>
      axiosFetch.get(`/messages/${conversationID}`)
        .then(({ data }) => {
          return data;
        })
        .catch(({ response }) => {
          toast.error(response.data.message)
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
            ? <div className="loader"> <Loader /> </div>
            : error
              ? 'Something went wrong'
              : <div className="messages">
                {
                  data.map((message) => (
                    <div className={message.userID._id === user._id ? 'owner item' : 'item'} key={message._id}>
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