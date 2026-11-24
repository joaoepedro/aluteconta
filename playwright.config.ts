import { defineConfig, devices } from '@playwright/test';

const PORT = 4321;

/**
 * Testes de ponta a ponta + acessibilidade (axe) no site gerado.
 * Local: `npm run build && npm run test:e2e`
 * Para usar um Chrome já instalado: PW_CHROME_PATH=/caminho/do/chrome npm run test:e2e
 */
const executablePath = process.env['PW_CHROME_PATH'];

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 1 : 0,
  reporter: process.env['CI'] ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
    ...(executablePath ? { launchOptions: { executablePath } } : {}),
  },
  projects: [
    { name: 'celular', use: { ...devices['Pixel 7'] } },
    { name: 'tablet', use: { ...devices['iPad Mini'], defaultBrowserType: 'chromium' } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    // Serve o HTML gerado (dist/client). Formulários são testados à parte (rota da Cloudflare).
    command: `npx serve dist/client -l ${PORT} --no-clipboard`,
    port: PORT,
    reuseExistingServer: !process.env['CI'],
  },
});
