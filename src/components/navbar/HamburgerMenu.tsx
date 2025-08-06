import React, { ReactNode, FunctionComponent, useState, useRef, useEffect } from 'react';
import { mergeCls } from '../../utils/helper';

/* Navigation Item interface */
interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
  openInNewTab?: boolean;
}

/* Hamburger Menu interface */
interface HamburgerMenuProps {
  id?: string;
  className?: string;
  items: NavItem[];
  triggerIcon?: ReactNode;
  menuTitle?: string;
  showHeader?: boolean;
  position?: 'left' | 'right';
  variant?: 'dropdown' | 'sidebar';
  backgroundColor?: string;
  borderColor?: string;
  shadow?: boolean;
  defaultOpenInNewTab?: boolean;
  // Mobile/Desktop specific behavior
  mobileOpenInNewTab?: boolean;
  desktopOpenInNewTab?: boolean;
  // Styling options
  menuItemTextColor?: string;
  menuItemHoverColor?: string;
  menuItemActiveColor?: string;
  onItemClick?: (item: NavItem) => void;
  onOpenChange?: (isOpen: boolean) => void;
}

/**
 * Hamburger Menu component
 * 
 * Features:
 * - Independent hamburger menu component
 * - Dropdown and sidebar variants
 * - Configurable positioning
 * - Flexible link behavior
 * - Clean separation of concerns
 * 
 * @param {*} props
 * @returns
 */
const HamburgerMenu: FunctionComponent<HamburgerMenuProps> = ({
  id,
  className,
  items,
  triggerIcon,
  menuTitle = 'Menu',
  showHeader = true,
  position = 'right',
  variant = 'dropdown',
  backgroundColor = 'bg-white',
  borderColor = 'border-dark-100',
  shadow = true,
  defaultOpenInNewTab = false,
  mobileOpenInNewTab,
  desktopOpenInNewTab,
  menuItemTextColor = 'text-dark-900',
  menuItemHoverColor = 'hover:bg-dark-100',
  menuItemActiveColor = 'bg-primary-100 text-primary-900',
  onItemClick,
  onOpenChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle menu open/close
  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  // Handle item click
  const handleItemClick = (item: NavItem) => {
    onItemClick?.(item);
    setIsOpen(false);
    onOpenChange?.(false);
    
    // Handle link navigation with mobile/desktop specific behavior
    if (item.href) {
      const isMobile = window.innerWidth < 1024;
      const shouldOpenInNewTab = item.openInNewTab ?? 
        (isMobile ? mobileOpenInNewTab : desktopOpenInNewTab) ?? 
        defaultOpenInNewTab;
      
      if (shouldOpenInNewTab) {
        window.open(item.href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = item.href;
      }
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  // Default hamburger icon
  const DefaultHamburgerIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-dark-900"
    >
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );

  // Default close icon
  const CloseIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-dark-600"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  return (
    <div id={id} className={mergeCls(['relative', className])} ref={menuRef}>
      {/* Trigger Button */}
      <button
        onClick={handleToggle}
        className="p-2 rounded-md hover:bg-dark-100 transition-colors duration-200"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {triggerIcon || <DefaultHamburgerIcon />}
      </button>

      {/* Menu Content */}
      {isOpen && (
        <>
          {/* Overlay for sidebar variant */}
          {variant === 'sidebar' && (
            <div
              className="fixed inset-0 bg-dark-900 bg-opacity-50 z-40"
              onClick={() => {
                setIsOpen(false);
                onOpenChange?.(false);
              }}
            />
          )}

          {/* Menu Container */}
          <div
            className={mergeCls([
              // Base styles
              'z-50',
              backgroundColor,
              borderColor && `border ${borderColor}`,
              shadow && 'shadow-300',
              
              // Variant-specific styles
              variant === 'dropdown' && [
                'absolute top-full mt-2 w-64 rounded-lg',
                position === 'right' ? 'right-0' : 'left-0'
              ],
              
              variant === 'sidebar' && [
                'fixed top-0 h-full transform transition-transform duration-300 ease-in-out',
                position === 'right' ? 'right-0' : 'left-0',
                'w-64'
              ]
            ])}
          >
            {/* Header - Optional */}
            {showHeader && (
              <div className="flex items-center justify-between p-3 border-b border-dark-100">
                <h3 className="text-sm font-semibold text-dark-900">{menuTitle}</h3>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenChange?.(false);
                  }}
                  className="p-1 rounded-md hover:bg-dark-100 transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <CloseIcon />
                </button>
              </div>
            )}

            {/* Menu Items */}
            <div className={showHeader ? "py-2" : "py-1"}>
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  disabled={item.isDisabled}
                  className={mergeCls([
                    'w-full text-left px-4 py-3 transition-colors duration-200 flex items-center space-x-3',
                    menuItemTextColor,
                    menuItemHoverColor,
                    item.isActive && menuItemActiveColor,
                    item.id === 'logout' && 'font-bold',
                    item.isDisabled && 'opacity-50 cursor-not-allowed',
                    item.id.startsWith('divider') && 'border-t border-dark-100 my-1'
                  ])}
                >
                  {item.icon && (
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                  )}
                  <span className={mergeCls([
                    'flex-1',
                    item.id.startsWith('divider') && 'text-center text-dark-400 text-xs'
                  ])}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HamburgerMenu; 