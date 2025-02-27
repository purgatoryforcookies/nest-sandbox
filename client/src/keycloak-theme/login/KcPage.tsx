import '../../index.css';
import { Suspense, lazy } from 'react';
import type { ClassKey } from 'keycloakify/login';
import type { KcContext } from './KcContext';
import { useI18n } from './i18n';
import DefaultPage from 'keycloakify/login/DefaultPage';
import Template from './Template';
const UserProfileFormFields = lazy(() => import('./UserProfileFormFields'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const LoginPageExpired = lazy(() => import('./pages/LoginPageExpired'));
const IdpReviewUserProfile = lazy(() => import('./pages/IdpReviewUserProfile'));
const LoginIdpLinkConfirm = lazy(() => import('./pages/LoginIdpLinkConfirm'));
const LoginVerifyEmail = lazy(() => import('./pages/LoginVerifyEmail'));
const LoginResetPassword = lazy(() => import('./pages/LoginResetPassword'));

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props;

  const { i18n } = useI18n({ kcContext });

  return (
    <Suspense>
      {(() => {
        switch (kcContext.pageId) {
          case 'login.ftl':
            return (
              <Login
                {...{ kcContext, i18n, classes }}
                Template={Template}
                doUseDefaultCss={false}
              />
            );
          case 'register.ftl':
            return (
              <Register
                {...{ kcContext, i18n, classes }}
                Template={Template}
                doUseDefaultCss={false}
                UserProfileFormFields={UserProfileFormFields}
                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
              />
            );
          case 'login-page-expired.ftl':
            return (
              <LoginPageExpired
                {...{ kcContext, i18n, classes }}
                Template={Template}
                doUseDefaultCss={false}
              />
            );
          case 'idp-review-user-profile.ftl':
            return (
              <IdpReviewUserProfile
                {...{ kcContext, i18n, classes }}
                Template={Template}
                doUseDefaultCss={false}
                UserProfileFormFields={UserProfileFormFields}
                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
              />
            );
          case 'login-idp-link-confirm.ftl':
            return (
              <LoginIdpLinkConfirm
                {...{ kcContext, i18n, classes }}
                Template={Template}
                doUseDefaultCss={false}
              />
            );
          case 'login-verify-email.ftl':
            return (
              <LoginVerifyEmail
                {...{ kcContext, i18n, classes }}
                Template={Template}
                doUseDefaultCss={false}
              />
            );
          case 'login-reset-password.ftl':
            return (
              <LoginResetPassword
                {...{ kcContext, i18n, classes }}
                Template={Template}
                doUseDefaultCss={false}
              />
            );
          default:
            return (
              <DefaultPage
                kcContext={kcContext}
                i18n={i18n}
                classes={classes}
                Template={Template}
                doUseDefaultCss={false}
                UserProfileFormFields={UserProfileFormFields}
                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
              />
            );
        }
      })()}
    </Suspense>
  );
}

const classes = {} satisfies { [key in ClassKey]?: string };
