
export function InputBox({ label, placeholder, onChange, value, name }) {
  return <div>
    <div className="text-sm font-semibold text-left py-2">
      {label}
    </div>
    <input onChange={onChange} placeholder={placeholder} name={name} value={value} className="w-full px-2 py-1 border rounded border-slate-200" />
  </div>
}