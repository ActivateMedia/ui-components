import { useState } from 'react';
import { Dialog, Disclosure, Popover } from '@headlessui/react';
import Button from '../../components/button';
import InlineSvg from '../../components/inline-svg';
import { mergeCls } from '../../utils/helper';
import Brand from '../../components/brand/index';

interface IProps {
  token: string;
  router: any;
  selectedOrgId: string;
  activeItem: any;
  logoutBtnHandler?: () => any;
  menuClickHandler: (item: any) => any;
  logoClickHandler: () => any;
  afterLoginMenu: any;
  beforeLoginMenu: any;
  individualLoginMenu: any;
  brandSvg: any;
  barsSvg: any;
  xMarkSvg: any;
  arrowSvg: any;
  withRouter: any;
  SETTING_HEADING?: any;
}

const Index = ({
  token,
  router,
  selectedOrgId,
  activeItem,
  logoutBtnHandler,
  logoClickHandler,
  menuClickHandler,
  afterLoginMenu,
  beforeLoginMenu,
  individualLoginMenu,
  brandSvg,
  barsSvg,
  xMarkSvg,
  arrowSvg,
  SETTING_HEADING
}: IProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let navigation = beforeLoginMenu;
  if (token && selectedOrgId !== 'individual') {
    navigation = afterLoginMenu;
  } else if (token) {
    navigation = individualLoginMenu;
  }

  return (
    <header className="header z-1">
      <nav
        className="mx-auto h-[52px] flex items-center justify-between py-0 px-1 border-b bg-light-200"
        aria-label="Global"
      >
        <div className="flex items-center justify-center">
          <Brand clickHandler={logoClickHandler} svg={brandSvg} />
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-dark-900"
            onClick={() => setMobileMenuOpen(true)}
          >
            <InlineSvg
              className="text-center"
              src={barsSvg}
              width={25}
              height={25}
            />
          </button>
        </div>

        <Popover.Group className="hidden lg:flex lg:gap-x-1">
          {navigation &&
            navigation.map((item: any, i: number) => (
              <div key={`main-menu-${String(i)}`}>
                <Button
                  type="button"
                  id={
                    item.value === 'documents'
                      ? 'step-1'
                      : `desktop-menu-${String(i)}`
                  }
                  className={mergeCls([
                    'h-12 text-sm text-dark-900 px-5 rounded-md',
                    activeItem === item.value ? 'font-bold' : 'font-normal'
                  ])}
                  onClick={() => menuClickHandler(item.value)}
                >
                  {item.label}
                </Button>
              </div>
            ))}
        </Popover.Group>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-light-200 px-5 sm:max-w-sm sm:ring-1 sm:ring-dark-900/10">
          <div className="flex items-center justify-between mb-16 h-12">
            <Brand svg={brandSvg} />
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-dark-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <InlineSvg
                className="text-center"
                src={xMarkSvg}
                width={25}
                height={25}
              />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-dark-500/10">
              <div className="space-y-2 py-6">
                {navigation &&
                  navigation.map((item: any, i: number) => (
                    <div key={`main-menu-${String(i)}`}>
                      {item.dropDown ? (
                        <Disclosure as="div" className="-mx-3">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-dark-100">
                                {SETTING_HEADING}
                                <InlineSvg
                                  className={mergeCls([
                                    open ? 'rotate-180' : '',
                                    'text-center'
                                  ])}
                                  src={arrowSvg}
                                  width={18}
                                  height={18}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="mt-2 space-y-2">
                                {item.dropDown.map((item: any) => (
                                  <Disclosure.Button
                                    key={item.value}
                                    as="a"
                                    href={item.value}
                                    className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-dark-900 hover:bg-dark-100"
                                    onClick={() => menuClickHandler(item.value)}
                                  >
                                    {item.label}
                                  </Disclosure.Button>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ) : (
                        <button
                          key={item.value}
                          className={mergeCls([
                            item.value === 'payment' || item.value === 'signin'
                              ? 'default-shadow bg-primary-900 rounded-full px-3 h-9 text-sm font-bold text-center mx-auto'
                              : 'rounded-lg w-full py-2 px-4 hover:bg-dark-100 text-2xl font-bold',
                            'text-left leading-7 text-dark-900 flex justify-center mb-12'
                          ])}
                          onClick={() => menuClickHandler(item.value)}
                        >
                          {item.label}
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

Index.defaultProps = {
  navigation: []
};

export default Index;
