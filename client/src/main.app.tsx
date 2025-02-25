import './index.css';
import { StrictMode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import ProfilePage from './home/profile.tsx';
import { BookmarkPage } from './home/bookmarks.tsx';
import AboutPage from './about/page.tsx';
import NotFoundPage from './error/404.tsx';
import AuthProvider from './login/privateRoute.tsx';

export default function AppEntrypoint() {
  return (
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
            <Route element={<AuthProvider />} path="/">
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
