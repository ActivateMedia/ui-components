import React, { ReactNode, FunctionComponent, useState, useEffect } from 'react';
import { mergeCls } from '../../utils/helper';

/* Navigation Item interface */
export interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
  openInNewTab?: boolean;
  type?: 'navigation' | 'action' | 'separator';
  separatorElement?: ReactNode; // Custom separator element
  separatorStyle?: {
    height?: string;
    borderColor?: string;
    backgroundColor?: string;
    background?: string;
    margin?: string;
  };
}

/* Responsive Navbar interface */
interface ResponsiveNavbarProps {
  id?: string;
  className?: string;
  height?: number;
  mobileHeight?: number;
  logo?: ReactNode;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  children?: ReactNode;
  navigationItems: NavItem[];
  
  // Styling
  backgroundColor?: string;
  borderColor?: string;
  shadow?: boolean;
  
  // Hamburger Menu Configuration
  hamburgerIcon?: ReactNode;
  showHeader?: boolean;
  menuTitle?: string;
  menuPosition?: 'left' | 'right';
  menuVariant?: 'dropdown' | 'sidebar';
  
  // Link Behavior
  defaultOpenInNewTab?: boolean;
  mobileOpenInNewTab?: boolean;
  desktopOpenInNewTab?: boolean;
  
  // Menu Styling
  menuBackgroundColor?: string;
  menuBorderColor?: string;
  menuShadow?: boolean;
  menuItemTextColor?: string;
  menuItemHoverColor?: string;
  menuItemActiveColor?: string;
  
  // Callbacks
  onNavigationItemClick?: (item: NavItem) => void;
  onMenuOpenChange?: (isOpen: boolean) => void;
  onLogoClick?: () => void;
}

/**
 * Responsive Navbar Component
 * 
 * Features:
 * - Single comprehensive navbar component
 * - Built-in hamburger menu with responsive behavior
 * - Highly customizable styling and behavior
 * - Mobile/Desktop specific link behavior
 * - Clean, production-ready design
 * 
 * @param {*} props
 * @returns
 */
const ResponsiveNavbar: FunctionComponent<ResponsiveNavbarProps> = ({
  id,
  className,
  height = 64,
  mobileHeight,
  logo,
  leftContent,
  rightContent,
  children,
  navigationItems,
  
  // Styling
  backgroundColor = 'bg-white',
  borderColor = 'border-gray-200',
  shadow = false,
  
  // Hamburger Menu Configuration
  hamburgerIcon,
  showHeader = false,
  menuTitle = 'Menu',
  menuPosition = 'right',
  menuVariant = 'dropdown',
  
  // Link Behavior
  defaultOpenInNewTab = false,
  mobileOpenInNewTab,
  desktopOpenInNewTab,
  
  // Menu Styling
  menuBackgroundColor = 'bg-white',
  menuBorderColor = 'border-gray-200',
  menuShadow = true,
  menuItemTextColor = 'text-gray-900',
  menuItemHoverColor = 'hover:bg-gray-50',
  menuItemActiveColor = 'bg-gray-100 text-gray-900',
  
  // Callbacks
  onNavigationItemClick,
  onMenuOpenChange,
  onLogoClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Detect mobile/desktop
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Handle menu toggle
  const handleMenuToggle = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    onMenuOpenChange?.(newState);
  };

  // Handle logo click
  const handleLogoClick = () => {
    onLogoClick?.();
  };

  // Handle item click
  const handleItemClick = (item: NavItem) => {
    // Skip processing for separator items
    if (item.type === 'separator' || item.separatorElement) {
      return;
    }

    onNavigationItemClick?.(item);
    setIsMenuOpen(false);
    onMenuOpenChange?.(false);
    
    // Handle action items (like logout) - call onClick function
    if (item.type === 'action' && item.onClick) {
      item.onClick();
      return;
    }
    
    // Handle navigation items with href
    if (item.href) {
      const shouldOpenInNewTab = item.openInNewTab ?? 
        (isMobile ? mobileOpenInNewTab : desktopOpenInNewTab) ?? 
        defaultOpenInNewTab;
      
      if (shouldOpenInNewTab) {
        window.open(item.href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = item.href;
      }
    }
    
    // Handle items with onClick but no href (fallback)
    if (item.onClick && !item.href) {
      item.onClick();
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        onMenuOpenChange?.(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, onMenuOpenChange]);

  // Default hamburger icon
  const DefaultHamburgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <g clipPath="url(#clip0_6242_894)">
        <path d="M4 7.2028C4 6.53851 4.57701 6 5.28879 6H20.7112C21.423 6 22 6.53851 22 7.2028C22 7.8671 21.423 8.40561 20.7112 8.40561H5.28879C4.57701 8.40561 4 7.8671 4 7.2028Z" fill="#0C0F13"/>
        <path d="M4 7.2028C4 6.53851 4.57701 6 5.28879 6H20.7112C21.423 6 22 6.53851 22 7.2028C22 7.8671 21.423 8.40561 20.7112 8.40561H5.28879C4.57701 8.40561 4 7.8671 4 7.2028Z" fill="black" fillOpacity="0.2"/>
        <path d="M4 7.2028C4 6.53851 4.57701 6 5.28879 6H20.7112C21.423 6 22 6.53851 22 7.2028C22 7.8671 21.423 8.40561 20.7112 8.40561H5.28879C4.57701 8.40561 4 7.8671 4 7.2028Z" fill="black" fillOpacity="0.2"/>
        <path d="M4 7.2028C4 6.53851 4.57701 6 5.28879 6H20.7112C21.423 6 22 6.53851 22 7.2028C22 7.8671 21.423 8.40561 20.7112 8.40561H5.28879C4.57701 8.40561 4 7.8671 4 7.2028Z" fill="black" fillOpacity="0.2"/>
        <path d="M4 7.2028C4 6.53851 4.57701 6 5.28879 6H20.7112C21.423 6 22 6.53851 22 7.2028C22 7.8671 21.423 8.40561 20.7112 8.40561H5.28879C4.57701 8.40561 4 7.8671 4 7.2028Z" fill="black" fillOpacity="0.2"/>
        <path d="M4 12.0059C4 11.3416 4.57701 10.8031 5.28879 10.8031H20.7112C21.423 10.8031 22 11.3416 22 12.0059C22 12.6702 21.423 13.2087 20.7112 13.2087H5.28879C4.57701 13.2087 4 12.6702 4 12.0059Z" fill="#0C0F13"/>
        <path d="M4 12.0059C4 11.3416 4.57701 10.8031 5.28879 10.8031H20.7112C21.423 10.8031 22 11.3416 22 12.0059C22 12.6702 21.423 13.2087 20.7112 13.2087H5.28879C4.57701 13.2087 4 12.6702 4 12.0059Z" fill="black" fillOpacity="0.2"/>
        <path d="M4 12.0059C4 11.3416 4.57701 10.8031 5.28879 10.8031H20.7112C21.423 10.8031 22 11.3416 22 12.0059C22 12.6702 21.423 13.2087 20.7112 13.2087H5.28879C4.57701 13.2087 4 12.6702 4 12.0059Z" fill="black" fillOpacity="0.2"/>
        <path d="M4 12.0059C4 11.3416 4.57701 10.8031 5.28879 10.8031H20.7112C21.423 10.8031 22 11.3416 22 12.0059C22 12.6702 21.423 13.2087 20.7112 13.2087H5.28879C4.57701 13.2087 4 12.6702 4 12.0059Z" fill="black" fillOpacity="0.2"/>
        <path d="M4 12.0059C4 11.3416 4.57701 10.8031 5.28879 10.8031H20.7112C21.423 10.8031 22 11.3416 22 12.0059C22 12.6702 21.423 13.2087 20.7112 13.2087H5.28879C4.57701 13.2087 4 12.6702 4 12.0059Z" fill="black" fillOpacity="0.2"/>
        <path d="M4 16.7972C4 16.1329 4.57701 15.5944 5.28879 15.5944H20.7112C21.423 15.5944 22 16.1329 22 16.7972C22 17.4615 21.423 18 20.7112 18H5.28879C4.57701 18 4 17.4615 4 16.7972Z" fill="#0C0F13"/>
        <path d="M4 16.7972C4 16.1329 4.57701 15.5944 5.28879 15.5944H20.7112C21.423 15.5944 22 16.1329 22 16.7972C22 17.4615 21.423 18 20.7112 18H5.28879C4.57701 18 4 17.4615 4 16.7972Z" fill="black" fillOpacity="0.2"/>
        <path d="M4 16.7972C4 16.1329 4.57701 15.5944 5.28879 15.5944H20.7112C21.423 15.5944 22 16.1329 22 16.7972C22 17.4615 21.423 18 20.7112 18H5.28879C4.57701 18 4 17.4615 4 16.7972Z" fill="black" fillOpacity="0.2"/>
        <path d="M4 16.7972C4 16.1329 4.57701 15.5944 5.28879 15.5944H20.7112C21.423 15.5944 22 16.1329 22 16.7972C22 17.4615 21.423 18 20.7112 18H5.28879C4.57701 18 4 17.4615 4 16.7972Z" fill="black" fillOpacity="0.2"/>
        <path d="M4 16.7972C4 16.1329 4.57701 15.5944 5.28879 15.5944H20.7112C21.423 15.5944 22 16.1329 22 16.7972C22 17.4615 21.423 18 20.7112 18H5.28879C4.57701 18 4 17.4615 4 16.7972Z" fill="black" fillOpacity="0.2"/>
      </g>
      <defs>
        <clipPath id="clip0_6242_894">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );

  // Close icon
  const CloseIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  // Determine menu variant based on screen size
  const currentMenuVariant = isMobile ? 'sidebar' : menuVariant;

  // Calculate responsive height
  const currentHeight = isMobile && mobileHeight ? mobileHeight : height;

  return (
    <nav
      id={id}
      className={mergeCls([
        'flex items-center justify-between px-3 md:px-4 lg:px-6 xl:px-8 relative',
        backgroundColor,
        borderColor && `border-b ${borderColor}`,
        shadow && 'shadow-sm',
        className
      ])}
      style={{ 
        height: `${currentHeight}px`,
        minHeight: `${currentHeight}px`,
        maxHeight: `${currentHeight}px`
      }}
    >
      {/* Left Section */}
      <div className="flex items-center space-x-2 md:space-x-4 h-full">
        {logo && (
          <div 
            className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-200 flex items-center h-full"
            onClick={handleLogoClick}
          >
            {logo}
          </div>
        )}
        {leftContent && <div className="flex items-center space-x-2 md:space-x-4 h-full">{leftContent}</div>}
      </div>

      {/* Center Section */}
      {children && (
        <div className="flex-1 flex justify-center items-center h-full">
          {children}
        </div>
      )}

      {/* Right Section */}
      <div className="flex items-center space-x-2 md:space-x-4 h-full">
        {rightContent}
        
        {/* Hamburger Menu */}
        <div className="relative flex justify-end h-full" ref={menuRef}>
          {/* Trigger Button */}
          <button
            onClick={handleMenuToggle}
            className="p-1 md:p-2 rounded-md hover:bg-dark-100 transition-colors duration-200 flex items-center justify-center h-full relative z-10"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {hamburgerIcon || <DefaultHamburgerIcon />}
          </button>

          {/* Menu Content */}
          {isMenuOpen && (
            <>
              {/* Overlay for sidebar variant */}
              {currentMenuVariant === 'sidebar' && (
                <div
                  className="fixed inset-0 bg-dark-900 bg-opacity-50 z-40"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onMenuOpenChange?.(false);
                  }}
                />
              )}

              {/* Menu Container */}
              <div
                className={mergeCls([
                  // Base styles
                  'z-50',
                  menuBackgroundColor,
                  menuBorderColor && `border ${menuBorderColor}`,
                  menuShadow && 'shadow-lg',
                  
                  // Figma Design Specs
                  'rounded',
                  'border border-gray-200',
                  'bg-white',
                  'shadow-lg',
                  
                  // Variant-specific styles
                  currentMenuVariant === 'dropdown' && [
                    'absolute w-[185px]',
                    'right-0',
                    'z-20'
                  ],
                  
                  currentMenuVariant === 'sidebar' && [
                    'fixed top-0 h-full transform transition-transform duration-300 ease-in-out',
                    menuPosition === 'right' ? 'right-0' : 'left-0',
                    'w-[185px]',
                    'border-gray-200'
                  ]
                ])}
                style={{
                  ...(currentMenuVariant === 'dropdown' && { top: '50px' }),
                  width: '185px'
                }}
              >
                {/* Header - Optional */}
                {showHeader && (
                  <div className={mergeCls([
                    'flex items-center justify-between p-3',
                    currentMenuVariant === 'sidebar' ? 'border-b-2 border-gray-200' : 'border-b border-gray-200'
                  ])}>
                    <h3 className="text-sm font-semibold text-dark-900">{menuTitle}</h3>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onMenuOpenChange?.(false);
                      }}
                      className="p-1 rounded-md hover:bg-dark-100 transition-colors duration-200"
                      aria-label="Close menu"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                )}

                {/* Close button for sidebar variant (when no header) */}
                {currentMenuVariant === 'sidebar' && !showHeader && (
                  <div className="flex justify-end p-3 border-b-2 border-gray-200">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onMenuOpenChange?.(false);
                      }}
                      className="p-2 rounded-md hover:bg-dark-100 transition-colors duration-200"
                      aria-label="Close menu"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                )}

                {/* Menu Items */}
                <div className="p-3 flex flex-col items-start">
                  {navigationItems.map((item) => {
                    // Handle separator items
                    if (item.type === 'separator' || item.separatorElement) {
                      console.log('Rendering separator:', item.id, item.type, item.separatorElement ? 'custom' : 'default');
                      // If user provided a custom separator element, use it
                      if (item.separatorElement) {
                        return (
                          <div
                            key={item.id}
                            className="w-full"
                            role="separator"
                            aria-label="Menu separator"
                          >
                            {item.separatorElement}
                          </div>
                        );
                      }
                      
                      // Otherwise use default separator styling with optional custom styles
                      const defaultStyle = {
                        height: item.separatorStyle?.height || '2px',
                        backgroundColor: item.separatorStyle?.backgroundColor || '#d1d5db',
                        background: item.separatorStyle?.background,
                        margin: item.separatorStyle?.margin || '12px 0',
                        borderColor: item.separatorStyle?.borderColor,
                        width: '100%'
                      };
                      
                      return (
                        <div
                          key={item.id}
                          style={defaultStyle}
                          role="separator"
                          aria-label="Menu separator"
                        />
                      );
                    }

                    // Handle regular navigation/action items
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        disabled={item.isDisabled}
                        className={mergeCls([
                          'w-full text-left transition-colors duration-200 mb-3',
                          menuItemTextColor,
                          menuItemHoverColor,
                          item.isActive && menuItemActiveColor,
                          item.isDisabled && 'opacity-50 cursor-not-allowed'
                        ])}
                      >
                        <span className="flex-1">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default ResponsiveNavbar; 