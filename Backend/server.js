import dotenv from 'dotenv';
import app from './src/app.js';
import { connectDatabase, disconnectDatabase } from './src/config/database.js';
import config from './src/config/config.js';

dotenv.config();

const startServer = async () => {
    try {
        await connectDatabase();
        
        const server = app.listen(config.port, () => {
            console.log(`
╔════════════════════════════════════════╗
║   🕶️  API TIENDA DE LENTES              ║
║                                        ║
║   Servidor corriendo en puerto: ${config.port}   ║
║   Entorno: ${config.nodeEnv}                 ║
║                                        ║
║   Visita: http://localhost:${config.port}        ║
╚════════════════════════════════════════╝
            `);
        });
        
        process.on('SIGINT', async () => {
            console.log('\n⏹️  Cerrando servidor...');
            server.close(async () => {
                await disconnectDatabase();
                process.exit(0);
            });
        });
        
    } catch (error) {
        console.error('❌ Error al iniciar servidor:', error.message);
        process.exit(1);
    }
};

startServer();