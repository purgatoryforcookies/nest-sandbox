import type { PageProps } from 'keycloakify/login/pages/PageProps';
import type { KcContext } from '../KcContext';
import type { I18n } from '../i18n';
import { Button } from '@/components/ui/button';

export default function LoginVerifyEmail(
  props: PageProps<
    Extract<KcContext, { pageId: 'login-verify-email.ftl' }>,
    I18n
  >,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { msg } = i18n;

  const { url, user } = kcContext;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      displayInfo
      headerNode={msg('emailVerifyTitle')}
      infoNode={
        <div className="flex flex-col">
          <p className="instruction">
            {msg('emailVerifyInstruction2')}
            <br />
            &nbsp;
          </p>

          <Button className="flex p-0">
            <a
              href={url.loginAction}
              className="size-full flex gap-1 justify-center items-center"
            >
              {msg('doClickHere')}
              {msg('emailVerifyInstruction3')}
            </a>
          </Button>
          <p></p>
        </div>
      }
    >
      <div className="">
        <p>{msg('emailVerifyInstruction1', user?.email ?? '')}</p>
      </div>
    </Template>
  );
}
