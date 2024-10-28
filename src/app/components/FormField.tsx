interface FormFieldProps {
  label: string;
  type?: string;
  name: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

export function FormField({ 
  label, 
  type = 'text', 
  name, 
  placeholder, 
  required = false, 
  disabled = false,
  rows 
}: FormFieldProps) {
  const Component = rows ? 'textarea' : 'input';
  
  return (
    <div className="relative group space-y-2">
      <label htmlFor={name} className="text-base text-zinc-500 font-light block">
        {label}
      </label>
      <div className="relative">        
        <div className="absolute -inset-[1px] rounded-sm bg-gradient-to-r from-violet-400/0 via-violet-400/10 to-violet-400/0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-500 pointer-events-none" />
        
        <div className="relative">
          <Component
            id={name}
            type={type}
            name={name}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            rows={rows}
            className="relative w-full p-4 bg-zinc-900/60 text-lg
              placeholder:text-zinc-600 disabled:opacity-50
              focus:outline-none focus:ring-1 focus:ring-violet-400/50
              hover:bg-zinc-900/80 focus:bg-zinc-900/80
              transition-all duration-300
              group-hover:shadow-[0_0_15px_rgba(167,139,250,0.1)]
              group-focus-within:shadow-[0_0_20px_rgba(167,139,250,0.15)]
              resize-none align-bottom
              overflow-hidden
              box-border"
          />

          <div className="absolute inset-0 rounded-sm border border-zinc-800 group-hover:border-violet-400/20 group-focus-within:border-violet-400/30 transition-colors duration-300 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}