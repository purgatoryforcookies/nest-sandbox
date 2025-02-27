import { getKcClsx } from 'keycloakify/login/lib/kcClsx';
import { kcSanitize } from 'keycloakify/lib/kcSanitize';
import type { PageProps } from 'keycloakify/login/pages/PageProps';
import type { KcContext } from '../KcContext';
import type { I18n } from '../i18n';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function LoginResetPassword(
  props: PageProps<
    Extract<KcContext, { pageId: 'login-reset-password.ftl' }>,
    I18n
  >,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  });

  const { url, realm, auth, messagesPerField } = kcContext;

  const { msg, msgStr } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayInfo
      displayMessage={!messagesPerField.existsError('username')}
      infoNode={
        <div>
          {realm.duplicateEmailsAllowed
            ? msg('emailInstructionUsername')
            : msg('emailInstruction')}
        </div>
      }
      headerNode={msg('emailForgotTitle')}
    >
      <form
        id="kc-reset-password-form"
        className="flex flex-col gap-7"
        action={url.loginAction}
        method="post"
      >
        <div className={kcClsx('kcFormGroupClass')}>
          <div className={kcClsx('kcLabelWrapperClass')}>
            <Label htmlFor="username" className={kcClsx('kcLabelClass')}>
              {!realm.loginWithEmailAllowed
                ? msg('username')
                : !realm.registrationEmailAsUsername
                  ? msg('usernameOrEmail')
                  : msg('email')}
            </Label>
          </div>
          <div className={kcClsx('kcInputWrapperClass')}>
            <Input
              type="text"
              id="username"
              name="username"
              autoFocus
              defaultValue={auth.attemptedUsername ?? ''}
              aria-invalid={messagesPerField.existsError('username')}
            />
            {messagesPerField.existsError('username') && (
              <span
                id="input-error-username"
                className="text-red-600 text-sm"
                aria-live="polite"
                dangerouslySetInnerHTML={{
                  __html: kcSanitize(messagesPerField.get('username')),
                }}
              />
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <Button className="p-0" type="button" variant={'link'}>
            <a
              className="size-full p-3 flex justify-center items-center"
              href={url.loginUrl}
            >
              {msg('backToLogin')}
            </a>
          </Button>

          <Button type="submit">{msgStr('doSubmit')}</Button>
        </div>
      </form>
    </Template>
  );
}
