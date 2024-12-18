// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../utilits/store";
// import { Link, useNavigate } from "react-router-dom";
// import { logout } from "../redux/userSlice";
// import apiClient from "../utilits/api";

// const UserProfile: React.FC = () => {
//     const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         dispatch(logout());
//     };

//     const navWelcome = () => {
//         navigate('/');
//     };

//     return (
//         <div>
//             <h1>Ваш профиль</h1>
//             <button onClick={navWelcome}>На главную</button>
//         </div>
//     );
// };

// export default UserProfile;









// import React from "react";
// import { Container, Typography, Box, Button, Avatar } from "@mui/material";
// import { useSelector } from "react-redux";
// import { RootState } from "../utilits/store";
// import { Link } from "react-router-dom";

// const UserProfile: React.FC = () => {
//   const { user } = useSelector((state: RootState) => state.user);

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         marginTop: 4,
//         padding: 4,
//         backgroundColor: "#f5f5f5",
//         borderRadius: "10px",
//         boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <Avatar
//         // alt={user.name}
//         alt="фото профиля"
//         src="/static/images/avatar/default.jpg"
//         sx={{ width: 100, height: 100, marginBottom: 2 }}
//       />
//       <Typography variant="h4" component="h1" gutterBottom>
//         {user.name}
//       </Typography>
//       <Typography variant="body1" color="textSecondary" gutterBottom>
//         {user.email}
//       </Typography>
//       <Box sx={{ marginTop: 4 }}>
//         <Button
//           variant="contained"
//           color="primary"
//           component={Link}
//           to="/"
//           sx={{
//             textTransform: "none",
//             fontSize: "16px",
//             padding: "10px 20px",
//           }}
//         >
//           Главное меню
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default UserProfile;








import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button, Avatar, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import apiClient from "../utilits/api";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from '../redux/settingsSlice';
import { RootState } from "../utilits/store";

interface UserData {
  name: string;
  email: string;
  id_admin: boolean;
}

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        dispatch(setLoading(true));        
        const response = await apiClient.get("/jwtusers/me/");
        setUserData(response.data);
      } catch (err) {
        console.error("Ошибка загрузки данных пользователя:", err);
        setError("Не удалось загрузить данные пользователя");
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          sx={{ textTransform: "none" }}
        >
          Главное меню
        </Button>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 4,
        padding: 4,
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Avatar
        alt={userData?.name}
        src="/static/images/avatar/default.jpg"
        sx={{ width: 100, height: 100, marginBottom: 2 }}
      />
      <Typography variant="h4" component="h1" gutterBottom>
        {userData?.name}
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        {userData?.email}
      </Typography>
      {userData?.id_admin && (
        <Typography variant="body2" color="primary" gutterBottom>
          Администратор
        </Typography>
      )}
      <Box sx={{ marginTop: 4 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          sx={{
            textTransform: "none",
            fontSize: "16px",
            padding: "10px 20px",
          }}
        >
          Главное меню
        </Button>
      </Box>
    </Container>
  );
};

export default UserProfile;
