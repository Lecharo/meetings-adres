/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configuración para exportar la aplicación como estática (si es necesario)
  output: 'standalone',
  // Configuración para manejar rutas de imágenes
  images: {
    unoptimized: true, // Desactiva la optimización de imágenes para exportación estáta
  },
  // Configuración para TypeScript
  typescript: {
    // Ignora los errores de TypeScript durante la compilación
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignora los errores de ESLint durante la compilación
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
