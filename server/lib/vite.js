export function registerViteHelper(hbs) {
  hbs.registerHelper('viteScript', () => {
    if (process.env.NODE_ENV !== 'production') {
      // 🔥 IMPORTANTE: NADA de localhost aquí
      return '<script type="module" src="/src/main.js"></script>';
    } else {
      return '<script type="module" src="/dist/vite/main.js"></script>';
    }
  });
}