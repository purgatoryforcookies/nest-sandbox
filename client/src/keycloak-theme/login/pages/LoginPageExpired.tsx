import type { PageProps } from 'keycloakify/login/pages/PageProps';
import type { KcContext } from '../KcContext';
import type { I18n } from '../i18n';
import { Button } from '@/components/ui/button';

export default function LoginPageExpired(
  props: PageProps<
    Extract<KcContext, { pageId: 'login-page-expired.ftl' }>,
    I18n
  >,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { url } = kcContext;

  const { msg } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={msg('pageExpiredTitle')}
    >
      <div className="flex flex-col gap-4">
        <Button className="p-0">
          <a
            className="size-full flex justify-center items-center"
            href={url.loginRestartFlowUrl}
          >
            {' '}
            {msg('pageExpiredMsg1')}
          </a>
        </Button>
        <Button variant={'link'} className="p-0">
          <a
            className="size-full flex justify-center items-center"
            href={url.loginAction}
          >
            {' '}
            {msg('pageExpiredMsg2')}
          </a>
        </Button>
      </div>
    </Template>
  );
}
