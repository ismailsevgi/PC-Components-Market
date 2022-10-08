import axios from 'axios';
import React from 'react';

const CommentsCreator = React.memo(({ commentsArray }) => {
  //   React.useEffect(() => {
  //     const fetchingUsers = async () => {
  //       const response = await axios.get(
  //         'https://jsonplaceholder.typicode.com/comments'
  //       );

  //       const data = [...response.data.slice(0, Math.random() * 100)];
  //       console.log('userList: ', data);
  //       let newData = data.map((user) => {});
  //     };

  //     fetchingUsers();
  //   }, []);

  return <div>CommentsCreator</div>;
});

export default CommentsCreator;
