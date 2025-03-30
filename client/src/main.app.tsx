import './index.css';
import { StrictMode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import ProfilePage from './pages/profile.tsx';
import { BookmarkPage } from './pages/bookmarks.tsx';
import AboutPage from './about/page.tsx';
import NotFoundPage from './error/404.tsx';
import { PrivateRoute } from './auth/authprovider.tsx';

export default function AppEntrypoint() {
  return (
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
            <Route element={<PrivateRoute />} path="/">
              <Route element={<App />}>
                <Route index element={<BookmarkPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Route>
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
