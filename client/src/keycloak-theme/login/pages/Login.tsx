import { useState } from 'react';
import { kcSanitize } from 'keycloakify/lib/kcSanitize';
import type { PageProps } from 'keycloakify/login/pages/PageProps';
import type { KcContext } from '../KcContext';
import type { I18n } from '../i18n';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Icon } from '@/keycloak-theme/util';

export default function Login(
  props: PageProps<Extract<KcContext, { pageId: 'login.ftl' }>, I18n>,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const {
    social,
    realm,
    url,
    usernameHidden,
    login,
    auth,
    registrationDisabled,
    messagesPerField,
  } = kcContext;

  const { msg } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayMessage={!messagesPerField.existsError('username', 'password')}
      headerNode={msg('loginAccountTitle')}
      displayInfo={
        realm.password && realm.registrationAllowed && !registrationDisabled
      }
      infoNode={
        <div id="kc-registration-container">
          <div id="kc-registration">
            <span className="text-sm text-primary/60">
              {msg('noAccount')}{' '}
              <a
                tabIndex={8}
                href={url.registrationUrl}
                className="hover:underline text-primary"
              >
                {msg('doRegister')}
              </a>
            </span>
          </div>
        </div>
      }
      socialProvidersNode={
        <>
          {realm.password &&
            social?.providers !== undefined &&
            social.providers.length !== 0 && (
              <div id="kc-social-providers" className="flex flex-col gap-4">
                <div className="relative text-center text-sm flex items-center">
                  <div className="w-full h-[1px] bg-primary/20"></div>
                  <span className="relative z-10 bg-inherit px-1.5 text-muted-foreground min-w-fit">
                    {msg('identity-provider-login-label')}
                  </span>
                  <div className="w-full h-[1px] bg-primary/20"></div>
                </div>
                <ul className="flex flex-col gap-1.5 items-center">
                  {social.providers.map((p) => {
                    return (
                      <li key={p.alias} className="w-full">
                        <Button className="w-full" variant={'outline'}>
                          <a
                            id={`social-${p.alias}`}
                            type="button"
                            href={p.loginUrl}
                            className="m-auto"
                          >
                            <div className="grid grid-cols-[25px_70px] items-center">
                              {Icon(p.alias)}
                              <span className="text-left">
                                {kcSanitize(p.displayName)}
                              </span>
                            </div>
                          </a>
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
        </>
      }
    >
      <div id="kc-form" className="max-w-xs">
        <div id="kc-form-wrapper">
          {realm.password && (
            <form
              id="kc-form-login"
              onSubmit={() => {
                setIsLoginButtonDisabled(true);
                return true;
              }}
              action={url.loginAction}
              method="post"
            >
              <div className="flex flex-col gap-4">
                {!usernameHidden && (
                  <div className="grid gap-2">
                    <Label
                      htmlFor="username"
                      className="flex justify-between items-center"
                    >
                      {!realm.loginWithEmailAllowed
                        ? msg('username')
                        : !realm.registrationEmailAsUsername
                          ? msg('usernameOrEmail')
                          : msg('email')}
                    </Label>
                    <Input
                      id="username"
                      tabIndex={2}
                      type="text"
                      autoFocus
                      name="username"
                      autoComplete="username"
                      defaultValue={login.username ?? ''}
                      placeholder="m@example.com"
                      aria-invalid={messagesPerField.existsError(
                        'username',
                        'password',
                      )}
                    />
                  </div>
                )}
                <div className="grid gap-2">
                  <Label
                    htmlFor="password"
                    className="flex justify-between items-center"
                  >
                    {msg('password')}
                    {realm.resetPasswordAllowed && (
                      <span>
                        <a
                          tabIndex={6}
                          href={url.loginResetCredentialsUrl}
                          className="ml-auto text-xs underline-offset-4 hover:underline"
                        >
                          {msg('doForgotPassword')}
                        </a>
                      </span>
                    )}
                  </Label>
                  <Input
                    tabIndex={3}
                    id="password"
                    type="password"
                    name="password"
                    required
                    autoComplete="current-password"
                    aria-invalid={messagesPerField.existsError(
                      'username',
                      'password',
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-between py-5 items-center">
                {realm.rememberMe && !usernameHidden ? (
                  <div className="flex items-center gap-1">
                    <Checkbox
                      id="rememberMe"
                      tabIndex={5}
                      defaultChecked={!!login.rememberMe}
                      name="rememberMe"
                    />
                    <Label
                      htmlFor="rememberMe"
                      className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {msg('rememberMe')}
                    </Label>
                  </div>
                ) : (
                  <div></div>
                )}
                <div></div>
                {messagesPerField.existsError('username', 'password') && (
                  <span
                    id="input-error"
                    className="text-red-600 text-xs"
                    aria-live="polite"
                  >
                    {kcSanitize(
                      messagesPerField.getFirstError('username', 'password'),
                    )}
                  </span>
                )}
              </div>

              <div id="kc-form-buttons">
                <input
                  type="hidden"
                  id="id-hidden-input"
                  name="credentialId"
                  value={auth.selectedCredential}
                />
                <Button
                  tabIndex={7}
                  name="login"
                  type="submit"
                  className="w-full"
                  disabled={isLoginButtonDisabled}
                >
                  {msg('doLogIn')}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Template>
  );
}
