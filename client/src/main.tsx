import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import LoginPage from './login/page.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import ProfilePage from './home/profile.tsx';
import { BookmarkPage } from './home/bookmarks.tsx';
import AboutPage from './about/page.tsx';
import NotFoundPage from './error/404.tsx';
import { PrivateRoute } from './login/privateRoute.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />} path="/">
            <Route element={<App />}>
              <Route index element={<BookmarkPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
