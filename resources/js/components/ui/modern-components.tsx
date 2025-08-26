import React from 'react';
import { LucideIcon } from 'lucide-react';
import { getThemeColors } from './color-system';

// Composant de carte moderne avec thème
interface ModernCardProps {
  children: React.ReactNode;
  theme?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
  hover?: boolean;
}

export const ModernCard: React.FC<ModernCardProps> = ({ 
  children, 
  theme = 'primary', 
  className = '',
  hover = true
}) => {
  const colors = getThemeColors(theme);
  
  return (
    <div className={`
      rounded-2xl p-6 shadow-sm border-2 transition-all duration-300
      ${colors.card} ${colors.border}
      ${hover ? 'hover:shadow-lg hover:scale-[1.02] hover:border-opacity-60' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

// Header de page moderne
interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  theme?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  icon: Icon,
  theme = 'primary',
  actions
}) => {
  const colors = getThemeColors(theme);

  return (
    <div className={`rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8 border-2 ${colors.card} ${colors.border}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3 sm:space-x-4">
          {Icon && (
            <div className={`p-2 sm:p-3 lg:p-4 rounded-xl lg:rounded-2xl ${colors.button} shadow-lg`}>
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
            </div>
          )}
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">{title}</h1>
            {description && (
              <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg">{description}</p>
            )}
          </div>
        </div>
        {actions && <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">{actions}</div>}
      </div>
    </div>
  );
};

// Bouton moderne avec thème
interface ModernButtonProps {
  children: React.ReactNode;
  theme?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export const ModernButton: React.FC<ModernButtonProps> = ({
  children,
  theme = 'primary',
  size = 'md',
  icon: Icon,
  onClick,
  type = 'button',
  disabled = false,
  className = ''
}) => {
  const colors = getThemeColors(theme);
  
  const sizeClasses = {
    sm: 'px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm',
    md: 'px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base',
    lg: 'px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center rounded-lg sm:rounded-xl font-semibold
        transition-all duration-200 shadow-md hover:shadow-lg
        disabled:opacity-50 disabled:cursor-not-allowed
        w-full sm:w-auto
        ${colors.button}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />}
      {children}
    </button>
  );
};

// Input moderne avec thème
interface ModernInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  required?: boolean;
  error?: string;
  theme?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  icon?: LucideIcon;
  className?: string;
}

export const ModernInput: React.FC<ModernInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  required = false,
  error,
  theme = 'primary',
  icon: Icon,
  className = ''
}) => {
  const colors = getThemeColors(theme);

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-foreground mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icon className={`w-5 h-5 ${colors.text}`} />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={`
            w-full rounded-xl border-2 px-4 py-3 
            ${Icon ? 'pl-12' : ''}
            bg-background text-foreground placeholder-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            transition-all duration-200
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : `${colors.border} focus:border-opacity-60 focus:ring-opacity-20`}
          `}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

// Textarea moderne
interface ModernTextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  rows?: number;
  required?: boolean;
  error?: string;
  theme?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export const ModernTextarea: React.FC<ModernTextareaProps> = ({
  label,
  placeholder,
  value,
  onChange,
  rows = 4,
  required = false,
  error,
  theme = 'primary',
  className = ''
}) => {
  const colors = getThemeColors(theme);

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-foreground mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className={`
          w-full rounded-xl border-2 px-4 py-3 
          bg-background text-foreground placeholder-muted-foreground
          focus:outline-none focus:ring-2 focus:ring-opacity-50
          transition-all duration-200 resize-vertical
          ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : `${colors.border} focus:border-opacity-60 focus:ring-opacity-20`}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

// Select moderne
interface ModernSelectProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  theme?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export const ModernSelect: React.FC<ModernSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Sélectionnez une option',
  required = false,
  error,
  theme = 'primary',
  className = ''
}) => {
  const colors = getThemeColors(theme);

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-foreground mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        required={required}
        className={`
          w-full rounded-xl border-2 px-4 py-3 
          bg-background text-foreground
          focus:outline-none focus:ring-2 focus:ring-opacity-50
          transition-all duration-200
          ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : `${colors.border} focus:border-opacity-60 focus:ring-opacity-20`}
        `}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
