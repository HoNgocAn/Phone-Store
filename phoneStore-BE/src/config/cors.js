
const configCORS = () => {
    const corsOptions = {
        origin: process.env.REACT_PORT,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    };

    return corsOptions; // Trả về corsOptions để có thể sử dụng bên ngoài
};

export default configCORS;