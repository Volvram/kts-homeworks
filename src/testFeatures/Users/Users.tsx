import React from "react";

// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { USERS } from "src/testFeatures/users";

// const Users = () => {
//   const navigate = useNavigate(); // Навигация вместо Link

//   return (
//     <ul>
//       {USERS.map((user) => (
//         <li key={user.id} onClick={() => navigate(`/user/${user.id}`)}>
//           {user.name}
//         </li>
//       ))}
//     </ul>
//   );

//   return (
//     <ul>
//       {USERS.map<React.ReactNode>(
//         (user): React.ReactNode => (
//           <li key={user.id}>
//             <Link to={`/user/${user.id}`}>{user.name}</Link>
//           </li>
//         )
//       )}
//     </ul>
//   );
// };

// export default Users;