import type { JSX } from 'keycloakify/tools/JSX';
import { useState } from 'react';
import type { LazyOrNot } from 'keycloakify/tools/LazyOrNot';
import { kcSanitize } from 'keycloakify/lib/kcSanitize';
import { getKcClsx, type KcClsx } from 'keycloakify/login/lib/kcClsx';
import { clsx } from 'keycloakify/tools/clsx';
import type { UserProfileFormFieldsProps } from 'keycloakify/login/UserProfileFormFieldsProps';
import type { PageProps } from 'keycloakify/login/pages/PageProps';
import type { KcContext } from '../KcContext';
import type { I18n } from '../i18n';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type RegisterProps = PageProps<
  Extract<KcContext, { pageId: 'register.ftl' }>,
  I18n
> & {
  UserProfileFormFields: LazyOrNot<
    (props: UserProfileFormFieldsProps) => JSX.Element
  >;
  doMakeUserConfirmPassword: boolean;
};

export default function Register(props: RegisterProps) {
  const {
    kcContext,
    i18n,
    doUseDefaultCss,
    Template,
    classes,
    UserProfileFormFields,
    doMakeUserConfirmPassword,
  } = props;

  const { kcClsx } = getKcClsx({
    doUseDefaultCss,
    classes,
  });

  const {
    messageHeader,
    url,
    messagesPerField,
    recaptchaRequired,
    recaptchaVisible,
    recaptchaSiteKey,
    recaptchaAction,
    termsAcceptanceRequired,
  } = kcContext;

  const { msg, msgStr, advancedMsg } = i18n;

  const [isFormSubmittable, setIsFormSubmittable] = useState(false);
  const [areTermsAccepted, setAreTermsAccepted] = useState(false);

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      headerNode={
        messageHeader !== undefined
          ? advancedMsg(messageHeader)
          : msg('registerTitle')
      }
      displayMessage={messagesPerField.exists('global')}
      displayRequiredFields
    >
      <form id="kc-register-form" action={url.registrationAction} method="post">
        <UserProfileFormFields
          kcContext={kcContext}
          i18n={i18n}
          kcClsx={kcClsx}
          onIsFormSubmittableValueChange={setIsFormSubmittable}
          doMakeUserConfirmPassword={doMakeUserConfirmPassword}
        />
        {termsAcceptanceRequired && (
          <TermsAcceptance
            i18n={i18n}
            kcClsx={kcClsx}
            messagesPerField={messagesPerField}
            areTermsAccepted={areTermsAccepted}
            onAreTermsAcceptedValueChange={setAreTermsAccepted}
          />
        )}
        {recaptchaRequired &&
          (recaptchaVisible || recaptchaAction === undefined) && (
            <div className="form-group flex justify-center py-3">
              <div>
                <div
                  className="g-recaptcha w-full"
                  data-size="large"
                  data-sitekey={recaptchaSiteKey}
                  data-action={recaptchaAction}
                ></div>
              </div>
            </div>
          )}
        <div className="flex w-full justify-between items-center py-5">
          <div id="kc-form-options">
            <Button type="button" variant={'link'} className="bg-inherit">
              <a href={url.loginUrl}>{msg('backToLogin')}</a>
            </Button>
          </div>

          {recaptchaRequired &&
          !recaptchaVisible &&
          recaptchaAction !== undefined ? (
            <div id="kc-form-buttons">
              <button
                className={clsx(
                  kcClsx(
                    'kcButtonClass',
                    'kcButtonPrimaryClass',
                    'kcButtonBlockClass',
                    'kcButtonLargeClass',
                  ),
                  'g-recaptcha',
                )}
                data-sitekey={recaptchaSiteKey}
                data-callback={() => {
                  (
                    document.getElementById(
                      'kc-register-form',
                    ) as HTMLFormElement
                  ).submit();
                }}
                data-action={recaptchaAction}
                type="submit"
              >
                {msg('doRegister')}
              </button>
            </div>
          ) : (
            <div id="kc-form-buttons">
              <Button
                disabled={
                  !isFormSubmittable ||
                  (termsAcceptanceRequired && !areTermsAccepted)
                }
                type="submit"
              >
                {msgStr('doRegister')}
              </Button>
            </div>
          )}
        </div>
      </form>
    </Template>
  );
}

function TermsAcceptance(props: {
  i18n: I18n;
  kcClsx: KcClsx;
  messagesPerField: Pick<KcContext['messagesPerField'], 'existsError' | 'get'>;
  areTermsAccepted: boolean;
  onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
}) {
  const {
    i18n,
    messagesPerField,
    areTermsAccepted,
    onAreTermsAcceptedValueChange,
  } = props;

  const { msg } = i18n;

  return (
    <>
      <div className="py-5">
        <div className="flex flex-col">
          <h3 className="">{msg('termsTitle')}</h3>
          <p className="underline">{msg('termsText')}</p>
        </div>
      </div>
      <div className="form-group">
        <div className="flex items-center gap-2">
          <Checkbox
            id="termsAccepted"
            name="termsAccepted"
            checked={areTermsAccepted}
            onCheckedChange={(e) =>
              onAreTermsAcceptedValueChange(typeof e === 'string' ? false : e)
            }
            aria-invalid={messagesPerField.existsError('termsAccepted')}
          />
          <Label htmlFor="termsAccepted">{msg('acceptTerms')}</Label>
        </div>
        {messagesPerField.existsError('termsAccepted') && (
          <div>
            <span
              id="input-error-terms-accepted"
              className="text-red-600 text-sm"
              aria-live="polite"
            >
              {kcSanitize(messagesPerField.get('termsAccepted'))}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
