export default function UpdatePassword() {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Update Password</h1>
        <p className="text-slate-500">Keep your account secure.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
            <input 
              type="password" 
              placeholder="Enter current password" 
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
            <input 
              type="password" 
              placeholder="Enter new password" 
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
            <input 
              type="password" 
              placeholder="Confirm new password" 
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" 
            />
          </div>
          
          <button type="button" className="w-full py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
