// import { useCallback, useRef } from "react";
// import { useUserStore } from "../../stores/user";

// export const Join = () => {
//   const { login } = useUserStore();
//   const usernameRef = useRef<HTMLInputElement>(null);

//   const submit = useCallback(() => {
//     const username = usernameRef.current?.value;
//     if (username) login(username);
//   }, [login]);

//   return (
//     <div>
//       <h1>Join</h1>
//       <input ref={usernameRef} placeholder="Nome de usuário" />
//       <button onClick={submit}>Entrar</button>
//     </div>
//   );
// };
