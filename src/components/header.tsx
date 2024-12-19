import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../utilits/store";
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/userSlice';

const leftPages = [
  { name: 'Автобусы', path: '/data-base' },
  { name: 'Компании', path: '/data-base-driver' },
  { name: 'Автобусы в компаниях', path: '/bus-in-com' },
];

const rightPages = [
  { name: 'Авторизация', path: '/login' },
  { name: 'Регистрация', path: '/registration' },
];

const settings = [
  {name: 'Профиль', path: '/user-profile'}, 
  {name: 'Выйти', path: '/'},
];

function ResponsiveAppBar() {
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const handleLogout = () => {
    handleCloseUserMenu();
    localStorage.removeItem("access_token");
    dispatch(logout());
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/user-profile');
  };


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/" 
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SGU
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {leftPages.concat(rightPages).map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link} 
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SGU
          </Typography>

          {/* Левая часть с бд */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {leftPages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path} 
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* авторизация и регистрация */}
          <Box sx={{ flexGrow: 0 }}>
            {!isAuth && rightPages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path} 
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'inline-block' }}
              >
                {page.name}
              </Button>
            ))}
            
            {/* профиль пользователя */}
            {isAuth && (
              <>
                <Tooltip title="Профиль">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.name} onClick={setting.name == 'Профиль' ? handleProfile : handleLogout}>
                      <Link to={setting.path} style={{ textDecoration: 'none', color:'inherit'}}></Link>
                      <Typography sx={{ textAlign: 'center' }}>{setting.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;