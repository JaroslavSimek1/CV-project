import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography, Container } from '@mui/material';
import { UserService } from '../services/api/UserService';

interface AuthPageProps {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthPage: React.FC<AuthPageProps> = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const { login, register } = UserService(); 
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const credentials = { email, password };
            if (isLogin) {
                const response = await login(credentials);
                console.log('Login successful. Token:',response.token);
                setIsLoggedIn(true);
            } else {
                const response = await register(credentials);
                console.log('Registration successful',response.token);
                localStorage.setItem('token', response.token);
                setIsLoggedIn(true);
            }
        } catch (error: any) {
            setError('Invalid email or password'); 
        }
    };

    return (
        <Container style={{width:'100%', height:'100vh'}}>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            {isLogin ? 'Login' : 'Register'}
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!error}
                                helperText={error}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!error}
                                helperText={error}
                                margin="normal"
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                {isLogin ? 'Login' : 'Register'}
                            </Button>
                        </form>
                        <Typography variant="body2" sx={{ marginTop: 1 }}>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <Button onClick={() => setIsLogin(!isLogin)} color="primary">
                                {isLogin ? 'Register' : 'Login'}
                            </Button>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AuthPage;
