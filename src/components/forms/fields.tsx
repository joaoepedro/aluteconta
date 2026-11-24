import {
  useId,
  type Ref,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';

const control =
  'border-borda bg-branco text-noite placeholder:text-cinza/70 focus:border-azul w-full rounded-xl border-2 px-4 py-3 text-base outline-none';

type FieldProps = {
  label: string;
  hint?: string;
  children: (id: string, describedBy?: string) => ReactNode;
};

function Field({ label, hint, children }: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-dica` : undefined;
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-noite font-semibold">
        {label}
      </label>
      {children(id, hintId)}
      {hint && (
        <p id={hintId} className="text-cinza text-sm">
          {hint}
        </p>
      )}
    </div>
  );
}

export function TextField({
  label,
  hint,
  ...rest
}: { label: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Field label={label} {...(hint ? { hint } : {})}>
      {(id, describedBy) => (
        <input id={id} aria-describedby={describedBy} className={control} {...rest} />
      )}
    </Field>
  );
}

export function TextArea({
  label,
  hint,
  ...rest
}: { label: string; hint?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Field label={label} {...(hint ? { hint } : {})}>
      {(id, describedBy) => (
        <textarea id={id} aria-describedby={describedBy} rows={4} className={control} {...rest} />
      )}
    </Field>
  );
}

export function Select({
  label,
  hint,
  options,
  ref,
  ...rest
}: {
  label: string;
  hint?: string;
  options: { value: string; label: string }[];
  ref?: Ref<HTMLSelectElement>;
} & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Field label={label} {...(hint ? { hint } : {})}>
      {(id, describedBy) => (
        <select
          ref={ref}
          id={id}
          aria-describedby={describedBy}
          className={`${control} campo-select`}
          {...rest}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      )}
    </Field>
  );
}

export function CheckboxGroup({
  legend,
  name,
  options,
}: {
  legend: string;
  name: string;
  options: string[];
}) {
  return (
    <fieldset>
      <legend className="text-noite mb-2 font-semibold">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((opt) => (
          <label
            key={opt}
            className="border-borda bg-branco text-noite hover:border-azul/50 has-[:checked]:border-azul has-[:checked]:bg-azul/5 has-[:focus-visible]:outline-laranja-texto flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-2 transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2"
          >
            <input
              type="checkbox"
              name={name}
              value={opt}
              className="campo-check focus-visible:outline-none"
            />
            <span className="font-medium">{opt}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Campo-isca escondido de pessoas (anti-spam) */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Não preencha este campo
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
