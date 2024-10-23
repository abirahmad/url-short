/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './resources/**/*.blade.php',
      './resources/**/*.js',
      './resources/**/*.jsx',
      './resources/**/*.vue',
      './resources/js/**/*.js',
      './resources/js/**/*.jsx', // Ensure your jsx files are included
      './resources/views/**/*.blade.php',
      // Add other paths as necessary
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  