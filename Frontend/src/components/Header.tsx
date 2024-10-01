import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../../public/logo.png'

const pages = [{  },];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        handleCloseNavMenu()
    };

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {

        setAnchorElNav(null);
    };


    return (
        <AppBar sx={{ background: 'white' }} position="static">
            <Container className="bg-white text-black" maxWidth="xl">
                <Toolbar disableGutters>
                    <img
                        className="hidden md:flex"
                        src={Logo}
                        alt="Logo"
                        style={{ marginRight: '8px', height: '40px', }} // oculta por padrão
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        className="hidden md:flex"
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        FLAGCON
                    </Typography>

                    <Box className="flex md:hidden" sx={{ flexGrow: 1 }}>
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
                            className="flex md:hidden"
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={index} >
                                    <a key={index} className="my-2 mr-3 display: block" onClick={() => scrollToSection(page.id)}>
                                        {page.name}
                                    </a>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <img
                        src={Logo}
                        alt="Logo"
                        className="flex md:hidden"
                        style={{ marginRight: '8px', height: '30px' }} // exibe por padrão
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        className="flex md:hidden"
                        sx={{
                            mr: 2,
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        FLAGCON
                    </Typography>

                    <Box className="hidden md:flex" sx={{ flexGrow: 1, }}>
                        {pages.map((page, index) => (
                            <MenuItem key={index} >
                                <a key={index} className="my-2 mr-3 display: block" onClick={() => scrollToSection(page.id)}>
                                    {page.name}
                                </a>
                            </MenuItem>
                        ))}


                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar; 
