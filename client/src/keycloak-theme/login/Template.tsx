import { useEffect } from 'react';
import { kcSanitize } from 'keycloakify/lib/kcSanitize';
import type { TemplateProps } from 'keycloakify/login/TemplateProps';
import { useInitialize } from 'keycloakify/login/Template.useInitialize';
import type { I18n } from './i18n';
import type { KcContext } from './KcContext';
import '../../index.css';
import {
  CheckIcon,
  CircleXIcon,
  GalleryVerticalEnd,
  GemIcon,
  LogOutIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import video from '../../assets/Timeline.mp4';
import { ThemeProvider } from '@/components/theme-provider';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    headerNode,
    socialProvidersNode = null,
    infoNode = null,
    documentTitle,
    kcContext,
    i18n,
    doUseDefaultCss,
    children,
  } = props;

  const { msg, msgStr } = i18n;

  const { auth, url, message, isAppInitiatedAction } = kcContext;
  const homeUrl = kcContext.properties.HOME_URL;

  useEffect(() => {
    document.title =
      documentTitle ?? msgStr('loginTitle', kcContext.realm.displayName);
  }, []);

  const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

  if (!isReadyToRender) {
    return null;
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="grid min-h-svh lg:grid-cols-2 bg-gradient-to-r from-[#0a0a0a] to-[#21190d] to-99% ">
        <div className="flex flex-col gap-4 p-6 md:p-10 relative">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href={homeUrl} className="flex items-center gap-2 font-medium">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              Sandbox
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center flex-col gap-6">
            <header className="py-5">
              {(() => {
                const node = !(
                  auth !== undefined &&
                  auth.showUsername &&
                  !auth.showResetCredentials
                ) ? (
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-semibold">{headerNode}</h1>
                  </div>
                ) : (
                  <div id="kc-username" className="flex gap-4 items-center">
                    <Label id="kc-attempted-username" className="text-lg">
                      {auth.attemptedUsername}
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <a href={url.loginRestartFlowUrl}>
                            <LogOutIcon
                              size={18}
                              className="relative top-0.5"
                            />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{msg('restartLoginTooltip')}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                );

                if (displayRequiredFields) {
                  return (
                    <div className="flex flex-col justify-end items-end gap-2">
                      <div className="col-md-10">{node}</div>
                      <div className="text-primary/70 text-sm absolute right-4 top-3">
                        <span className="subtitle">
                          <span className="required">*</span>
                          {msg('requiredFields')}
                        </span>
                      </div>
                    </div>
                  );
                }

                return node;
              })()}
            </header>

            {displayMessage &&
              message !== undefined &&
              (message.type !== 'warning' || !isAppInitiatedAction) && (
                <div
                  className={`max-w-md border-t rounded-md p-5 flex gap-2
                    ${
                      message?.type === 'error'
                        ? 'border-t-red-600 bg-red-600/10'
                        : 'border-t-orange-600 bg-orange-600/10'
                    } `}
                >
                  <div className="pt-1">
                    {message.type === 'success' && <CheckIcon size={20} />}
                    {message.type === 'warning' && (
                      <TriangleAlertIcon size={20} />
                    )}
                    {message.type === 'error' && <CircleXIcon size={20} />}
                    {message.type === 'info' && <GemIcon size={20} />}
                  </div>
                  <p>{kcSanitize(message.summary)}</p>
                </div>
              )}

            <div className="w-full max-w-xs">{children}</div>
            <div className="w-full max-w-xs">{socialProvidersNode}</div>
            {displayInfo && (
              <div id="kc-info" className="max-w-xs w-full flex justify-center">
                <div id="kc-info-wrapper">{infoNode}</div>
              </div>
            )}
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <video
            autoPlay
            muted
            loop
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </div>
    </ThemeProvider>
  );
}
