import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Review, Loader } from '..';
import { axiosFetch } from '../../utils';
import toast from 'react-hot-toast';
import './Reviews.scss';

const Reviews = (props) => {
    const { gigID } = props;
    const navigation = useNavigate();
    const queryClient = useQueryClient();
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: () =>
            axiosFetch.get(`/reviews/${gigID}`)
                .then(({ data }) => {
                    return data;
                })
                .catch(({ response }) => {
                    console.log(response.data);
                })
    });

    const mutation = useMutation({
        mutationFn: (review) =>
            axiosFetch.post('/reviews', review)
            .then(({data}) => {
                return data;
            })
            .catch(({ response: { data } }) => {
                if(data.message == 'jwt expired') {
                    navigation('/login');
                }
                toast.error(data.message);
            })
        ,
        onSuccess: () => {
            queryClient.invalidateQueries(['reviews'])
        }
    })

    const handleReviewSubmit = (event) => {
        event.preventDefault();

        const description = event.target[0].value;
        const star = event.target[1].value;
        
        if(star && description) {
            mutation.mutate({ gigID, description, star });
            event.target.reset();
        }
    }

    return (
        <div className="reviews">
            <h2>Reviews</h2>
            {
                isLoading
                    ? <div className='loader'><Loader size={35} /></div>
                    : error
                        ? 'Something went wrong!'
                        : data.map((review) => <Review key={review._id} review={review} />)
            }
            <div className="add">
                <form className='addForm' onSubmit={handleReviewSubmit}>
                    <textarea cols="20" rows="10" placeholder='Write a review'></textarea>
                    <select>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <button>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Reviews;