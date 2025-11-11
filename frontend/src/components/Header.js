import React from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // Assuming routing and auth context

function Header() {
    // const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken'); // Simple check
    // const user = JSON.parse(localStorage.getItem('user')); // Assuming user info is stored

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        // navigate('/login'); // Redirect to login
        window.location.reload(); // Simple reload for demo
    };

    return (
        <header style={{ background: '#f0f0f0', padding: '10px', marginBottom: '20px' }}>
            <nav>
                <span style={{ marginRight: '20px' }}>
                    {/* <Link to="/">Dashboard</Link> */}
                    <a href="/">Dashboard</a>
                </span>
                <span style={{ marginRight: '20px' }}>
                    {/* <Link to="/deals">Deals</Link> */}
                    <a href="/deals">Deals</a>
                </span>
                {/* Add other navigation links */}

                <span style={{ float: 'right' }}>
                    {token ? (
                        <>
                            <span>Welcome, {localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : 'User'}!</span>
                            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            {/* <Link to="/login">Login</Link> */}
                            <a href="/login">Login</a>
                            <span style={{ margin: '0 5px' }}>/</span>
                            {/* <Link to="/register">Register</Link> */}
                            <a href="/register">Register</a>
                        </>
                    )}
                </span>
            </nav>
        </header>
    );
}

export default Header;
