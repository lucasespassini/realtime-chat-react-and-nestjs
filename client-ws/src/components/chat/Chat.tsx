// import { useState, useEffect } from "react";
// import { useUserStore } from "../../stores/user";

// export const Chat = () => {
//   const { socket, username, logout } = useUserStore();
//   const [users, setUsers] = useState<{ id: string; username: string }[]>([]);

//   useEffect(() => {
//     socket.on("showUsers", (users) => {
//       setUsers(users);
//     });
//   }, [socket]);

//   return (
//     <div>
//       <h1>Olá {username}</h1>

//       <h3>Usuários ativos:</h3>

//       {users.map(
//         (user) =>
//           user.id !== socket.id && <p key={user.id}>- {user.username}</p>
//       )}

//       <button onClick={logout}>Sair</button>
//     </div>
//   );
// };
